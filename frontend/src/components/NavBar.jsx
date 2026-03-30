import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // estilo padrão dos links
  const linkStyle =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";

  // estilo quando a rota está ativa
  const activeStyle =
    "text-emerald-300 bg-slate-900/50";

  const normalStyle =
    "text-slate-200 hover:text-emerald-300 hover:bg-slate-900/40";

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* MENU DESKTOP */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/routes"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Routes
            </NavLink>

            <NavLink
              to="/legacy"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Legacy
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Analytics
            </NavLink>
          </div>

          {/* BOTÃO MOBILE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-slate-900/70 rounded-xl p-4 space-y-2">

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/routes"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Routes
            </NavLink>

            <NavLink
              to="/legacy"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Legacy
            </NavLink>

            <NavLink
              to="/analytics"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${linkStyle} ${isActive ? activeStyle : normalStyle}`
              }
            >
              Analytics
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
