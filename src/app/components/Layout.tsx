import { Link, Outlet, useLocation } from "react-router";
import { Sparkles } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span className="text-2xl text-gray-900">SparkleClean</span>
            </Link>

            <div className="flex gap-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`transition-colors ${
                  isActive("/services")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${
                  isActive("/contact")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="text-xl">SparkleClean</span>
              </div>
              <p className="text-gray-400">
                Professional cleaning services for your home and office.
              </p>
            </div>

            <div>
              <h3 className="text-lg mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4">Contact Info</h3>
              <div className="text-gray-400 space-y-2">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@sparkleclean.com</p>
                <p>Hours: Mon-Sat, 8AM-6PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2026 SparkleClean. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
