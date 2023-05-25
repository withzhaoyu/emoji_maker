import React, { useEffect, useState, } from "react";
import gifimage from "./images/gif.png";
import _ from "lodash";
import "./bqb.less";
import createTextCanvas from "./text2canvas.js";
import html2canvas from "html2canvas";

const GifComp = () => {
  const [text, setText] = useState("JJDD");

  useEffect(() => {
    let canvas = document.createElement("canvas");
    // 绘制文字环境
    let context = canvas.getContext("2d");
    const img = new Image();
    img.src = gifimage;
    img.onload = function() {
        // draw(this);   
         context.drawImage(img,400,400);
    document.getElementById('git1').appendChild(canvas)
    };
    console.log(gifimage)
    // context.drawImage(img,10,10);
    // document.getElementById('git1').appendChild(canvas)
    
  }, []);

//   const draw = () => {
//     ctx.drawImage(img, 10, 10);
//   }


  const download = () => {
    // setActive(false);
    // html2canvas(document.getElementById("draw-content")).then(function (
    //   canvas
    // ) {
    //   var link = document.createElement("a");
    //   document.body.appendChild(link);
    //   link.download = text + ".jpg";
    //   link.href = canvas.toDataURL();
    //   link.target = "_blank";
    //   link.click();
    //   setActive(true);
    // });
  };

  return (
    <>
      <div className="draw-content" id="draw-content">
        <div
          id="git1"
        //   style={{ background: `url(${img})`, height: "100%" }}
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

export default GifComp;
