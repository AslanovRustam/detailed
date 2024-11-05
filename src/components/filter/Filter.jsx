import Badge from "../badge/Badge";
import PolygonRange from "../polygonRange/PolygonRange";
import Trash from "../../assets/trash.svg";
import s from "./filter.module.css";

function Filter({ range, setRange, badges, setBadges }) {
  const selectBadge = (id) => {
    setBadges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAllBadges = (select) => {
    setBadges((prev) =>
      prev.map((item) => ({
        ...item,
        selected: select,
      }))
    );
  };

  return (
    <div className={s.container}>
      <p className={s.title}>Classes filter</p>
      <div className={s.selectedAll}>
        <button
          type="button"
          className={s.button}
          onClick={() => toggleAllBadges(true)}
        >
          Select all
        </button>
        <button
          type="button"
          className={s.button}
          onClick={() => toggleAllBadges(false)}
        >
          Deselect all
        </button>
      </div>
      <ul className={s.list}>
        {badges.map((item) => (
          <li
            className={s.item}
            key={item.id}
            onClick={() => selectBadge(item.id)}
          >
            <Badge item={item} />
          </li>
        ))}
      </ul>
      <PolygonRange range={range} setRange={setRange} />
      <div className={s.wrapper}>
        <div className={s.clear} onClick={() => toggleAllBadges(false)}>
          <Trash className={s.icon} />
          <span className={s.text}>Clear Filters</span>
        </div>
        <p className={s.help}>Need help?</p>
      </div>
    </div>
  );
}

export default Filter;
