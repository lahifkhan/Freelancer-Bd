import Marquee from "react-fast-marquee";
import { FaBriefcase } from "react-icons/fa";
import laurelImg from "../../../assets/laurel.png";

const FeaturedFreelancers = () => {
  const freelancers = [
    {
      id: 1,
      name: "Leslie Alexander",
      projects: 25,
      img: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      projects: 40,
      img: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Esther Howard",
      projects: 30,
      img: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Shikhon Islam",
      projects: 18,
      img: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Kawser Ahmed",
      projects: 12,
      img: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Brooklyn Simmons",
      projects: 50,
      img: "https://i.pravatar.cc/150?img=6",
    },
  ];

  return (
    <section className="py-16 bg-base-100 w-11/12 mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <p className="text-secondary font-bold text-lg">Our Freelancers</p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          Featured Freelancers You’ll Love
        </h2>

        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Discover top freelancers and explore their completed projects, all
          ready to help you succeed.
        </p>
      </div>

      {/* Marquee */}
      <Marquee
        speed={50}
        pauseOnHover={true}
        direction="right"
        gradient={true}
        gradientColor={[245, 245, 245]}
      >
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="mx-4">
            <div className="card w-60 bg-base-100 shadow-md hover:shadow-xl transition">
              <div className="card-body items-center text-center">
                <div className="relative w-35 h-35 flex items-center justify-center">
                  <img
                    src={laurelImg}
                    alt="laurel"
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {/* Freelancer Image */}
                  <img
                    src={freelancer.img}
                    alt={freelancer.name}
                    className="w-20 h-20 rounded-full object-cover z-10
                               border-2 border-warning bg-base-100"
                  />
                </div>

                {/* Freelancer Info */}
                <h2 className="card-title text-base mt-3">{freelancer.name}</h2>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaBriefcase className="text-warning" />
                  {freelancer.projects} Completed Projects
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default FeaturedFreelancers;
