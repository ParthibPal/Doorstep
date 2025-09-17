import React, { useState } from "react"; // Import React and useState

const AddCard = () => {
  const [name, setName] = useState(""); // State for Card Name
  const [desc, setDesc] = useState(""); // State for Description
  const [image, setImage] = useState(null); // State for Image file

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(); // Create form data object
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("image", image);

    // Send form data to backend
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cards/addCard`, {
      method: "POST",
      body: formData,
      credentials: "include" // if your backend uses sessions or cookies
    });

    const data = await response.json();
    if (response.ok) {
      alert("✅ Card added successfully!"); // Success message
    } else {
      alert("❌ Error: " + data.message); // Error message
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "200px" }}>
      <input type="text" placeholder="Card Name" onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} required />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Card</button>
    </form>
  );
};

export default AddCard;
