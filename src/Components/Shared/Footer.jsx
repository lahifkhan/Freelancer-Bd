import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className=" text-base-content bg-base-300 mt-8 border-t border-base-300">
      {/* Main Footer */}
      <div className="w-11/12 mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="max-w-xs">
          <h2 className="text-2xl font-bold text-primary">Freelancer Bd</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Empowering freelancers to find jobs, build skills, and grow their
            careers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center text-left">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to={"/"} className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/books"} className="link link-hover">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to={"/dashboard"} className="link link-hover">
                Dashboard
              </Link>
            </li>
            <li>
              <a className="link link-hover">About Us</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="">
          <h3 className="footer-title">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Email: support@booknest.com</li>
            <li>Phone: +880 1738-612728</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col md:items-end">
          <h3 className="footer-title">Follow Us</h3>

          <div className="flex gap-4 mt-3">
            {/* X (Twitter) */}
            <a className="hover:text-primary transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.804-7.596-6.646 7.596H.462l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.29 19.5h2.04L6.48 3.236H4.295L17.61 20.653z" />
              </svg>
            </a>

            {/* YouTube */}
            <a className="hover:text-primary transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.03 5.804 0 12c.03 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.196-.484-8.55-4.385-8.816zM9 16V8l8 4-8 4z" />
              </svg>
            </a>

            {/* Facebook */}
            <a className="hover:text-primary transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.667C14 5.711 14.192 5.333 15.115 5.333H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-sm border-t border-base-300">
        © {new Date().getFullYear()} Freelancer Bd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
