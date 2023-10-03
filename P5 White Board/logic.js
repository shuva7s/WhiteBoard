const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

const colorButtons = document.querySelectorAll(".btn[id]:not(#refresh)");
var color = "black";
var width = 2;

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        color = getComputedStyle(button).getPropertyValue("color");
        activateButton(button);
    });
});

function activateButton(button) {
    colorButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
});

function resizeCanvas() {
    if (window.innerWidth > window.innerHeight) {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
    } else {
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.6;
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function startDrawing(event) {
    isDrawing = true;
    const coordinates = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(coordinates.x, coordinates.y);
}

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    const coordinates = getCoordinates(event);
    ctx.lineTo(coordinates.x, coordinates.y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function getCoordinates(event) {
    if (event.touches) {
        const touch = event.touches[0];
        return {
            x: touch.clientX - canvas.getBoundingClientRect().left,
            y: touch.clientY - canvas.getBoundingClientRect().top
        };
    } else {
        return {
            x: event.clientX - canvas.getBoundingClientRect().left,
            y: event.clientY - canvas.getBoundingClientRect().top
        };
    }
}


document.getElementById("refresh").addEventListener("click", refreshCanvas);
function refreshCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


const valueSlider = document.getElementById('valueSlider');
const currentValueDisplay = document.getElementById('currentValue');

valueSlider.addEventListener('input', (event) => {
    width = event.target.value;
    currentValueDisplay.textContent = `Width: ${width}`;
});