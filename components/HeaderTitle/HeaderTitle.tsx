import HeaderTitleStyles from './HeaderTitle.module.css';

function HeaderTitle() {
  return (
    <article id={HeaderTitleStyles.title}>
      <h1>Joshua_World</h1>
      <img
        id={HeaderTitleStyles.headerImg}
        alt="headerImg"
        src={'/images/headerImg.png'}
      />
    </article>
  );
}

export default HeaderTitle;
