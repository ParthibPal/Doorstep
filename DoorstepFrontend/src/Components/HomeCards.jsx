import React, { useRef, useState, useEffect } from 'react';
import './Component_css/HomeCards.css';
import { useNavigate } from 'react-router-dom';
import Card from "../Components/ActualComponent/Card.jsx";

import PopupCard from './ActualComponent/PopupCard';
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import images
import CleaningServices from '../Images/Cleaning-Services.png';
import CarpetcleaningServices from '../Images/Carpetcleaning-Services.png';
import ComputerrepairServices from '../Images/Computerrepair-Services.png';
import ElectricianServices from '../Images/Electrician-Services.png';
import EventplanningServices from '../Images/Eventplanning-Services.png';
import FitnessServices from '../Images/Fitness-Services.png';
import GraphicdesignServices from '../Images/Graphicdesign-Services.png';
import HandymanServices from '../Images/Handyman-Services.png';
import InteriordesignServices from '../Images/Interiordesign-Services.png';
import LawncareServices from '../Images/Lawncare-Services.png';
import LegalServices from '../Images/Legal-Services.png';
import MessagetherapyServices from '../Images/Messagetherapy-Services.png';
import MovingServices from '../Images/Moving-Services.png';
import PhotographyServices from '../Images/Photography-Services.png';
import PaintingServices from '../Images/Painting-Services.png';
import PlumbingServices from '../Images/Plumbing-Services.png';
import TutorServices from '../Images/Tutor-Services.png';
import MoreServices from '../Images/More-Services.png';
import HouseCleaning from '../Images/House-Cleaning.jpg';
import CarpetCleaning from '../Images/Carpet-Cleaning.jpg';
import CarCleaning from '../Images/Car-Cleaning.jpg';
import ComputerRepair from '../Images/Computer-Repair.jpg';
import PlumbingRepair from '../Images/Plumbing-Repair.jpg';
import HandymanRepair from '../Images/Handyman-Repair.jpg';
import LegalService from '../Images/Legal-Service.jpg';
import MovingService from '../Images/Moving-Service.jpg';
import TutorService from '../Images/Tutor-Service.jpg';
import ElectricalNeeds from '../Images/Electrical-Needs.jpg';
import BodymessageNeeds from '../Images/Bodymessage-Needs.jpg';
import LawncareNeeds from '../Images/lawncare-Needs.jpg';
import PersonalStylist from "../Images/PersonalStylist.jpg"
import LanguageLessons from "../Images/Language Lessons.jpg"


import InteriorDesign from '../Images/interior-design.jpg';
import Cleaning from '../Images/cleaning-services.jpg';
import MusicLessons from '../Images/music-lessons.jpg';
import EventPlanning from '../Images/event-planning.jpg';
import Electrician from '../Images/electrician-services.jpg';
import WebDevelopment from '../Images/web-development.jpg';
import PhotoServices from '../Images/photo-services.jpg';
const HomeCards = (props) => {
  const navigate = useNavigate();
  const [modalId, setModalId] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://doorstep-backend-yesa.onrender.com/api/cards")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  const toggleModal = async (category) => {
    const newCategory = modalId === category ? null : category;
    setModalId(newCategory);

    if (newCategory) {
      try {
        const response = await fetch(`https://doorstep-backend-yesa.onrender.com/api/cards/${category}`);
        if (response.ok) {
          const data = await response.json();
          setFetchedData(data);
        } else {
          console.error('Error fetching service data');
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
      {/* Slider Container */}
      <div className='heading-slider-container'>
        <div className='heading-slider'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
          >
            
            <SwiperSlide><img src={InteriorDesign} alt="Interior Design" /></SwiperSlide>
            <SwiperSlide><img src={Cleaning} alt="Cleaning Services" /></SwiperSlide>
            <SwiperSlide><img src={MusicLessons} alt="Music Lessons" /></SwiperSlide>
            <SwiperSlide><img src={EventPlanning} alt="Event Planning" /></SwiperSlide>
            <SwiperSlide><img src={Electrician} alt="Electrician Services" /></SwiperSlide>
            <SwiperSlide><img src={WebDevelopment} alt="Web Development" /></SwiperSlide>
            <SwiperSlide><img src={PhotoServices} alt="Photo Services" /></SwiperSlide>
          </Swiper>
        </div>
      </div>

      <hr className='homecards-hr' />

      {/* Service Conatiner */}
      <h1 style={{ marginLeft: "20px", marginTop: "20px" }}>Variety of Services</h1>
      <div className="service-cont">
        <div className='service-container'>
          {[
            { image: CleaningServices, text: 'Cleaning Services' },
            { image: CarpetcleaningServices, text: 'Pet Grooming' },
            { image: ComputerrepairServices, text: 'Computer Services' },
            { image: ElectricianServices, text: 'Electrician Services' },
            { image: EventplanningServices, text: 'Event Planning' },
            { image: FitnessServices, text: 'Fitness Training' },
            { image: GraphicdesignServices, text: 'Graphic Design' },
            { image: HandymanServices, text: 'Handyman Services' },
            { image: InteriordesignServices, text: 'Interior Design' },
            { image: LawncareServices, text: 'Lawncare services' },
            { image: LegalServices, text: 'Legal Services' },
            { image: MessagetherapyServices, text: 'Message Therapy' },
            { image: MovingServices, text: 'Moving Services' },
            { image: PhotographyServices, text: 'Photography Services' },
            { image: PaintingServices, text: 'Painting Services' },
            { image: PlumbingServices, text: 'Plumbing Services' },
            { image: TutorServices, text: 'Tutor Services' },
          ].map((service, index) => (
            <div className='services' key={index} onClick={() => toggleModal(service.text)}>
              <img src={service.image} alt={service.text} />
              <div>{service.text}</div>
            </div>
          ))}
          <div className='services' onClick={() => navigate('/services')}>
            <img src={MoreServices} />
            <div>More..</div>
          </div>
        </div>
      </div>

      <hr className='homecards-hr' />

      <h1 style={{ marginLeft: "23px", marginTop: "20px" }}>Similar Services</h1>

      <div className='suggestion-container'>
        {[
          {
            title: 'Grooming',
            items: [
              { image: PersonalStylist, text: 'Personal Stylist' },
              { image: CarpetCleaning, text: 'Pet Grooming' },
              { image: LanguageLessons, text: 'Language Lessons' },
            ],
          },
          {
            title: 'Repair',
            items: [
              { image: ComputerRepair, text: 'Computer Services' },
              { image: PlumbingRepair, text: 'Plumbing Services' },
              { image: HandymanRepair, text: 'Handyman Services' },
            ],
          },
          {
            title: 'Service',
            items: [
              { image: LegalService, text: 'Legal Services' },
              { image: MovingService, text: 'Moving Services' },
              { image: TutorService, text: 'Tutor Services' },
            ],
          },
          {
            title: 'Frequently Used',
            items: [
              { image: ElectricalNeeds, text: 'Electrician Services' },
              { image: BodymessageNeeds, text: 'Message therapy' },
              { image: LawncareNeeds, text: 'Lawncare Services' },
            ],
          },
        ].map((section, index) => (
          <div className="suggestion" key={index}>
            <div className="suggestion-heading">{section.title}</div>
            <div className="three-images">
              {section.items.map((item, idx) => (
                <div className="servicesImg" key={idx} onClick={() => toggleModal(item.text)}>
                  <img src={item.image} alt={item.text} key={idx} />
                  <div>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className='homecards-hr' />

      {/* Popular Section */}
      <div className='popular-container1' style={{ marginTop: "20px" }}>
        <h1 style={{ marginLeft: "3px", paddingBottom: "4vh" }}>Popular Services</h1>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={5}
          navigation
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          speed={600}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 5 },
          }}
        >
          {cards && cards.length > 0 && cards.map((card) => (
            <SwiperSlide key={card._id}>
              <section className="services-card" >
                <Card
                  onClick={() => toggleModal(card.category)}
                  id={card._id}
                  imageSrc={card.imageSrc}
                  name={card.category}
                  desc={card.serviceDescription}
                />
              </section>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal (Rendered only if category is selected) */}
        {modalId && (
          <div className="modal" style={{ zIndex: 1 }}>
            <div className="overlay" onClick={() => toggleModal(modalId)}></div>
            <div className="modal-content">
              <button onClick={() => toggleModal(modalId)} className="close-modal-btn" style={{ marginLeft: "52rem", marginTop: "3vh", cursor: "pointer" }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <PopupCard category={modalId} fetchedData={fetchedData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomeCards;