
const { getLocal, initialState } = require("./utils.js");
var canvas = document.createElement("canvas");
let ctx;
let penSize = initialState["pen-size"];
let clr = initialState["color"];
browser.runtime.onMessage.addListener(messageHandler);
async function messageHandler(request, sender, sendResponse) {
  if (request.type === "check") {
    let storage = await getLocal();
    if (storage.board) {
      let key = request.key;
      switch (key) {
        case "pen-size":
          penSize = storage[key];
          execute();
          break;
        case "color":
          clr = storage[key];
          execute();
          break;
        case "clear":
          clearCanvas();
        case "board":
          createCanvas();
          document.body.style["user-select"] = "none";
          document.body.appendChild(canvas);

          break;
        default:
          break;
      }
    } else {
      canvas.remove();
    }
  }
}

function createCanvas() {
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "9999";
}

let drawing = false;
function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = penSize;
  ctx.strokeStyle = clr;
  ctx.lineCap = "round";
  let x = e.clientX;
  let y = e.clientY;

  ctx.lineTo(x, y);

  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}
function execute() {
  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    draw(e);
  });
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", draw);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
execute();
