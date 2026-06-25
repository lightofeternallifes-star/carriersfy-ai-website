import { teamEmployees, ironPrime } from '../../data/employees'
import { EmployeeCard } from './EmployeeCard'
import { SectionLabel } from '../ui/SectionLabel'

export function EmployeesHub() {
  return (
    <section className="section-padding">
      <div className="max-content">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <SectionLabel color="red">AI WORKFORCE</SectionLabel>
          <h2
            className="font-grotesk font-bold leading-[1.08] tracking-[-0.02em] mb-5 text-white"
            style={{ fontSize: 'clamp(30px,4.2vw,52px)' }}
          >
            Meet Your Digital Team
          </h2>
          <p className="text-[17px] leading-[1.6] text-[rgba(244,246,251,0.6)]">
            Every employee is always on, always learning, and always working for your business — 24 hours a day, 7 days a week, without exceptions.
          </p>
        </div>

        {/* Employee grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {teamEmployees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              id={emp.id}
              name={emp.name}
              role={emp.role}
              description={emp.tagline}
              color={emp.color}
              initial={emp.initial}
            />
          ))}
        </div>

        {/* Iron Prime — CEO featured section */}
        <div className="relative">
          {/* Divider with label */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,200,60,0.3)] to-transparent" />
            <div className="text-center">
              <SectionLabel color="red" className="mb-0 text-[#FFC83C]">
                AI CHIEF EXECUTIVE OFFICER
              </SectionLabel>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,200,60,0.3)] to-transparent" />
          </div>

          <EmployeeCard
            id={ironPrime.id}
            name={ironPrime.name}
            role={ironPrime.role}
            description={ironPrime.tagline}
            color="gold"
            initial={ironPrime.initial}
            isVIP
          />

          {/* Command Overview stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Employees Coordinated', value: '6', sub: 'Full workforce' },
              { label: 'Routing Decisions / Day', value: '12,847', sub: 'Fully automated' },
              { label: 'Workforce Uptime', value: '99.98%', sub: 'All systems nominal' },
              { label: 'Intelligence Actions', value: '∞', sub: 'Continuously learning' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-[18px] text-center"
                style={{
                  background: 'rgba(255,200,60,0.05)',
                  border: '1px solid rgba(255,200,60,0.15)',
                }}
              >
                <div className="font-grotesk font-bold text-[28px] text-[#FFC83C] mb-1">{stat.value}</div>
                <div className="text-[12px] font-semibold text-[rgba(244,246,251,0.8)] mb-0.5">{stat.label}</div>
                <div className="text-[11px] text-[rgba(244,246,251,0.4)]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
