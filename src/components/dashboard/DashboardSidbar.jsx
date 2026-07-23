"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { roleBasedDashboardNavlinks } from "@/lib/core/management-data";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { FiSettings, FiLogOut, FiUser, FiBriefcase } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const DashboardSidbar = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Retrieve role-based dashboard links
  const dashboardNavlinks = roleBasedDashboardNavlinks[user?.role] || [];

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logout successful");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Logout failed");
        },
      },
    });
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 border-r border-zinc-800 bg-black text-zinc-100 z-40">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-primary select-none hover:text-primary/80 transition-colors duration-300"
        >
          NextHire
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary">
        {dashboardNavlinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== `/dashboard/${user?.role}` &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
              }`}
            >
              {/* Left active line indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary " />
              )}
              {Icon && (
                <Icon
                  className={`size-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-primary"
                      : "text-zinc-400 group-hover:text-zinc-100"
                  }`}
                />
              )}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Block */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/40">
        <Dropdown className="bg-zinc-950 border border-zinc-800 rounded-2xl">
          <Dropdown.Trigger className="w-full text-left rounded-xl hover:bg-zinc-900/60 p-2 transition-colors cursor-pointer outline-none">
            <div className="flex items-center gap-3">
              <Avatar
                // isBordered
                // color="primary"
                size="md"
                className="cursor-pointer shrink-0"
              >
                <Avatar.Image
                  src={user?.image}
                  alt={user?.name || "User"}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback delayMs={600}>
                  {user?.name?.slice(0, 2).toUpperCase() || "NH"}
                </Avatar.Fallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-100 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-zinc-400 capitalize truncate">
                  {user?.role || "Member"}
                </p>
              </div>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Popover className="mr-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 p-1">
            <div className="px-3 pt-3 pb-2 border-b border-zinc-800/60 mb-1">
              <div className="flex items-center gap-2.5">
                <Avatar size="sm">
                  <Avatar.Image
                    src={user?.image}
                    alt={user?.name || "User"}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback delayMs={600}>
                    {user?.name?.slice(0, 2).toUpperCase() || "NH"}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-xs leading-none font-semibold text-zinc-100 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[10px] leading-none text-zinc-400 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
            <Dropdown.Menu aria-label="User actions">
              <Dropdown.Item
                id="profile"
                textValue="Profile"
                className="hover:bg-zinc-900/80 rounded-xl transition-colors"
              >
                <Link
                  href={`/dashboard/${user?.role}/settings`}
                  className="w-full flex items-center justify-between gap-2 text-zinc-300 hover:text-white"
                >
                  <Label className="cursor-pointer text-zinc-300">
                    Profile
                  </Label>
                  <FiUser className="size-4 text-zinc-400" />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                id="settings"
                textValue="Settings"
                className="hover:bg-zinc-900/80 rounded-xl transition-colors"
              >
                <Link
                  href={`/dashboard/${user?.role}/settings`}
                  className="w-full flex items-center justify-between gap-2 text-zinc-300 hover:text-white"
                >
                  <Label className="cursor-pointer text-zinc-300">
                    Settings
                  </Label>
                  <FiSettings className="size-4 text-zinc-400" />
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                id="logout"
                textValue="Logout"
                variant="danger"
                onPress={handleLogOut}
                className="hover:bg-red-950/40 rounded-xl transition-colors"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <Label className="text-red-400 cursor-pointer font-medium">
                    Log Out
                  </Label>
                  <FiLogOut className="size-4 text-red-400" />
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </aside>
  );
};

export default DashboardSidbar;
