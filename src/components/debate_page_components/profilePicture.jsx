import { useState } from "react";

const ProfilePicture = () => {
  const [imageUrl, setImageUrl] = useState("…/image/upload/v1741393669/agbrssjkr6npege84xoh.jpg");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Uploaded Image URL:", data.imageUrl);

    } catch (error) {
      console.error("Upload failed:", error);
    }
};


  return (
    <div>
      <img src={imageUrl} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default ProfilePicture;
