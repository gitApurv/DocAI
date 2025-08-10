import DashboardHeader from "./_components/DashboardHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardHeader />
      <div className="px-10 md:px-20 py-10">{children}</div>
    </div>
  );
}
