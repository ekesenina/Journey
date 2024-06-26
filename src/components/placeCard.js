import React from 'react';
import Iframe from 'react-iframe';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import HystModal from 'hystmodal';
import '../../node_modules/hystmodal/dist/hystmodal.min.css';

function PlaceCard({ places }) {
    React.useEffect(() => {
        const myModal = new HystModal({
            linkAttributeName: "data-hystmodal",
        });
    }, []);

    return (
        <div>
            {places.map((data, key) => {
                return (
                    <div key={key} className="main__town__popUp hystmodal" id={data.modal} aria-hidden="true">
                        <div className="main__town__popUp__modal hystmodal__wrap">
                            <div className="main__town__popUp__modal__content hystmodal__window window__place" role="dialog" aria-modal="true">
                                <button data-hystclose className="main__town__popUp__close hystmodal__close">Close</button>
                                <p className="main__town__popUp__modal__content__name">{data.name}</p>
                                <Swiper
                                    className="main__town__popUp__modal__content__slider"
                                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    autoplay={{ delay: 3000 }}
                                    loop
                                    pagination={{ clickable: true }}
                                >
                                    {data.img && data.img.map((img, index) => (
                                        <SwiperSlide key={index} className="main__town__popUp__modal__content__slider__slide">
                                            <img loading="lazy" src={img} alt="img" className="main__town__popUp__modal__content__slider__slide__img" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <p className="main__town__popUp__modal__content__info">{data.info}</p>
                                {data.map && (
                                    <div className="main__town__popUp__modal__content__map">
                                        <Iframe
                                            className="main__town__popUp__modal__content__map__wiget"
                                            url={data.map}
                                            width="100%"
                                            height="400px"
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                                {data.maplink && (
                                    <a href={data.maplink} target="_blank" rel="noopener noreferrer">Посмотреть на карте</a>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default PlaceCard;
