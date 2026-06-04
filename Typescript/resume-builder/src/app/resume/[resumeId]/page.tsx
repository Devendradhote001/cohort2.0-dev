"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PersonalInfoStep from "@/components/PersonalInfoStep";
import EducationStep from "@/components/EducationStep";
import SkillsStep from "@/components/SkillsStep";
import ProjectsStep from "@/components/ProjectSetup";
import ExperienceStep from "@/components/ExperienceStep";

export default function ResumeBuilderPage() {
  const params = useParams();

  const resumeId = params.resumeId as string;
  console.log("resume id", resumeId);

  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <PersonalInfoStep resumeId={resumeId} onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <EducationStep
          resumeId={resumeId}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <SkillsStep
          resumeId={resumeId}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <ProjectsStep
          resumeId={resumeId}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <ExperienceStep
          resumeId={resumeId}
          onBack={() => setStep(4)}
          onNext={() => setStep(6)}
        />
      )}

      {/* Step 6 */}
      {/* Achievements */}

      {/* Step 7 */}
      {/* Summary */}

      {/* Step 8 */}
      {/* Preview */}
    </>
  );
}
