import React, { useEffect, useState, useRef } from "react";
import gifimage from "./images/gif.png";
import _ from "lodash";
import "./gif.less";
import GIF from "gif.js";
import { HUE } from "./constant.js";
import "context-filter-polyfill";

const LightSignGif = () => {
  const [text, setText] = useState("YYDS");
  const [leftText, setLeft] = useState("狂粉");
  const [rightText, setRight] = useState("死忠粉");

  const [fontSize, setFontSize] = useState(40);
  const [font, setFont] = useState("");

  const imgRef = useRef(null);
  const gifRef = useRef(null);

  const skipFirst = useRef(null);

  useEffect(() => {
    imgRef.current.onload = function () {
      genGIF();
      skipFirst.current = true;
    };
  }, []);

  useEffect(() => {
    if (skipFirst.current) {
      genGIF();
    }
  }, [fontSize, font]);

  const genGIF = () => {
    var gif = new GIF({
      workers: 2,
      quality: 10,
    });

    HUE.forEach((i) => {
      let canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 202;
      let context = canvas.getContext("2d");
      context.filter = `hue-rotate(${i}deg)`;
      context.drawImage(imgRef.current, 0, 0, 200, 200);
      //灯牌字
      context.font = `${fontSize}px ${font || "sans-serif"}`;
      context.fillStyle = "white";
      context.fillStyle = "transform: rotate(10deg)";
      context.filter = `hue-rotate(${i}deg)`;
      context.shadowColor = "red";
      context.shadowBlur = 15;
      context.rotate((7 * Math.PI) / 180);
      context.fillText(text, 35, 50);

      //左右字
      context.rotate((-7 * Math.PI) / 180);
      context.font = `16px ${font || "sans-serif"}`;
      context.fillText(leftText, 5, 190);
      context.fillText(rightText, 140, 190);

      gif.addFrame(canvas, { delay: 100 });
    });

    gif.on("finished", function (blob) {
      let x = document.createElement("img");
      x.src = URL.createObjectURL(blob);
      gifRef.current = URL.createObjectURL(blob);
      let canvasDom = document.getElementById("git_canvas");
      if (!canvasDom.children.length) {
        canvasDom.append(x);
        return;
      } else {
        canvasDom.replaceChild(x, canvasDom.children[0]);
      }
    });

    gif.render();
  };

  const download = () => {
    let a = document.createElement("a");
    a.href = gifRef.current;
    a.download = "download";
    a.click();
  };

  return (
    <>
      <div id="git_canvas"></div>
      <img
        ref={imgRef}
        src={gifimage}
        width={461}
        height={465}
        style={{ display: "none" }}
      />
      <p>
        灯牌 {fontSize}像素 {font}
      </p>
      <input
        className="gif_input"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onBlur={genGIF}
      />
      <div>
        <select
          name="font"
          id="font_select"
          onChange={(e) => {
            setFont(e.target.value);
          }}
        >
          <option value="">默认系统字体</option>
          <option>Zpix</option>
          <option>pingfang</option>
        </select>
        <button
          style={{ margin: "0 20px" }}
          onClick={() => setFontSize(fontSize - 1)}
        >
          -
        </button>
        <button onClick={() => setFontSize(fontSize + 1)}>+</button>
      </div>

      <p className="gif_input">下左字</p>
      <input
        className="gif_input"
        onChange={(e) => setLeft(e.target.value)}
        value={leftText}
        onBlur={genGIF}
      />

      <p>下右字</p>
      <input
        className="gif_input"
        onChange={(e) => setRight(e.target.value)}
        value={rightText}
        onBlur={genGIF}
      />
      <div></div>
      {/* <button onClick={genGIF}>预览</button> */}

      <div className="line-through">长按图片保存或者点击👇🏻生成</div>
      <button onClick={download}>生成图片</button>
    </>
  );
};

export default LightSignGif;
