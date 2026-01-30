import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Hire Top Freelancers Worldwide",
      desc: "Connect with verified professionals and get your work done efficiently.",
      bg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      btnText: "Find Freelancers",
      link: "/freelancers",
    },
    {
      id: 2,
      title: "Post a Job. Get Proposals Fast.",
      desc: "Describe your project and receive offers from skilled freelancers.",
      bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      btnText: "Post a Job",
      link: "/post-job",
    },
    {
      id: 3,
      title: "Build Your Freelance Career",
      desc: "Apply for jobs, work with clients, and grow your professional journey.",
      bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      btnText: "Browse Jobs",
      link: "/jobs",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-[90vh] flex items-center justify-center text-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="relative z-10 max-w-3xl px-6 space-y-6">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {slide.title}
                </h1>

                <p className="text-gray-200 text-lg md:text-xl">{slide.desc}</p>

                <Link to={slide.link}>
                  <button className="btn btn-primary px-10 py-3 text-lg rounded-full">
                    {slide.btnText}
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
