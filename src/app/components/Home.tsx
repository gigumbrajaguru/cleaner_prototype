import { Link } from "react-router";
import {
  Building2,
  CheckCircle,
  Hammer,
  HardHat,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { ClientReviews } from "./ClientReviews";

const serviceGroups = [
  {
    icon: Sparkles,
    title: "Cleaning services",
    description:
      "Routine, deep, residential, commercial, and move-ready cleaning handled by trained teams.",
    items: ["Home and office cleaning", "Deep cleaning", "Floor and surface care"],
  },
  {
    icon: HardHat,
    title: "Construction services",
    description:
      "Renovation support, repairs, finishing work, and construction cleanup for handover-ready properties.",
    items: ["Renovation support", "Minor construction work", "Final handover cleanup"],
  },
  {
    icon: Hammer,
    title: "Property maintenance",
    description:
      "Practical site support for owners, landlords, offices, and contractors who need one dependable team.",
    items: ["Repair coordination", "Post-project detailing", "Custom service plans"],
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "One accountable team",
    description:
      "Cleaning, construction support, and final detailing are coordinated through the same service team.",
  },
  {
    icon: Building2,
    title: "Residential and commercial",
    description:
      "We support homes, offices, rental properties, retail spaces, and active renovation sites.",
  },
  {
    icon: Star,
    title: "Finish-focused standards",
    description:
      "The final look matters, from polished fixtures and dust-free rooms to neat construction finishes.",
  },
  {
    icon: CheckCircle,
    title: "Flexible project scope",
    description:
      "Book a single clean, a construction cleanup, or a combined service plan around your schedule.",
  },
];

export function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Construction_work_area_%28Unsplash%29.jpg/2560px-Construction_work_area_%28Unsplash%29.jpg"
          alt="Construction work area with a yellow staircase"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-slate-950/65" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-amber-300">
              Cleaning + construction services
            </p>
            <h1 className="mb-6 text-4xl leading-tight text-white sm:text-5xl">
              Professional Cleaning and Construction Services You Can Trust
            </h1>
            <p className="mb-8 max-w-2xl text-xl leading-8 text-slate-200">
              From spotless homes and offices to renovation support and
              post-construction handovers, we help properties look finished,
              functional, and ready to use.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700"
              >
                Get a Free Quote
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-8 py-3 text-white transition-colors hover:bg-white hover:text-slate-900"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-600">
              What we do
            </p>
            <h2 className="mb-4 text-3xl text-gray-900">
              Cleaning and construction support for better property handovers
            </h2>
            <p className="text-lg text-gray-600">
              Choose a single service or combine cleaning, construction, and
              maintenance work into one project plan.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {serviceGroups.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="mb-3 text-2xl text-gray-900">{service.title}</h3>
                  <p className="mb-5 text-gray-600">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl text-gray-900">
            Why Choose SparkleClean & Build?
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div key={reason.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl text-gray-900">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ClientReviews />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-blue-600 p-8 text-center text-white sm:p-12">
            <h2 className="mb-4 text-3xl">
              Ready to Plan Your Cleaning or Construction Work?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Contact us today for a free, no-obligation quote.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-blue-600 transition-colors hover:bg-gray-100"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
