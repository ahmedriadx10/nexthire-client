"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiChevronRight,
  FiLoader,
  FiInfo,
  FiToggleLeft,
  FiToggleRight,
  FiChevronDown,
} from "react-icons/fi";
import { createRecruiterJob } from "@/lib/api/RecruiterJob";

// ─── Static Options ────────────────────────────────────────────────────────

const JOB_CATEGORIES = [
  "Software Engineering",
  "Data Science & Analytics",
  "Product Management",
  "Design & UX",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance & Accounting",
  "Human Resources",
  "Operations",
  "Legal",
  "Healthcare",
  "Education",
  "Other",
];

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "INR", "CAD", "AUD", "SGD"];

const EXPERIENCE_LEVELS = [
  "Entry Level (0–1 yr)",
  "Junior (1–3 yrs)",
  "Mid-Level (3–5 yrs)",
  "Senior (5–8 yrs)",
  "Lead / Principal (8+ yrs)",
];

// ─── Shared class strings ──────────────────────────────────────────────────

const inputCls =
  "w-full h-11 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light hover:border-zinc-700";

const selectTriggerCls =
  "w-full h-11 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white flex items-center justify-between text-sm font-light text-left focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all cursor-pointer hover:border-zinc-700";

const selectPopoverCls =
  "bg-[#141416] border border-zinc-800 rounded-xl shadow-2xl text-white w-(--triger-width) z-50 p-1";

const listboxCls =
  "p-1 outline-none max-h-60 overflow-y-auto flex flex-col gap-0.5";

const listboxItemCls =
  "px-3 py-2 rounded-lg text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors";

const labelCls =
  "text-[11px] font-bold text-zinc-400 tracking-widest uppercase";

const textareaCls =
  "w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light resize-none leading-relaxed hover:border-zinc-700";

// ─── Section Wrapper ───────────────────────────────────────────────────────

const FormSection = ({ icon: Icon, title, subtitle, children, step }) => (
  <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-6 md:p-8">
    <div className="flex items-start gap-4 mb-6">
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-primary/10 blur-lg rounded-full" />
        <div className="relative w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
          <Icon className="text-primary text-base stroke-2" />
        </div>
      </div>
      <div>
        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
          Step {step}
        </span>
        <h3 className="text-lg font-extrabold text-white tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-zinc-500 text-xs font-light mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

// ─── HeroUI Select helper (renders the full compound component) ────────────

const HeroSelect = ({
  label,
  required,
  placeholder,
  selectedKey,
  onSelectionChange,
  options,
  disabled,
  name,
}) => (
  <div className="flex flex-col gap-2">
    <Label className={labelCls}>
      {label}
      {required && <span className="text-primary ml-1">*</span>}
    </Label>
    <Select
      isRequired={required}
      name={name}
      placeholder={placeholder}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      className="w-full"
      isDisabled={disabled}
    >
      <Select.Trigger className={selectTriggerCls}>
        <Select.Value className="text-sm font-light text-white" />
        <Select.Indicator className="text-zinc-500">
          <FiChevronDown className="size-4" />
        </Select.Indicator>
      </Select.Trigger>
      <Select.Popover className={selectPopoverCls}>
        <ListBox className={listboxCls}>
          {options.map((opt) => (
            <ListBoxItem
              key={opt.value ?? opt}
              id={opt.value ?? opt}
              className={listboxItemCls}
            >
              {opt.label ?? opt}
            </ListBoxItem>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────

const RecruiterJobPost = ({ company,user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isRemote, setIsRemote] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCategory: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    city: "",
    country: "",
    applicationDeadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, jobType: value }));
    if (value === "remote") setIsRemote(true);
    else setIsRemote(false);
  };

  const handleRemoteToggle = () => {
    const next = !isRemote;
    setIsRemote(next);
    if (next) {
      setFormData((prev) => ({
        ...prev,
        jobType: "remote",
        city: "",
        country: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        jobType: prev.jobType === "remote" ? "" : prev.jobType,
      }));
    }
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = () => {
    if (!formData.jobTitle.trim()) {
      toast.error("Please enter a Job Title.");
      return false;
    }
    if (!formData.jobCategory) {
      toast.error("Please select a Job Category.");
      return false;
    }
    if (!formData.jobType) {
      toast.error("Please select a Job Type.");
      return false;
    }
    if (!formData.salaryMin.trim() || !formData.salaryMax.trim()) {
      toast.error("Please enter Salary Range (Min & Max).");
      return false;
    }
    if (!isRemote && (!formData.city.trim() || !formData.country.trim())) {
      toast.error("Please provide a City and Country for the job location.");
      return false;
    }
    if (!formData.applicationDeadline) {
      toast.error("Please set an Application Deadline.");
      return false;
    }
    if (!formData.responsibilities.trim()) {
      toast.error("Please fill in the Responsibilities field.");
      return false;
    }
    if (!formData.requirements.trim()) {
      toast.error("Please fill in the Requirements field.");
      return false;
    }
    const min = parseFloat(formData.salaryMin);
    const max = parseFloat(formData.salaryMax);
    if (isNaN(min) || isNaN(max) || min < 0 || max < 0) {
      toast.error("Salary values must be valid positive numbers.");
      return false;
    }
    if (min > max) {
      toast.error("Minimum salary cannot exceed maximum salary.");
      return false;
    }
    const deadline = new Date(formData.applicationDeadline);
    if (deadline <= new Date()) {
      toast.error("Application deadline must be a future date.");
      return false;
    }
    return true;
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const toastId = toast.loading("Publishing your job post…");

    try {
      const payload = {
        ...formData,
        isRemote,
        location: isRemote
          ? "Remote"     : `${formData.city.trim()}, ${formData.country.trim()}`,
        salaryMin: parseFloat(formData.salaryMin),
        salaryMax: parseFloat(formData.salaryMax),
        companyId: company?._id || company?.id,
        companyName: company?.name,
        recruiterId:user?.id,
        recruiterEmail:user?.email
 
      };

console.log("Submitting job post payload:", payload);

     
      const result = await createRecruiterJob(payload);

console.log("Job post API response:", result);


      if (result?.acknowledged || result?.insertedId) {
        toast.success("Job post published successfully! 🎉", { id: toastId });
        router.push("/dashboard/recruiter/jobs");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to publish job post.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Job post error:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto pb-16 select-none">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            Recruiter Dashboard
          </span>
          <FiChevronRight className="text-zinc-700 text-xs" />
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">
            Post a Job
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none mb-2">
          Post a New Job
        </h1>
        <p className="text-zinc-400 text-sm font-light">
          Fill in the details below. Your listing will go live immediately after
          submission.
        </p>
      </div>

      {/* Company Info Bar */}
      {company && (
        <div className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl px-5 py-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0 overflow-hidden">
            {company?.logo ? (
              <img
                src={company.logo}
                alt={company?.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-primary font-black text-lg">
                {company?.name?.[0] || "C"}
              </span>
            )}
          </div>
          <div>
            <p className="text-white text-sm font-bold">{company?.name}</p>
            <p className="text-zinc-500 text-xs font-light">
              {company?.industry} · {company?.location}
            </p>
          </div>
          <div className="ml-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
              Approved
            </span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Section 1: Job Information ── */}
        <FormSection
          icon={FiBriefcase}
          title="Job Information"
          subtitle="Core details about the position you are hiring for."
          step={1}
        >
          {/* Job Title */}
          <TextField isRequired name="jobTitle" className="flex flex-col gap-2">
            <Label className={labelCls}>
              Job Title <span className="text-primary">*</span>
            </Label>
            <Input
              placeholder="e.g. Senior Frontend Engineer"
              className={inputCls}
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
              }
              disabled={loading}
            />
            <FieldError className="text-[10px] text-rose-400 mt-0.5 font-medium" />
          </TextField>

          {/* Category + Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <HeroSelect
              label="Job Category"
              required
              name="jobCategory"
              placeholder="Select category…"
              selectedKey={formData.jobCategory}
              onSelectionChange={(key) =>
                setFormData((prev) => ({
                  ...prev,
                  jobCategory: String(key),
                }))
              }
              options={JOB_CATEGORIES}
              disabled={loading}
            />

            <HeroSelect
              label="Experience Level"
              name="experienceLevel"
              placeholder="Select level…"
              selectedKey={formData.experienceLevel}
              onSelectionChange={(key) =>
                setFormData((prev) => ({
                  ...prev,
                  experienceLevel: String(key),
                }))
              }
              options={EXPERIENCE_LEVELS}
              disabled={loading}
            />
          </div>

          {/* Job Type Pill Selector */}
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>
              Job Type <span className="text-primary">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map(({ value, label }) => {
                const selected = formData.jobType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleJobTypeSelect(value)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                      selected
                        ? "bg-primary text-zinc-950 border-primary shadow-md shadow-primary/20"
                        : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </FormSection>

        {/* ── Section 2: Salary & Location ── */}
        <FormSection
          icon={FiDollarSign}
          title="Salary & Location"
          subtitle="Set the compensation and where this role is based."
          step={2}
        >
          {/* Salary Range — InputGroup pattern: prefix + Input */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Min Salary */}
            <TextField
              isRequired
              name="salaryMin"
              className="flex flex-col gap-2"
            >
              <Label className={labelCls}>
                Min Salary <span className="text-primary">*</span>
              </Label>
              <div className="flex h-11 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/60 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/80 transition-all hover:border-zinc-700">
                <span className="flex items-center px-3 bg-zinc-900/80 border-r border-zinc-800 text-zinc-500 text-xs font-semibold select-none shrink-0">
                  {formData.currency}
                </span>
                <Input
                  type="number"
                  min="0"
                  placeholder="60,000"
                  className="w-full h-full px-3 bg-transparent border-0 text-white placeholder-zinc-600 focus:outline-none text-sm font-light"
                  value={formData.salaryMin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salaryMin: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>
              <FieldError className="text-[10px] text-rose-400 mt-0.5 font-medium" />
            </TextField>

            {/* Max Salary */}
            <TextField
              isRequired
              name="salaryMax"
              className="flex flex-col gap-2"
            >
              <Label className={labelCls}>
                Max Salary <span className="text-primary">*</span>
              </Label>
              <div className="flex h-11 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/60 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/80 transition-all hover:border-zinc-700">
                <span className="flex items-center px-3 bg-zinc-900/80 border-r border-zinc-800 text-zinc-500 text-xs font-semibold select-none shrink-0">
                  {formData.currency}
                </span>
                <Input
                  type="number"
                  min="0"
                  placeholder="90,000"
                  className="w-full h-full px-3 bg-transparent border-0 text-white placeholder-zinc-600 focus:outline-none text-sm font-light"
                  value={formData.salaryMax}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salaryMax: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>
              <FieldError className="text-[10px] text-rose-400 mt-0.5 font-medium" />
            </TextField>

            {/* Currency */}
            <HeroSelect
              label="Currency"
              name="currency"
              placeholder="Select currency…"
              selectedKey={formData.currency}
              onSelectionChange={(key) =>
                setFormData((prev) => ({ ...prev, currency: String(key) }))
              }
              options={CURRENCIES}
              disabled={loading}
            />
          </div>

          {/* Remote Toggle */}
          <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800/60 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3">
              <FiMapPin className="text-primary text-base shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Remote Position</p>
                <p className="text-zinc-500 text-xs font-light">
                  Toggle on if this role can be done fully remote.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoteToggle}
              disabled={loading}
              className="shrink-0 cursor-pointer"
              aria-label="Toggle remote position"
            >
              {isRemote ? (
                <FiToggleRight className="text-primary text-3xl" />
              ) : (
                <FiToggleLeft className="text-zinc-600 text-3xl" />
              )}
            </button>
          </div>

          {/* City & Country — only visible when not remote */}
          {!isRemote && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextField isRequired name="city" className="flex flex-col gap-2">
                <Label className={labelCls}>
                  City <span className="text-primary">*</span>
                </Label>
                <div className="relative flex items-center">
                  <FiMapPin className="absolute left-3 text-zinc-500 text-base pointer-events-none" />
                  <Input
                    placeholder="e.g. San Francisco"
                    className={`${inputCls} pl-9`}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    disabled={loading}
                  />
                </div>
                <FieldError className="text-[10px] text-rose-400 mt-0.5 font-medium" />
              </TextField>

              <TextField
                isRequired
                name="country"
                className="flex flex-col gap-2"
              >
                <Label className={labelCls}>
                  Country <span className="text-primary">*</span>
                </Label>
                <Input
                  placeholder="e.g. United States"
                  className={inputCls}
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
                <FieldError className="text-[10px] text-rose-400 mt-0.5 font-medium" />
              </TextField>
            </div>
          )}

          {/* Application Deadline */}
          <TextField
            isRequired
            name="applicationDeadline"
            className="flex flex-col gap-2"
          >
            <Label className={labelCls}>
              Application Deadline <span className="text-primary">*</span>
            </Label>
            <div className="relative flex items-center">
              <Input
                type="date"
                className={`${inputCls} pr-10`}
                min={new Date().toISOString().split("T")[0]}
                value={formData.applicationDeadline}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    applicationDeadline: e.target.value,
                  }))
                }
                disabled={loading}
              />
              <FiCalendar className="absolute right-3 text-zinc-500 pointer-events-none" />
            </div>
            <FieldError className="text-[10px] text-rose-400 mt-0.5 font-medium" />
          </TextField>
        </FormSection>

        {/* ── Section 3: Job Description ── */}
        <FormSection
          icon={FiFileText}
          title="Job Description"
          subtitle="Describe the role — what the candidate will do, need, and gain."
          step={3}
        >
          {/* Responsibilities */}
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>
              Responsibilities <span className="text-primary">*</span>
            </Label>
            <textarea
              name="responsibilities"
              id="responsibilities"
              rows={6}
              placeholder={`• Lead end-to-end development of core product features\n• Collaborate with design and product teams on specs\n• Review pull requests and mentor junior engineers\n• Participate in architectural decisions`}
              value={formData.responsibilities}
              onChange={handleChange}
              className={textareaCls}
              disabled={loading}
            />
            <p className="text-zinc-600 text-xs font-light">
              Tip: Use bullet points (•) for better readability.
            </p>
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-2">
            <Label className={labelCls}>
              Requirements <span className="text-primary">*</span>
            </Label>
            <textarea
              name="requirements"
              id="requirements"
              rows={6}
              placeholder={`• 3+ years of experience with React or similar frameworks\n• Strong understanding of REST APIs and async patterns\n• Excellent communication skills\n• Bachelor's degree in CS or equivalent`}
              value={formData.requirements}
              onChange={handleChange}
              className={textareaCls}
              disabled={loading}
            />
          </div>

          {/* Benefits — optional */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className={labelCls}>Benefits</Label>
              <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest border border-zinc-800 px-2 py-0.5 rounded-full">
                Optional
              </span>
            </div>
            <textarea
              name="benefits"
              id="benefits"
              rows={4}
              placeholder={`• Competitive salary and equity\n• Flexible remote-friendly culture\n• Health, dental, and vision insurance\n• $1,000/yr learning & development budget`}
              value={formData.benefits}
              onChange={handleChange}
              className={textareaCls}
              disabled={loading}
            />
          </div>
        </FormSection>

        {/* ── Info Notice ── */}
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4">
          <FiInfo className="text-primary text-base shrink-0 mt-0.5" />
          <p className="text-zinc-400 text-xs font-light leading-relaxed">
            <span className="text-primary font-semibold">Heads up:</span> Once
            submitted, your job post will be{" "}
            <span className="text-white font-semibold">
              immediately visible
            </span>{" "}
            to all seekers on NextHire. You can manage, edit, or close the
            listing from{" "}
            <span className="text-primary font-semibold">Manage Jobs</span>.
          </p>
        </div>

        {/* ── Submit & Cancel ── */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-primary text-zinc-950 hover:bg-primary/90 font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer text-sm"
            id="submit-job-post"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-base" />
                Publishing…
              </>
            ) : (
              <>
                <FiCheckCircle className="text-base" />
                Publish Job Post
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 font-semibold text-sm transition-all duration-200 hover:bg-zinc-900/60 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterJobPost;
