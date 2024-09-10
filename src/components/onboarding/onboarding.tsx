"use client";

import { useOnboardingForm } from "@/hooks/useOnboarding";
import OnboardingNavigation from "./navigations";
import Step1 from "./step-one";
import Step2 from "./step-two";
import { StepComponentProps } from "@/types/onboarding";

const stepComponents: React.FC<StepComponentProps>[] = [Step1, Step2];

export default function Onboarding() {
  const {
    step,
    totalSteps,
    delta,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    next,
    isSubmitting,
    prev,
    processForm,
  } = useOnboardingForm(stepComponents.length);

  const StepComponent = stepComponents[step];

  const isStepValid =
    step === 0 ? !!watch("workspaceType") : watch("interests").length > 0;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-6">
      <OnboardingNavigation
        step={step}
        prev={prev}
        next={next}
        totalSteps={totalSteps}
        isSubmitting={isSubmitting}
        isStepValid={isStepValid}
      />
      <form onSubmit={handleSubmit(processForm)} className="w-[80%]">
        <StepComponent
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          delta={delta}
        />
      </form>
    </div>
  );
}
