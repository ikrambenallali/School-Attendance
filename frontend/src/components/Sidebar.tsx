// components/Sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../features/store";
import { sidebarConfig } from "../config/sidebarConfig";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!role) return null;

  const menu = sidebarConfig[role];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } min-h-screen bg-gradient-to-b from-white via-sky-50/30 to-yellow-50/30 border-r border-gray-200 transition-all duration-300 flex flex-col shadow-xl`}
    >
      {/* Header avec Logo */}
      <div className="p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold leading-none">
                  <span className="text-yellow-500">School</span>{" "}
                  <span className="text-sky-500">Attendance</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {role === "ADMIN" ? "Administration" : "Enseignant"}
                </p>
              </div>
            </div>
          )}
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* User Profile Card */}
        {!isCollapsed && user && (
          <div className="mt-4 p-3 bg-gradient-to-br from-sky-50 to-yellow-50 rounded-xl border border-sky-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600">
                  {role === "ADMIN" ? "Administrateur" : "Enseignant"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden
              ${
                isActive
                  ? "bg-gradient-to-r from-yellow-400 to-sky-400 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
              }
              ${isCollapsed ? "justify-center" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}

                {/* Icon */}
                <div
                  className={`flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-600 group-hover:text-sky-500"
                  } transition-colors`}
                >
                  {item.icon}
                </div>

                {/* Label */}
                {!isCollapsed && (
                  <span
                    className={`font-medium ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </span>
                )}

                {/* Hover effect background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                )}

                {/* Badge (optionnel) */}
                {!isCollapsed && item.badge && (
                  <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2 bg-white/80 backdrop-blur-sm">
        {/* Settings */}
        {!isCollapsed && (
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all group">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-sky-500 group-hover:rotate-90 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-medium">Paramètres</span>
          </button>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg group ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!isCollapsed && <span className="font-semibold">Déconnexion</span>}
        </button>
      </div>

      {/* Decorative Element */}
    </aside>
  );
};

export default Sidebar;