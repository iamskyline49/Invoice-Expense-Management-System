import React from "react";

function Footer() {
  return (
    <footer className="footer bg-gray-50 text-gray-700 py-6 border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <section id="contact" className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Contact Information
          </h3>
          <p>Email: support@invoicemanagement.com</p>
          <p>Phone: +880 1732551702</p>
          <p>Address: Kuril, Dhaka, Bangladesh</p>
        </section>

        <section className="text-center md:text-right text-gray-500">
          <p>
            © 2026 Invoice & Expense Management System. All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
