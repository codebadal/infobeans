import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-6 md:px-16 mt-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        
        {/* Brand / About */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white tracking-wide">
            InfoBeans Foundation
          </h1>
          <p className="text-gray-400 leading-relaxed transition duration-300 hover:text-gray-200">
            Empowering communities through innovation, education, and sustainable
            development. Together, we make a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>

              <Link
                to="/about"
                className="hover:text-red-500 transition duration-300 ease-in-out"
              >
                About Us
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-500 transition duration-300 ease-in-out"
              >
                Programs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-500 transition duration-300 ease-in-out"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-red-500 transition duration-300 ease-in-out"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} InfoBeans Foundation. All rights reserved.
      </div>
    </footer>
  );
}
