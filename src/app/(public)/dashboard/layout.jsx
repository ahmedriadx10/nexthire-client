import DashboardSidbar from "@/components/dashboard/DashboardSidbar";
import { getLoggedInUserSession } from "@/lib/core/Session";

const DashboardLayout =async ({ children }) => {

  const loggedInUserSession=await getLoggedInUserSession()
console.log('logged in user session is here',loggedInUserSession)

  return (
    // here dashboard layout will be implemented left side will dashboardlink area and right side will be the content area and the content area will be the children of this layout
    // as if we implement left and ride side ui structure for laptop and desktop view then for  mobile view there will no left side dasbhoardink link area the dashboard link will appear as a top navbar and the content area will be the children of this layout
    // for mobile view the dashboard link will appear as a top navbar and after clicking hamburger menu the dashboard link will appear as a sidebar

    <section>

      <DashboardSidbar user={loggedInUserSession}/>
      

      {children}</section>
  );
};

export default DashboardLayout;
