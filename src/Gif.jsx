import React, { useEffect, useState, useRef } from "react";
import gifimage from "./images/gif.png";
import _ from "lodash";
import "./gif.less";
import createTextCanvas from "./text2canvas.js";
import html2canvas from "html2canvas";

const GifComp = () => {
  const [text, setText] = useState("JJDD");
  const imgRef = useRef(null);

  useEffect(() => {
    let canvas = document.createElement("canvas");
    // canvas.style=
    // 绘制文字环境
    let context = canvas.getContext("2d");
    imgRef.current.onload = function () {
      context.drawImage(imgRef.current, 0, 0, 200, 200);
      document.getElementById("git1").appendChild(canvas);
    };
    console.log(gifimage);
  }, []);

  return (
    <>
      <p>canvas</p>
      <div className="gif-content">
        <div
          id="git1"
          //   style={{ background: `url(${img})`, height: "100%" }}
        ></div>
      </div>
      <p>原图</p>
      <img
        ref={imgRef}
        src={gifimage}
        width={300}
        height={300}
        //   style={{ display: "none" }}
      />
      <textarea
        className="bqb_cls"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={console.log}>生成图片</button>
    </>
  );
};

export default GifComp;
