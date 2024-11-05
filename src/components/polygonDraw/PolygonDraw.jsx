import { useEffect } from "react";
import Konva from "konva";
import {
  nameClass,
  colorsForPolygon,
  bgColorsForPolygon,
} from "../../helpers/constants";

function PolygonDraw({
  fileData,
  classNames,
  polygonWidth,
  polygonHeight,
  id,
  badges,
}) {
  const itemClasses = classNames.map((item) => nameClass[item]);

  const classesToDraw = badges
    .filter((badge) => badge.selected)
    .map((badge) => badge.nameClass);

  useEffect(() => {
    if (fileData) {
      const stage = new Konva.Stage({
        container: `canvas-container-${id}`,
        width: polygonWidth,
        height: polygonHeight,
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
          width: polygonWidth,
          height: polygonHeight,
        });
        layer.add(konvaImage);

        fileData.coords.forEach((polygon, idx) => {
          const points = polygon.map((p, i) =>
            i % 2 === 0 ? p * polygonWidth : p * polygonHeight
          );

          const currentClass = itemClasses[idx];

          if (classesToDraw.includes(currentClass)) {
            const polygonNode = new Konva.Line({
              points: points,
              fill: bgColorsForPolygon[currentClass] || "#5c5959",
              stroke: colorsForPolygon[currentClass] || "#5c5959",
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

            let fontSize = 14;
            const textToDisplay = currentClass;

            const headerTextTemp = new Konva.Text({
              text: textToDisplay,
              fontSize: fontSize,
              fontFamily: "sans-serif",
              fill: "black",
            });

            let textWidth = headerTextTemp.width();
            while (textWidth > bboxWidth && fontSize > 4) {
              fontSize -= 1;
              headerTextTemp.fontSize(fontSize);
              textWidth = headerTextTemp.width();
            }

            const headerHeight = fontSize * 1.5;

            const containerHeader = new Konva.Rect({
              x: bboxX - containerOffset,
              y: bboxY - 30 - containerOffset,
              width: bboxWidth + containerOffset * 2,
              height: headerHeight,
              fill: colorsForPolygon[currentClass] || "#5c5959",
              cornerRadius: 20,
            });

            const headerTextNode = new Konva.Text({
              x:
                bboxX -
                containerOffset +
                (bboxWidth + containerOffset * 2 - textWidth) / 2,
              y: bboxY - 30 - containerOffset + (headerHeight - fontSize) / 2,
              text: textToDisplay,
              fontSize: fontSize,
              fontFamily: "sans-serif",
              fill: "black",
            });

            containerNode.add(containerHeader);
            containerNode.add(headerTextNode);

            layer.add(containerNode);
          }
        });

        layer.batchDraw();
      };

      return () => {
        stage.destroy();
      };
    }
  }, [fileData, polygonWidth, polygonHeight, id, classesToDraw]);

  return (
    <div
      id={`canvas-container-${id}`}
      style={{ width: `${polygonWidth}px`, height: `${polygonHeight}px` }}
    ></div>
  );
}

export default PolygonDraw;
