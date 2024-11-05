import { useEffect } from "react";
import Konva from "konva";
import {
  nameClass,
  colorsForPolygon,
  bgColorsForPolygon,
} from "../../helpers/constants";

function PolygonDraw({ fileData, classNames }) {
  const itemClasses = classNames.map((item) => nameClass[item]);
  console.log("itemClasses", itemClasses);

  useEffect(() => {
    if (fileData) {
      const stage = new Konva.Stage({
        container: "canvas-container",
        width: 447,
        height: 447,
      });

      const layer = new Konva.Layer();
      stage.add(layer);

      const imageObj = new window.Image();
      imageObj.src = fileData.imgUrl;
      imageObj.onload = () => {
        const konvaImage = new Konva.Image({
          image: imageObj,
          x: 0,
          y: 0,
          width: 447,
          height: 447,
        });
        layer.add(konvaImage);

        fileData.coords.map((polygon, idx) => {
          const points = polygon.map((p, i) =>
            i % 2 === 0 ? p * 447 : p * 447
          );

          const polygonNode = new Konva.Line({
            points: points,
            fill: bgColorsForPolygon[itemClasses[idx]] || "#5c5959",
            stroke: colorsForPolygon[itemClasses[idx]] || "#5c5959",
            strokeWidth: 2,
            closed: true,
          });
          layer.add(polygonNode);

          const {
            x: bboxX,
            y: bboxY,
            width: bboxWidth,
            height: bboxHeight,
          } = polygonNode.getClientRect();
          const containerOffset = 4;

          const containerNode = new Konva.Group();

          const containerBackground = new Konva.Rect({
            x: bboxX - containerOffset,
            y: bboxY - 30 - containerOffset,
            width: bboxWidth + containerOffset * 2,
            height: bboxHeight + containerOffset * 2 + 30,
            fill: "rgba(0, 0, 0, 0.2)",
            cornerRadius: 10,
          });
          containerNode.add(containerBackground);

          const containerBorder = new Konva.Rect({
            x: bboxX - containerOffset,
            y: bboxY - 30 - containerOffset,
            width: bboxWidth + containerOffset * 2,
            height: bboxHeight + containerOffset * 2 + 30,
            stroke: polygonNode.stroke(),
            strokeWidth: polygonNode.strokeWidth(),
            cornerRadius: 10,
          });
          containerNode.add(containerBorder);

          const headerWidth = bboxWidth + containerOffset * 2;
          const headerHeight = 30;
          const textToDisplay = itemClasses[idx];

          const headerTextTemp = new Konva.Text({
            text: textToDisplay,
            fontSize: 14,
            fontFamily: "sans-serif",
            fill: "black",
          });
          const textWidth = headerTextTemp.width();

          let fontSize = 14;
          while (textWidth > headerWidth - 10 && fontSize > 8) {
            fontSize -= 1;
            headerTextTemp.fontSize(fontSize);
          }

          const containerHeader = new Konva.Rect({
            x: bboxX - containerOffset,
            y: bboxY - 30 - containerOffset,
            width: headerWidth,
            height: headerHeight,
            fill: colorsForPolygon[itemClasses[idx]] || "#5c5959",
            cornerRadius: 10,
          });

          const headerTextNode = new Konva.Text({
            x:
              bboxX -
              containerOffset +
              (headerWidth - headerTextTemp.width()) / 2,
            y:
              bboxY -
              30 -
              containerOffset +
              (headerHeight - headerTextTemp.height()) / 2,
            text: textToDisplay,
            fontSize: fontSize,
            fontFamily: "sans-serif",
            fill: "black",
          });

          containerNode.add(containerHeader);
          containerNode.add(headerTextNode);

          layer.add(containerNode);
        });

        layer.batchDraw();
      };

      return () => {
        stage.destroy();
      };
    }
  }, [fileData]);

  return (
    <div
      id="canvas-container"
      style={{ width: "447px", height: "447px" }}
    ></div>
  );
}

export default PolygonDraw;
