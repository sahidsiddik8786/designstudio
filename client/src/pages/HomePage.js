import React, { useEffect } from "react";
//import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";

import { useState } from "react";
import Background from "../components/Background/Background";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero"

const HomePage = () => {
  let heroData = [
    { text1: "Transforming Spaces,Inspiring Lives Your Dream Home Awaits" },
    { text1: "Elevate Your Living Experience with Timeless Design and Modern Elegance" },
    { text1: "Designing Dreams,Crafting Comfort Where Style Meets Serenity." },
    
  ]

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(()=>{
        const intervalId = setInterval(() => {
    setHeroCount((count)=> { return count===2?0:count+1})
  }, 3000);
  return () => clearInterval(intervalId);
}, []); 
  return (
<>
            <Navbar />
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Hero
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
       
      />
         <Footer />
      </>
   
    
  );
};
export default HomePage;
