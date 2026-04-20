import { Link } from "react-router";
import { CheckCircle, Star } from "lucide-react";

export function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl text-gray-900 mb-6">
              Professional Cleaning Services You Can Trust
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We provide top-quality cleaning services for homes and offices.
              Experience the difference of a truly clean space.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get a Free Quote
              </Link>
              <Link
                to="/services"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-gray-900 mb-12">
            Why Choose SparkleClean?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">100% Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                We're not happy until you're happy. If something isn't right, we'll make it right.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Experienced Professionals</h3>
              <p className="text-gray-600">
                Our team is trained, vetted, and experienced in all types of cleaning services.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Eco-Friendly Products</h3>
              <p className="text-gray-600">
                We use environmentally safe cleaning products that are tough on dirt but gentle on your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl mb-4">
              Ready to Experience a Cleaner Space?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us today for a free, no-obligation quote
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
