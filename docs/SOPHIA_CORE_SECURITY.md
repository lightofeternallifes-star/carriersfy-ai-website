---
version: 1.0.0
classification: internal_architecture
owner: Carriersfy AI
status: active
created: 2026-06-25
last_reviewed: 2026-06-25
canonical_source: docs/SOPHIA_CORE_SECURITY.md
related_docs:
  - docs/SOPHIA_CORE_ARCHITECTURE.md
  - docs/SOPHIA_CORE_COMPONENTS.md
  - docs/SOPHIA_CORE_EVENT_SYSTEM.md
  - knowledge/00_customer_safe_policy.md
---

# Sophia Core™ — Security Architecture

> Complete security architecture: tenant isolation, memory protection, access control, compliance, and audit. All security controls described here are non-negotiable and apply to every deployment.

---

## 1. Security Principles

### Defense in Depth
No single security control is the last line of defense. Every layer adds its own protection. If authentication fails, authorization stops the request. If authorization fails, tenant scoping blocks data access. If tenant scoping fails, encryption renders data unreadable. Multiple independent controls protect every sensitive resource.

### Least Privilege
Every system, role, and service account has exactly the permissions required for its function — nothing more. Digital Employees have action permissions scoped to their role. Tenant Admins see only their tenant's data. Engineers have no access to customer data in production. Iron Prime™'s cross-employee visibility is scoped to a single tenant.

### Zero Trust Between Services
No service trusts another service by default. Every inter-service call is authenticated with a short-lived service token scoped to the calling service's identity. Service tokens are rotated automatically. There are no "trusted internal networks" — every request is authenticated regardless of origin.

### Data Minimization
Sophia Core™ never collects data it does not need. Memory TTLs enforce retention limits. PII is processed only when necessary and pseudonymized in analytics. Knowledge retrieval does not log customer query content — only hashed query identifiers. Every data type has a documented purpose and retention limit.

### Audit Everything
Every access to customer data, every action executed, every privilege used, every configuration change is logged in an append-only audit log. The audit log is tamper-resistant and available to authorized reviewers. No production action occurs without a trace.

---

## 2. Tenant Isolation

Tenant isolation is the most critical security guarantee in a multi-tenant platform. A breach of tenant isolation — where one tenant's data is accessible to another — is a catastrophic failure. Sophia Core™ enforces isolation at every layer.

### Data Isolation

Every record in every store is tagged with `tenant_id`. Storage queries are constructed at the Storage Provider Adapter layer with mandatory tenant scoping:

```
// All storage operations are wrapped — callers cannot bypass tenant scoping
adapter.get(store, key, tenant_id)    // tenant_id is always required
adapter.query(store, filter, tenant_id)
adapter.insert(store, record, tenant_id)
```

No raw storage query is possible without providing tenant_id. The adapter enforces this at the type level — callers that omit tenant_id fail at compile time.

### Vector Store Isolation (Knowledge)

The knowledge vector store uses namespace-per-tenant isolation:

```
namespace: tenant_{tenant_id}     // each tenant's KB is in its own namespace
namespace: global                 // Carriersfy AI KB — read-only to all tenants
```

Retrieval queries always include the namespace filter. Cross-namespace retrieval requires explicit tenant_id validation.

### Event Isolation

The event bus partitions events by tenant_id. Consumers receive events only from their own partition. Cross-tenant event routing (e.g., Iron Prime™ reporting across a group of tenant deployments) requires an explicit, audited routing configuration — it cannot happen by accident.

### Configuration Isolation

Tenant configuration is stored per-tenant with versioning. A configuration update for Tenant A never affects Tenant B. Configuration reads always include tenant_id validation.

### Credential Isolation

Every tenant's integration credentials (channel connections, webhook URLs, notification addresses) are stored in a secrets vault with per-tenant entries. No shared credentials exist. Engineers cannot read production secrets — they can only rotate them.

---

## 3. Customer-Safe Policy Enforcement

The three-tier classification from `knowledge/00_customer_safe_policy.md` is enforced at the system level:

### TIER 1 — customer_safe

**Where enforced:** Knowledge™ retrieval (filter applied at vector search), Personality™ (final scan before delivery)

**Enforcement:** Knowledge chunks tagged `customer_safe_tier: 1` are the only chunks returned for customer-facing conversations. The filter is applied server-side at query time, not after retrieval.

```
// Enforced in Knowledge™ retrieval
const filter = customer_facing
  ? { customer_safe_tier: 1 }
  : {} // internal queries may access all tiers
```

### TIER 2 — internal_only

**Where enforced:** Personality™ (stripped from all outbound responses)

**Enforcement:** Intelligence™ may receive TIER 2 knowledge for reasoning context. However, before any response reaches the Channel Layer, Personality™ scans for TIER 2 content markers and strips them, substituting compliant alternative language.

TIER 2 content that was load-bearing for the response (i.e., the response would be empty or misleading without it) triggers an automatic redirect to human escalation.

### TIER 3 — requires_human_review

**Where enforced:** Knowledge™ (detected at query classification), Runtime™ (triggers TransferToHuman action)

**Enforcement:** Queries classified as TIER 3 (legal, compliance, security, pricing quotes) bypass the Intelligence™ decision engine entirely. The Runtime™ immediately routes to a human handoff response. Sophia does not attempt to answer.

---

## 4. Memory Protection

### Encryption at Rest

All memory stores encrypt records at rest. The encryption key is per-tenant (stored in secrets vault, not in the data store). A compromise of the data store without the vault does not expose customer data.

### Encryption in Transit

All inter-service communication uses TLS. No plaintext internal calls. Certificate validity is enforced — self-signed certificates are not accepted in production.

### PII Handling

PII (Personally Identifiable Information) is identified at the point of entry and handled through a dedicated PII Processor:

```
PII fields in memory records:
  - contact_info.name
  - contact_info.phone
  - contact_info.email
  - business_name (may be PII in some jurisdictions)

PII handling rules:
  - Never written to application logs (log the visitor_id, not the name)
  - Pseudonymized in analytics (visitor_id replaces all contact identifiers)
  - Encrypted in the memory store
  - Included in right-to-deletion scope
```

PII Processor intercepts all log writes and scrubs PII fields before they reach the log sink.

### Memory Access Control

Memory records are read/written only by:
- Sophia Memory™ (system access)
- Iron Prime™ (tenant-scoped read for orchestration)
- Tenant Admin (read-only, through dedicated audit interface)
- Deletion Processor (write: delete only, triggered by GDPR/LGPD request)

No other system or role has direct memory store access.

### Right to Deletion

GDPR Article 17 / LGPD Article 18 right to erasure is implemented as a first-class operation:

```
Deletion Request Flow:
1. Request received (visitor_id + tenant_id + authorization proof)
2. Deletion Processor validates authorization
3. For each memory type:
   - ShortTermMemory.delete(visitor_id)
   - VisitorMemory.delete(visitor_id)
   - LeadMemory.delete(visitor_id)
   - BusinessMemory.delete(visitor_id)
   - RecommendationMemory.delete(visitor_id)
   - ConversationMemory.delete(visitor_id)
   - LongTermMemory.delete(visitor_id)
4. Audit log entries: anonymize (replace PII fields with '[DELETED]')
   - Note: audit log structure is retained, PII content is removed
5. Emit: memory.deleted per type
6. DeletionAuditRecord created (permanent, contains no PII)
7. Confirmation sent to requestor
```

Deletion is irreversible. A DeletionAuditRecord proves compliance without retaining any PII.

---

## 5. Audit Logging

### Scope

Every meaningful action in the system is logged. Audit logs are not application logs — they are a compliance-grade, tamper-resistant record of system behavior.

### Audit Log Schema

```
AuditLogEntry {
  entry_id: UUID
  tenant_id: string
  timestamp: ISO8601
  actor: {
    type: 'system' | 'employee' | 'human_user'
    id: string                    // employee_id, user_id, or system name
    role: Role
  }
  action: {
    type: string                  // 'conversation.turn' | 'action.executed' | 'config.changed' | etc.
    resource_type: string
    resource_id: string
  }
  context: {
    conversation_id?: UUID
    session_id?: UUID
    ip_address?: string           // human users only, hashed
    request_id: UUID
  }
  outcome: 'success' | 'failure' | 'partial'
  details: {
    intent?: Intent               // for conversation turns
    decision?: DecisionType
    skill_used?: SkillID
    actions_executed?: ActionID[]
    knowledge_sources?: string[]  // source names, not content
    tier_violations_removed?: boolean
    // NO PII fields in audit log details
  }
}
```

### Audit Log Properties

- **Append-only:** No audit log entry can be modified or deleted (except PII scrubbing on deletion request)
- **Tenant-partitioned:** Each tenant's audit log is isolated
- **Retention:** 90 days by default; configurable up to 365 days for enterprise/regulated tenants
- **Access:** Tenant Admin (read-only, own tenant), Carriersfy AI Support (read-only, all tenants, logged access), Compliance Processor (write: PII scrubbing only)

### What Is NOT Logged

- Customer PII in any form (names, phone, email)
- Knowledge chunk content (only source file references)
- AI model responses in raw form (only outcome classification)
- Internal reasoning traces (reasoning_trace is not persisted in audit log)
- Secrets, credentials, or API keys

---

## 6. Role Separation

### Role Definitions

**Sophia Core™ System**
- Type: Service account
- Access: Full read/write to all stores within tenant scope
- Restrictions: No human login, all access logged, short-lived tokens only
- Note: The runtime itself — not a human role

**Iron Prime™**
- Type: AI agent
- Access: Read all conversation telemetry, lead status, performance metrics (tenant-scoped); execute all Actions (with audit)
- Restrictions: Cannot modify tenant configuration; cannot access memory directly (goes through Memory™ API); all actions logged
- Scope: Single tenant — Iron Prime for Tenant A cannot access Tenant B

**Tenant Admin**
- Type: Human user
- Access: Read all conversations (own tenant), update Tenant KB, configure employee personality, view analytics, view audit log (own tenant)
- Restrictions: Cannot modify communication principles (non-overridable Sophia rules); cannot access another tenant's data; cannot read memory PII fields directly
- Auth: Tenant-scoped JWT with expiry; MFA required

**Tenant Viewer**
- Type: Human user
- Access: Read conversations, read analytics (own tenant, read-only)
- Restrictions: Cannot modify any configuration; cannot access memory

**Carriersfy AI Support**
- Type: Human user (Carriersfy AI employee)
- Access: Read conversations across tenants (for support purposes), read audit logs
- Restrictions: All cross-tenant access is logged with reason code; cannot modify customer data; cannot read PII fields; access reviewed quarterly
- Auth: Separate admin realm, MFA required, access expires after 8 hours

**Carriersfy AI Engineer**
- Type: Human user (Carriersfy AI employee)
- Access: Infrastructure configuration, deployment, incident response
- Restrictions: No customer data access in production; production access requires dual-approval for destructive operations; all production access logged
- Auth: Separate admin realm, MFA required, hardware token for production

---

## 7. Access Control

### Authentication

**Customer-facing channels:** Visitors are identified by channel-specific identifiers (phone number for voice/WhatsApp, session cookie for web/chat). No password required. The identifier creates a pseudonymized visitor_id.

**Tenant users (Admin, Viewer):** JWT with tenant_id claim, issued by Carriersfy AI identity system, expiry 8 hours, refresh token 30 days.

**Inter-service (System to System):** Short-lived service tokens (expiry: 15 minutes) issued by the Platform Layer. Each system has its own service identity. Tokens carry the calling system's identity and tenant scope.

### Authorization

All authorization decisions are RBAC (Role-Based Access Control):

```
AuthorizationCheck {
  request: { actor_role, action, resource_type, resource_id, tenant_id }
  policy: { role → permitted_actions: Record<ResourceType, Action[]> }
  decision: 'allow' | 'deny'
  logged: always
}
```

Authorization is evaluated at the Platform Layer before any business logic executes.

### Principle of Least Privilege in Practice

| System | Can Read | Can Write | Cannot |
|---|---|---|---|
| Sophia Runtime™ | Sessions, Tenant Config | Sessions, Events | Memory (direct), Audit Log |
| Sophia Intelligence™ | Knowledge, Memory Snapshot | (via events only) | Memory (direct), Tenant Config |
| Sophia Knowledge™ | KB Stores | KB Indexes | Memory, Sessions, Config |
| Sophia Memory™ | Memory Stores | Memory Stores, Events | KB, Sessions |
| Sophia Personality™ | Tenant Config, Policy KB | (read-only system) | All stores |
| Sophia Skills™ | Knowledge, Memory (via Memory™) | (via Actions only) | Memory (direct) |
| Sophia Actions™ | Action Definitions, Permissions | External systems via Adapters, Events | Memory (direct), Config |

---

## 8. Sensitive Information Handling

### Pricing Policy
Enforced by: Sophia Personality™ (TIER 2 strip + redirect)  
Backup: Intelligence™ routing rules (PRICING intent → redirect response strategy)  
Failure mode: If both fail, the response contains no actionable pricing — the redirect is embedded in style rules that cannot produce a price  

### Provider Identity
Enforced by: Channel Provider Adapter (strips provider metadata from all outbound messages)  
Backup: Personality™ prohibited phrase scan  
Failure mode: Unknown provider identifiers that bypass scan → logged as `compliance.potential_exposure` event for manual review  

### Customer PII
Enforced by: PII Processor (intercepts all log writes)  
Memory encryption: AES-256 at rest  
Transmission: TLS 1.3 minimum  
Analytics: visitor_id (pseudonymous) used instead of any PII field  

### Tenant Secrets
Stored in: Secrets vault (per-tenant entry, access restricted to runtime service account)  
Never: Logged, included in error messages, serialized to any store, passed in environment variables  
Rotation: Automated rotation supported; rotation event triggers config reload  

---

## 9. Compliance Architecture

Compliance is runtime configuration, not hardcoded logic. The compliance engine evaluates a tenant's active compliance profile and applies the appropriate rules.

### Compliance Profile Schema

```
TenantComplianceProfile {
  tenant_id: string
  country: string[]          // ['US', 'BR', 'EU']
  industry: Industry
  applicable_regulations: Regulation[]
  consent_required: boolean
  consent_record_ttl_days: number
  data_residency_region?: string  // 'US' | 'BR' | 'EU'
  pii_retention_days: number
  audit_retention_days: number
  ai_disclosure_required: boolean  // always true; cannot be false
}
```

### Regulation-Specific Rules

**LGPD (Brazil)**
- Consent required before data collection
- Consent record stored with timestamp and scope
- Data subject access request: provide copy of all data within 15 days
- Right to deletion: enforced (see Memory Protection section)
- DPA (Data Processing Agreement): required for all Brazilian clients
- Applied when: tenant country includes 'BR'

**GDPR (EU)**
- Consent or legitimate interest basis required for processing
- Right to erasure (Article 17): enforced
- Right to access: data export available via Tenant Admin
- Data residency: EU tenant data can be configured to reside in EU region only
- Applied when: tenant country includes EU member state

**CCPA (California, USA)**
- Opt-out of data "sale" honored (Sophia Core™ does not sell data; opt-out is processed for completeness)
- Data inventory maintained per tenant
- Applied when: tenant country = 'US'

**HIPAA-Adjacent (Healthcare)**
- PHI handling rules activated when tenant industry = HEALTHCARE
- PHI fields flagged in schema; additional encryption layer applied
- PHI never in logs or analytics
- Business Associate Agreement (BAA) required at tenant onboarding
- Applied when: tenant industry = HEALTHCARE or DENTAL or VETERINARY or MEDICAL

**FTC AI Disclosure**
- Sophia discloses AI nature when sincerely asked
- This rule is non-overridable: it cannot be disabled by any tenant configuration
- Applied: always, globally, regardless of country or industry

**TCPA / CAN-SPAM (Outbound)**
- Outbound notification (SendNotification) requires consent record for the recipient's channel
- Consent is validated before any outbound message is sent
- Opt-out is honored immediately; subscriber removed from all future outbound
- Applied when: tenant country = 'US'

### Compliance Failure Handling

```
compliance.violation event emitted when:
  - Outbound message attempted without consent record
  - Data access attempted after deletion request
  - Cross-tenant data access attempted
  - Audit log write fails
  
On compliance.violation:
  → Action blocked
  → Event logged to compliance audit trail
  → Alert sent to Carriersfy AI Compliance team
  → Human review triggered for serious violations
```
