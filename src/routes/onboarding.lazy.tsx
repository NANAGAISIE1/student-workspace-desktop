import Onboarding from "@/components/onboarding/onboarding";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/onboarding")({
  component: () => <OnboardingPage />,
});

const OnboardingPage = () => {
  console.log("Onboarding page loaded");
  return (
    <main className="relative flex h-full w-full flex-col items-center justify-center space-y-16 overflow-hidden px-16">
      <Onboarding />
    </main>
  );
};

console.log("Onboarding lazy loaded");
