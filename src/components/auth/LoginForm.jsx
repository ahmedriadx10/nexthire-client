'use client'
import Link from "next/link";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const exactFormData = Object.fromEntries(formData.entries());
    console.log("Submitting login form:", exactFormData);
  };

  return (
    <div className="w-full">
      <Form className="flex w-full flex-col gap-5" onSubmit={handleLoginSubmit}>
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
            placeholder="name@company.com" 
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
          <div className="flex justify-between items-center mb-1.5 w-full">
            <Label className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
              Password
            </Label>
            <Link 
              href="/forgot-password" 
              className="text-[11px] font-semibold text-primary hover:text-[#009ae8] hover:underline transition-all"
            >
              Forgot Password?
            </Link>
          </div>
          <Input 
            type="password"
            placeholder="••••••••" 
            className="w-full h-11 px-3.5 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-650 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
          />
          <FieldError className="text-[11px] text-red-400 mt-1 block font-medium" />
        </TextField>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 mt-2.5 rounded-lg bg-primary hover:bg-[#009ae8] hover:shadow-[0_0_15px_rgba(0,166,251,0.2)] text-zinc-950 font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 uppercase"
        >
          Sign In <FiArrowRight className="text-sm stroke-[2.5]" />
        </Button>
      </Form>

      {/* Divider */}
      <div className="relative flex py-4 items-center">
        <div className="grow border-t border-zinc-900"></div>
        <span className="shrink mx-4 text-[10px] text-zinc-600 font-bold tracking-widest uppercase">OR</span>
        <div className="grow border-t border-zinc-900"></div>
      </div>

      {/* Social Google Signin */}
      <Button 
        type="button"
        className="w-full h-11 rounded-lg bg-[#141416]/90 border border-zinc-800 hover:bg-[#18181b]/90 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200"
      >
        <FcGoogle className="text-lg" />
        Continue with Google
      </Button>

      {/* Sign Up Footer */}
      <p className="text-center text-xs text-zinc-500 mt-6 font-light">
        Don't have an account?{" "}
        <Link 
          href="/register" 
          className="text-primary hover:text-[#009ae8] hover:underline font-semibold ml-1 transition-all"
        >
          Sign Up
        </Link>
      </p>

      {/* Futuristic Node Info */}
      {/* <div className="mt-16 text-center">
        <span className="text-[8px] sm:text-[9px] text-zinc-700 tracking-[0.25em] font-medium font-mono uppercase">
          NEXTHIRE AUTHENTICATION NODE V2.0.4
        </span>
      </div> */}
    </div>
  );
};

export default LoginForm;