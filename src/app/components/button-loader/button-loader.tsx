import style from "./button-loader.module.scss";

const ButtonLoader = ({ darkLoader = false }: { darkLoader?: boolean }) => {
  return (
    <div className={style.wrapper}>
      <span
        className={`${style.loader} ${darkLoader && style.darkLoader}`}
      ></span>
    </div>
  );
};

export default ButtonLoader;
