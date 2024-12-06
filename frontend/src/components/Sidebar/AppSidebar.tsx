import { MdOutlineNoteAdd as upload } from "react-icons/md"; // upload notes
import { TbCards as decks } from "react-icons/tb"; // my decks
import { CgNotes as notes } from "react-icons/cg";
import { GoVideo as videos } from "react-icons/go"; // generated videos
import { FcVideoFile as AppLogo } from "react-icons/fc"; //placeholder of app logo
import { BiNotification } from "react-icons/bi";
import { Edit2Icon } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { Settings } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import ProfileButton from "./ProfileButton";
import LogoutConfirmation from "../LogoutConfirmation";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Upload notes",
    url: "/home",
    icon: upload,
  },
  {
    title: "My decks",
    url: "/decks",
    icon: decks,
  },
  {
    title: "Notes",
    url: "/history",
    icon: notes,
  },
  {
    title: "Generated Videos",
    url: "/video-generator",
    icon: videos,
  },
];

const AppSidebar = () => {
  const { toggleSidebar, state } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          variant="header"
          size="lg"
          asChild
          onClick={toggleSidebar}
          className="h-12 select-none font-secondaryRegular hover:text-green text-green"
        >
          <div>
            <AppLogo
              style={{ width: 32, height: 32 }}
              className="bg-green rounded-full "
            />
            <span className="text-2xl">NoteTube</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator className="border-gray-200 border-t" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent className="">
            <SidebarMenu className="flex gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`transition-all`}
                    asChild
                    size={"lg"}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon
                        className={`${location.pathname === item.url && "text-green"}`}
                        style={{ width: 30, height: 30 }}
                      />
                      <span
                        className={`text-base ${location.pathname === item.url && "text-green"}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfileButton state={state} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            sideOffset={12}
            align="start"
            alignOffset={12}
            avoidCollisions={true}
            className="mb-2"
          >
            <DropdownMenuLabel>
              <ProfileButton isChild state={state} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit2Icon />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiNotification />
              <span>Notification</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => e.preventDefault()}
              className="flex items-center"
            >
              <LogoutConfirmation>
                <div className="flex flex-1 gap-2">
                  <LogOutIcon className="p-1" />
                  <span>Log Out</span>
                </div>
              </LogoutConfirmation>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;