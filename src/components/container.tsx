import { ModeToggle } from "./mode-toggle";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { Outlet } from "react-router-dom"; // Import Outlet

export function Container() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <div className="w-full h-[10vh] p-5 mx-10 flex items-center justify-between">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shammianand</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shammianand</h4>
                <p className="text-sm">
                  an order management service created in Go
                </p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    started June 2024
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <ModeToggle />
      </div>
      <div className="w-full flex-grow p-2.5 flex items-center justify-center">
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
  );
}
