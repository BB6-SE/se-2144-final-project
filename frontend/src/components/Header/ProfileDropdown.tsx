import { useContext } from "react";
import { UserContext } from "@/context/Contexts";
import ProfileButton from "../Sidebar/ProfileButton";
import LogoutConfirmation from "../LogoutConfirmation";
import UpdatePasswordForm from "../Settings/UpdatePasswordForm";
// import SwitchAccountConfirmation from "../Settings/SwitchAccountConfirmation";

import { PiPasswordBold } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { BiNotification } from "react-icons/bi";
import { LogOutIcon } from "lucide-react";

const ProfileDropdown = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div></div>;
  }

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfileButton />
          </DropdownMenuTrigger>

          <DropdownMenuContent avoidCollisions={true} className="mr-8 p-2">
            <DropdownMenuLabel>
              <ProfileButton isDropdown />
            </DropdownMenuLabel>

            <DropdownMenuSeparator className=" bg-gray-300" />

            {/*  */}
            <Dialog>
              <DialogTrigger asChild>
                <div
                  id="change-password"
                  className="w-full cursor-pointer hover:text-green hover:bg-gray-200 rounded-md flex flex-row text-sm  p-2"
                >
                  <PiPasswordBold size={20} className="self-center mr-2" />
                  Change Password
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader></DialogHeader>
                <UpdatePasswordForm />
              </DialogContent>
            </Dialog>

            {/*  */}
            {/* <div className=" flex items-center">
              <SwitchAccountConfirmation>
                <div
                  id="switch-account"
                  className="w-full cursor-pointer hover:text-green flex flex-row text-sm pt-2 pb-3"
                >
                  <HiOutlineSwitchHorizontal
                    size={20}
                    className="self-center mr-2"
                  />
                  Switch Account
                </div>
              </SwitchAccountConfirmation>
            </div> */}

            {/*  */}
            <div
              id="delete-account"
              className="w-full cursor-pointer hover:text-red-600 flex flex-row text-sm hover:bg-gray-200 rounded-md p-2"
            >
              <RiDeleteBin5Line size={20} className="self-center mr-2" />
              <span>Delete Account</span>
            </div>

            <DropdownMenuSeparator className=" bg-gray-300" />

            <div
              onClick={(e) => e.preventDefault()}
              className="flex hover:bg-gray-200 rounded-md p-2 flex-1"
            >
              <LogoutConfirmation>
                <div className="w-full cursor-pointer hover:text-red-600 flex flex-row text-sm">
                  <LogOutIcon size={20} className="self-center mr-2" />
                  <span>Log Out</span>
                </div>
              </LogoutConfirmation>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ProfileDropdown;
