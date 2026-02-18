"use client";

import { useState } from "react";
import { BarChart3, Package, Plus, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@neondatabase/auth/react";

const Sidebar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "DashBoard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/Inventory", icon: Package },
    { name: "Add product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 p-2 bg-sidebar border border-sidebar-border rounded-md md:hidden"
      >
        <Menu className="size-6 text-sidebar-foreground" />
      </button>

      {/* 2. Backdrop Overlay - Closes sidebar when clicking outside on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* 3. The Sidebar */}
      <div
        className={`
        min-h-screen w-64 fixed left-0 top-0 z-30 transition-transform duration-300 ease-in-out
        bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-6
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <BarChart3 className="size-6" />
            <span className="text-lg font-semibold">Inventory App</span>
          </div>
          {/* Close button for mobile */}
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="size-6" />
          </button>
        </div>

        <nav className="space-y-1">
          {navigation.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors mb-2 ${
                  isActive
                    ? "bg-foreground/10 text-foreground font-medium"
                    : "hover:bg-foreground/5 text-sidebar-foreground/70"
                }`}
              >
                <IconComponent className="size-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border">
          <div className="flex items-center justify-between">
            <UserButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
