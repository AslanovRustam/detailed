import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import s from "./polygon.module.css";

function PolygonRange({ range, setRange }) {
  const handleRangeChange = (event, newValue) => {
    setRange(newValue);
  };

  return (
    <Box sx={{ width: "100%", margin: "23px 0" }}>
      <p className={s.title}> Polygon range</p>
      <div className={s.container}>
        <p className={s.textContainer}>
          <span className={s.text}>min</span>{" "}
          <span className={s.bold}>{range[0]}</span>
        </p>
        <p className={s.textContainer}>
          <span className={s.text}>max</span>{" "}
          <span className={s.bold}> {range[1]}</span>
        </p>
      </div>

      <Slider
        value={range}
        onChange={handleRangeChange}
        min={0}
        max={4}
        step={1}
        valueLabelDisplay="auto"
        sx={{
          color: "#FFD75C",
          "& .MuiSlider-track": {
            backgroundImage:
              "repeating-linear-gradient(90deg, #FFD75C 0%, #FFD75C 10px, transparent 10px, transparent 20px)",
            backgroundSize: "20px 100%",
          },
          "& .MuiSlider-rail": {
            height: 4,
            backgroundColor: "#FFE28C",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "white",
            border: "6px solid #FFD75C",
            width: 21,
            height: 21,
          },
          "& .MuiSlider-thumb:hover": {
            boxShadow: "0 0 0 8px rgba(255, 215, 92, 0.16)",
          },
          "& .MuiSlider-thumb.Mui-focusVisible, & .MuiSlider-thumb.Mui-active":
            {
              boxShadow: "0 0 0 8px rgba(255, 215, 92, 0.16)",
            },
        }}
      />
    </Box>
  );
}

export default PolygonRange;
