import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const menuOptions = [
  {
    name: "Home",
    link: "/dashboard",
  },
  {
    name: "History",
    link: "/dashboard/history",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 shadow-md px-10 md:px-20">
      <div className="flex items-center gap-2">
        <Image src="/images/Logo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-base font-bold md:text-2xl">
          <span className="text-blue-950 mr-1">Doc</span>
          <span className="text-green-500">AI</span>
        </h1>
      </div>
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option, index) => (
          <Link
            key={index}
            href={option.link}
            className=" hover:font-bold cursor-pointer"
          >
            {option.name}
          </Link>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default DashboardHeader;
