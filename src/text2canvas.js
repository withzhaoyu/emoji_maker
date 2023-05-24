export default function createTextCanvas(
  text,
  fontOptions = {
    font: "20px sans-serif",
    color: "white",
    backgroud: "transparent",
  },
  minImgWidht = null,
  paddingOptions = { top: 0, right: 0, bottom: 0, left: 0 },
  is3D = false
) {
  // 创建画布
  let canvas = document.createElement("canvas");
  // 绘制文字环境
  let context = canvas.getContext("2d");
  // 设置字体
  context.font = fontOptions.font;
  // 获取字体宽度
  let width = context.measureText(text).width;
  if (typeof minImgWidht == "number" && width < minImgWidht) {
    width = minImgWidht;
  }
  width += paddingOptions.left + paddingOptions.right;
  // 获取字体高度
  let height =
    context.measureText(text).fontBoundingBoxAscent +
    context.measureText(text).fontBoundingBoxDescent +
    paddingOptions.top +
    paddingOptions.bottom;
  // 画布宽度
  canvas.width = width;
  // 画布高度
  canvas.height = height;
  // 填充背景
  context.fillStyle = fontOptions.backgroud;
  // 绘制背景大小
  context.fillRect(0, 0, canvas.width, canvas.height);
  // 设置字体
  context.font = fontOptions.font;
  // 设置字体颜色
  context.fillStyle = fontOptions.color;
  if (is3D) {
    var n;
    //绘制底层
    for (n = 0; n < 2; n++) {
      context.fillText(
        text,
        Math.abs(paddingOptions.left) - n,
        Math.abs(parseInt(fontOptions.font) + paddingOptions.top) - n
      );
    }
    context.shadowColor = "black";
    context.shadowBlur = 1;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 0;
  }
  // 没有填写坐标则默认居中输出
  if (
    paddingOptions.top == 0 &&
    paddingOptions.right == 0 &&
    paddingOptions.bottom == 0 &&
    paddingOptions.left == 0
  ) {
    // 设置水平对齐方式
    context.textAlign = "center";
    // 设置垂直对齐方式
    context.textBaseline = "middle";
    // 填充文字（参数：要写的字，x坐标，y坐标）
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  } else {
    // 填充文字（参数：要写的字，x坐标，y坐标）
    context.fillText(
      text,
      Math.abs(paddingOptions.left),
      Math.abs(parseInt(fontOptions.font) + paddingOptions.top)
    );
  }
  // 生成图片信息
  // return canvas.toDataURL('image/png');
  // 图资源
  return canvas;
  // canvas资源
}
