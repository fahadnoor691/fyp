import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AboutUsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex items-center gap-4 justify-center h-screen">
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">About Rolling Rentals</h1>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Welcome to Rolling Rentals
              </h2>
              <p className="text-lg">
                Your premier destination for seamless and convenient online car
                rentals. At Rolling Rentals, we believe in redefining the way
                you experience car rentals, making it not just a service but an
                unforgettable journey.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-lg">
                Founded in 2023, Rolling Rentals was born out of a shared
                passion for travel and a vision to transform the car rental
                industry. Frustrated by the limitations of traditional car
                rental services, we set out to create a platform that puts you,
                the customer, at the center of the experience.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg">
                Our mission is to provide you with more than just a vehicle; we
                aim to offer a hassle-free, transparent, and enjoyable rental
                experience. Whether you're a traveler seeking adventure or a
                local in need of a reliable vehicle, Rolling Rentals is here to
                cater to your every need.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Why Choose Rolling Rentals?
              </h2>
              <p className="text-lg">
                User-Friendly Platform: Our website is designed with you in
                mind, ensuring a seamless and intuitive booking process. We
                prioritize user experience, making it easy for you to find,
                book, and manage your rentals with just a few clicks.<br></br>
                <br></br>Wide Range of Vehicles: From sleek sedans to spacious
                SUVs, our diverse fleet caters to all your transportation needs.
                Whether it's a weekend getaway or a month-long road trip, we
                have the perfect vehicle for every occasion.
                <br></br>
                <br></br>
                Transparent Pricing: Say goodbye to hidden fees and unexpected
                charges. At Rolling Rentals, we believe in transparency. Our
                pricing is straightforward, with no surprises, so you can budget
                confidently.
                <br></br>
                <br></br>
                Customer-Centric Approach: Your satisfaction is our priority.
                Our dedicated customer support team is available around the
                clock to assist you with any queries or concerns. We value your
                feedback and continuously strive to enhance our services.
                <br></br>
              </p>
              {/* Add more content for 'Wide Range of Vehicles', 'Transparent Pricing', 'Customer-Centric Approach' */}
            </div>

            <div className="text-lg mb-8">
              {/* Add content for 'Join the Rolling Rentals Experience', 'Happy travels!', etc. */}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Join the Rolling Rentals Experience
              </h2>
              <p className="text-lg">
                Embark on a journey with Rolling Rentals, where every mile is a
                memory waiting to be made. We invite you to explore the world
                with the freedom and flexibility our rental services provide.
                Thank you for choosing Rolling Rentals – your trusted partner on
                the road.
                <br></br>
                <br></br>
                Happy travels!
                <br></br>
                <br></br>
                The Rolling Rentals Team
                <br></br>
                <br></br>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;
