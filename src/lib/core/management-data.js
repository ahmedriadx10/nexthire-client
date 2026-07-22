import {
  FiGrid,
  FiBriefcase,
  FiBookmark,
  FiFileText,
  FiCreditCard,
  FiSettings,
  FiHome,
  FiPlusSquare,
  FiUsers,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";

export const roleBasedDashboardLinks = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};

Object.freeze(roleBasedDashboardLinks);

export const roleBasedDashboardNavlinks = {
  seeker: [
    { name: "Dashboard Home", href: "/dashboard/seeker", icon: FiHome },
    {
      name: "Browse & Apply",
      href: "/dashboard/seeker/jobs",
      icon: FiBriefcase,
    },
    { name: "Saved Jobs", href: "/dashboard/seeker/saved", icon: FiBookmark },
    {
      name: "My Applications",
      href: "/dashboard/seeker/applications",
      icon: FiFileText,
    },
    {
      name: "Subscription & Billing",
      href: "/dashboard/seeker/billing",
      icon: FiCreditCard,
    },
    { name: "Settings", href: "/dashboard/seeker/settings", icon: FiSettings },
  ],
  recruiter: [
    { name: "Dashboard Home", href: "/dashboard/recruiter", icon: FiHome },
    {
      name: "My Company",
      href: "/dashboard/recruiter/company",
      icon: FiShield,
    },
    {
      name: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
      icon: FiBriefcase,
    },
    {
      name: "Post a Job",
      href: "/dashboard/recruiter/jobs/new",
      icon: FiPlusSquare,
    },
    {
      name: "Subscription & Billing",
      href: "/dashboard/recruiter/billing",
      icon: FiCreditCard,
    },
    {
      name: "Settings",
      href: "/dashboard/recruiter/settings",
      icon: FiSettings,
    },
  ],
  admin: [
    { name: "Dashboard Home", href: "/dashboard/admin", icon: FiGrid },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: FiUsers },
    {
      name: "Manage Jobs",
      href: "/dashboard/admin/manage-jobs",
      icon: FiBriefcase,
    },
    {
      name: "Payment & Subscriptions",
      href: "/dashboard/admin/payments",
      icon: FiDollarSign,
    },
    {
      name: "Admin Settings",
      href: "/dashboard/admin/settings",
      icon: FiSettings,
    },
  ],
};

Object.freeze(roleBasedDashboardLinks);
