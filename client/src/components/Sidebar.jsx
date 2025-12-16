// Importing icons
import {ChevronFirst, ChevronLast, MoreVertical, UserCircle, FileText, FolderPlus,} from "lucide-react";
import {FiLogOut} from "react-icons/fi";
// React hooks and context for state management
import { createContext, useContext, useState } from "react";
import { useAuth } from "../context/ContextProvider";

const SidebarContext = createContext();

export default function Sidebar() {
    const { user } = useAuth();



  //Controls whether the sidebar is expanded or collapsed
  const [expanded, setExpanded] = useState(true);

 //Tracks which note is open, and only one note can be open at a time
  const [openNoteMenu, setOpenNoteMenu] = useState(null);

  // Controls whether the user profile dropdown is open
  const [profileOpen, setProfileOpen] = useState(false);

  // Temporary notes data
  const notes = [
    { id: 1, title: "ToDo List" },
    { id: 2, title: "ToDo List" },
    { id: 3, title: "Project Ideas" },
  ];

  return (
    <aside>
      {/* 
        Main sidebar container
        - Border on the right to separate it from main content
      */}
      <nav className="h-full min-h-full flex flex-col bg-[#F4F5FA] border-r shadow-sm">
        {/* Top Section */}
        {/* Contains the collapse / expand button */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            // Toggles sidebar between expanded and collapsed states
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar navigation items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem
              icon={<FolderPlus size={20} />}
              text="Add Note / File"
              
            />

            {/* Notes list */}
            {/* Each note behaves like a file with a 3-dot menu */}
            {notes.map((note) => (
              <li
                key={note.id}
                className="relative flex items-center justify-between py-2 px-3 my-1 rounded-md cursor-pointer hover:bg-indigo-50 text-gray-600"
              >
                {/* Note icon and title */}
                <div className="flex items-center gap-3">
                  <FileText size={18} />

                  {/* Note title only shows when sidebar is expanded/opened */}
                  {expanded && <span>{note.title}</span>}
                </div>

                {/* Three-dot menu button */}
                <button
                  // Toggles the menu for the selected note
                  onClick={() =>
                    setOpenNoteMenu(openNoteMenu === note.id ? null : note.id)
                  }
                >
                  <MoreVertical size={16} />
                </button>

                {/* Dropdown menu for each note */}
                {openNoteMenu === note.id && (
                  <div className="absolute right-2 top-10 w-28 bg-white  rounded-md shadow-md text-sm z-5">
                    <MenuItem text="View" />
                    <MenuItem text="Edit" />
                    <MenuItem text="Delete" danger />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </SidebarContext.Provider>

        {/* User profile section at the bottom */}
        <div className="relative  p-3">
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
            <div className="absolute bottom-14 left-3 right-3 bg-white rounded-md shadow-md p-3 text-sm">
              <p className="font-medium">{user?.user_metadata?.name || "Guest"}</p>
              <p className="text-gray-500 text-xs mb-2">{user?.email || "Guest"}</p>

              {/* Option to add another account */}
              <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
                Add account
              </button>
            </div>
          )}
        </div>
      </nav>
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
