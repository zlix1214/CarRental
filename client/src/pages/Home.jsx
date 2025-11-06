import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import CreateCard from "../components/Testimonial";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedSection />
      <Banner />
      <CreateCard />
      <FAQ />
    </div>
  );
};

export default Home;
