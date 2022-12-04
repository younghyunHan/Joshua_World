import { useEffect, useState } from 'react';
// import PrevSliderButton from './PrevSlideButton';
// import NextSliderButton from './NextSlideButton';

// import ButtonSlideStyles from './ButtonSlide.module.css';

function ButtonSlide({ allData }) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [slidePx, setSlidePx] = useState(0);

  // function handleSlide(currentIndex: any) {
  //   if (currentIndex === allData.length + 1) {
  //     currentIndex = 0;
  //   } else if (currentIndex < 0) {
  //     currentIndex = allData.length - 1;
  //   }
  //   setCurrentIndex(currentIndex);
  // }

  // function handleSwipe(direction: any) {
  //   setCurrentIndex(currentIndex + direction);
  // }

  // useEffect(() => {
  //   setSlidePx(-250 * currentIndex);
  // }, [currentIndex]);

  return (
    // <div id={ButtonSlideStyles.ButtonSlide}>
    //   <PrevSliderButton
    //     currentIndex={currentIndex}
    //     direction="Prev"
    //     onClick={() => handleSwipe(-1)}
    //   />
    //   {allData.map((allData: any) => (
    //     <div
    //       key={allData['id']}
    //       className={ButtonSlideStyles.ButtonSlideContent}
    //       style={{
    //         transform: `translateX(${slidePx}px)`,
    //         transition: '0.5s ease',
    //       }}
    //     >
    //       <img
    //         src="/images/nextjs_logo.png"
    //         alt="myImg"
    //         className={ButtonSlideStyles.myImg}
    //       />
    //       <span className={ButtonSlideStyles.myImgTitle}>
    //         {allData['title']}
    //       </span>
    //     </div>
    //   ))}
    //   <NextSliderButton
    //     currentIndex={currentIndex}
    //     dataLength={allData}
    //     slidePx={slidePx}
    //     direction="Next"
    //     onClick={() => handleSwipe(1)}
    //   />
    // </div>
    <div></div>
  );
}

export default ButtonSlide;
