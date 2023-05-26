import React, { useEffect, useState, useRef } from "react";
import gifimage from "./images/gif.png";
import _ from "lodash";
import "./gif.less";
import GIF from "gif.js";
import { HUE } from "./constant.js";

const GifComp = () => {
  const [text, setText] = useState("蔡徐坤");
  const [text2, setText2] = useState("狂粉");
  const [text3, setText3] = useState("死忠粉");

  const imgRef = useRef(null);

  const gifRef = useRef(null);

  useEffect(() => {
    imgRef.current.onload = function () {
      genGIF();
    };
    console.log(gifimage);
  }, []);

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

      context.font = "45px sans-serif";
      // 设置字体颜色
      context.fillStyle = "white";
      context.fillStyle = "transform: rotate(10deg)";
      context.filter = `hue-rotate(${i}deg)`;
      context.shadowColor = "red";
      context.shadowBlur = 15;
      context.rotate((7 * Math.PI) / 180);
      context.fillText(text, 35, 50);

      context.rotate((-7 * Math.PI) / 180);
      context.font = "16px sans-serif";
      context.fillText(text2, 5, 190);

      context.fillText(text3, 140, 190);

      gif.addFrame(canvas, { delay: 100 });
    });

    gif.on("finished", function (blob) {
      let x = document.createElement("img");
      x.src = URL.createObjectURL(blob);
      gifRef.current = URL.createObjectURL(blob);
      if (!document.getElementById("gif2").children.length) {
        document.getElementById("gif2").append(x);
        return;
      } else {
        document
          .getElementById("gif2")
          .replaceChild(x, document.getElementById("gif2").children[0]);
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
      <div className="gif-content">
        <div id="git1"></div>
      </div>
      <div id="gif2"></div>

      <img
        ref={imgRef}
        src={gifimage}
        width={461}
        height={465}
        style={{ display: "none" }}
      />
      <p>灯牌</p>
      <input
        className="gif_input"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p>下左字</p>
      <input
        className="gif_input"
        onChange={(e) => setText2(e.target.value)}
        value={text2}
      />
      <p>下右字</p>
      <input
        className="gif_input"
        onChange={(e) => setText3(e.target.value)}
        value={text3}
      />
      <div className="line-through">长按图片保存或者点击👇🏻生成</div>
      <button onClick={download}>生成图片</button>
    </>
  );
};

export default GifComp;
