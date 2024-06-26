// import React from "react";
// import Iframe from "react-iframe"; // Импортируем Iframe из библиотеки

// function Home() {
//     return (
//         <div>
//             <Iframe
//                 url="https://yandex.ru/map-widget/v1/?um=constructor%3Aab2dbeb5a38edaba5c468169c7617345584b6f02c2a8391046e4a62b223c7c41&amp;source=constructor"
//                 width="653px"
//                 height="380px"
//                 frameBorder="0"
//                 scrolling="yes"
//                 style={{border: 0}}
//             />
//         </div>
//     );
// }

// export default Home;



// import React from "react";
// import { useState } from "react";
// import Iframe from "react-iframe"; // Импортируем Iframe из библиотеки

// function Home() {

//     // обновление виджета при наведении
//     const [widgetKey, setWidgetKey] = useState(0);

//     const handleClick = () => {
//         // Обновляем виджет путем изменения ключа
//         setWidgetKey(prevKey => prevKey + 1);
//     };

//     return (
//         <div className="main__home" style={{ position: 'relative', overflow: 'hidden' }}>
//             <div className="main__home__journey">
//                 <Iframe
//                     url="https://yandex.ru/map-widget/v1/?ll=67.028530%2C56.048531&mode=routes&rtext=54.911030%2C73.459260~57.152985%2C65.541227~56.838011%2C60.597474&rtt=auto&ruri=~~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2NjUzNxJP0KDQvtGB0YHQuNGPLCDQodCy0LXRgNC00LvQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCV0LrQsNGC0LXRgNC40L3QsdGD0YDQsyIKDdBjckIVIFpjQg%2C%2C&z=7.25"
//                     className="main__home__journey__map"
//                     width="560px"
//                     height="400px"
//                     frameBorder="1"
//                     allowFullScreen={true}
//                     style={{ position: 'relative' }}
//                 />
//                 <div className="main__home__journey__info">
//                     <h1 className="main__home__journey__info__title">
//                         Омск - Тюмень - Екатеринбург
//                     </h1>
//                     <div className="main__home__journey__info__km"
//                         onClick={handleClick}
//                         key={widgetKey} // Добавляем ключ для обновления виджета
//                     >
//                         <div className="elfsight-app-1849a0ff-e8eb-4dd3-9c52-bd13947da13f" data-elfsight-app-lazy></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;




// import React from "react";
// import { useState } from "react";
// import Iframe from "react-iframe"; // Импортируем Iframe из библиотеки

// function Home() {
//     return (
//         <div className="main__home" style={{ position: 'relative', overflow: 'hidden' }}>
//             <div className="main__home__journey">
//                 <Iframe
//                     url="https://yandex.ru/map-widget/v1/?ll=67.028530%2C56.048531&mode=routes&rtext=54.911030%2C73.459260~57.152985%2C65.541227~56.838011%2C60.597474&rtt=auto&ruri=~~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2NjUzNxJP0KDQvtGB0YHQuNGPLCDQodCy0LXRgNC00LvQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCV0LrQsNGC0LXRgNC40L3QsdGD0YDQsyIKDdBjckIVIFpjQg%2C%2C&z=7.25"
//                     className="main__home__journey__map"
//                     width="560px"
//                     height="400px"
//                     frameBorder="1"
//                     allowFullScreen={true}
//                     style={{ position: 'relative' }}
//                 />
//                 <div className="main__home__journey__info">
//                     <h1 className="main__home__journey__info__title">
//                         Омск - Тюмень - Екатеринбург
//                     </h1>
//                     <div className="main__home__journey__info__km">
//                         <div className="main__home__journey__info__km__box">
//                             <p className="main__home__journey__info__km__box__icon">
//                                 icon
//                             </p>
//                             <div className="main__home__journey__info__km__box__town">
//                                 <p className="main__home__journey__info__km__box__town__name">
//                                     Омск - Тюмень
//                                 </p>
//                                 <div className="main__home__journey__info__km__box__town__number">
//                                     5000
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="main__home__journey__info__km__box">
//                             <p className="main__home__journey__info__km__box__icon">
//                                 icon
//                             </p>
//                             <div className="main__home__journey__info__km__box__town">
//                                 <p className="main__home__journey__info__km__box__town__name">
//                                     Тюмень - Екатеринбург
//                                 </p>
//                                 <div className="main__home__journey__info__km__box__town__number">
//                                     3000
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;



import React from "react";
import { useState, useEffect } from "react";
import Iframe from "react-iframe"; // Импортируем Iframe из библиотеки
import tag from '../img/tag.svg'

function Counter({ end, reset }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 4000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

    }, [end, reset]);

    return (
        <div>{count}km</div>
    );
}

function Home() {
    const [reset, setReset] = useState(0);

    const handleReset = () => {
        setReset(prev => prev + 1); // Увеличиваем значение для сброса счетчика
    };

    return (
        <div className="main__home" style={{ position: 'relative'}}>
            <div className="main__home__journey">
                <div className="main__home__journey__map">
                    <Iframe
                        url="https://yandex.ru/map-widget/v1/?ll=67.028530%2C56.048531&mode=routes&rtext=54.911030%2C73.459260~57.152985%2C65.541227~56.838011%2C60.597474&rtt=auto&ruri=~~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2NjUzNxJP0KDQvtGB0YHQuNGPLCDQodCy0LXRgNC00LvQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCV0LrQsNGC0LXRgNC40L3QsdGD0YDQsyIKDdBjckIVIFpjQg%2C%2C&z=7.25"
                        className="main__home__journey__map__wiget"
                        frameBorder="1"
                        allowFullScreen={true}
                        style={{ position: 'relative' }}
                    />
                </div>
                
                <div className="main__home__journey__info">
                    <h1 className="main__home__journey__info__title">
                        Омск - Тюмень - Екатеринбург
                    </h1>
                    <div className="main__home__journey__info__km" onClick={handleReset}>
                        <div className="main__home__journey__info__km__box">
                            <p className="main__home__journey__info__km__box__icon">
                                <img src={tag} alt="img" className="main__home__journey__info__km__box__icon__svg" />
                            </p>
                            <div className="main__home__journey__info__km__box__town">
                                <p className="main__home__journey__info__km__box__town__name">
                                    Омск - Тюмень
                                </p>
                                <div className="main__home__journey__info__km__box__town__number">
                                    <Counter end={630} reset={reset} />
                                </div>
                            </div>
                        </div>
                        <div className="main__home__journey__info__km__box">
                            <p className="main__home__journey__info__km__box__icon">
                                <img src={tag} alt="img" className="main__home__journey__info__km__box__icon__svg" />
                            </p>
                            <div className="main__home__journey__info__km__box__town">
                                <p className="main__home__journey__info__km__box__town__name">
                                    Тюмень - Екатеринбург
                                </p>
                                <div className="main__home__journey__info__km__box__town__number">
                                    <Counter end={330} reset={reset} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;