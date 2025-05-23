import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import React from "react";

const page = () => {
  return (
    <main className="w-full overflow-x-hidden overflow-y-hidden mx-auto">
      <Header />
      <Hero />
    </main>
  );
};

export default page;
