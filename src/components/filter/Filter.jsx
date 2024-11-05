import { useState } from "react";
import Badge from "../badge/Badge";
import PolygonRange from "../polygonRange/PolygonRange";
import { badgeNames } from "../../helpers/constants"; ////TODO folder core
import Trash from "../../assets/trash.svg";
import s from "./filter.module.css";

function Filter() {
  const [badges, setBadges] = useState(badgeNames);
  const [range, setRange] = useState([0, 4]);

  const selectBadge = (id) => {
    setBadges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
  ////TODO toogleallbadges
  const selectAllBadge = () => {
    setBadges((prev) =>
      prev.map((item) => {
        return { ...item, selected: true };
      })
    );
  };
  ////TODO toogleallbadges
  const deselectAllBadge = () => {
    setBadges((prev) =>
      prev.map((item) => {
        return { ...item, selected: false };
      })
    );
  };

  return (
    <div className={s.container}>
      <p className={s.title}>Classes filter</p>
      <div className={s.selectedAll}>
        <button type="button" className={s.button} onClick={selectAllBadge}>
          Select all
        </button>
        <button type="button" className={s.button} onClick={deselectAllBadge}>
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
        <div className={s.clear} onClick={deselectAllBadge}>
          <Trash className={s.icon} />
          <span className={s.text}>Clear Filters</span>
        </div>
        <p className={s.help}>Need help?</p>
      </div>
    </div>
  );
}

export default Filter;
