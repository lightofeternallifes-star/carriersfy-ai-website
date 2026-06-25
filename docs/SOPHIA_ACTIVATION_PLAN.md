# Sophia Activation Plan

Status: activation-ready architecture  
Scope: configuration, WhatsApp readiness, email signature, lead flow and future integration points  
Production pages changed: none

## Objective

Sophia is being prepared as the first fully operational AI Employee of Carriersfy AI. This sprint does not implement live messaging, voice, CRM, calendar or payment integrations. It creates the reusable configuration and operational plan needed for Claude Code to wire those systems later.

## Architecture

Sophia is configured as a modular AI employee with four layers:

1. Identity and operating profile
2. Channel readiness
3. Lead capture and routing
4. Future system integrations

The source of truth is:

```txt
config/sophia.config.ts
```

The config intentionally stores no secrets, API keys, access tokens or hardcoded credentials. Runtime integrations should read secrets from environment variables or the deployment platform.

## Sophia Profile

Sophia's profile includes:

- Name: Sophia
- Role: Official AI Employee of Carriersfy AI
- Mission: answer, qualify, route and schedule inbound opportunities
- Business description: Carriersfy AI builds AI employees, AI applications, automation systems and enterprise platforms
- Supported languages: English, Spanish and Portuguese
- Business hours: configured in `America/New_York`
- Communication channels: website, WhatsApp, email, future voice and future calendar
- Capabilities: lead capture, welcome response, qualification, routing, handoff, CRM-ready payloads and notifications
- Industry coverage: AI app development, business automation, SaaS, enterprise platforms and key service industries

## WhatsApp Integration Readiness

The WhatsApp configuration prepares Sophia for:

- Business WhatsApp via WhatsApp Business API
- Click-to-chat URL generation
- Automatic welcome message
- Lead capture fields
- Conversation routing rules
- Human handoff hooks
- Conversation status tracking

Required future runtime secrets:

```txt
WHATSAPP_ACCESS_TOKEN
WHATSAPP_WEBHOOK_VERIFY_TOKEN
```

Required future runtime identifiers:

```txt
WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_PHONE_NUMBER_ID
CARRIERSFY_WHATSAPP_PHONE
```

### Conversation Statuses

Sophia should track conversations using this lifecycle:

```txt
new
welcomed
qualifying
qualified
routed
handoff_requested
appointment_pending
appointment_booked
closed
```

### Human Handoff

Human handoff should trigger when:

- A lead asks for Juan or a human
- A lead requests pricing commitments
- A lead mentions legal, invoice, refund or urgent issues
- A lead reaches `qualified`, `appointment_pending` or `handoff_requested`

## Email System

Sophia's email signature is defined in `config/sophia.config.ts`.

The signature includes:

- Carriersfy AI logo
- Company name
- Official slogan
- Website
- Phone placeholder
- Email
- Social links
- Legal disclaimer
- Responsive table-based HTML
- Dark-mode-compatible colors

The signature uses placeholders such as:

```txt
{LOGO_URL}
{PUBLIC_PHONE}
{LINKEDIN_URL}
{INSTAGRAM_URL}
{YOUTUBE_URL}
```

Those values should be replaced by the integration layer or email provider template system.

## Lead Capture Flow

The intended lead flow is:

```txt
Website
  |
  v
Sophia
  |
  v
CRM
  |
  v
Email Notification
  |
  v
WhatsApp Notification
  |
  v
Appointment
```

### Step-by-Step Flow

1. Website lead is submitted from a contact form, click-to-chat entry point or future voice channel.
2. Sophia validates the payload and detects preferred language.
3. Sophia sends an automatic welcome message.
4. Sophia qualifies the lead using business-need, channel, urgency and appointment questions.
5. Sophia creates or updates a CRM-ready lead payload.
6. Sophia sends an email notification to the configured internal recipient.
7. Sophia sends a WhatsApp notification for urgent or high-intent leads.
8. Sophia creates an appointment request or routes the lead to a booking URL.
9. Sophia sends a confirmation message to the lead.
10. Conversation status is updated until appointment is booked or the conversation is closed.

## Future Voice Integration

Voice should be added after the text-based Sophia flow is stable.

Future voice requirements:

- Voice provider selection
- Inbound phone number provisioning
- Business-hours and after-hours routing
- Speech-to-text and text-to-speech configuration
- Call transcript storage
- Lead extraction from call transcripts
- Human transfer rules
- Missed-call follow-up

Configuration placeholder:

```txt
VOICE_PROVIDER
```

## Future WhatsApp Integration

WhatsApp can be wired once a WhatsApp Business account, phone number ID and webhook verification flow are available.

Future WhatsApp requirements:

- Webhook verification endpoint
- Inbound message handler
- Outbound message sender
- Template message approval if required
- Conversation state persistence
- Lead capture payload builder
- Human handoff notification
- Delivery and failure logging

Configuration placeholders:

```txt
WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_WEBHOOK_VERIFY_TOKEN
```

## Future CRM Integration

The CRM integration should receive Sophia's qualified lead payload and preserve conversation context.

Future CRM requirements:

- CRM provider decision
- Lead create/update API
- Duplicate detection by email or phone
- Source attribution: `website`, `whatsapp`, `voice` or `email`
- Lead status mapping
- Conversation summary field
- Appointment intent field
- Owner assignment rules

Configuration placeholder:

```txt
CRM_PROVIDER
```

## Future Calendar Integration

Calendar integration should convert high-intent leads into strategy calls.

Future calendar requirements:

- Calendar provider decision
- Booking URL or direct calendar API
- Availability windows
- Timezone handling
- Confirmation email
- WhatsApp reminder
- Reschedule and cancellation hooks
- CRM appointment status update

Configuration placeholders:

```txt
CALENDAR_PROVIDER
SOPHIA_BOOKING_URL
```

## Future Payment Integration

Payment integration should not be connected until Sophia has a stable lead and appointment workflow.

Future payment requirements:

- Payment provider decision
- Product and plan catalog
- Setup fee payment link
- Monthly subscription payment link
- Invoice notification
- Payment status webhook
- CRM payment status update
- Human review before contractual commitments

Configuration placeholder:

```txt
PAYMENT_PROVIDER
```

## Integration Points for Claude Code

Claude Code can integrate Sophia by adding:

- A lead intake endpoint that imports `sophiaConfig`
- A WhatsApp webhook endpoint
- A message router using `conversationStatuses`
- A CRM adapter using `leadFlow.crm`
- Email notification rendering using `emailSignature.htmlTemplate`
- WhatsApp notification sender using `leadFlow.notifications.whatsapp`
- Calendar adapter using `leadFlow.appointment`
- Environment variable validation for required runtime secrets

## Non-Goals

This sprint does not:

- Modify production pages
- Redesign the website
- Add credentials
- Add API keys
- Implement WhatsApp API calls
- Implement CRM calls
- Implement calendar booking
- Implement payment processing
- Commit or push changes
