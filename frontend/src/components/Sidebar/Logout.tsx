interface Props {
  logout: () => void;
  isExpanded?: boolean;
}

const Logout = ({ logout, isExpanded }: Props) => {
  return (
    <div
      className={`group flex flex-row p-2 gap-4 items-center justify-center transition duration-200 rounded-xl ${isExpanded ? "hover:bg-red-500" : ""}`}
    >
      <div
        onClick={logout}
        className="icon flex rounded-full bg-gray-700 min-w-14 min-h-14 relative"
      >
        <span
          className={`flex item-center absolute w-auto left-full ml-4 p-2 rounded-md shadow-md text-white bg-red-500 text-xs font-bold z-50 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 ease-in-out ${isExpanded ? "opacity-0 invisible" : "opacity-100"}`}
        >
          Logout
        </span>
      </div>
      <div
        onClick={logout}
        className={`wrapper grid transition-all duration-300 ease-in-out w-36 ${
          isExpanded ? "grid-rows-1" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`text-red-500 group-hover:text-white font-secondaryRegular text-xl whitespace-nowrap transition-all duration-300 ease-in-out transform ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Logout;