
const AdminManageCompaniesPage = () => {
  return (
    <div>
      <h2>Admin Manage Companies Page</h2>
      {/* 
* Table of all company registrations.  
* Columns: Company Name, Recruiter Email, Industry, Status (Pending / Approved / Rejected), Date Submitted.  
* Conditional action buttons:  
  * Approve (if status is Pending or Rejected) — sets status to approved, company becomes publicly visible.  
  * Reject (if status is Pending or Approved) — sets status to rejected, company is removed from public listing. */}
    </div>
  );
};

export default AdminManageCompaniesPage;