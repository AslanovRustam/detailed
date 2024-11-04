import s from "./aside.module.css";
import Logo from "../../assets/Logo.svg";
import Filter from "../filter/Filter";

function AsideComponent() {
  return (
    <aside className={s.aside}>
      <Logo />
      <Filter />
    </aside>
  );
}

export default AsideComponent;
