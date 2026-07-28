// ==========================
// Bilinear Interpolation Calculator
// Part 1
// ==========================

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const result = document.getElementById("result");
const steps = document.getElementById("steps");

// Canvas (Part 2 will use this)
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

calculateBtn.addEventListener("click", calculateInterpolation);

// --------------------------
// Main Calculation
// --------------------------

function calculateInterpolation() {

    // Coordinates

    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);

    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    // Pixel values

    let q11 = parseFloat(document.getElementById("q11").value);
    let q21 = parseFloat(document.getElementById("q21").value);
    let q12 = parseFloat(document.getElementById("q12").value);
    let q22 = parseFloat(document.getElementById("q22").value);

    // Target

    let x = parseFloat(document.getElementById("x").value);
    let y = parseFloat(document.getElementById("y").value);

    // Validation

    if (

        isNaN(x1) ||
        isNaN(y1) ||
        isNaN(x2) ||
        isNaN(y2) ||

        isNaN(q11) ||
        isNaN(q21) ||
        isNaN(q12) ||
        isNaN(q22) ||

        isNaN(x) ||
        isNaN(y)

    ) {

        alert("Please fill in every field.");

        return;

    }

    if (x1 === x2 || y1 === y2) {

        alert("x1 cannot equal x2 and y1 cannot equal y2.");

        return;

    }

    // --------------------------
    // Bilinear Formula
    // --------------------------

    let denominator =
        (x2 - x1) * (y2 - y1);

    let term1 =
        q11 *
        (x2 - x) *
        (y2 - y);

    let term2 =
        q21 *
        (x - x1) *
        (y2 - y);

    let term3 =
        q12 *
        (x2 - x) *
        (y - y1);

    let term4 =
        q22 *
        (x - x1) *
        (y - y1);

    let numerator =
        term1 +
        term2 +
        term3 +
        term4;

    let answer =
        numerator / denominator;

    // --------------------------
    // Display Result
    // --------------------------

    result.innerHTML =
        "<h2>" +
        answer.toFixed(4) +
        "</h2>";

    // --------------------------
    // Step-by-step
    // --------------------------

    let solution = "";

    solution += "Step 1\n";
    solution += "Compute the denominator\n\n";

    solution +=
        "(" +
        x2 +
        " - " +
        x1 +
        ") × (" +
        y2 +
        " - " +
        y1 +
        ") = ";

    solution += denominator;

    solution += "\n\n";

    solution += "Step 2\n";

    solution +=
        "Q11 Term = " +
        term1.toFixed(4);

    solution += "\n";

    solution +=
        "Q21 Term = " +
        term2.toFixed(4);

    solution += "\n";

    solution +=
        "Q12 Term = " +
        term3.toFixed(4);

    solution += "\n";

    solution +=
        "Q22 Term = " +
        term4.toFixed(4);

    solution += "\n\n";

    solution +=
        "Numerator = " +
        numerator.toFixed(4);

    solution += "\n\n";

    solution +=
        "Interpolated Value = ";

    solution +=
        numerator.toFixed(4) +
        " ÷ " +
        denominator.toFixed(4);

    solution += "\n\n";

    solution +=
        "= " +
        answer.toFixed(4);

    steps.textContent = solution;

    // Draw graph
    drawGraph(
        x1,
        y1,
        x2,
        y2,
        x,
        y
    );
    // ==========================
// Part 2
// Graph + Clear Button
// ==========================

// Clear button
clearBtn.addEventListener("click", clearAll);

// Draw coordinate graph
function drawGraph(x1, y1, x2, y2, x, y) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 80;

    // Draw border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(padding, padding, canvas.width - 2 * padding, canvas.height - 2 * padding);

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Scale values
    const graphWidth = canvas.width - (padding * 2);
    const graphHeight = canvas.height - (padding * 2);

    function mapX(value) {
        return padding + ((value - x1) / (x2 - x1)) * graphWidth;
    }

    function mapY(value) {
        return canvas.height - padding - ((value - y1) / (y2 - y1)) * graphHeight;
    }

    // Corner points
    drawPoint(mapX(x1), mapY(y1), "Q11", "#1565c0");
    drawPoint(mapX(x2), mapY(y1), "Q21", "#1565c0");
    drawPoint(mapX(x1), mapY(y2), "Q12", "#1565c0");
    drawPoint(mapX(x2), mapY(y2), "Q22", "#1565c0");

    // Rectangle
    ctx.beginPath();
    ctx.strokeStyle = "#1565c0";
    ctx.moveTo(mapX(x1), mapY(y1));
    ctx.lineTo(mapX(x2), mapY(y1));
    ctx.lineTo(mapX(x2), mapY(y2));
    ctx.lineTo(mapX(x1), mapY(y2));
    ctx.closePath();
    ctx.stroke();

    // Target point
    drawPoint(mapX(x), mapY(y), "P(x,y)", "red");

    // Dotted guide lines
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    ctx.moveTo(mapX(x), mapY(y));
    ctx.lineTo(mapX(x), mapY(y1));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mapX(x), mapY(y));
    ctx.lineTo(mapX(x1), mapY(y));
    ctx.stroke();

    ctx.setLineDash([]);

    // Coordinate labels
    ctx.fillStyle = "#000";
    ctx.font = "14px Poppins";

    ctx.fillText("(" + x1 + "," + y1 + ")", mapX(x1) - 20, mapY(y1) + 30);
    ctx.fillText("(" + x2 + "," + y1 + ")", mapX(x2) - 20, mapY(y1) + 30);

    ctx.fillText("(" + x1 + "," + y2 + ")", mapX(x1) - 20, mapY(y2) - 15);
    ctx.fillText("(" + x2 + "," + y2 + ")", mapX(x2) - 20, mapY(y2) - 15);

}

// Draw a point
function drawPoint(x, y, label, color) {

    ctx.beginPath();

    ctx.arc(x, y, 7, 0, Math.PI * 2);

    ctx.fillStyle = color;

    ctx.fill();

    ctx.strokeStyle = "#000";

    ctx.stroke();

    ctx.fillStyle = "#000";

    ctx.font = "bold 14px Poppins";

    ctx.fillText(label, x + 10, y - 10);

}

// Clear everything
function clearAll() {

    const ids = [

        "x1",
        "y1",
        "x2",
        "y2",

        "q11",
        "q21",
        "q12",
        "q22",

        "x",
        "y"

    ];

    ids.forEach(function(id) {

        document.getElementById(id).value = "";

    });

    result.innerHTML = "Waiting for calculation...";

    steps.innerHTML =
        "Enter all values and press <strong>Calculate</strong>.";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optional message
    ctx.font = "20px Poppins";
    ctx.fillStyle = "#999";
    ctx.textAlign = "center";
    ctx.fillText(
        "Coordinate Graph",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.textAlign = "left";

}

// Initial canvas text
window.onload = function () {

    ctx.font = "20px Poppins";
    ctx.fillStyle = "#999";
    ctx.textAlign = "center";

    ctx.fillText(
        "Coordinate Graph",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.textAlign = "left";

};
}