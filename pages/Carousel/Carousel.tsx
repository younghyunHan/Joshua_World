import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CarouselStyles from './Carousel.module.css';

function Carousel({ allData }) {
  // const settings = {
  //   dots: false,
  //   infinity: true,
  //   speed: 1000,
  //   autoplay: true,
  //   autoplaySpeed: 2500,
  //   arrow: true,
  //   slidesToShow: 2,
  //   slideToScroll: 1,
  //   pauseOnHover: true,
  // };

  return (
    <div></div>
    // <div id={CarouselStyles.Carousel}>
    //   <Slider {...settings}>
    //     {allData.map(allData => (
    //       <div key={allData['id']} className={CarouselStyles.carouselContent}>
    //         <img
    //           src="/images/react_logo.png"
    //           alt="myImg"
    //           className={CarouselStyles.myImg}
    //         />
    //         <span className={CarouselStyles.myImgTitle}>
    //           {allData['title']}
    //         </span>
    //       </div>
    //     ))}
    //   </Slider>
    // </div>
  );
}

export default Carousel;
