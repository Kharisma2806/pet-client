import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
//import { useContext } from "react";
//import { AuthContext } from "../../context/auth.context";
import DashboardImg from "../../images/bg-landing-2.jpg";
import "./OwnerDashboard.css"; // Import your CSS file for styling

function OwnerDashboard() {
  const { ownerId } = useParams();
  const [formData, setFormData] = useState(null);
  //const [ownerPets, setOwnerPets] = useState([]);
  //const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        console.log("Fetching pet details from the server...");
        const response = await axios.get(`http://localhost:5005/${ownerId}`);
        console.log("Server response:", response.data);
        const petData = response.data;
        setFormData(petData);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    if (ownerId) {
      fetchPetDetails();
    }
  }, [ownerId]);

  return (
    <div
      className="owner-dashboard-container flex items-center justify-center"
      style={{
        backgroundImage: `url(${DashboardImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "saturate(25%)",
        // Add any other inline styles as needed
      }}
    >
      <div className="text-center px-40 py-8 rounded-lg shadow-lg bg-white bg-opacity-70">
        <h1 className="text-4xl underline font-semibold text-black mb-4">
          Your Pet
        </h1>
        {formData ? (
          formData.map((d) => (
            <div key={d._id} className="mb-8">
              {d.image && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Image:</h2>
                  <Image
                    style={{ width: 200 }}
                    cloudName="dnstseshn"
                    publicId={d.image}
                  />
                </div>
              )}
              <p className="text-lg">Name: {d.name}</p>
              <p className="text-lg">Category: {d.category}</p>
              <p className="text-lg">Type: {d.type}</p>
              <p className="text-lg">Age: {d.age}</p>
              <p className="text-lg">Temper: {d.temper}</p>
              <p className="text-lg">
                Special Needs: {d.special_needs ? "Yes" : "No"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-lg">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;
