import React from "react";
import "./carriersfy-expansion.css";

const contactHref = "#contact";

export function ExpansionShell({ children, className = "" }) {
  return (
    <main className={`cf-expansion ${className}`}>
      <div className="cf-page-shell">{children}</div>
    </main>
  );
}

export function SectionHeader({ kicker, title, copy, align = "center", red = false }) {
  return (
    <div style={{ maxWidth: 760, margin: align === "center" ? "0 auto 64px" : "0 0 34px", textAlign: align }}>
      {kicker ? <div className={`cf-kicker ${red ? "cf-kicker-red" : ""}`}>{kicker}</div> : null}
      <h2 className="cf-title">{title}</h2>
      {copy ? <p className="cf-copy" style={{ margin: "18px 0 0" }}>{copy}</p> : null}
    </div>
  );
}

export function HeroStage({ profile }) {
  const metrics = profile.executive
    ? [
        ["Systems", "12"],
        ["Agents", "06"],
        ["Signals", "24/7"],
        ["Vision", "AI CEO"]
      ]
    : [
        ["Conversations", "1,284"],
        ["Qualified", "347"],
        ["Booked", "128"],
        ["Availability", "24/7"]
      ];

  return (
    <div className="cf-orb-stage" aria-label={`${profile.name} command visualization`}>
      <div className="cf-orb">
        <div className="cf-orb-label">
          <div className="cf-orb-name">{profile.name}</div>
          <div className="cf-orb-role">{profile.role}</div>
          <div className="cf-pill" style={{ marginTop: 16, letterSpacing: "0.18em" }}>
            <span className="cf-status-dot" />
            Online
          </div>
        </div>
      </div>
      {metrics.map(([label, value], index) => {
        const positions = [
          { top: "9%", left: "-3%" },
          { top: "16%", right: "-3%" },
          { bottom: "16%", left: "-3%" },
          { bottom: "10%", right: "-3%" }
        ];
        return (
          <div className="cf-metric-card" key={label} style={positions[index]}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        );
      })}
    </div>
  );
}

export function AgentHero({ profile }) {
  return (
    <section className="cf-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="cf-container cf-two-col">
        <div>
          <div className="cf-pill">
            <span className="cf-status-dot" />
            {profile.hero.kicker}
          </div>
          <h1 className="cf-title cf-hero-title" style={{ marginTop: 28 }}>
            {profile.hero.title.split(profile.name)[0]}
            {profile.hero.title.includes(profile.name) ? <span className="cf-gradient-text">{profile.name}</span> : null}
            {profile.hero.title.includes(profile.name) ? profile.hero.title.split(profile.name).slice(1).join(profile.name) : profile.hero.title}
          </h1>
          <p className="cf-copy cf-hero-copy">{profile.hero.copy}</p>
          <div className="cf-button-row">
            <a className="cf-primary-button" href={contactHref}>Request Deployment</a>
            <a className="cf-secondary-button" href={`#${profile.slug}-capabilities`}>View Capabilities</a>
          </div>
        </div>
        <HeroStage profile={profile} />
      </div>
    </section>
  );
}

function NarrativeBlock({ title, copy, red = false }) {
  return (
    <article className="cf-card cf-card-pad">
      <div className={`cf-kicker ${red ? "cf-kicker-red" : ""}`}>{title}</div>
      <p className="cf-copy" style={{ margin: 0 }}>{copy}</p>
    </article>
  );
}

function FeatureGrid({ id, kicker, title, items, red = false }) {
  return (
    <section className="cf-section" id={id}>
      <div className="cf-container">
        <SectionHeader kicker={kicker} title={title} red={red} />
        <div className="cf-grid" style={{ "--cf-min": "260px" }}>
          {items.map((item, index) => (
            <article className="cf-card cf-card-pad" key={item}>
              <div className={`cf-icon-tile ${index % 3 === 2 || red ? "cf-red-tile" : ""}`}>{String(index + 1).padStart(2, "0")}</div>
              <h3>{item}</h3>
              <p>{buildFeatureCopy(item)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function buildFeatureCopy(item) {
  return `${item} is configured around the client's workflow, business rules and customer expectations before launch.`;
}

function FAQSection({ profile }) {
  return (
    <section className="cf-section" id={`${profile.slug}-faq`}>
      <div className="cf-container">
        <SectionHeader kicker="FAQ" title={`Questions about ${profile.name}`} red={profile.accent === "red"} />
        <div className="cf-grid" style={{ "--cf-min": "320px" }}>
          {profile.faq.map(([question, answer]) => (
            <article className="cf-card cf-card-pad" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoPlaceholders({ profile }) {
  if (!profile.demos?.length) return null;

  return (
    <section className="cf-section" id={`${profile.slug}-demos`}>
      <div className="cf-container">
        <SectionHeader
          kicker="LIVE DEMO PLACEHOLDERS"
          title="Integration-ready demo modules"
          copy="These blocks are intentionally UI-only and ready for media, scheduler or live demo embeds."
        />
        <div className="cf-grid" style={{ "--cf-min": "250px" }}>
          {profile.demos.map((demo) => (
            <div className="cf-placeholder" key={demo}>{demo}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ title = "Ready to deploy an AI employee?", copy = "Tell us what your business needs and Carriersfy AI will map the right system." }) {
  return (
    <section className="cf-section" id="contact">
      <div className="cf-container cf-two-col">
        <div>
          <div className="cf-kicker">CONTACT</div>
          <h2 className="cf-title">{title}</h2>
          <p className="cf-copy" style={{ marginTop: 18 }}>{copy}</p>
          <div className="cf-button-row">
            <a className="cf-primary-button" href="mailto:hello@carriersfy.ai">hello@carriersfy.ai</a>
            <a className="cf-secondary-button" href="tel:+1">Book a Strategy Call</a>
          </div>
        </div>
        <form className="cf-card cf-card-pad" data-integration-hook="contact-form">
          <div className="cf-form-grid">
            <div className="cf-field">
              <label htmlFor="cf-exp-name">Name</label>
              <input className="cf-input" id="cf-exp-name" name="name" placeholder="Your name" />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-exp-email">Email</label>
              <input className="cf-input" id="cf-exp-email" name="email" type="email" placeholder="you@company.com" />
            </div>
          </div>
          <div className="cf-field" style={{ marginTop: 14 }}>
            <label htmlFor="cf-exp-message">Project</label>
            <textarea className="cf-textarea" id="cf-exp-message" name="message" placeholder="Describe the AI employee or app you want to build." />
          </div>
          <button className="cf-primary-button" type="button" style={{ width: "100%", marginTop: 18 }} data-integration-hook="contact-submit">
            Send Request
          </button>
        </form>
      </div>
    </section>
  );
}

export function AgentPage({ profile }) {
  const red = profile.accent === "red";

  return (
    <ExpansionShell className={profile.executive ? "cf-iron-prime" : ""}>
      <AgentHero profile={profile} />

      <section className="cf-section">
        <div className="cf-container cf-grid" style={{ "--cf-min": "320px" }}>
          <NarrativeBlock title="Origin Story" copy={profile.origin} red={red} />
          <NarrativeBlock title="Meaning of the Name" copy={profile.meaning} />
          <NarrativeBlock title="Mission" copy={profile.mission} red={red} />
        </div>
      </section>

      <FeatureGrid id={`${profile.slug}-capabilities`} kicker="CAPABILITIES" title={`What ${profile.name} can do`} items={profile.capabilities} red={red} />
      <FeatureGrid id={`${profile.slug}-industries`} kicker="INDUSTRIES" title="Built for operational teams" items={profile.industries} />
      <FeatureGrid id={`${profile.slug}-benefits`} kicker="BENEFITS" title="Business outcomes" items={profile.benefits} red={red} />
      <FeatureGrid id={`${profile.slug}-technology`} kicker="TECHNOLOGY" title="Architecture-ready systems" items={profile.technology} />

      <DemoPlaceholders profile={profile} />
      <FAQSection profile={profile} />

      <section className="cf-section">
        <div className="cf-container cf-card cf-card-pad" style={{ textAlign: "center" }}>
          <div className={`cf-kicker ${red ? "cf-kicker-red" : ""}`}>CALL TO ACTION</div>
          <h2 className="cf-title">{profile.executive ? "Enter the AI command center." : `Deploy ${profile.name} inside your business.`}</h2>
          <p className="cf-copy" style={{ maxWidth: 720, margin: "18px auto 0" }}>
            Carriersfy AI can adapt this page into a production route, connect the live forms and attach the right operational integrations.
          </p>
          <div className="cf-button-row" style={{ justifyContent: "center" }}>
            <a className="cf-primary-button" href={contactHref}>Start the Build</a>
            <a className="cf-secondary-button" href="mailto:hello@carriersfy.ai">Speak With Carriersfy AI</a>
          </div>
        </div>
      </section>

      <ContactSection />
    </ExpansionShell>
  );
}
