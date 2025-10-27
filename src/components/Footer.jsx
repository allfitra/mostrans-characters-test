import React from "react";

const Footer = () => (
  <footer className="w-full bg-[#01663f] text-white py-1 mt-auto bottom-0 left-0">
    <div className="container mx-auto text-center text-sm">
      &copy; {new Date().getFullYear()} Allfitra.
    </div>
  </footer>
);

export default Footer;
