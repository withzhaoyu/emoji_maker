import React, { useEffect, useState } from "react";
import img from "./images/geng.jpg";
import _ from "lodash";
import "./bqb.less";
import createTextCanvas from "./text2canvas.js";
// import

const DrawComp = (props) => {
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);
  const [text, setText] = useState("一切责任/n全在前端");
  useEffect(() => {
    // document.getElementById("textbox").removeChild(document.getElementById("textbox"));
    console.log(document.getElementById("textbox"));
    if (!document.getElementById("textbox").childNodes.length) {
      document.getElementById("textbox").appendChild(createTextCanvas(text));
      return;
    }
    document
      .getElementById("textbox")
      .replaceChild(
        createTextCanvas(text),
        document.getElementById("textbox").childNodes[0]
      );
  }, [text]);
  const handleMove = (e) => {
    console.log(e);
    if (e.changedTouches) {
      setTop(e.changedTouches[0].clientY);
      setLeft(e.changedTouches[0].clientX);
    } else {
      if (!e.clientY) {
        return;
      }
      setTop(e.clientY - 10);
      setLeft(e.clientX - 10);
    }
  };
  return (
    <>
      <div className="draw-content">
        <div id="draw" style={{ background: `url(${img})`, height: "100%" }}>
          draw--area
        </div>
        <div
          className="dragbox"
          id="textbox"
          draggable="true"
          style={{ top, left }}
          onTouchStart={console.log}
          onDrag={(e) => _.throttle(handleMove, 300)(e)}
          onTouchMove={(e) => _.throttle(handleMove, 300)(e)}
        ></div>
      </div>
      <input onChange={(e) => setText(e.target.value)} value={text} />
    </>
  );
};

export default DrawComp;
