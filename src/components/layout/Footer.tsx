import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E8F5E9] mt-8 py-6 text-center text-green-900 border-t border-green-200">
      <p>MediStore © {new Date().getFullYear()}. All rights reserved.</p>
      <p className="text-sm mt-1">
        Bán thuốc lẻ uy tín, chất lượng. Hỗ trợ khách hàng 24/7.
      </p>
    </footer>
  );
};

export default Footer;
