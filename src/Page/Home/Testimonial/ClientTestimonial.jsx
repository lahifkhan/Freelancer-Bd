import React from "react";
import Marquee from "react-fast-marquee";
import { FaStar, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    text: "Hiring through this platform was effortless. I found a skilled freelancer who understood my requirements and delivered high-quality work right on time.",
    name: "Ronald Richards",
    title: "Startup Founder",
    img: "https://i.pravatar.cc/100?img=12",
    rating: 4,
  },
  {
    id: 2,
    text: "The platform connects you with talented professionals quickly. Clear communication, secure payments, and smooth project management made the experience stress-free.",
    name: "Wade Warren",
    title: "Product Manager",
    img: "https://i.pravatar.cc/100?img=20",
    rating: 5,
  },
  {
    id: 3,
    text: "As a client, I value trust and reliability. This marketplace delivered both. The freelancer exceeded expectations, and the payment process felt completely secure.",
    name: "Leslie Alexander",
    title: "Creative Director",
    img: "https://i.pravatar.cc/100?img=5",
    rating: 5,
  },
];

const ClientTestimonial = () => {
  return (
    <div className="py-12 w-11/12 mx-auto">
      {/* Section Title */}
      <div className="text-center">
        <p className="text-secondary font-bold text-xl mb-2">
          What Our Clients Say
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-6 text-primary">
          Trusted by Clients Worldwide
        </h2>

        <p className="text-accent mb-8 max-w-xl mx-auto">
          Real feedback from clients who hired freelancers and completed
          projects successfully through our platform.
        </p>
      </div>

      <Marquee
        pauseOnHover
        speed={45}
        gradient={false}
        className="space-x-6 p-3"
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="relative bg-base-100 w-96 p-6 rounded-xl shadow-xl mx-4"
          >
            {/* Accent Shape */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[80px] border-l-primary border-t-[80px] border-t-transparent rounded-bl-xl"></div>

            {/* Review Text */}
            <p className="text-gray-500 text-[15px] leading-relaxed mb-6 relative z-10">
              {item.text}
            </p>

            {/* Client Info */}
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow"
                />

                <div>
                  <h4 className="font-semibold text-primary">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.title}</p>

                  {/* Rating */}
                  <div className="flex text-orange-400 mt-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {[...Array(5 - item.rating)].map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientTestimonial;
