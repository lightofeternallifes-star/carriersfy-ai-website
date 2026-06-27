import { PageWrapper } from '../../components/ui/PageWrapper'
import { Navbar } from '../../components/nav/Navbar'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { GradientText } from '../../components/ui/GradientText'
import { EmployeesHub } from '../../components/employees/EmployeesHub'

export default function EmployeesHubPage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="section-padding max-content pt-32">
        <div className="text-center mb-16">
          <SectionLabel color="blue">The AI Team</SectionLabel>
          <GradientText as="h1" className="text-[clamp(36px,5vw,64px)] font-black leading-[1.08] mt-4 mb-5">
            Meet Your AI Employees
          </GradientText>
          <p className="text-[17px] text-[rgba(244,246,251,0.6)] max-w-[560px] mx-auto">
            Seven AI employees. One unified team. Always on, always performing, never missing a beat.
          </p>
        </div>
        <EmployeesHub />
      </main>
    </PageWrapper>
  )
}
