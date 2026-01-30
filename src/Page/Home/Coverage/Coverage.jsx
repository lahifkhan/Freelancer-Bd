import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon issue (Vercel production fix)
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const Coverage = () => {
  const [stores, setStores] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/warehouse.json")
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase();

    const district = stores.find((store) =>
      store.district.toLowerCase().includes(location),
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 13, {
        animate: true,
      });
    }
  };

  const centerPosition = [23.685, 90.3563]; // Bangladesh center

  return (
    <section className="px-4 md:px-16 py-20">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-secondary font-bold text-lg">Our Coverage</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          Connecting Freelancers with Opportunities Across Bangladesh
        </h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Your Next Freelancer, Just a Click Away.
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center my-8 gap-2">
        <input
          type="search"
          name="location"
          placeholder="Search District"
          className="input input-bordered w-60"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Map */}
      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={centerPosition}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full"
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stores.map((store, index) => (
            <Marker key={index} position={[store.latitude, store.longitude]}>
              <Popup>
                <strong>{store.district}</strong>
                <br />
                {store.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
