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




