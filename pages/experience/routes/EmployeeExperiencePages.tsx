import React from "react";
import {
  BillingCard,
  Configurator,
  ContactCTA,
  DashboardMetricCard,
  DetailGrid,
  EmployeeCard,
  EmployeeHero,
  ExperienceShell,
  FAQGrid,
  GlassCard,
  NetworkPanel,
  PlaceholderShowcase,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader
} from "../components/ExperiencePrimitives";
import {
  aiEmployeeConfiguratorSteps,
  appConfiguratorSteps,
  appDevelopmentServices,
  dashboardMetrics,
  employees,
  lightOfLifeSections
} from "../data";
import type { EmployeeProfile } from "../types";

export function AIEmployeesHubPage() {
  const aiEmployees = employees.filter((employee) => employee.kind === "employee");
  const ironPrime = employees.find((employee) => employee.kind === "ceo");

  return (
    <ExperienceShell>
      <Section className="min-h-screen">
        <SectionHeader
          kicker="AI EMPLOYEES HUB"
          title="Meet the Carriersfy AI workforce."
          copy="A premium command layer for every digital employee built to answer, qualify, sell, support, quote and coordinate."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiEmployees.map((employee) => (
            <EmployeeCard employee={employee} key={employee.slug} />
          ))}
        </div>
        {ironPrime ? (
          <div className="mt-10">
            <SectionHeader
              kicker="AI CEO"
              title="Iron Prime coordinates the workforce."
              copy="Displayed separately because Iron Prime is not an AI Employee. It is the command-center executive layer."
              red
            />
            <div className="mx-auto max-w-[760px]">
              <EmployeeCard employee={ironPrime} />
            </div>
          </div>
        ) : null}
      </Section>
    </ExperienceShell>
  );
}

export function IndividualEmployeePage({ employee }: { employee: EmployeeProfile }) {
  return (
    <ExperienceShell>
      <EmployeeHero employee={employee} />

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <GlassCard>
            <p className={`mb-4 text-[13px] font-bold uppercase tracking-[0.16em] ${employee.accent === "red" ? "text-[#FF2E3C]" : "text-[#1FA2FF]"}`}>Origin Story</p>
            <p className="m-0 text-[17px] leading-[1.65] text-[rgba(244,246,251,0.62)]">{employee.origin}</p>
          </GlassCard>
          <GlassCard>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#1FA2FF]">Why this name?</p>
            <p className="m-0 text-[17px] leading-[1.65] text-[rgba(244,246,251,0.62)]">{employee.nameMeaning}</p>
          </GlassCard>
          <GlassCard>
            <p className={`mb-4 text-[13px] font-bold uppercase tracking-[0.16em] ${employee.accent === "red" ? "text-[#FF2E3C]" : "text-[#1FA2FF]"}`}>Mission</p>
            <p className="m-0 text-[17px] leading-[1.65] text-[rgba(244,246,251,0.62)]">{employee.mission}</p>
          </GlassCard>
        </div>
      </Section>

      <DetailGrid id={`${employee.slug}-responsibilities`} kicker="DAILY RESPONSIBILITIES" title={`${employee.name}'s daily operating system`} items={employee.responsibilities} red={employee.accent === "red"} />
      <DetailGrid id={`${employee.slug}-benefits`} kicker="BUSINESS BENEFITS" title="Built for measurable outcomes" items={employee.benefits} />
      <DetailGrid id={`${employee.slug}-industries`} kicker="INDUSTRIES" title="Where this employee creates leverage" items={employee.industries} red={employee.accent === "red"} />
      <DetailGrid id={`${employee.slug}-technology`} kicker="TECHNOLOGY" title="Integration-ready architecture" items={employee.technology} />
      <FAQGrid employee={employee} />
      <ContactCTA title={`Book a demo for ${employee.name}.`} copy="This frontend leaves integration hooks for the Chief Architect to connect scheduling, CRM routing and live deployment flows." />
    </ExperienceShell>
  );
}

export function InteractiveAITeamPage() {
  return (
    <ExperienceShell>
      <Section className="min-h-screen">
        <SectionHeader
          kicker="INTERACTIVE AI TEAM"
          title="One workforce. One routing system. One executive command layer."
          copy="Sophia captures demand, Atlas qualifies it, Nova manages messages, Titan prepares quote paths, Orion advances sales, Echo supports customers and Iron Prime coordinates the system."
        />
        <NetworkPanel employees={employees} />
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Connections", "Every AI Employee shares structured context through the integration layer so customer information does not get lost."],
            ["Workflow", "Tasks move from intake to qualification, scheduling, quoting, sales follow-up and support based on business rules."],
            ["Task Routing", "Iron Prime prioritizes the next action, assigns ownership and surfaces performance signals for the team."],
            ["Collaboration", "Each employee specializes in one workflow while contributing clean data to the larger operating system."]
          ].map(([title, copy]) => (
            <GlassCard key={title}>
              <h3 className="m-0 font-['Space_Grotesk'] text-[22px] font-semibold">{title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.62] text-[rgba(244,246,251,0.62)]">{copy}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </ExperienceShell>
  );
}

export function AIAppDevelopmentDivisionPage() {
  return (
    <ExperienceShell>
      <Section id="ai-app-development" className="min-h-screen">
        <div className="grid items-center gap-[clamp(40px,5vw,72px)] lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#1FA2FF]">AI APP DEVELOPMENT DIVISION</p>
            <h1 className="m-0 font-['Space_Grotesk'] text-[clamp(44px,6.8vw,86px)] font-bold leading-[0.99] tracking-[-0.035em]">
              Have a Dream?
              <span className="block bg-[linear-gradient(110deg,#3FB0FF,#1C7FD6_42%,#FF2E3C)] bg-clip-text text-transparent">We'll Build It.</span>
            </h1>
            <p className="mt-[26px] max-w-[640px] text-[clamp(16.5px,1.55vw,20px)] leading-[1.65] text-[rgba(244,246,251,0.66)]">
              Carriersfy AI designs and develops production-ready apps, platforms and business systems with the same premium execution as its AI workforce.
            </p>
            <div className="mt-[38px] flex flex-wrap gap-4">
              <PrimaryButton href="#build-your-app">Build Your App</PrimaryButton>
              <SecondaryButton href="#app-showcase">View Showcase</SecondaryButton>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {appDevelopmentServices.map((service, index) => (
              <GlassCard key={service}>
                <div className={`mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border text-[15px] font-bold ${index % 3 === 2 ? "border-[rgba(255,46,60,0.28)] bg-[rgba(255,46,60,0.12)]" : "border-[rgba(31,162,255,0.28)] bg-[rgba(31,162,255,0.12)]"}`}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="m-0 font-['Space_Grotesk'] text-[21px] font-semibold">{service}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)]">Built with product strategy, clean UX, scalable architecture and AI-ready workflows.</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      <Section id="app-showcase">
        <SectionHeader kicker="PREMIUM SHOWCASE" title="From concept to production system." copy="A review-ready showcase area for mobile apps, SaaS platforms, dashboards and AI-powered customer experiences." red />
        <GlassCard>
          <div className="grid gap-5 md:grid-cols-3">
            <PlaceholderShowcase label="Product Screens Placeholder" />
            <PlaceholderShowcase label="Architecture Preview Placeholder" />
            <PlaceholderShowcase label="Launch Metrics Placeholder" />
          </div>
        </GlassCard>
      </Section>
    </ExperienceShell>
  );
}

export function LightOfLifeCaseStudyPage() {
  return (
    <ExperienceShell>
      <Section id="light-of-life" className="min-h-screen">
        <SectionHeader
          kicker="FEATURED PROJECT"
          title="Light of Life"
          copy="A premium case study shell for the real production application developed by Carriersfy AI."
          red
        />
        <GlassCard>
          <div className="grid gap-[clamp(32px,5vw,64px)] lg:grid-cols-[0.95fr_1.05fr]">
            <PlaceholderShowcase label="App Store Screenshots Placeholder" />
            <div>
              <h3 className="m-0 font-['Space_Grotesk'] text-[32px] font-semibold">Production application showcase.</h3>
              <p className="mt-4 text-[17px] leading-[1.65] text-[rgba(244,246,251,0.62)]">
                This page is intentionally UI-only and prepared for case study details, App Store assets, feature screenshots and download tracking.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="#case-study-placeholder">View Case Study</PrimaryButton>
                <SecondaryButton href="#download-placeholder">Download App</SecondaryButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {lightOfLifeSections.map((section, index) => (
            <GlassCard key={section}>
              <div className={`mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border text-[15px] font-bold ${index % 2 ? "border-[rgba(255,46,60,0.28)] bg-[rgba(255,46,60,0.12)]" : "border-[rgba(31,162,255,0.28)] bg-[rgba(31,162,255,0.12)]"}`}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="m-0 font-['Space_Grotesk'] text-[21px] font-semibold">{section}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)]">Placeholder content block ready for production case study copy.</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </ExperienceShell>
  );
}

export function BuildYourAIEmployeePage() {
  return (
    <ExperienceShell>
      <Configurator
        id="build-your-ai-employee"
        kicker="BUILD YOUR AI EMPLOYEE"
        title="Design the AI employee your business needs."
        copy="A frontend-only configurator for industry, name, gender, voice, preview placeholder, language, channels, functions, integrations, business hours, price and summary."
        steps={aiEmployeeConfiguratorSteps}
      />
    </ExperienceShell>
  );
}

export function BuildYourAppPage() {
  return (
    <ExperienceShell>
      <Configurator
        id="build-your-app"
        kicker="BUILD YOUR APP"
        title="Scope a production app with Carriersfy AI."
        copy="A frontend-only configurator for business type, platforms, desired features, AI options, cloud requirements, timeline and estimated investment."
        steps={appConfiguratorSteps}
      />
    </ExperienceShell>
  );
}

export function PaymentCenterPage() {
  return (
    <ExperienceShell>
      <Section className="min-h-screen">
        <SectionHeader
          kicker="PAYMENT CENTER"
          title="Billing, subscriptions and AI workforce expansion."
          copy="UI-only payment center prepared for setup fees, monthly subscriptions, upgrades, additional employees, invoices and billing history."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <BillingCard title="Setup Fee" value="$--" copy="One-time implementation, training and deployment placeholder." />
          <BillingCard title="Monthly Subscription" value="$--/mo" copy="Recurring AI workforce subscription placeholder." />
          <BillingCard title="Upgrade Plan" value="Available" copy="Plan expansion and enterprise capacity placeholder." />
          <BillingCard title="Additional AI Employees" value="+ Employee" copy="Purchase more AI employees when the workforce expands." />
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          {["Invoices", "Billing History", "Subscription Management"].map((item) => (
            <GlassCard key={item}>
              <h3 className="m-0 font-['Space_Grotesk'] text-[24px] font-semibold">{item}</h3>
              <div className="mt-6 space-y-3">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex items-center justify-between rounded-[14px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] px-4 py-3 text-[14px] text-[rgba(244,246,251,0.62)]">
                    <span>Placeholder Row {row}</span>
                    <strong className="text-white">Pending</strong>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>
    </ExperienceShell>
  );
}

export function ClientPortalDashboardPage() {
  return (
    <ExperienceShell>
      <Section className="min-h-screen">
        <SectionHeader
          kicker="CLIENT PORTAL"
          title="AI workforce command dashboard."
          copy="UI-only dashboard for active employees, calls, chats, appointments, leads, quotes, revenue, activity, notifications and usage."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <DashboardMetricCard metric={metric} key={metric.label} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard>
            <h3 className="m-0 font-['Space_Grotesk'] text-[24px] font-semibold">Recent Activity</h3>
            <div className="mt-6 space-y-3">
              {["Sophia booked a consultation", "Atlas qualified a high-intent lead", "Titan prepared a quote summary", "Echo resolved a support request"].map((item) => (
                <div key={item} className="rounded-[14px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] px-4 py-3 text-[14.5px] text-[rgba(244,246,251,0.66)]">{item}</div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="m-0 font-['Space_Grotesk'] text-[24px] font-semibold">Notifications</h3>
            <div className="mt-6 space-y-3">
              {["Usage within normal range", "New appointment pending review", "CRM sync placeholder", "Billing notice placeholder"].map((item) => (
                <div key={item} className="rounded-[14px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)] px-4 py-3 text-[14.5px] text-[rgba(244,246,251,0.66)]">{item}</div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>
    </ExperienceShell>
  );
}

export const employeePageMap = Object.fromEntries(
  employees.map((employee) => [employee.slug, () => <IndividualEmployeePage employee={employee} />])
) as Record<string, () => React.ReactElement>;
