import { FaUserTie, FaBriefcase, FaShieldAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Verified Freelancers",
    desc: "Work with trusted and skilled professionals.",
    icon: <FaUserTie className="text-white text-2xl" />,
  },
  {
    id: 2,
    title: "Post Jobs Easily",
    desc: "Create jobs and receive proposals in minutes.",
    icon: <FaBriefcase className="text-white text-2xl" />,
  },
  {
    id: 3,
    title: "Secure Payments",
    desc: "Escrow-based payment for safe transactions.",
    icon: <FaShieldAlt className="text-white text-2xl" />,
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "Our support team is always here to help.",
    icon: <FaHeadset className="text-white text-2xl" />,
  },
];

const Feature = () => {
  return (
    <section className="mt-16 w-11/12 mx-auto">
      {/* Section Title */}
      <p className="text-primary font-bold text-xl mb-2" data-aos="fade-up">
        Why Choose Our Freelance Platform
      </p>

      <div
        className="bg-base-300 rounded-xl py-8 px-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="flex items-center space-x-4 justify-center"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              {/* Icon Box */}
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary shadow-lg">
                {feature.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
