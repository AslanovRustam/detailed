import s from "./filter.module.css";

function Filter() {
  return (
    <div className={s.container}>
      <p className={s.title}>Classes filter</p>
      <div className={s.selectedAll}>
        <button type="button" className={s.button}>
          Select all
        </button>
        <button type="button" className={s.button}>
          Deselect all
        </button>
      </div>
    </div>
  );
}

export default Filter;
