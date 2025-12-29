// import { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../../common/config";

// const AllPropertyImages = ({}) => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get(`${config.API_URL}/api/property`, {
//           signal: controller.signal,
//         });
//         setProperties(response.data.data);
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log("Request canceled:", error.message);
//         } else {
//           console.error("Error fetching properties:", error);
//         }
//       }
//     };

//     fetchProperties();

//     return () => controller.abort();
//   }, []);

//   // Extract relevant data from properties
//   const allPropertiesData = properties.map((property) => ({
//     images: property.image.map((img) => img.image),
//     seo_title: property.seo_title || "No Title",
//     community: property.communities || "No Community",
//     developer: property.developers || "No Developer",
//   }));

//   //   setAllPropertyImages(allPropertiesData);
//   console.log(allPropertiesData);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {allPropertiesData.length > 0 ? (
//         allPropertiesData.map((property, index) => (
//           <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
//             <h2 className="text-lg font-bold">{property.seo_title}</h2>
//             <p className="text-sm text-gray-600">
//               Community: {property.community}
//             </p>
//             <p className="text-sm text-gray-600">
//               Developer: {property.developer}
//             </p>
//             <div className="mt-2 grid grid-cols-2 gap-2">
//               {property.images.map((imgUrl, imgIndex) => (
//                 <img
//                   key={imgIndex}
//                   src={imgUrl}
//                   alt={`Property ${index} - Image ${imgIndex}`}
//                   className="w-full h-auto rounded-lg shadow-sm"
//                 />
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No properties found.</p>
//       )}
//     </div>
//   );
// };

// export default AllPropertyImages;

const AllPropertyImages = ({ allPropertiesData }) => {
  // Flatten all images with their corresponding seo_title
  const allImages = allPropertiesData.flatMap((property) =>
    property.images.map((image) => ({
      image,
      seo_title: property.seo_title,
    }))
  );

  console.log(allImages);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allImages.length > 0 ? (
        allImages.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
            <p className="text-lg font-bold">{item.seo_title}</p>
            <img
              src={item.image}
              alt={`Property Image ${index}`}
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default AllPropertyImages;
