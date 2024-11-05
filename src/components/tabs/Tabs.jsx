import s from "./tabs.module.css";

function Tabs({ tabs, activeTab, selectActiveTab }) {
  return (
    <ul className={s.list}>
      {tabs.map((item) => (
        <li
          key={item}
          className={`${s.item} ${activeTab === item && s.active}`}
          onClick={() => selectActiveTab(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
