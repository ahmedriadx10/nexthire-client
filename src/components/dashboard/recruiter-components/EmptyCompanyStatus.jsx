import RegisterNewCompanyModal from "./RegisterNewCompanyModal";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const EmptyCompanyStatus = ({user}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      
      {/* Large Decorative Icon with Gradient Glow */}
      <div className="relative mb-6 inline-flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
        <div className="relative w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-primary shadow-inner">
          <HiOutlineOfficeBuilding className="text-4xl stroke-[1.5]" />
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-xl font-bold text-white tracking-tight mb-2">
        No Company Registered Yet
      </h3>

      {/* Subtitle / Description */}
      <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
        Before you can start posting jobs and reviewing job applications, you need to register your company profile. It takes less than 2 minutes.
      </p>

      {/* CTA Modal Button */}
      <div className="flex items-center justify-center">
        <RegisterNewCompanyModal user={user}/>
      </div>
      
    </div>
  );
};

export default EmptyCompanyStatus;