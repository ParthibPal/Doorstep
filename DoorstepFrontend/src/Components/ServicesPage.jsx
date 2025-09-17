import React, { useState, useEffect } from 'react';
import Card from "../Components/ActualComponent/Card.jsx";
import "../Components/Component_css/ServicesPage.css";
import PopupCard from './ActualComponent/PopupCard.jsx';
import servicesheader from "../images/services-header.png"
import toast from 'react-hot-toast';
const ServicesPage = (props) => {
  const [modalId, setModalId] = useState(false); ///////////////////////////////////
  const [fetchedData, setFetchedData] = useState(null);

  const [cards, setCards] = useState([]); // State to store fetched cards

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cards`)// Fetch cards from backend
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => toast.success("This service currently unavailable ⚠"));
  }, []);




  const toggleModal = async (category) => {
    // If the category is the same as the previous one, close the modal, else set the new category.
    const newCategory = modalId === category ? null : category;
    setModalId(newCategory);

    if (newCategory) {
      // console.log("Category sending to backend:", category);

      try {
        // Fetch the data based on the selected category
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cards/${category}`)

        if (response.ok) {
          const data = await response.json();
          // console.log('Fetched Data:', data);
          // console.log(localStorage.getItem('loggedInEmail'));
          setFetchedData(data); // Store the fetched data in state

        } else {
          console.error('Error: Unable to fetch service data', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    } else {
      setFetchedData(null); // Clear data if modal is closed
    }
  };

  return (
    <>
      <div className="services-page-container">
        <div className="header-services">
          <img src={servicesheader} alt="Services Header" />
          <div className='header-heading'>
            <h1 className="service-h2">Explore Local Services</h1>
            <p className="service-p">Discover a wide range of services offered by local professionals</p>
          </div>
        </div>

        <section className="services-card">
          {[...new Map(cards.map(card => [card.category, card])).values()].map((card) => (
            <Card
              onClick={() => toggleModal(card.category)}
              key={card._id}
              id={card._id}
              imageSrc={card.imageSrc}
              name={card.category}
              desc={card.serviceDescription}
            />
          ))}
        </section>

      </div>

      {/* Modal (Rendered only if category is selected) */}
      {modalId && (
        <div className="modal">
          <div className="overlay" onClick={() => toggleModal(modalId)}></div>
          <div className="modal-content">
            {/* <button onClick={() => toggleModal(modalId)} className="close-modal-btn" style={{marginLeft:"90vh", marginTop:'3vh', cursor:"pointer"}}>
              <i className="fa-solid fa-xmark"></i>
            </button> */}
            <PopupCard category={modalId} fetchedData={fetchedData} /> {/* Pass selected category to PopupCard */}
          </div>
        </div>
      )}
    </>
  );


}

export default ServicesPage;
