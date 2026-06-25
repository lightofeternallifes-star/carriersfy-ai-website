export type SophiaLanguageCode = "en-US" | "es-US" | "pt-BR";

export type SophiaConversationStatus =
  | "new"
  | "welcomed"
  | "qualifying"
  | "qualified"
  | "routed"
  | "handoff_requested"
  | "appointment_pending"
  | "appointment_booked"
  | "closed";

export interface SophiaChannelConfig {
  id: "website" | "whatsapp" | "email" | "phone" | "calendar";
  label: string;
  enabled: boolean;
  purpose: string;
  integrationStatus: "ready_for_integration" | "future" | "disabled";
}

export interface SophiaConfig {
  profile: {
    name: string;
    role: string;
    mission: string;
    businessDescription: string;
    supportedLanguages: Array<{
      code: SophiaLanguageCode;
      label: string;
      priority: number;
    }>;
    businessHours: {
      timezone: string;
      mode: "business_hours_with_after_hours_capture" | "twenty_four_seven";
      weeklySchedule: Array<{
        day: string;
        open: string;
        close: string;
        active: boolean;
      }>;
      afterHoursBehavior: string;
    };
    communicationChannels: SophiaChannelConfig[];
    capabilities: string[];
    industryCoverage: string[];
  };
  whatsapp: {
    provider: "whatsapp_business_api";
    status: "ready_for_credentials";
    businessAccountIdPlaceholder: string;
    phoneNumberIdPlaceholder: string;
    accessTokenEnvVar: string;
    webhookVerifyTokenEnvVar: string;
    clickToChat: {
      enabled: boolean;
      phonePlaceholder: string;
      defaultMessage: string;
      urlTemplate: string;
    };
    leadCapture: {
      requiredFields: string[];
      optionalFields: string[];
      qualificationQuestions: string[];
    };
    routing: {
      defaultQueue: string;
      priorityRules: Array<{
        name: string;
        condition: string;
        routeTo: string;
      }>;
    };
    automaticWelcomeMessage: {
      enabled: boolean;
      templates: Record<SophiaLanguageCode, string>;
    };
    humanHandoffHooks: {
      enabled: boolean;
      triggerStatuses: SophiaConversationStatus[];
      escalationContactPlaceholder: string;
      internalNotificationChannels: string[];
    };
    conversationStatuses: SophiaConversationStatus[];
  };
  leadFlow: {
    source: "website";
    owner: "Sophia";
    stages: string[];
    crm: {
      integrationStatus: "future";
      providerPlaceholder: string;
      destinationObject: "lead";
      requiredFields: string[];
    };
    notifications: {
      email: {
        enabled: boolean;
        recipientPlaceholder: string;
        subjectTemplate: string;
      };
      whatsapp: {
        enabled: boolean;
        recipientPlaceholder: string;
        messageTemplate: string;
      };
    };
    appointment: {
      integrationStatus: "future";
      providerPlaceholder: string;
      bookingUrlPlaceholder: string;
      confirmationMessage: string;
    };
  };
  emailSignature: {
    companyName: string;
    slogan: string;
    website: string;
    phonePlaceholder: string;
    email: string;
    logo: {
      alt: string;
      assetPath: string;
      width: number;
      height: number;
    };
    socialIcons: Array<{
      label: string;
      urlPlaceholder: string;
      iconUrlPlaceholder: string;
    }>;
    legalDisclaimer: string;
    htmlTemplate: string;
  };
  integrationPlaceholders: {
    voiceProvider: string;
    whatsappProvider: string;
    crmProvider: string;
    calendarProvider: string;
    paymentProvider: string;
  };
}

export const sophiaConfig: SophiaConfig = {
  profile: {
    name: "Sophia",
    role: "Official AI Employee of Carriersfy AI",
    mission:
      "Answer, qualify, route and schedule every inbound opportunity so Carriersfy AI never loses a serious customer because of slow response.",
    businessDescription:
      "Carriersfy AI designs and deploys AI employees, AI applications, business automation systems and enterprise platforms for companies that need always-on execution.",
    supportedLanguages: [
      { code: "en-US", label: "English", priority: 1 },
      { code: "es-US", label: "Spanish", priority: 2 },
      { code: "pt-BR", label: "Portuguese", priority: 3 }
    ],
    businessHours: {
      timezone: "America/New_York",
      mode: "business_hours_with_after_hours_capture",
      weeklySchedule: [
        { day: "Monday", open: "09:00", close: "18:00", active: true },
        { day: "Tuesday", open: "09:00", close: "18:00", active: true },
        { day: "Wednesday", open: "09:00", close: "18:00", active: true },
        { day: "Thursday", open: "09:00", close: "18:00", active: true },
        { day: "Friday", open: "09:00", close: "18:00", active: true },
        { day: "Saturday", open: "10:00", close: "14:00", active: false },
        { day: "Sunday", open: "00:00", close: "00:00", active: false }
      ],
      afterHoursBehavior:
        "Capture the lead, confirm receipt, qualify intent, and offer the next available appointment window for human review."
    },
    communicationChannels: [
      {
        id: "website",
        label: "Website Contact Forms",
        enabled: true,
        purpose: "Capture inbound website leads and route them into Sophia's qualification flow.",
        integrationStatus: "ready_for_integration"
      },
      {
        id: "whatsapp",
        label: "Business WhatsApp",
        enabled: true,
        purpose: "Handle click-to-chat conversations, lead capture, routing and human handoff.",
        integrationStatus: "ready_for_integration"
      },
      {
        id: "email",
        label: "Email",
        enabled: true,
        purpose: "Send lead notifications, summaries, follow-ups and appointment confirmations.",
        integrationStatus: "ready_for_integration"
      },
      {
        id: "phone",
        label: "Voice",
        enabled: false,
        purpose: "Future voice answering, qualification and appointment booking.",
        integrationStatus: "future"
      },
      {
        id: "calendar",
        label: "Calendar",
        enabled: false,
        purpose: "Future appointment scheduling and reminders.",
        integrationStatus: "future"
      }
    ],
    capabilities: [
      "Inbound lead capture",
      "Automatic welcome response",
      "Multilingual qualification",
      "Conversation routing",
      "Human handoff",
      "CRM-ready lead payload generation",
      "Email notification preparation",
      "WhatsApp notification preparation",
      "Appointment request intake",
      "Conversation status tracking"
    ],
    industryCoverage: [
      "AI app development",
      "Business automation",
      "SaaS platforms",
      "Enterprise platforms",
      "Home services",
      "Marine services",
      "Healthcare and clinics",
      "Professional services",
      "Real estate",
      "Automotive"
    ]
  },
  whatsapp: {
    provider: "whatsapp_business_api",
    status: "ready_for_credentials",
    businessAccountIdPlaceholder: "WHATSAPP_BUSINESS_ACCOUNT_ID",
    phoneNumberIdPlaceholder: "WHATSAPP_PHONE_NUMBER_ID",
    accessTokenEnvVar: "WHATSAPP_ACCESS_TOKEN",
    webhookVerifyTokenEnvVar: "WHATSAPP_WEBHOOK_VERIFY_TOKEN",
    clickToChat: {
      enabled: true,
      phonePlaceholder: "CARRIERSFY_WHATSAPP_PHONE",
      defaultMessage: "Hi Sophia, I want to build an AI employee or AI app for my business.",
      urlTemplate: "https://wa.me/{CARRIERSFY_WHATSAPP_PHONE}?text={ENCODED_MESSAGE}"
    },
    leadCapture: {
      requiredFields: ["name", "preferredLanguage", "businessNeed", "conversationSource"],
      optionalFields: ["company", "email", "phone", "industry", "budgetRange", "timeline", "message"],
      qualificationQuestions: [
        "What type of business do you run?",
        "Do you need an AI employee, an AI app, or a business automation system?",
        "Which channel should Sophia use to follow up?",
        "How soon do you want to launch?",
        "Would you like to book a strategy call?"
      ]
    },
    routing: {
      defaultQueue: "carriersfy-ai-inbound-leads",
      priorityRules: [
        {
          name: "High-intent appointment request",
          condition: "Lead asks to book a call, demo, consultation, or appointment.",
          routeTo: "appointment_intake"
        },
        {
          name: "AI app development request",
          condition: "Lead mentions iPhone, Android, SaaS, platform, dashboard, or app build.",
          routeTo: "ai_app_development_pipeline"
        },
        {
          name: "AI employee request",
          condition: "Lead mentions calls, WhatsApp, support, sales, quotes, CRM, or calendar automation.",
          routeTo: "ai_employee_pipeline"
        },
        {
          name: "Human escalation",
          condition: "Lead asks for Juan, pricing commitment, legal terms, invoice, refund, or urgent issue.",
          routeTo: "human_handoff"
        }
      ]
    },
    automaticWelcomeMessage: {
      enabled: true,
      templates: {
        "en-US":
          "Hi, I am Sophia from Carriersfy AI. I can help you with AI employees, AI apps, automation, and appointment requests. What would you like to build?",
        "es-US":
          "Hola, soy Sophia de Carriersfy AI. Puedo ayudarte con empleados de IA, apps de IA, automatizacion y citas. Que quieres construir?",
        "pt-BR":
          "Ola, eu sou Sophia da Carriersfy AI. Posso ajudar com funcionarios de IA, apps de IA, automacao e agendamentos. O que voce quer construir?"
      }
    },
    humanHandoffHooks: {
      enabled: true,
      triggerStatuses: ["handoff_requested", "appointment_pending", "qualified"],
      escalationContactPlaceholder: "HUMAN_HANDOFF_CONTACT",
      internalNotificationChannels: ["email", "whatsapp"]
    },
    conversationStatuses: [
      "new",
      "welcomed",
      "qualifying",
      "qualified",
      "routed",
      "handoff_requested",
      "appointment_pending",
      "appointment_booked",
      "closed"
    ]
  },
  leadFlow: {
    source: "website",
    owner: "Sophia",
    stages: [
      "Website lead submitted",
      "Sophia validates and enriches lead payload",
      "Sophia qualifies intent and language",
      "CRM lead record is created or updated",
      "Email notification is sent to Carriersfy AI",
      "WhatsApp notification is sent for urgent or high-intent leads",
      "Appointment request is created",
      "Confirmation message is sent to the lead"
    ],
    crm: {
      integrationStatus: "future",
      providerPlaceholder: "CRM_PROVIDER",
      destinationObject: "lead",
      requiredFields: ["name", "emailOrPhone", "source", "language", "businessNeed", "status"]
    },
    notifications: {
      email: {
        enabled: true,
        recipientPlaceholder: "LEAD_NOTIFICATION_EMAIL",
        subjectTemplate: "New Sophia lead: {name} - {businessNeed}"
      },
      whatsapp: {
        enabled: true,
        recipientPlaceholder: "LEAD_NOTIFICATION_WHATSAPP",
        messageTemplate: "New Sophia lead from {name}. Need: {businessNeed}. Status: {status}."
      }
    },
    appointment: {
      integrationStatus: "future",
      providerPlaceholder: "CALENDAR_PROVIDER",
      bookingUrlPlaceholder: "SOPHIA_BOOKING_URL",
      confirmationMessage:
        "Sophia received your request. The next step is to confirm the best time for a Carriersfy AI strategy call."
    }
  },
  emailSignature: {
    companyName: "Carriersfy AI",
    slogan: "Where Business Meets Artificial Intelligence",
    website: "https://carriersfy.ai",
    phonePlaceholder: "CARRIERSFY_PUBLIC_PHONE",
    email: "hello@carriersfy.ai",
    logo: {
      alt: "Carriersfy AI",
      assetPath: "assets/carriersfy-emblem-core.png",
      width: 64,
      height: 64
    },
    socialIcons: [
      {
        label: "LinkedIn",
        urlPlaceholder: "CARRIERSFY_LINKEDIN_URL",
        iconUrlPlaceholder: "LINKEDIN_ICON_URL"
      },
      {
        label: "Instagram",
        urlPlaceholder: "CARRIERSFY_INSTAGRAM_URL",
        iconUrlPlaceholder: "INSTAGRAM_ICON_URL"
      },
      {
        label: "YouTube",
        urlPlaceholder: "CARRIERSFY_YOUTUBE_URL",
        iconUrlPlaceholder: "YOUTUBE_ICON_URL"
      }
    ],
    legalDisclaimer:
      "This message may contain confidential information intended only for the recipient. If you received it in error, please delete it and notify Carriersfy AI.",
    htmlTemplate: `
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;font-family:Manrope,Arial,sans-serif;color:#F4F6FB;background:#070B16;border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:0;overflow:hidden;">
  <tr>
    <td style="padding:18px 18px 14px 18px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
          <td style="width:76px;vertical-align:top;">
            <img src="{LOGO_URL}" width="64" height="64" alt="Carriersfy AI" style="display:block;border:0;width:64px;height:64px;">
          </td>
          <td style="vertical-align:top;padding-left:14px;">
            <div style="font-family:'Space Grotesk',Arial,sans-serif;font-size:18px;line-height:1.2;font-weight:700;color:#FFFFFF;">Carriersfy <span style="color:#FF2E3C;">AI</span></div>
            <div style="font-size:12px;line-height:1.5;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#1FA2FF;margin-top:4px;">Where Business Meets Artificial Intelligence</div>
            <div style="font-size:13px;line-height:1.7;color:rgba(244,246,251,0.72);margin-top:10px;">
              <a href="https://carriersfy.ai" style="color:#F4F6FB;text-decoration:none;">carriersfy.ai</a><br>
              <a href="mailto:hello@carriersfy.ai" style="color:#F4F6FB;text-decoration:none;">hello@carriersfy.ai</a><br>
              <span style="color:#F4F6FB;">{PUBLIC_PHONE}</span>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:0 18px 16px 108px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:10px;"><a href="{LINKEDIN_URL}" style="color:#1FA2FF;text-decoration:none;font-size:12px;font-weight:700;">LinkedIn</a></td>
          <td style="padding-right:10px;"><a href="{INSTAGRAM_URL}" style="color:#1FA2FF;text-decoration:none;font-size:12px;font-weight:700;">Instagram</a></td>
          <td><a href="{YOUTUBE_URL}" style="color:#1FA2FF;text-decoration:none;font-size:12px;font-weight:700;">YouTube</a></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 18px;background:#05070F;border-top:1px solid rgba(255,255,255,0.08);font-size:10.5px;line-height:1.5;color:rgba(244,246,251,0.52);">
      This message may contain confidential information intended only for the recipient. If you received it in error, please delete it and notify Carriersfy AI.
    </td>
  </tr>
</table>`
  },
  integrationPlaceholders: {
    voiceProvider: "VOICE_PROVIDER",
    whatsappProvider: "WHATSAPP_BUSINESS_API",
    crmProvider: "CRM_PROVIDER",
    calendarProvider: "CALENDAR_PROVIDER",
    paymentProvider: "PAYMENT_PROVIDER"
  }
};

export default sophiaConfig;
