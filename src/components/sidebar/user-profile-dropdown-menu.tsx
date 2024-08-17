import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@tanstack/react-router";
import { useAuthentication, useUser } from "@/services/auth-servics";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

export function UserProfileMenu() {
  const router = useRouter();
  const { user } = useUser();
  const { handleSignOut } = useAuthentication();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className="hover:bg-background-lighter justify-between pr-0 flex-1 items-center"
        >
          <AuthLoading>
            <Skeleton className="h-8 w-full flex" />
          </AuthLoading>
          <Authenticated>
            <div className="flex space-x-2 items-center">
              <Avatar className="h-4 w-4">
                <AvatarImage src={user?.image} />
                <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="!mt-0">{user?.name}</span>
            </div>
          </Authenticated>
          <Unauthenticated>
            <div className="flex space-x-2 items-center">
              <Avatar className="h-4 w-4">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="!mt-0">User</span>
            </div>
          </Unauthenticated>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.navigate({ to: "/login" })}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
