import React from "react";
import { FaUserCheck, FaShieldAlt, FaClock } from "react-icons/fa";
import Lottie from "lottie-react";
import freelancer from "../../../assets/freelancer.json"; // new lottie

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserCheck className="text-3xl text-primary" />,
      title: "Verified Freelancers",
      desc: "Work with skilled and verified professionals you can trust.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-primary" />,
      title: "Secure Payments",
      desc: "Escrow-based payment system ensures safety for both sides.",
    },
    {
      icon: <FaClock className="text-3xl text-primary" />,
      title: "On-Time Delivery",
      desc: "Freelancers are committed to deadlines and project milestones.",
    },
  ];

  return (
    <section className="px-4 md:px-16 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12">
        {/* LEFT: Lottie Animation */}
        <div className="flex justify-center">
          <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[5 40px] lg:w-[420px] lg:h-[420px]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>

            {/* Lottie */}
            <div className="flex items-center justify-center w-full h-full bg-base-100 shadow-md rounded-3xl p-4">
              <Lottie animationData={freelancer} loop />
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div>
          <p className="text-primary font-bold text-xl mb-2">
            Why Choose Our Platform?
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-6 text-primary">
            Connecting Clients With Trusted Freelancers
          </h2>

          <p className="text-accent mb-8 max-w-xl">
            Our freelance marketplace helps businesses and individuals hire
            talented professionals with confidence, transparency, and speed.
          </p>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="p-4 rounded-lg bg-primary/10 mr-4 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-primary">
                    {item.title}
                  </h4>
                  <p className="text-accent text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
