import React, { useEffect, useState, useRef } from "react";
import gifimage from "./images/gif.png";
import _ from "lodash";
import "./gif.less";
import GIF from "gif.js";
import { HUE } from "./constant.js";

const LightSignGif = () => {
  const [text, setText] = useState("蔡徐坤");
  const [leftText, setLeft] = useState("狂粉");
  const [rightText, setRight] = useState("死忠粉");

  const imgRef = useRef(null);
  const gifRef = useRef(null);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      setTimeout(
        () => alert("如果示例图没有动的话，功能不可用，暂未支持移动端"),
        2000
      );
    }
    imgRef.current.onload = function () {
      genGIF();
    };
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

      //灯牌字
      context.font = "45px sans-serif";
      context.fillStyle = "white";
      context.fillStyle = "transform: rotate(10deg)";
      context.filter = `hue-rotate(${i}deg)`;
      context.shadowColor = "red";
      context.shadowBlur = 15;
      context.rotate((7 * Math.PI) / 180);
      context.fillText(text, 35, 50);

      //左右字
      context.rotate((-7 * Math.PI) / 180);
      context.font = "16px sans-serif";
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
      <p>灯牌</p>
      <input
        className="gif_input"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p>下左字</p>
      <input
        className="gif_input"
        onChange={(e) => setLeft(e.target.value)}
        value={leftText}
      />
      <p>下右字</p>
      <input
        className="gif_input"
        onChange={(e) => setRight(e.target.value)}
        value={rightText}
      />
      <div></div>
      <button onClick={genGIF}>预览</button>

      <div className="line-through">长按图片保存或者点击👇🏻生成</div>
      <button onClick={download}>生成图片</button>
    </>
  );
};

export default LightSignGif;
