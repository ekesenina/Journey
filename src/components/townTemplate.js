// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import PlaceCard from './placeCard';

// function TownTemplate({ city }) {
//     const [places, setPlaces] = useState([]);
//     const [darkenedCards, setDarkenedCards] = useState(() => {
//         const saved = localStorage.getItem('darkenedCards');
//         return saved ? JSON.parse(saved) : [];
//     });
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         address: '',
//         info: '',
//         map: '',
//         maplink: '',
//         images: []
//     });

//     useEffect(() => {
//         axios.get(`/api/places/${city}`)
//             .then(response => setPlaces(response.data))
//             .catch(error => console.error('There was an error fetching the places!', error));
//     }, [city]);

//     useEffect(() => {
//         localStorage.setItem('darkenedCards', JSON.stringify(darkenedCards));
//     }, [darkenedCards]);

//     const toggleDarkenCard = (key) => {
//         setDarkenedCards(prevDarkenedCards => 
//             prevDarkenedCards.includes(key) 
//                 ? prevDarkenedCards.filter(cardKey => cardKey !== key) 
//                 : [...prevDarkenedCards, key]
//         );
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'images') {
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 [name]: [...e.target.files]
//             }));
//         } else {
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 [name]: value
//             }));
//         }
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const formDataToSend = new FormData();
//         formDataToSend.append('name', formData.name);
//         formDataToSend.append('address', formData.address);
//         formDataToSend.append('info', formData.info);
//         formDataToSend.append('map', formData.map);
//         formDataToSend.append('maplink', formData.maplink);
//         formData.images.forEach(image => {
//             formDataToSend.append('images', image);
//         });

//         axios.post(`/api/places/${city}`, formDataToSend)
//             .then(response => {
//                 setPlaces(prevPlaces => [...prevPlaces, response.data]);
//                 setIsFormOpen(false);
//                 setFormData({
//                     name: '',
//                     address: '',
//                     info: '',
//                     map: '',
//                     maplink: '',
//                     images: []
//                 });
//             })
//             .catch(error => console.error('There was an error saving the place!', error));
//     };

//     const handleDelete = (id) => {
//         axios.delete(`/api/places/${city}/${id}`)
//             .then(response => {
//                 setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
//             })
//             .catch(error => console.error('There was an error deleting the place!', error));
//     };

//     return (
//         <div className="main__town">
//             <div className="main__town__weather">
//                 <a className="weatherwidget-io main__town__container__weather__wiget" href={`https://forecast7.com/ru/57d1665d53/${city.toLowerCase()}/`} 
//                    data-label_1={city.toUpperCase()} data-font="Roboto" data-icons="Climacons Animated" 
//                    data-days="5" data-theme="weather_one">{city.toUpperCase()}</a>
//             </div>
//             <div className="main__town__container">
//                 {places.map((data, key) => {
//                     const isDarkened = darkenedCards.includes(key);
//                     return (
//                         <div key={data.id} className={`main__town__container__card ${isDarkened ? 'darkened' : ''}`}>
//                             <div className="main__town__container__card__sliderContainer">
//                                 <Swiper
//                                     modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//                                     className="main__town__container__card__sliderContainer__slider"
//                                     spaceBetween={0}
//                                     slidesPerView={1}
//                                     navigation
//                                     autoplay={true}
//                                     loop={true}
//                                     pagination={{ clickable: true }}
//                                 >
//                                     {data.img && data.img.map((img, index) => (
//                                         <SwiperSlide key={index} className="main__town__container__card__sliderContainer__slider__slide">
//                                             <img loading="lazy" src={img} alt="img" className="main__town__container__card__sliderContainer__slider__slide__img" />
//                                         </SwiperSlide>
//                                     ))}
//                                 </Swiper>
//                             </div>
//                             <div className="main__town__container__card__text">
//                                 <h2 className="main__town__container__card__text__title">{data.name}</h2>
//                                 <p className="main__town__container__card__text__address">Адрес: {data.address}</p>
//                                 <p className="main__town__container__card__text__info">{data.info}</p>
//                             </div>
//                             <div className="main__town__container__card__buttonContainer">
//                                 <button 
//                                     className="main__town__container__card__buttonContainer__button"
//                                     onClick={() => toggleDarkenCard(key)}
//                                 >
//                                     Готово!
//                                 </button>
//                                 <button data-hystmodal={"#" + data.modal} className="main__town__container__card__buttonContainer__button">
//                                     подробнее
//                                 </button>
//                                 <button onClick={() => handleDelete(data.id)} className="main__town__container__card__buttonContainer__button delete-button">
//                                     Удалить
//                                 </button>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//             <button onClick={() => setIsFormOpen(true)} className="add-place-button">Добавить место</button>
//             {isFormOpen && (
//                 <form onSubmit={handleFormSubmit} className="add-place-form">
//                     <label>
//                         Название:
//                         <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
//                     </label>
//                     <label>
//                         Адрес:
//                         <input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
//                     </label>
//                     <label>
//                         Информация:
//                         <textarea name="info" value={formData.info} onChange={handleFormChange} required />
//                     </label>
//                     <label>
//                         URL Карты:
//                         <input type="text" name="map" value={formData.map} onChange={handleFormChange} />
//                     </label>
//                     <label>
//                         Текстовая ссылка на карту:
//                         <input type="text" name="maplink" value={formData.maplink} onChange={handleFormChange} />
//                     </label>
//                     <label>
//                         Изображения:
//                         <input type="file" name="images" onChange={handleFormChange} multiple />
//                     </label>
//                     <button type="submit">Сохранить</button>
//                     <button type="button" onClick={() => setIsFormOpen(false)}>Отмена</button>
//                 </form>
//             )}
//             <PlaceCard places={places} />
//         </div>
//     );
// }

// export default TownTemplate;







































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PlaceCard from './placeCard';

function TownTemplate({ city }) {
    const [places, setPlaces] = useState([]);
    const [darkenedCards, setDarkenedCards] = useState(() => {
        const saved = localStorage.getItem('darkenedCards');
        return saved ? JSON.parse(saved) : [];
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        info: '',
        map: '',
        maplink: '',
        images: []
    });

    // Новое состояние для управления окном подтверждения удаления
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);

    useEffect(() => {
        axios.get(`/api/places/${city}`)
            .then(response => setPlaces(response.data))
            .catch(error => console.error('There was an error fetching the places!', error));
    }, [city]);

    useEffect(() => {
        localStorage.setItem('darkenedCards', JSON.stringify(darkenedCards));
    }, [darkenedCards]);

    const toggleDarkenCard = (key) => {
        setDarkenedCards(prevDarkenedCards => 
            prevDarkenedCards.includes(key) 
                ? prevDarkenedCards.filter(cardKey => cardKey !== key) 
                : [...prevDarkenedCards, key]
        );
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'images') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: [...e.target.files]
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('info', formData.info);
        formDataToSend.append('map', formData.map);
        formDataToSend.append('maplink', formData.maplink);
        formData.images.forEach(image => {
            formDataToSend.append('images', image);
        });

        axios.post(`/api/places/${city}`, formDataToSend)
            .then(response => {
                setPlaces(prevPlaces => [...prevPlaces, response.data]);
                setIsFormOpen(false);
                setFormData({
                    name: '',
                    address: '',
                    info: '',
                    map: '',
                    maplink: '',
                    images: []
                });
            })
            .catch(error => console.error('There was an error saving the place!', error));
    };

    // Функция для открытия окна подтверждения удаления
    const confirmDelete = (id) => {
        setPlaceToDelete(id);
        setIsConfirmOpen(true);
    };

    // Функция для удаления карточки
    const handleDelete = () => {
        axios.delete(`/api/places/${city}/${placeToDelete}`)
            .then(response => {
                setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeToDelete));
                setIsConfirmOpen(false);
                setPlaceToDelete(null);
            })
            .catch(error => console.error('There was an error deleting the place!', error));
    };

    return (
        <div className="main__town">
            <div className="main__town__weather">
                <a className="weatherwidget-io main__town__container__weather__wiget" href={`https://forecast7.com/ru/57d1665d53/${city.toLowerCase()}/`} 
                   data-label_1={city.toUpperCase()} data-font="Roboto" data-icons="Climacons Animated" 
                   data-days="5" data-theme="weather_one">{city.toUpperCase()}</a>
            </div>
            <div className="main__town__container">
                {places.map((data, key) => {
                    const isDarkened = darkenedCards.includes(key);
                    return (
                        <div key={data.id} className={`main__town__container__card ${isDarkened ? 'darkened' : ''}`}>
                            <div className="main__town__container__card__sliderContainer">
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                    className="main__town__container__card__sliderContainer__slider"
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    autoplay={true}
                                    loop={true}
                                    pagination={{ clickable: true }}
                                >
                                    {data.img && data.img.map((img, index) => (
                                        <SwiperSlide key={index} className="main__town__container__card__sliderContainer__slider__slide">
                                            <img loading="lazy" src={img} alt="img" className="main__town__container__card__sliderContainer__slider__slide__img" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="main__town__container__card__text">
                                <h2 className="main__town__container__card__text__title">{data.name}</h2>
                                <p className="main__town__container__card__text__address">Адрес: {data.address}</p>
                                <p className="main__town__container__card__text__info">{data.info}</p>
                            </div>
                            <div className="main__town__container__card__buttonContainer">
                                <button 
                                    className="main__town__container__card__buttonContainer__button"
                                    onClick={() => toggleDarkenCard(key)}
                                >
                                    Готово!
                                </button>
                                <button data-hystmodal={"#" + data.modal} className="main__town__container__card__buttonContainer__button">
                                    подробнее
                                </button>
                                <button 
                                    className="main__town__container__card__buttonContainer__button delete-button"
                                    onClick={() => confirmDelete(data.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={() => setIsFormOpen(true)} className="add-place-button">Добавить место</button>
            {isFormOpen && (
                <form onSubmit={handleFormSubmit} className="add-place-form">
                    <label>
                        Название:
                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                    </label>
                    <label>
                        Адрес:
                        <input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
                    </label>
                    <label>
                        Информация:
                        <textarea name="info" value={formData.info} onChange={handleFormChange} required />
                    </label>
                    <label>
                        URL Карты:
                        <input type="text" name="map" value={formData.map} onChange={handleFormChange} />
                    </label>
                    <label>
                        Текстовая ссылка на карту:
                        <input type="text" name="maplink" value={formData.maplink} onChange={handleFormChange} />
                    </label>
                    <label>
                        Изображения:
                        <input type="file" name="images" onChange={handleFormChange} multiple />
                    </label>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setIsFormOpen(false)}>Отмена</button>
                </form>
            )}

            {/* Окно подтверждения удаления */}
            {isConfirmOpen && (
                <div className="confirm-dialog">
                    <p>Вы уверены, что хотите удалить это место?</p>
                    <button onClick={handleDelete}>Да</button>
                    <button onClick={() => setIsConfirmOpen(false)}>Нет</button>
                </div>
            )}

            <PlaceCard places={places} />
        </div>
    );
}

export default TownTemplate;
