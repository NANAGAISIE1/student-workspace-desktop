import { useSidebarStore } from "@renderer/components/sidebar/use-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@renderer/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const router = useNavigate();
  const handleCardClick = (path: string) => {
    router(path);
  };
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  useEffect(() => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  });
  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-6 px-16">
      <div className="flex flex-col space-y-2 items-center justify-center">
        <h2>How are you planning to use Student Worksapce?</h2>
        <p className="text-xl text-muted-foreground !mt-0">
          We'll streamline your setup experience accordingly
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 justify-center items-center">
        <Card
          className="w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer"
          onClick={() => handleCardClick("/")}
        >
          <CardHeader>
            <CardTitle>Personal Use</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Use Student Workspace for personal projects, or to keep track of
              your personal tasks
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className="w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer"
          onClick={() => handleCardClick("/")}
        >
          <CardHeader>
            <CardTitle>Professional Use</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Use Student Workspace for work, or to collaborate with a team
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className="w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer"
          onClick={() => handleCardClick("/")}
        >
          <CardHeader>
            <CardTitle>Academic Use</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Use Student Workspace for school, or to collaborate with
              classmates
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default OnboardingPage;
