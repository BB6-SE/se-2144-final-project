import { useState, useRef, useEffect } from "react";

import MenuItem from "./MenuItem";
import Logout from "./Logout";
import Logo from "./AppLogo";

interface Props {
  setAuth: (value: boolean) => void;
}

const SideBar = ({ setAuth }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-r-2 border-green border-solid max-h-screen relative">
      <div
        ref={sidebarRef}
        className={`container flex flex-col ${isExpanded ? "w-64" : "w-24"} h-screen px-3 bg-white transition-all ease-linear duration-300 -z-50 `}
      >
        <div className="flex h-40 items-center justify-start border-b-2 border-green">
          <Logo isExpanded={isExpanded} setIsExpanded={setIsExpanded}></Logo>
        </div>

        <div className={`flex h-80 flex-col items-start justify-evenly`}>
          <MenuItem
            route="/home"
            label="Upload Notes"
            isExpanded={isExpanded}
          />
          <MenuItem route="/decks" label="My Decks" isExpanded={isExpanded} />
          <MenuItem route="/history" label="History" isExpanded={isExpanded} />
          <MenuItem
            route="/generated-videos"
            label="Generate Videos"
            isExpanded={isExpanded}
          />
        </div>

        <div
          className={`flex flex-1 flex-col items-start justify-start pt-6 border-t-2 border-green`}
        >
          <Logout isExpanded={isExpanded} logout={logout} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;