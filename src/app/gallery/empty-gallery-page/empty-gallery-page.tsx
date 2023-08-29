import style from "./empty-gallery-page.module.scss";

const EmptyGalleryPage = () => {
  return (
    <div className={style.noArts}>
      <p className={style.title}>No arts match your filters</p>
      <a className={style.button} href="/gallery">
        View All Arts
      </a>
    </div>
  );
};

export default EmptyGalleryPage;
