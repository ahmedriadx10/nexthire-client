import DashboardSidbar from "@/components/dashboard/DashboardSidbar";
import DasboardMobileMenu from "@/components/dashboard/DasboardMobileMenu";
import { getLoggedInUserSession } from "@/lib/core/Session";

const DashboardLayout = async ({ children }) => {
  const loggedInUserSession = await getLoggedInUserSession();

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col lg:flex-row bg-black text-zinc-100 z-50 overflow-hidden">
      {/* Desktop Sidebar (hidden on mobile, persistent on desktop) */}
      <DashboardSidbar user={loggedInUserSession} />

      {/* Mobile Top Header and Drawer Menu (hidden on desktop) */}
      <DasboardMobileMenu user={loggedInUserSession} />

      {/* Main Page Content Scroll Container */}
      <main className="flex-1 flex flex-col min-h-0 bg-zinc-950 lg:pl-64 overflow-y-auto">
        <div className="flex-1 p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
