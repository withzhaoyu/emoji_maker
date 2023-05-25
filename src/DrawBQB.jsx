import React, { useEffect, useState, } from "react";
import img from "./images/geng.jpg";
import _ from "lodash";
import "./bqb.less";
import createTextCanvas from "./text2canvas.js";
import html2canvas from "html2canvas";

const DrawComp = () => {
  const [top, setTop] = useState(146);
  const [left, setLeft] = useState(37);
  const [text, setText] = useState("一切责任全在前端");
  const [active, setActive] = useState(true);

  useEffect(() => {
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
    if (e.type) {
      console.log(e.type);
    }
    if (e.changedTouches) {
      setTop(e.changedTouches[0].clientY - 20);
      setLeft(e.changedTouches[0].clientX - 50);
    } else {
      if (!e.clientY) {
        return;
      }
      setTop(e.clientY - 10);
      setLeft(e.clientX - 30);
    }
  };

  const download = () => {
    setActive(false);
    html2canvas(document.getElementById("draw-content")).then(function (
      canvas
    ) {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = text + ".jpg";
      link.href = canvas.toDataURL();
      link.target = "_blank";
      link.click();
      setActive(true);
    });
  };

  return (
    <>
      <div className="draw-content" id="draw-content">
        <div
          id="draw"
          style={{ background: `url(${img})`, height: "100%" }}
        ></div>
        <div
          className={active ? "dragbox active" : "dragbox"}
          id="textbox"
          draggable="true"
          style={{ top, left }}
          onTouchStart={console.log}
          onDrag={handleMove}
          onTouchMove={handleMove}
        ></div>
      </div>
      <textarea
        className="bqb_cls"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={download}>生成图片</button>
    </>
  );
};

export default DrawComp;
