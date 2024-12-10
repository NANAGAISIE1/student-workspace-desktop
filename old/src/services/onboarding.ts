import DB from "@/db/db";
import { pageTemplates } from "@/templates";
import { OnboardingFormInputs } from "@/types/onboarding";

export const onboardingService = async (values: OnboardingFormInputs) => {
  const currentUser = await DB.auth.getCurrentUser();
  console.log("currentUser", currentUser);
  const { interests, workspaceType } = values;

  if (!currentUser) {
    throw new Error("User not found");
  }

  const workspaceId = await DB.workspaces.create({
    name: workspaceType,
    owner_id: currentUser.id,
    updated_at: Date.now(),
  });

  const pageIds = await uploadPages(workspaceId, interests);

  return {
    workspaceId,
    pageId: pageIds[-1],
  };
};

async function uploadPages(
  workspaceId: string,
  interests: OnboardingFormInputs["interests"],
) {
  const currentUser = await DB.auth.getCurrentUser();

  if (!currentUser) {
    throw new Error("User not found");
  }

  const newInterests: ("notes" | "research" | "site" | "gettingStarted")[] = [
    ...interests,
    "gettingStarted",
  ];

  const templates = pageTemplates.filter((template) =>
    newInterests.includes(template.type),
  );

  return await Promise.all(
    templates.map(async (template) => {
      if (!template) {
        return;
      }

      const pageId = await DB.pages.create({
        title: template.title,
        workspace_id: workspaceId,
        creator_id: currentUser.id,
        content: template.content,
        emoji: template.emoji,
        updated_at: Date.now(),
        type: template.pageType,
      });

      return pageId;
    }),
  );
}
