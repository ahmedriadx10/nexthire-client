/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Button,
  Modal,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Spinner,
  Select,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { useState } from "react";
import {
  FiUploadCloud,
  FiMapPin,
  FiPlus,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { registerCompany } from "@/lib/api/RecruiterCompany";

const RegisterNewCompanyModal = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    industryCategory: "",
    companyLocation: "",
    companyWebUrl: "",
    employeeCount: "",
    companyLogo: "",
    description: "",
  });

  // console.log('recruiter data',user)

  // Drag & Drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoUpload(e.target.files[0]);
    }
  };

  // Image Upload handler to ImgBB
  const handleLogoUpload = async (file) => {
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files (PNG, JPG) are allowed");
      return;
    }

    setIsUploadingLogo(true);
    const toastId = toast.loading("Uploading logo...");

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error(
          "ImgBB API key is missing. Please check your environment variables.",
        );
      }

      const body = new FormData();
      body.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: body,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to ImgBB");
      }

      const result = await response.json();
      if (result && result.data && result.data.url) {
        setFormData((prev) => ({ ...prev, companyLogo: result.data.url }));
        toast.success("Logo uploaded successfully!", { id: toastId });
      } else {
        throw new Error("Invalid response from ImgBB");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        error.message || "Failed to upload image. Please try again.",
        { id: toastId },
      );
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Form Submit handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!formData.industryCategory) {
      toast.error("Please select an industry category");
      return;
    }
    if (!formData.employeeCount) {
      toast.error("Please select an employee count range");
      return;
    }
    if (!formData.companyLogo) {
      toast.error("Please upload a company logo");
      return;
    }

    setLoading(true);

    try {
      await registerCompany({
        name: formData.companyName,
        industry: formData.industryCategory,
        website: formData.companyWebUrl,
        location: formData.companyLocation,
        employeeRange: formData.employeeCount,
        logo: formData.companyLogo,
        description: formData.description,
        recruiterId: user?.id,
        recruiterEmail: user?.email,
      });

      toast.success("Company registration submitted. Awaiting Admin approval.");

      // Reset form data
      setFormData({
        companyName: "",
        industryCategory: "",
        companyLocation: "",
        companyWebUrl: "",
        employeeCount: "",
        companyLogo: "",
        description: "",
      });

      // Refresh page to reflect update
      router.refresh();
    } catch (err) {
      console.error("Failed to register company:", err);
      toast.error(
        err.message || "Failed to register company. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal>
        <Button className="bg-primary hover:bg-[#009ae8] hover:shadow-[0_0_15px_rgba(0,166,251,0.2)] text-zinc-950 font-bold text-xs tracking-wider px-6 h-11 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 uppercase">
          <FiPlus className="text-base stroke-[2.5]" /> Register Company
        </Button>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-2xl bg-[#0e0e10] border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-2xl p-0 overflow-hidden relative max-h-[90vh] flex flex-col">
              <Modal.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-white cursor-pointer transition-colors p-1.5 rounded-lg hover:bg-zinc-900/50">
                <FiX className="size-4" />
              </Modal.CloseTrigger>

              <Modal.Header className="px-6 pt-6 pb-4 border-b border-zinc-900 shrink-0">
                <Modal.Heading className="text-xl font-bold text-white tracking-tight">
                  Register New Company
                </Modal.Heading>
                <p className="text-xs text-zinc-400 mt-1 font-light">
                  Enter your business details to start hiring on HireLoop.
                </p>
              </Modal.Header>

              <Form
                className="flex flex-col flex-1 overflow-hidden"
                onSubmit={handleRegisterSubmit}
              >
                <Modal.Body className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-140px)] flex-1 scrollbar-thin scrollbar-thumb-zinc-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Company Name */}
                    <TextField
                      isRequired
                      name="companyName"
                      className="flex flex-col gap-1.5"
                    >
                      <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                        Company Name
                      </Label>
                      <Input
                        placeholder="e.g. Acme Corp"
                        className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyName: e.target.value,
                          })
                        }
                      />
                      <FieldError className="text-[10px] text-red-400 mt-1 block font-medium" />
                    </TextField>

                    {/* Industry / Category */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                        Industry / Category
                      </Label>
                      <Select
                        isRequired
                        name="industryCategory"
                        placeholder="Select Industry"
                        selectedKey={formData.industryCategory}
                        onSelectionChange={(key) =>
                          setFormData({
                            ...formData,
                            industryCategory: String(key),
                          })
                        }
                        className="w-full"
                      >
                        <Select.Trigger className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white flex items-center justify-between text-sm font-light text-left focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all cursor-pointer">
                          <Select.Value className="text-sm font-light text-white" />
                          <Select.Indicator className="text-zinc-500">
                            <FiChevronDown className="size-4" />
                          </Select.Indicator>
                        </Select.Trigger>
                        <Select.Popover className="bg-[#141416] border border-zinc-800 rounded-lg shadow-xl text-white w-(--triger-width)  z-50 p-1">
                          <ListBox className="p-1 outline-none max-h-60 overflow-y-auto flex flex-col gap-0.5">
                            <ListBoxItem
                              id="Technology"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Technology
                            </ListBoxItem>
                            <ListBoxItem
                              id="Finance"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Finance
                            </ListBoxItem>
                            <ListBoxItem
                              id="Healthcare"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Healthcare
                            </ListBoxItem>
                            <ListBoxItem
                              id="Education"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Education
                            </ListBoxItem>
                            <ListBoxItem
                              id="E-commerce"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              E-commerce
                            </ListBoxItem>
                            <ListBoxItem
                              id="Real Estate"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Real Estate
                            </ListBoxItem>
                            <ListBoxItem
                              id="Entertainment"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Entertainment
                            </ListBoxItem>
                            <ListBoxItem
                              id="Other"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              Other
                            </ListBoxItem>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Website URL */}
                    <TextField
                      isRequired
                      name="companyWebUrl"
                      className="flex flex-col gap-1.5"
                    >
                      <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                        Website URL
                      </Label>
                      <div className="flex h-10 rounded-lg overflow-hidden border border-zinc-800 bg-[#141416]/90 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/80 transition-all">
                        <span className="flex items-center px-3 bg-zinc-900 border-r border-zinc-800 text-zinc-500 text-xs font-light select-none">
                          https://
                        </span>
                        <Input
                          placeholder="www.company.com"
                          className="w-full h-full px-3 bg-transparent border-0 text-white placeholder-zinc-600 focus:outline-none text-sm font-light"
                          value={formData.companyWebUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyWebUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <FieldError className="text-[10px] text-red-400 mt-1 block font-medium" />
                    </TextField>

                    {/* Location */}
                    <TextField
                      isRequired
                      name="companyLocation"
                      className="flex flex-col gap-1.5"
                    >
                      <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                        Location
                      </Label>
                      <div className="relative flex items-center">
                        <FiMapPin className="absolute left-3 text-zinc-505 text-base pointer-events-none" />
                        <Input
                          placeholder="City, Country"
                          className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
                          value={formData.companyLocation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyLocation: e.target.value,
                            })
                          }
                        />
                      </div>
                      <FieldError className="text-[10px] text-red-400 mt-1 block font-medium" />
                    </TextField>

                    {/* Employee Count Range */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                        Employee Count Range
                      </Label>
                      <Select
                        isRequired
                        name="employeeCount"
                        placeholder="Select Employees Range"
                        selectedKey={formData.employeeCount}
                        onSelectionChange={(key) =>
                          setFormData({
                            ...formData,
                            employeeCount: String(key),
                          })
                        }
                        className="w-full"
                      >
                        <Select.Trigger className="w-full h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white flex items-center justify-between text-sm font-light text-left focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all cursor-pointer">
                          <Select.Value className="text-sm font-light text-white" />
                          <Select.Indicator className="text-zinc-500">
                            <FiChevronDown className="size-4" />
                          </Select.Indicator>
                        </Select.Trigger>
                        <Select.Popover className="bg-[#141416] border border-zinc-800 rounded-lg shadow-xl text-white w-(--triger-width) z-50 p-1">
                          <ListBox className="p-1 outline-none max-h-60 overflow-y-auto flex flex-col gap-0.5">
                            <ListBoxItem
                              id="1-10 employees"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              1-10 employees
                            </ListBoxItem>
                            <ListBoxItem
                              id="11-50 employees"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              11-50 employees
                            </ListBoxItem>
                            <ListBoxItem
                              id="51-200 employees"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              51-200 employees
                            </ListBoxItem>
                            <ListBoxItem
                              id="201-500 employees"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              201-500 employees
                            </ListBoxItem>
                            <ListBoxItem
                              id="500+ employees"
                              className="px-3 py-2 rounded-md text-zinc-300 text-sm cursor-pointer select-none outline-none hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white transition-colors"
                            >
                              500+ employees
                            </ListBoxItem>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Company Logo */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                        Company Logo
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative h-10 flex items-center justify-between px-3 border border-dashed rounded-lg bg-[#141416]/90 cursor-pointer transition-all ${
                          isDragActive
                            ? "border-primary bg-primary/5 shadow-[0_0_8px_rgba(0,166,251,0.15)]"
                            : "border-zinc-800 hover:border-zinc-700 hover:bg-[#18181b]/50"
                        }`}
                      >
                        <input
                          type="file"
                          id="companyLogo"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <div className="flex items-center gap-3 cursor-pointer w-full justify-between select-none">
                          <label
                            htmlFor="companyLogo"
                            className="flex items-center gap-2.5 cursor-pointer w-full"
                          >
                            <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center size-7 overflow-hidden shrink-0">
                              {isUploadingLogo ? (
                                <Spinner
                                  size="sm"
                                  color="current"
                                  className="scale-75"
                                />
                              ) : formData.companyLogo ? (
                                <img
                                  src={formData.companyLogo}
                                  alt="Logo"
                                  className="size-full object-cover rounded"
                                />
                              ) : (
                                <FiUploadCloud className="text-sm text-zinc-500" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-white leading-tight">
                                {formData.companyLogo
                                  ? "Logo uploaded"
                                  : "Upload image"}
                              </span>
                              <span className="text-[9px] text-zinc-500 font-light leading-none">
                                PNG, JPG up to 5MB
                              </span>
                            </div>
                          </label>
                          {formData.companyLogo && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFormData({ ...formData, companyLogo: "" });
                              }}
                              className="text-[9px] text-red-400 hover:text-red-300 font-medium px-2 py-0.5 rounded bg-red-950/20 border border-red-900/50 cursor-pointer transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div className="flex flex-col gap-1.5 mt-4">
                    <label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
                      Brief Description
                    </label>
                    <textarea
                      required
                      placeholder="Tell us about your company's mission and culture..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full p-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light resize-none"
                    />
                  </div>
                </Modal.Body>

                <Modal.Footer className="px-6 py-4 border-t border-zinc-900 flex justify-end gap-3 bg-[#0c0c0e] shrink-0">
                  <Button
                    type="button"
                    slot="close"
                    className="h-10 px-5 rounded-lg border border-zinc-800 bg-[#141416] text-white hover:bg-zinc-900 font-medium text-xs tracking-wider cursor-pointer transition-all duration-200 uppercase"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploadingLogo || loading}
                    className="h-10 px-5 rounded-lg bg-white text-black hover:bg-zinc-100 font-semibold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Spinner size="sm" color="current" />
                    ) : (
                      "Register Company"
                    )}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default RegisterNewCompanyModal;
