import { useState } from "react";
import { Link } from "react-router";
import {
  Home,
  Building2,
  Sparkles,
  Trash2,
  Hammer,
  X,
  type LucideIcon,
} from "lucide-react";

interface Project {
  title: string;
  client: string;
  description: string;
  result: string;
}

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  projects: Project[];
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      icon: Home,
      title: "Residential Cleaning",
      description: "Complete home cleaning services including kitchens, bathrooms, bedrooms, and living areas.",
      features: [
        "Deep cleaning",
        "Regular maintenance",
        "Move-in/move-out cleaning",
        "Custom cleaning plans"
      ],
      projects: [
        {
          title: "Family Home Deep Clean",
          client: "Johnson Residence",
          description: "Complete deep cleaning of a 3,500 sq ft family home including all bedrooms, living areas, kitchen, and 3 bathrooms.",
          result: "Home was transformed with spotless floors, sanitized surfaces, and fresh carpets. The family reported improved air quality and a healthier living environment."
        },
        {
          title: "Move-Out Cleaning Service",
          client: "Smith Property",
          description: "Comprehensive move-out cleaning for a rental property to ensure full deposit return.",
          result: "Property passed landlord inspection with flying colors. All surfaces cleaned, carpets shampooed, and appliances detailed."
        },
        {
          title: "Weekly Maintenance Program",
          client: "Davis Family",
          description: "Ongoing weekly cleaning service for busy professional family with children and pets.",
          result: "Consistent clean home environment maintained year-round. Family saves 8+ hours weekly and enjoys more quality time together."
        }
      ]
    },
    {
      icon: Building2,
      title: "Commercial Cleaning",
      description: "Professional office and commercial space cleaning to maintain a productive work environment.",
      features: [
        "Office cleaning",
        "Retail space cleaning",
        "Restroom sanitization",
        "Floor care"
      ],
      projects: [
        {
          title: "Tech Startup Office",
          client: "InnovateTech Inc.",
          description: "Nightly cleaning service for a 10,000 sq ft tech office with open floor plan, conference rooms, and break areas.",
          result: "Improved employee satisfaction scores by 35%. Clean, organized workspace helped boost productivity and company morale."
        },
        {
          title: "Retail Store Chain",
          client: "Fashion Forward Boutiques",
          description: "Daily cleaning for 5 retail locations including floors, fitting rooms, displays, and restrooms.",
          result: "Enhanced customer experience with pristine shopping environment. Store reviews highlighted cleanliness as a key differentiator."
        },
        {
          title: "Medical Office Complex",
          client: "HealthFirst Clinic",
          description: "Specialized sanitization and cleaning for medical facility with strict hygiene requirements.",
          result: "Maintained 100% compliance with health regulations. Zero contamination incidents over 2 years of service."
        }
      ]
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Intensive cleaning service for those hard-to-reach areas and thorough sanitization.",
      features: [
        "Carpet cleaning",
        "Window washing",
        "Appliance cleaning",
        "Detailed dusting"
      ],
      projects: [
        {
          title: "Spring Deep Clean Project",
          client: "Anderson Estate",
          description: "Full-house deep clean including carpet steam cleaning, window washing (inside/out), appliance detailing, and baseboard cleaning.",
          result: "Home looked brand new. Removed years of built-up grime and restored original shine to all surfaces. Carpets looked like new."
        },
        {
          title: "Restaurant Kitchen Overhaul",
          client: "Bella Italia Restaurant",
          description: "Intensive deep clean of commercial kitchen including hood vents, grease traps, ovens, and floors.",
          result: "Passed health inspection with perfect score. Kitchen sparkled and met all commercial cleanliness standards."
        },
        {
          title: "Post-Renovation Deep Clean",
          client: "Martinez Home",
          description: "Complete deep clean after major kitchen and bathroom renovation to remove all construction dust and debris.",
          result: "Every surface detailed and sanitized. Home was move-in ready with no trace of construction mess remaining."
        }
      ]
    },
    {
      icon: Trash2,
      title: "Post-Construction Cleanup",
      description: "Specialized cleaning after renovations, repairs, or construction projects.",
      features: [
        "Dust removal",
        "Debris cleanup",
        "Surface polishing",
        "Final inspection"
      ],
      projects: [
        {
          title: "New Office Building",
          client: "Metro Business Park",
          description: "Post-construction cleanup of 25,000 sq ft new office building including all floors, windows, and common areas.",
          result: "Building was inspection-ready and move-in ready on schedule. Impressed general contractor and building owner with attention to detail."
        },
        {
          title: "Home Addition Project",
          client: "Taylor Residence",
          description: "Cleanup after 1,200 sq ft home addition including new master suite and expanded living room.",
          result: "Seamless integration of new and existing spaces. All construction dust removed, surfaces polished, and ready for furniture."
        },
        {
          title: "Retail Space Renovation",
          client: "Downtown Loft Apartments",
          description: "Post-renovation cleanup of converted retail space into 8 modern apartment units.",
          result: "Units were show-ready for prospective tenants. All 8 units rented within first week of listing thanks to pristine condition."
        }
      ]
    },
    {
      icon: Hammer,
      title: "Construction Services",
      description: "Renovation support, repairs, finishing work, and property improvement services.",
      features: [
        "Minor construction work",
        "Renovation support",
        "Repair and finishing work",
        "Site preparation"
      ],
      projects: [
        {
          title: "Retail Unit Fit-Out Support",
          client: "Metro Retail Group",
          description: "Assisted with interior partition adjustments, fixture preparation, minor repairs, and final finishing before store opening.",
          result: "Retail space was ready for merchandising ahead of schedule with clean finishes and a smooth handover."
        },
        {
          title: "Rental Property Renovation",
          client: "Greenline Property Holdings",
          description: "Completed light repair work, wall preparation, paint touch-ups, fixture fixes, and final construction cleanup between tenants.",
          result: "Property was prepared for listing quickly and presented as fresh, repaired, and move-in ready."
        },
        {
          title: "Office Refresh Project",
          client: "Northpoint Consulting",
          description: "Handled minor construction adjustments, patching, finishing, and cleaning for a working office refresh.",
          result: "Work was completed with minimal disruption, and the office reopened with a cleaner, more professional finish."
        }
      ]
    }
  ];

  return (
    <>
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-3xl text-gray-900">
                {selectedService.title} - Our Projects
              </h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedService.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200"
                >
                  <h3 className="text-2xl text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-blue-600 mb-4">
                    Client: {project.client}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-gray-700 mb-2">Project Description:</h4>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h4 className="text-green-800 mb-2">Results:</h4>
                    <p className="text-green-700">{project.result}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <Link
                to="/contact"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request a Quote for This Service
              </Link>
            </div>
          </div>
        </div>
      )}

      <div>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl text-gray-900 mb-6">
              Our Cleaning & Construction Services
            </h1>
            <p className="text-xl text-gray-600">
              From residential and commercial cleaning to construction support and post-project handovers, we tailor the work to your property.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-600 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-blue-600 hover:text-blue-700">
                    Click to view our projects →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-gray-900 mb-6">
            Custom Cleaning and Construction Plans Available
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Every space is unique. We'll work with you to create a service plan that fits your cleaning, construction, maintenance, and budget needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request a Custom Quote
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
