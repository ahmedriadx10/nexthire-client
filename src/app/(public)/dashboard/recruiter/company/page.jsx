import CompanyManage from "@/components/dashboard/recruiter-components/CompanyManage";
import EmptyCompanyStatus from "@/components/dashboard/recruiter-components/EmptyCompanyStatus";
import { getRecruiterCompany } from "@/lib/api/RecruiterCompany";
import { getLoggedInUserSession } from "@/lib/core/Session";

const RecruiteMyCompanyPage = async() => {

const loggedInRecruiter=await getLoggedInUserSession()
console.log('user session',loggedInRecruiter)

// Fetch company data for the logged-in recruiter but now i am just taking no company registered for now
// const companyData=await  getRecruiterCompany(loggedInRecruiter?.id)
const companyData=false
console.log('recruiter company data',companyData)
  return (
    <div>
      <h2>Recruiter My Company Page</h2>
      {/* * If no company is registered: Show a prompt and a "Register Company" button.  
* If registered: Show company details — name, logo, industry, location, employee count, description.  
* Edit button to update company information.  
* Company status badge: Pending / Approved / Rejected (set by Admin).

### **Register / Edit Company Form**

Fields:

* Company Name, Industry/Category, Website URL  
* Location, Employee Count Range  
* Company Logo (image upload)  
* Short Description

On submit: save to database with status pending. Admin must approve before the company appears publicly. */}

{companyData? <CompanyManage/> : <EmptyCompanyStatus/>}

    </div>
  );
};

export default RecruiteMyCompanyPage;