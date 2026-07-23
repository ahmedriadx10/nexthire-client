import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const PublicLayout = ({children}) => {
  return (
    <>
    <Navbar/>
     {children}
     <Footer/> 
    </>
  );
};

export default PublicLayout;