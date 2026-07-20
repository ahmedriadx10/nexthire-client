import { getLoggedInUserSession } from "@/lib/core/Session";
import NavbarManage from "./NavbarManage";

const Navbar = async() => {

const userSession=await getLoggedInUserSession()

// console.log('user session is here',userSession)
  return (
    <>
      <NavbarManage activeUser={userSession}/>
    </>
  );
};

export default Navbar;