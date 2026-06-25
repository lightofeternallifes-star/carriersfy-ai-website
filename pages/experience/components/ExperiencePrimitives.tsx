import React, { useMemo, useState } from "react";
import type { ConfiguratorStep, DashboardMetric, EmployeeProfile } from "../types";

const accentStyles = {
  blue: {
    tile: "bg-[rgba(31,162,255,0.12)] border-[rgba(31,162,255,0.28)]",
    text: "text-[#1FA2FF]",
    ring: "shadow-[0_0_36px_rgba(31,162,255,0.28)]",
    gradient: "from-[#1FA2FF] to-[#1C7FD6]"
  },
  red: {
    tile: "bg-[rgba(255,46,60,0.12)] border-[rgba(255,46,60,0.28)]",
    text: "text-[#FF2E3C]",
    ring: "shadow-[0_0_36px_rgba(255,46,60,0.24)]",
    gradient: "from-[#FF2E3C] to-[#1C7FD6]"
  }
} as const;

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export function ExperienceShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] font-['Manrope'] text-[#F4F6FB]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(1100px_720px_at_78%_-8%,rgba(28,127,214,0.26),transparent_60%),radial-gradient(900px_720px_at_6%_12%,rgba(31,162,255,0.14),transparent_55%),radial-gradient(760px_520px_at_50%_112%,rgba(255,46,60,0.16),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50 [background-image:linear-gradient(rgba(120,150,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,150,255,.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_28%,#000,transparent_78%)]" />
      <div className="relative z-10">{children}</div>
    </main>
  );
}

export function Section({
  id,
  children,
  className = ""
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-[clamp(20px,5vw,56px)] py-[clamp(70px,9vw,130px)] ${className}`}>
      <div className="mx-auto w-full max-w-[1280px]">{children}</div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  copy,
  red = false,
  align = "center"
}: {
  kicker: string;
  title: string;
  copy?: string;
  red?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto mb-16 text-center" : "mb-9 text-left"} max-w-[780px]`}>
      <p className={`mb-4 text-[13px] font-bold uppercase tracking-[0.16em] ${red ? "text-[#FF2E3C]" : "text-[#1FA2FF]"}`}>{kicker}</p>
      <h2 className="m-0 font-['Space_Grotesk'] text-[clamp(30px,4.2vw,56px)] font-bold leading-[1.08] tracking-[-0.02em]">{title}</h2>
      {copy ? <p className="mt-[18px] text-[17px] leading-[1.65] text-[rgba(244,246,251,0.62)]">{copy}</p> : null}
    </div>
  );
}

export function GlassCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-[clamp(24px,3vw,34px)] shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-[20px] ${className}`}>
      {children}
    </article>
  );
}

export function PrimaryButton({ children, href = "#contact" }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#1FA2FF,#FF2E3C)] px-7 py-[15px] text-[15.5px] font-bold text-[#070B16] no-underline shadow-[0_10px_40px_rgba(28,127,214,0.4)] transition hover:-translate-y-0.5">
      {children}
    </a>
  );
}

export function SecondaryButton({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="inline-flex min-h-[52px] items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-7 py-[15px] text-[15.5px] font-bold text-white no-underline backdrop-blur-[20px] transition hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.3)]">
      {children}
    </a>
  );
}

export function EmployeeAvatar({ employee, size = "md" }: { employee: EmployeeProfile; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-11 w-11 text-[15px]",
    md: "h-[58px] w-[58px] text-[19px]",
    lg: "h-[96px] w-[96px] text-[30px]"
  };

  return (
    <div className={`flex shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${accentStyles[employee.accent].gradient} ${sizes[size]} font-['Space_Grotesk'] font-bold text-[#070B16] ${accentStyles[employee.accent].ring}`}>
      {employee.avatar}
    </div>
  );
}

export function EmployeeCard({ employee, compact = false }: { employee: EmployeeProfile; compact?: boolean }) {
  const accent = accentStyles[employee.accent];

  return (
    <GlassCard className={employee.kind === "ceo" ? "border-[rgba(255,46,60,0.22)]" : ""}>
      <div className="mb-5 flex items-start gap-4">
        <EmployeeAvatar employee={employee} />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 font-['Space_Grotesk'] text-[22px] font-semibold">{employee.name}</h3>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${accent.tile} ${accent.text}`}>{employee.status}</span>
          </div>
          <p className="mt-1 text-[13px] font-semibold text-[rgba(244,246,251,0.55)]">{employee.role}</p>
        </div>
      </div>
      <p className="m-0 text-[14.5px] leading-[1.62] text-[rgba(244,246,251,0.62)]">{employee.shortDescription}</p>
      {!compact ? (
        <a href={`#${employee.slug}`} className="mt-6 inline-flex rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[14px] font-bold text-white no-underline transition hover:border-[rgba(255,255,255,0.3)]">
          Meet this Employee
        </a>
      ) : null}
    </GlassCard>
  );
}

export function EmployeeHero({ employee }: { employee: EmployeeProfile }) {
  const red = employee.accent === "red";

  return (
    <Section id={employee.slug} className="flex min-h-screen items-center">
      <div className="grid items-center gap-[clamp(40px,5vw,72px)] lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[rgba(244,246,251,0.82)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#35D6A0] shadow-[0_0_12px_#35D6A0]" />
            {employee.kind === "ceo" ? "AI CHIEF EXECUTIVE OFFICER" : "AI EMPLOYEE"}
          </div>
          <h1 className="mt-7 max-w-[900px] font-['Space_Grotesk'] text-[clamp(44px,6.8vw,86px)] font-bold leading-[0.99] tracking-[-0.035em]">
            <span className="bg-[linear-gradient(110deg,#3FB0FF,#1C7FD6_42%,#FF2E3C)] bg-clip-text text-transparent">{employee.name}</span>{" "}
            {employee.hero.replace(employee.name, "").trim()}
          </h1>
          <p className="mt-[26px] max-w-[640px] text-[clamp(16.5px,1.55vw,20px)] leading-[1.65] text-[rgba(244,246,251,0.66)]">{employee.shortDescription}</p>
          <div className="mt-[38px] flex flex-wrap gap-4">
            <PrimaryButton href="#book-demo">Book a Demo</PrimaryButton>
            <SecondaryButton href={`#${employee.slug}-responsibilities`}>View Responsibilities</SecondaryButton>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <div className={`absolute left-1/2 top-1/2 h-[min(440px,86vw)] w-[min(440px,86vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(190,230,255,0.38),rgba(31,162,255,0.16)_34%,rgba(28,127,214,0.04)_58%,transparent_72%)] shadow-[0_0_64px_rgba(31,162,255,0.3),inset_0_0_80px_rgba(7,11,22,0.9)] ${red ? "border border-[rgba(255,46,60,0.28)]" : "border border-[rgba(31,162,255,0.28)]"}`}>
            <div className="absolute inset-[8%] rounded-full border border-dashed border-[rgba(190,215,255,0.34)]" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-[rgba(255,46,60,0.34)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <EmployeeAvatar employee={employee} size="lg" />
              <div className="mt-5 font-['Space_Grotesk'] text-[clamp(26px,3vw,38px)] font-bold uppercase tracking-[0.06em] text-[#EAF4FF] [text-shadow:0_0_30px_rgba(31,162,255,.7)]">{employee.name}</div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.26em] text-[rgba(190,215,255,0.82)]">{employee.kind === "ceo" ? "Command Center" : "Digital Employee"}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function DetailGrid({ id, kicker, title, items, red = false }: { id: string; kicker: string; title: string; items: string[]; red?: boolean }) {
  return (
    <Section id={id}>
      <SectionHeader kicker={kicker} title={title} red={red} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <GlassCard key={item}>
            <div className={`mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border text-[15px] font-bold ${index % 3 === 2 || red ? accentStyles.red.tile : accentStyles.blue.tile}`}>
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="m-0 font-['Space_Grotesk'] text-[21px] font-semibold">{item}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)]">Configured around the company's workflow, brand voice and operating rules before launch.</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

export function FAQGrid({ employee }: { employee: EmployeeProfile }) {
  return (
    <Section id={`${employee.slug}-faq`}>
      <SectionHeader kicker="FAQ" title={`Frequently Asked Questions about ${employee.name}`} red={employee.accent === "red"} />
      <div className="grid gap-5 md:grid-cols-3">
        {employee.faqs.map((faq) => (
          <GlassCard key={faq.question}>
            <h3 className="m-0 font-['Space_Grotesk'] text-[20px] font-semibold">{faq.question}</h3>
            <p className="mt-3 text-[14.5px] leading-[1.62] text-[rgba(244,246,251,0.62)]">{faq.answer}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

export function NetworkPanel({ employees }: { employees: EmployeeProfile[] }) {
  const team = employees.filter((employee) => employee.kind === "employee");
  const ceo = employees.find((employee) => employee.kind === "ceo");

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(120,150,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,150,255,.05)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative grid min-h-[520px] place-items-center">
        {ceo ? (
          <div className="relative z-20 flex flex-col items-center text-center">
            <EmployeeAvatar employee={ceo} size="lg" />
            <div className="mt-4 font-['Space_Grotesk'] text-[30px] font-bold">{ceo.name}</div>
            <div className="mt-1 text-[12px] uppercase tracking-[0.22em] text-[#FF2E3C]">Coordinates Task Routing</div>
          </div>
        ) : null}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {team.map((employee, index) => {
            const angle = (index / team.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 34;
            const y = 50 + Math.sin(angle) * 34;
            return (
              <line
                key={employee.slug}
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                stroke={index % 2 ? "rgba(255,46,60,.34)" : "rgba(31,162,255,.34)"}
                strokeWidth="1"
                strokeDasharray="5 8"
              />
            );
          })}
        </svg>
        {team.map((employee, index) => {
          const angle = (index / team.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 34;
          const y = 50 + Math.sin(angle) * 34;
          return (
            <div key={employee.slug} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(10,12,20,0.72)] p-2 backdrop-blur-[16px]">
                <EmployeeAvatar employee={employee} size="sm" />
              </div>
              <div className="mt-2 hidden text-center font-['Space_Grotesk'] text-[12px] font-semibold text-white md:block">{employee.name}</div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export type ConfiguratorAnswers = Record<string, string | string[]>;

export function Configurator({
  id,
  kicker,
  title,
  copy,
  steps,
  onChange
}: {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  steps: ConfiguratorStep[];
  onChange?: (answers: ConfiguratorAnswers) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<ConfiguratorAnswers>({});
  const step = steps[currentStep];

  const progress = useMemo(() => Math.round(((currentStep + 1) / steps.length) * 100), [currentStep, steps.length]);

  const update = (stepId: string, value: string) => {
    const current = answers[stepId];
    const nextValue = step.type === "multi"
      ? Array.isArray(current) && current.includes(value)
        ? current.filter((item) => item !== value)
        : [...(Array.isArray(current) ? current : []), value]
      : value;
    const next = { ...answers, [stepId]: nextValue };
    setAnswers(next);
    onChange?.(next);
  };

  const answerLabel = (value: string | string[] | undefined) => {
    if (!value) return "Pending";
    return Array.isArray(value) ? value.join(", ") || "Pending" : value;
  };

  return (
    <Section id={id}>
      <SectionHeader kicker={kicker} title={title} copy={copy} />
      <div className="grid gap-[clamp(32px,5vw,64px)] lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard>
          <div className="mb-6 flex items-start justify-between gap-5">
            <div>
              <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#1FA2FF]">Step {currentStep + 1} of {steps.length}</p>
              <h3 className="m-0 font-['Space_Grotesk'] text-[30px] font-semibold">{step.title}</h3>
            </div>
            <div className="font-['Space_Grotesk'] text-[28px] font-bold text-white">{progress}%</div>
          </div>

          {step.type === "text" ? (
            <label className="block">
              <span className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-[rgba(244,246,251,0.7)]">{step.title}</span>
              <input
                value={(answers[step.id] as string | undefined) ?? ""}
                onChange={(event: { target: { value: string } }) => update(step.id, event.target.value)}
                placeholder={step.placeholder}
                className="w-full rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-[15px] py-[13px] font-['Manrope'] text-[14.5px] text-white outline-none focus:border-[#1FA2FF]"
              />
            </label>
          ) : step.type === "placeholder" ? (
            <div className="grid min-h-[190px] place-items-center rounded-[18px] border border-dashed border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.025)] p-8 text-center font-['Space_Grotesk'] text-[18px] font-semibold text-[rgba(244,246,251,0.58)]">
              {step.title}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {step.options?.map((option) => {
                const current = answers[step.id];
                const active = Array.isArray(current) ? current.includes(option) : current === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => update(step.id, option)}
                    className={`rounded-[14px] border p-4 text-left font-['Manrope'] text-[14px] font-bold text-white transition ${active ? "border-[rgba(31,162,255,0.58)] bg-[linear-gradient(135deg,rgba(31,162,255,0.18),rgba(255,46,60,0.12))]" : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.035)] hover:border-[rgba(255,255,255,0.22)]"}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="min-h-[52px] rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-7 py-[15px] font-bold text-white">
              Previous
            </button>
            <button type="button" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} className="min-h-[52px] rounded-[14px] bg-[linear-gradient(135deg,#1FA2FF,#FF2E3C)] px-7 py-[15px] font-bold text-[#070B16] shadow-[0_10px_40px_rgba(28,127,214,0.4)]">
              Next Step
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#FF2E3C]">Deployment Summary</p>
          <h3 className="m-0 mb-5 font-['Space_Grotesk'] text-[30px] font-semibold">Review-ready blueprint</h3>
          {steps.map((item) => (
            <div key={item.id} className="flex justify-between gap-5 border-b border-[rgba(255,255,255,0.07)] py-3 text-[14px] text-[rgba(244,246,251,0.62)]">
              <span>{item.title}</span>
              <strong className="max-w-[52%] text-right text-white">{answerLabel(answers[item.id])}</strong>
            </div>
          ))}
        </GlassCard>
      </div>
    </Section>
  );
}

export function BillingCard({ title, value, copy }: { title: string; value: string; copy: string }) {
  return (
    <GlassCard>
      <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.16em] text-[#1FA2FF]">{title}</p>
      <div className="font-['Space_Grotesk'] text-[34px] font-bold">{value}</div>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-[rgba(244,246,251,0.62)]">{copy}</p>
      <button type="button" className="mt-6 w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-5 py-3 font-bold text-white">
        Manage
      </button>
    </GlassCard>
  );
}

export function DashboardMetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.12em] text-[rgba(244,246,251,0.52)]">{metric.label}</p>
          <div className="mt-3 font-['Space_Grotesk'] text-[32px] font-bold">{metric.value}</div>
          <p className="mt-1 text-[13.5px] text-[rgba(244,246,251,0.58)]">{metric.detail}</p>
        </div>
        {metric.trend ? <span className="rounded-full bg-[rgba(53,214,160,0.1)] px-3 py-1 text-[12px] font-bold text-[#35D6A0]">{metric.trend}</span> : null}
      </div>
    </GlassCard>
  );
}

export function PlaceholderShowcase({ label }: { label: string }) {
  return (
    <div className="grid min-h-[150px] place-items-center rounded-[18px] border border-dashed border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.025)] p-6 text-center font-['Space_Grotesk'] font-semibold text-[rgba(244,246,251,0.58)]">
      {label}
    </div>
  );
}

export function ContactCTA({ title, copy }: { title: string; copy: string }) {
  return (
    <Section id="book-demo">
      <GlassCard className="text-center">
        <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#FF2E3C]">Book a Demo</p>
        <h2 className="m-0 font-['Space_Grotesk'] text-[clamp(30px,4.2vw,54px)] font-bold leading-[1.08] tracking-[-0.02em]">{title}</h2>
        <p className="mx-auto mt-[18px] max-w-[720px] text-[17px] leading-[1.65] text-[rgba(244,246,251,0.62)]">{copy}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <PrimaryButton href="mailto:hello@carriersfy.ai">Request Demo</PrimaryButton>
          <SecondaryButton href="#contact">Talk to Carriersfy AI</SecondaryButton>
        </div>
      </GlassCard>
    </Section>
  );
}

export { slug };
