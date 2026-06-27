import { PageWrapper } from '../components/ui/PageWrapper'
import { Navbar } from '../components/nav/Navbar'
import { SectionLabel } from '../components/ui/SectionLabel'
import { GradientText } from '../components/ui/GradientText'
import { BuildEmployeeConfigurator } from '../components/configurators/BuildEmployee/BuildEmployeeConfigurator'

export default function BuildEmployeePage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="section-padding max-content pt-32">
        {/* Hero */}
        <div className="text-center mb-16">
          <SectionLabel color="blue">Build Your AI Employee</SectionLabel>
          <GradientText as="h1" className="text-[clamp(36px,5vw,64px)] font-black leading-[1.08] mt-4 mb-5">
            Design Your Perfect<br />AI Team Member
          </GradientText>
          <p className="text-[17px] text-[rgba(244,246,251,0.6)] max-w-[560px] mx-auto">
            Configure every detail of your AI employee in 11 steps. Name, voice, skills, channels — you're in control.
          </p>
        </div>

        {/* Configurator */}
        <BuildEmployeeConfigurator />
      </main>
    </PageWrapper>
  )
}
