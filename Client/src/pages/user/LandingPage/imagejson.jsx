import Lottie from "lottie-react";
import { useEffect, useState } from "react";

function LottieAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/uploads/image-1743784483518.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div>
      {animationData ? (
        <Lottie animationData={animationData} />
      ) : (
        <p>Loading animation...</p>
      )}
    </div>
  );
}

export default LottieAnimation;
