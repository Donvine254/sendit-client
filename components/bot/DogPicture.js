// new file called DogPicture.jsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message);
      });
  }, []);

  return (
    <div>
      <Image
        src={imageUrl}
        alt="a dog"
        height={200}
        width={200}
        className="h-full w-full"
      />
    </div>
  );
};

export default DogPicture;
