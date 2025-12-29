import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LottieImageCompo = ({ url, alt, className }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load Lottie JSON:", err));
  }, [url]);

  return url?.endsWith(".json") ? (
    data ? (
      <Lottie animationData={data} loop autoplay className={className} />
    ) : (
      <div
        className={`${className} flex items-center justify-center text-sm text-gray-500`}
      >
        Loading...
      </div>
    )
  ) : (
    <img src={url} alt={alt} className={className} />
  );
};

export default LottieImageCompo;
