import Filter from "../filter/Filter";
import Logo from "../../assets/Logo.svg";
import s from "./aside.module.css";

function AsideComponent({ range, setRange, badges, setBadges }) {
  return (
    <aside className={s.aside}>
      <Logo />
      <Filter
        range={range}
        setRange={setRange}
        badges={badges}
        setBadges={setBadges}
      />
    </aside>
  );
}

export default AsideComponent;
