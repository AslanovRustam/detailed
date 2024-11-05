import { formatName } from "../../helpers/formatName";
import s from "./badge.module.css";

function Badge({ item: { id, name, nameClass, selected } }) {
  return (
    <div
      className={`${s.container} ${s[nameClass]} ${
        selected && s[`selected_${nameClass}`]
      }`}
    >
      <div className={`${s.circle} ${s[nameClass]}`}></div>
      <span className={s.text}>{formatName(name)}</span>
    </div>
  );
}

export default Badge;
