import { logout } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ExitIcon,
  //HandIcon,
  //BookmarkFilledIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  //BellIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, SettingsIcon, WalletIcon } from "lucide-react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },

  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },

  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Account Status",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },
  {/*
  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
  */}
];
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("Logout button clicked!");
    dispatch(logout()); // Dispatch logout action
    localStorage.removeItem("jwt"); // Remove auth token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="mt-10 space-y-5 sidebar open">
      {menu.map((item, index) => (
        <SheetClose key={index} className="w-full">
          <Button
            onClick={() => navigate(item.path)}
            variant="outline"
            className="flex items-center gap-5 py-6 w-full"
          >
            <span className="w-8">{item.icon}</span>
            <p>{item.name}</p>
          </Button>
        </SheetClose>
      ))}

      {/* Logout Button */}
      <div className="mt-auto border-t border-gray-300 pt-5">
           <SheetClose className="w-full">
              <Button
              onClick={handleLogout}
               variant="destructive"
               className="logout-button flex items-center justify-start"
              >
               <span className="w-8">
                <ExitIcon className="h-6 w-6" />
               </span>
                   Logout {/* Directly add the label here */}
                </Button>
            </SheetClose>
            </div>
       </div> 
  );
};

export default SideBar;
