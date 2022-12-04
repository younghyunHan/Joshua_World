import NextSlideButtonStyles from './NextSlideButton.module.css';

export default function NextSlideButton({
  currentIndex,
  dataLength,
  slidePx,
  direction,
  onClick,
}) {
  return (
    <div></div>
    // <button
    //   onClick={onClick}
    //   className={NextSlideButtonStyles.btnNext}
    //   style={{ display: currentIndex === dataLength.length ? 'none' : '' }}
    // >
    //   <img
    //     src="/images/leftArrow.png"
    //     alt="rightArrow"
    //     id={NextSlideButtonStyles.rightArrow}
    //   />
    // </button>
  );
}
