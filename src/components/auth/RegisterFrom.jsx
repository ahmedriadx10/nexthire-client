"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { FiSearch, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [role, setRole] = useState("seeker");
  const [loading, setLoading] = useState(false);
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const exactFormData = Object.fromEntries(formData.entries());
    const submitFormData = {
      ...exactFormData,
      image: "",
      role,
      plan: role === "seeker" ? "seeker_free" : "recruiter_free",
    };
    // console.log("Submitting registration form:", submitFormData);

    const result = await authClient.signUp.email(
      {
        ...submitFormData,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
      },
    );

    // console.log('Registration result:',result);

    if (result?.data?.user) {
      setLoading(false);
      toast.success("Registration successful");

      // console.log("user from on success ", { name: result?.data?.user?.name });

      return redirect("/login");
    }

    if (result?.error) {
      setLoading(false);
      return toast.error(
        result?.error?.message || "Registration failed please try again",
      );
    }
  };


  const handleGoogleSignIn=async()=>{

const result=await authClient.signIn.social({
  provider:'google',
})

  }

  return (
    <div className="w-full">
      <Form
        className="flex w-full flex-col gap-5"
        onSubmit={handleRegisterSubmit}
      >
        <TextField
          isRequired
          name="name"
          type="text"
          className="flex flex-col w-full"
          validate={(value) => {
            if (value.length < 2) {
              return "Name must be at least 2 characters";
            }
            return null;
          }}
        >
          <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
            Full Name
          </Label>
          <Input
            placeholder="Alex Rivera"
            className="w-full h-11 px-3.5 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
          />
          <FieldError className="text-[11px] text-red-400 mt-1 block font-medium" />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          className="flex flex-col w-full"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
            Email Address
          </Label>
          <Input
            placeholder="alex@example.com"
            className="w-full h-11 px-3.5 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
          />
          <FieldError className="text-[11px] text-red-400 mt-1 block font-medium" />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          className="flex flex-col w-full"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
            Password
          </Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="w-full h-11 px-3.5 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
          />
          <FieldError className="text-[11px] text-red-400 mt-1 block font-medium" />
        </TextField>

        {/* Role Selection */}
        <div className="flex flex-col w-full">
          <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase mb-2.5 block">
            I AM A...
          </span>
          <div className="grid grid-cols-2 gap-3.5 w-full">
            {/* Seeker Option */}
            <div
              onClick={() => setRole("seeker")}
              className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border transition-all duration-350 select-none ${
                role === "seeker"
                  ? "bg-[#00a6fb]/5 border-primary shadow-[0_0_12px_rgba(0,166,251,0.12)]"
                  : "bg-[#141416]/80 border-zinc-800 hover:border-zinc-700/80 hover:bg-[#18181b]/80"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 transition-colors duration-300 ${
                  role === "seeker"
                    ? "bg-[#00a6fb]/15 text-primary"
                    : "bg-zinc-800/85 text-zinc-400"
                }`}
              >
                <FiSearch className="text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white tracking-wide">
                  Seeker
                </span>
                <span className="text-[10px] text-zinc-500 font-light truncate">
                  Looking for roles
                </span>
              </div>
            </div>

            {/* Recruiter Option */}
            <div
              onClick={() => setRole("recruiter")}
              className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border transition-all duration-350 select-none ${
                role === "recruiter"
                  ? "bg-[#00a6fb]/5 border-primary shadow-[0_0_12px_rgba(0,166,251,0.12)]"
                  : "bg-[#141416]/80 border-zinc-800 hover:border-zinc-700/80 hover:bg-[#18181b]/80"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg shrink-0 transition-colors duration-300 ${
                  role === "recruiter"
                    ? "bg-[#00a6fb]/15 text-primary"
                    : "bg-zinc-800/85 text-zinc-400"
                }`}
              >
                <FiBriefcase className="text-base" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white tracking-wide">
                  Recruiter
                </span>
                <span className="text-[10px] text-zinc-500 font-light truncate">
                  Hiring top talent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 mt-2.5 rounded-lg bg-primary hover:bg-[#009ae8] hover:shadow-[0_0_15px_rgba(0,166,251,0.2)] text-zinc-950 font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 uppercase"
        >
          {loading ? (
            <Spinner color="current" />
          ) : (
            <>
              Create Account <FiArrowRight className="text-sm stroke-[2.5]" />
            </>
          )}
        </Button>
      </Form>

      {/* Divider */}
      <div className="relative flex py-4 items-center">
        <div className="grow border-t border-zinc-900"></div>
        <span className="shrink mx-4 text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
          OR
        </span>
        <div className="grow border-t border-zinc-900"></div>
      </div>

      {/* Social Google Signup */}
      <Button
        type="button"
        className="w-full h-11 rounded-lg bg-[#141416]/90 border border-zinc-800 hover:bg-[#18181b]/90 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200"

        onPress={handleGoogleSignIn}
      >
        <FcGoogle className="text-lg" />
        Continue with Google
      </Button>

      {/* Sign In Footer */}
      <p className="text-center text-xs text-zinc-500 mt-6 font-light">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-[#009ae8] hover:underline font-semibold ml-1 transition-all"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
