"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

const menuOptions = [
  { name: "Home", link: "/dashboard" },
  { name: "History", link: "/dashboard/history" },
  { name: "Pricing", link: "/dashboard/billing" },
];

const DashboardHeader = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 shadow-md px-6 md:px-20 bg-white sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/Logo.png" alt="Logo" width={45} height={45} />
        <h1 className="text-base font-bold md:text-2xl">
          <span className="text-blue-950 mr-1">Doc</span>
          <span className="text-green-500">AI</span>
        </h1>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-10 items-center">
        {menuOptions.map((option, index) => (
          <Link
            key={index}
            href={option.link}
            className={`transition-colors ${
              pathname === option.link
                ? "text-green-600 font-semibold"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {option.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={24} />
      </button>

      {/* User Button */}
      <div className="hidden md:block">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-3 md:hidden w-48">
          {menuOptions.map((option, index) => (
            <Link
              key={index}
              href={option.link}
              onClick={() => setMobileOpen(false)}
              className={`${
                pathname === option.link
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {option.name}
            </Link>
          ))}
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
