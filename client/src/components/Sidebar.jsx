// Importing icons
import {ChevronFirst, ChevronLast, MoreVertical, UserCircle, FileText, FolderPlus, LogOut } from "lucide-react";
import {FiLogOut} from "react-icons/fi";
// React hooks and context for state management
import { createContext, useContext, useState } from "react";
import { useAuth } from "../context/ContextProvider";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar() {
    const { user } = useAuth();



  //Controls whether the sidebar is expanded or collapsed
  const [expanded, setExpanded] = useState(true);

 //Tracks which note is open, and only one note can be open at a time

  // Controls whether the user profile dropdown is open
  const [profileOpen, setProfileOpen] = useState(false);

  // Temporary notes data
  

  // Handles the logout process
  
  return (
    <aside>
      {/* 
        Main sidebar container
        - Border on the right to separate it from main content
      */}
      <SidebarContext.Provider value={{ expanded }}>
        <nav className={`h-full min-h-full flex flex-col bg-[#F4F5FA] border-r shadow-sm transition-all duration-300 ${
          expanded ? "w-64" : "w-20"
        }`}>
        {/* Top Section */}
        {/* Contains the collapse / expand button */}
        <div className="p-7 pb-2 flex justify-between items-center">
          <button
            // Toggles sidebar between expanded and collapsed states
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar navigation items */}
       
        {/* User profile section at the bottom */}
        <div className="relative flex p-3 mt-auto">
          <button
            // Toggles the profile dropdown
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-indigo-50"
          >
            <UserCircle size={28} />

            {/* Profile text only visible when expanded */}
            {expanded && (
              <span className="text-sm font-medium">
                {user?.user_metadata?.name || "Guest"}
              </span>
            )}
          </button>

          {/* Profile dropdown */}
          {profileOpen && (
            <div className="absolute bottom-14 left-3 right-3 m-auto bg-white rounded-md shadow-md p-3 text-sm">
              <p className="font-medium">{user?.user_metadata?.name || "Guest"}</p>
              <p className="text-gray-500 text-xs mb-2">{user?.email || "Guest"}</p>

              {/* Option to add another account */}
              <div className="m-auto gap-2 text-red-500 hover:bg-gray-100 w-full px-2 py-1 rounded">
                <Link to="/register">
                  <div className="flex flex-row items-center  gap-1">
                    <div><LogOut size={16} /></div>
                    <div>Logout</div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
        </nav>
      </SidebarContext.Provider>
    </aside>
  );
}

/*main navigation links*/
export function SidebarItem({ icon, text, active }) {
  // Access shared sidebar state
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${
        active
          ? "bg-linear-to-tr from-indigo-200 to-indigo-100 text-indigo-700"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {/* Icon always visible */}
      {icon}

      {/* Text smoothly expands or collapses */}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}

/*3-dot menu*/
function MenuItem({ text, danger }) {
  return (
    <button
      className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
        danger ? "text-red-500" : ""
      }`}
    >
      {text}
    </button>
  );
}
