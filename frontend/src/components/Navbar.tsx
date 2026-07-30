import React from "react";
import { useAuth } from "../context/AuthContext";
import { Car, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2">
        <Car className="h-6 w-6 text-blue-400" />
        <span className="font-bold text-xl tracking-wide">AutoVault Inventory</span>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="block text-sm font-medium">{user.email}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-semibold ${
                isAdmin ? "bg-amber-500 text-slate-950" : "bg-blue-500 text-white"
              }`}
            >
              {user.role}
            </span>
          </div>

          <button
            onClick={logout}
            className="p-2 hover:bg-slate-800 rounded-full transition text-gray-300 hover:text-white"
            title="Log out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      )}
    </nav>
  );
};
