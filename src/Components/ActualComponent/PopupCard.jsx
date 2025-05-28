// import React, {useState} from 'react'
// import './ActualComponent_css/PopupCard.css'
// import PopupcardContents from './PopupcardContents'
// import servicepopuplogo from '../../Images/service-popup-logo.png'

// const PopupCard = (id) => {

  

//   return (

//     <>
//       <div className='popupcard-container'>
//         <div className='popupcard-heading'>
//           <img src={servicepopuplogo}/>
//           <h2>Services Providers List</h2>
//         </div>
//         <div className='popupcard-content'>
//           <PopupcardContents img={"/images/Samrat.jpg"} name={'Samrat Kumar'} phone={'7980660633'} location={'Bally'} salesdata={'660'} rating={'4.5'} joiningdate={'2001'}/>
//           <PopupcardContents img={"/images/Softy.jpg"} name={'Softy Sharma'} phone={'6289992544'} location={'Hindmotor'} salesdata='532' rating='3.9' joiningdate='2002'/>
//           <PopupcardContents img={"/images/Supriti.jpg"} name={'Supriti Das'} phone={'8697219189'} location={'Liluah'} salesdata='532' rating='4.1' joiningdate='2002'/>
//           <PopupcardContents img={"/images/Parthib.jpg"} name={'Parthib Pal'} phone={'8777246552'} location={'Uttarpara'} salesdata='532' rating='4.9' joiningdate='2002'/>
//           <PopupcardContents img={"/images/Rajdeep.jpg"} name={'Rajdeep Patra'} phone={'6290671725'} location={'Maniktala'} salesdata='532' rating='3.5' joiningdate='2002'/>
          
//         </div>

//       </div>

//     </>
//   )
// }

// export default PopupCard






import React from 'react';
import './ActualComponent_css/PopupCard.css';
import PopupcardContents from './PopupcardContents';
import servicepopuplogo from '../../Images/service-popup-logo.png';

const PopupCard = ({ fetchedData }) => {  // <-- Accept prop
  // console.log('fetchedData:', fetchedData); 
  return (
    <>
      <div className='popupcard-container'>
        <div className='popupcard-heading'>
          <img src={servicepopuplogo} alt="Service Popup Logo"/>
          <h2>Services Providers List</h2>
        </div>

        <div className='popupcard-content'>
          {fetchedData && fetchedData.length > 0 ? (   // Check if data exists
            fetchedData.map((provider, index) => (
              <PopupcardContents
                key={provider.id || index}               
                id={provider._id}
                img={provider.imageSrc}                // Use actual field names from backend response
                name={provider.name}
                phone={provider.mobileNumber}
                location={provider.serviceLocation}
                serviceCost={provider.serviceCost}   
                salesdata={15}
                rating={5}
                joiningdate={'01-12-2025'}
                description= {provider.serviceDescription}
                serviceName= {provider.serviceName}
                providerEmail = {provider.email}
                category = {provider.category}
              />
            ))
          ) : (
            <p>No service providers found for this category.</p>
          )}
        </div>

      </div>
    </>
  );
}

export default PopupCard;




// import React, { useState } from "react";
// import "./ActualComponent_css/PopupCard.css";
// import PopupcardContents from "./PopupcardContents";
// import servicepopuplogo from "../../Images/service-popup-logo.png";
// import { CartState } from "../CartOperations/Context";

// const PopupCard = () => {
//   const { state: { products } } = CartState();
//   const [sortOrder, setSortOrder] = useState(""); // Sorting state
//   const [selectedPerson, setSelectedPerson] = useState(null); // ✅ Track selected person
//   const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Track modal visibility

//   // Sorting function
//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortOrder === "lowToHigh") {
//       return a.price - b.price;
//     } else if (sortOrder === "highToLow") {
//       return b.price - a.price;
//     }
//     return 0; // Default (no sorting)
//   });

//   // ✅ Handle card click
//   const handleCardClick = (service) => {
//     setSelectedPerson(null); // Ensure re-render
//     setTimeout(() => setSelectedPerson(service), 0); // ✅ Update with new data
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="popupcard-container">
//       <div className="popupcard-heading">
//         <img src={servicepopuplogo} alt="Service Popup Logo" />
//         <h2>Services Providers List</h2>
//       </div>

//       {/* Sorting Controls */}
//       <div className="sort-controls">
//         <button onClick={() => setSortOrder("lowToHigh")}>Sort: Low to High</button>
//         <button onClick={() => setSortOrder("highToLow")}>Sort: High to Low</button>
//       </div>

//       <div className="popupcard-content">
//         {sortedProducts.map((service, index) => (
//           <div key={service.id || index} onClick={() => handleCardClick(service)}>
//             <PopupcardContents {...service} />
//           </div>
//         ))}
//       </div>

//       {/* ✅ Modal to Show Selected Person */}
//       {isModalOpen && selectedPerson && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close-btn" onClick={() => setIsModalOpen(false)}>×</span>
//             <PopupcardContents {...selectedPerson} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PopupCard;
