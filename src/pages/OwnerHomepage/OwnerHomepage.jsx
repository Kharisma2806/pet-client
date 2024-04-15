import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { AuthContext } from "../../context/auth.context";
import dogPhoto from "../../images/cutest-dog-breeds-jpg.jpg";

function PetForm({ onSubmit }) {
  const [imageSelected, setSelectedImage] = useState("");
  const [publicId, setPublicId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("");
  const [temper, setTemper] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState(false);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "jgklgkwm");

    axios
      .post("https://api.cloudinary.com/v1_1/dnstseshn/image/upload", formData)
      .then((response) => {
        console.log(response);
        setPublicId(response.data.public_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    // Add validation to check if age is a valid number
    // if (!Number.isInteger(age) || age < 0) {
    //   console.error("Invalid age. Please enter a valid positive number.");
    //   return;
    // }
    onSubmit({
      name,
      selectedCategory,
      type,
      age,
      temper,
      special_needs: specialNeeds,
      image: publicId,
    });

    // Reset the form fields
    setSelectedImage("");
    setPublicId("");
    setName("");
    setSelectedCategory("");
    setType("");
    setAge(0);
    setTemper("");
    setSpecialNeeds(false);
  };

  // const handleChangeAge = (event) => {
  //   const value = event.target.value;
  //   if (value === "" || isNaN(value)) {
  //     setAge(0);
  //   } else {
  //     setAge(parseInt(value));
  //   }
  // };

  return (
    <div
      className="px-8 py-4"
      // className="px-8 py-4 flex flex-col items-center"
      style={{
        backgroundImage: `url(${dogPhoto})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        //backgroundColor: "rgba(255, 255, 255, 0.5)", // Set the opacity (alpha) value here
        backdropFilter: "saturate(25%)",
      }}
    >
      <input
        type="file"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
      <button
        onClick={uploadImage}
        className="transition ease-in-out delay-150 bg-gray-500 hover:bg-gray-700 duration-300 px-4 py-2 rounded-md text-white"
      >
        Upload Image
      </button>
      <br />
      <br />
      {publicId && (
        <Image
          style={{ width: 200 }}
          cloudName="dnstseshn"
          publicId={publicId}
        />
      )}

      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">Select category</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="small_animal">Small Animal</option>
        </select>
      </div>
      <br />
      <div>
        <label>Type:</label>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Age:</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Temper:</label>
        <input
          type="text"
          placeholder="Temper"
          value={temper}
          onChange={(event) => setTemper(event.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Special Needs:</label>
        <input
          type="checkbox"
          checked={specialNeeds}
          onChange={(event) => setSpecialNeeds(event.target.checked)}
        />
      </div>
      <br />
      <button
        onClick={handleSubmit}
        className="transition ease-in-out delay-150 bg-orange-300 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-300 px-4 py-2 rounded-md text-white"
      >
        Submit
      </button>
    </div>
  );
}

function OwnerHomepage() {
  const navigate = useNavigate();
  const { owner } = useContext(AuthContext);

  const handleSubmit = (formData) => {
    // Get the JWT token from wherever you have stored it (e.g., localStorage)
    const authToken = localStorage.getItem("authToken");

    // Check if the token is available
    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }

    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    // Make the API call to add the new pet
    axios
      .post("http://localhost:5005/pet/petprofile", formData, config)
      .then((response) => {
        const data = response.data;
        console.log(data);
        // After successful addition, navigate to the dashboard
        if (owner && owner._id) {
          navigate(`/ownerdashboard/${data.owner._id}`);
        } else {
          console.error("User ID not found.");
        }
      })
      .catch((error) => {
        console.error(error);
        // Add any additional logic for error handling
      });
  };

  return (
    <div className="bg-zinc-100 text-zinc-800 min-h-screen">
      <h1 className="text-5xl px-8 py-8 font-bold text-lime-800">Add a Pet</h1>
      <PetForm onSubmit={handleSubmit} />
    </div>
  );
}

export default OwnerHomepage;
