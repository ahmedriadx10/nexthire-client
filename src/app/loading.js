"use client";


import { CirclesWithBar } from "react-loader-spinner";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#000000] text-white font-sans relative select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center space-y-4">
           {/* Loading Spinner */}
        <div className="py-2 flex items-center justify-center">
      {/* <FadeLoader 
      color="#00a6fb"  
      height={30}        // 40px tall bars
      width={8}         
      radius={4}         
      margin={5}
      speedMultiplier={1}         
    /> */}
 <CirclesWithBar 
height="100"
width="100"
color="#00a6fb"
outerCircleColor="#00a6fb"
innerCircleColor="#00a6fb"
barColor="#ffffff"
ariaLabel="circles-with-bar-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>


    
        </div>
       
        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-bold  text-white  select-none">
          Next<span className="text-primary">Hire</span>
        </h1>

    
      </div>
    </div>
  );
};

export default Loading;
