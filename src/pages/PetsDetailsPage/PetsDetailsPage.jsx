import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PetDetailsPage = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/pets/${petId}`);
        //const res = await fetch(`https://petapp.fly.dev/api/pets/${petId}`);
        const petData = await res.json();
        setPet(petData);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  return (
    <div>
      <h1>Pet Details Page</h1>
      <h2>Pet ID: {petId}</h2>
      <div>
        <h3>Name: {pet.name}</h3>
        <p>Category: {pet.category}</p>
        <p>Type: {pet.type}</p>
        <p>Age: {pet.age}</p>
        <p>Temper: {pet.temper}</p>
        <p>Special Needs: {pet.special_needs}</p>
        <img src={pet.image} alt={pet.name} />
      </div>
    </div>
  );
};

export default PetDetailsPage;
