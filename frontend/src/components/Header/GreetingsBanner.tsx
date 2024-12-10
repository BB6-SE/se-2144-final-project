import { useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "@/context/Contexts";

const GreetingsBanner = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const hasShownBanner = localStorage.getItem("hasShownBanner");

    if (!hasShownBanner) {
      localStorage.setItem("hasShownBanner", "true");

      toast.success(`Welcome ${user?.username}!`, {
        duration: 3000,
        position: "top-right",
        style: {
          borderWidth: 2,
          borderColor: "#03C04A",
          background: "white",
          color: "#03C04A",
          fontSize: "1rem",
          fontWeight: "bold",
          animation: "slideIn 0.5s ease-out, fadeOut 0.5s ease-in 3.5s",
          marginRight: "3rem",
          marginTop: "-0.5rem",
          // overflow: "hidden",
          // textOverflow: "ellipsis",
          // whiteSpace: "nowrap",
        },
      });
    }
  }, [user?.username]);

  if (!user) return;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default GreetingsBanner;
