const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Resize canvas when window is resized
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    drawStaticElements();
});

let carX = -300;
let carY = -400;

function drawMan(){

    //Head
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.arc(600,400,30,0,Math.PI * 2) // Increased radius for a larger head
    ctx.closePath()
    ctx.fill()

    //Neck
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.lineWidth = 10 // Increased line width for a thicker neck
    ctx.moveTo(600,430) // Adjusted y position for a longer neck
    ctx.lineTo(600,440) // Adjusted y position for a longer neck
    ctx.closePath()
    ctx.stroke()

    //Chest
    ctx.fillStyle = "black"
    ctx.fillRect(570,440,60,70) // Adjusted position and size for a larger chest

    //Hands
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.lineWidth = 10 // Increased line width for thicker arms
    ctx.moveTo(575,450) // Adjusted position for a more natural arm angle
    ctx.lineTo(540,480) // Adjusted position for a more natural arm angle
    ctx.closePath()
    ctx.stroke()

    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.lineWidth = 10 // Increased line width for thicker arms
    ctx.moveTo(625,450) // Adjusted position for a more natural arm angle
    ctx.lineTo(660,480) // Adjusted position for a more natural arm angle
    ctx.closePath()
    ctx.stroke()

    //Legs
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.lineWidth = 10 // Increased line width for thicker legs
    ctx.moveTo(580,490) // Adjusted position for a more natural leg angle
    ctx.lineTo(580,530) // Adjusted position for a more natural leg angle
    ctx.closePath()
    ctx.stroke()

    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.lineWidth = 10 // Increased line width for thicker legs
    ctx.moveTo(620,490) // Adjusted position for a more natural leg angle
    ctx.lineTo(620,530) // Adjusted position for a more natural leg angle
    ctx.closePath()
    ctx.stroke()

    //Words on shirt
    ctx.font = '10px Arial' // Increased font size for better readability
    ctx.fillStyle = 'white'
    const text = 'TEAM VIEWER'
    const x = 573 // Adjusted x position for better alignment
    const y = 465 // Adjusted y position for better alignment

    ctx.fillText(text, x, y)

}

function drawTree(x, y, trunkHeight, canopyRadius, seed) {
    // Use a seeded random number generator
    function seededRandom() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    // Draw trunk
    const trunkWidth = trunkHeight * 0.1;
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.moveTo(x - trunkWidth / 2, y);
    ctx.quadraticCurveTo(x - trunkWidth / 4, y - trunkHeight / 2, x, y - trunkHeight);
    ctx.quadraticCurveTo(x + trunkWidth / 4, y - trunkHeight / 2, x + trunkWidth / 2, y);
    ctx.fill();

    // Draw canopy
    const leafColors = ["#228B22", "#32CD32", "#90EE90", "#006400"];
    
    function drawLeafCluster(centerX, centerY, size) {
        const clusterColor = leafColors[Math.floor(seededRandom() * leafColors.length)];
        ctx.fillStyle = clusterColor;
        
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const leafX = centerX + Math.cos(angle) * size / 2;
            const leafY = centerY + Math.sin(angle) * size / 2;
            
            ctx.beginPath();
            ctx.ellipse(leafX, leafY, size / 2, size / 4, angle, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Draw leaf clusters
    for (let i = 0; i < 50; i++) {
        const angle = seededRandom() * Math.PI * 2;
        const radius = seededRandom() * canopyRadius;
        const clusterX = x + radius * Math.cos(angle);
        const clusterY = y - trunkHeight - radius * Math.sin(angle);
        
        drawLeafCluster(clusterX, clusterY, 20 + seededRandom() * 10);
    }

    // Add highlight to the canopy
    const gradient = ctx.createRadialGradient(
        x, y - trunkHeight - canopyRadius / 2, 0,
        x, y - trunkHeight - canopyRadius / 2, canopyRadius
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y - trunkHeight - canopyRadius / 2, canopyRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLand() {
    // Sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 200);
    skyGradient.addColorStop(0, "#87CEEB");
    skyGradient.addColorStop(1, "#E0F6FF");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height - 200);

    // Ground
    const groundGradient = ctx.createLinearGradient(0, canvas.height - 200, 0, canvas.height);
    groundGradient.addColorStop(0, "#228B22");
    groundGradient.addColorStop(1, "#145214");
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - 200, canvas.width, 200);

    // Draw trees
    drawTree(canvas.width * 0.2, canvas.height - 200, 100, 150, 12345);
    drawTree(canvas.width * 0.8, canvas.height - 200, 120, 180, 67890);
}

function drawRoad() {
    // Road
    ctx.fillStyle = "#5A5A5A";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Road markings
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 5;
    ctx.setLineDash([40, 20]); // Dashed line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();

    // Reset line dash
    ctx.setLineDash([]);
}

function drawCar(x, color) {
    const y = canvas.height - 130; // Position the car on the road

    // Car body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 50, y + 80);
    ctx.lineTo(x + 60, y + 30);
    ctx.lineTo(x + 80, y);
    ctx.lineTo(x + 200, y);
    ctx.lineTo(x + 240, y + 30);
    ctx.lineTo(x + 260, y + 80);
    ctx.closePath();
    ctx.fill();

    // Car roof
    ctx.fillStyle = "#2980b9";
    ctx.beginPath();
    ctx.moveTo(x + 100, y + 30);
    ctx.lineTo(x + 110, y + 10);
    ctx.lineTo(x + 190, y + 10);
    ctx.lineTo(x + 220, y + 30);
    ctx.closePath();
    ctx.fill();

    // Windows
    ctx.fillStyle = "#ecf0f1";
    ctx.beginPath();
    ctx.moveTo(x + 105, y + 35);
    ctx.lineTo(x + 115, y + 15);
    ctx.lineTo(x + 185, y + 15);
    ctx.lineTo(x + 215, y + 35);
    ctx.closePath();
    ctx.fill();

    // Wheels
    drawWheel(x + 90, y + 80);
    drawWheel(x + 220, y + 80);

    // Headlights
    ctx.fillStyle = "#f1c40f";
    ctx.beginPath();
    ctx.arc(x + 70, y + 50, 10, 0, Math.PI * 2);
    ctx.fill();

    // Taillights
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(x + 250, y + 40, 8, 15);
}

function drawWheel(centerX, centerY) {
    ctx.fillStyle = "#2c3e50";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#95a5a6";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawHouse() {
    const houseX = canvas.width * 0.55 - 250; // Adjusted to move the house slightly to the right
    const houseY = canvas.height - 550; // Adjust this to position the house on the ground

    //First floor
    ctx.fillStyle = "#f9fdb7"
    ctx.fillRect(houseX+25, houseY, 300, 150)

    //Baricade
    ctx.fillStyle = "#c60000"
    ctx.fillRect(houseX-25, houseY+150, 400, 50)

    //Ground floor
    ctx.fillStyle = "#f9fdb7"
    ctx.fillRect(houseX, houseY+200, 350, 200)

    //Windows
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(houseX+25, houseY+240, 80, 80)
    ctx.fillStyle = "white"
    ctx.fillRect(houseX+35, houseY+250, 20, 20)
    ctx.fillRect(houseX+75, houseY+250, 20, 20)
    ctx.fillRect(houseX+35, houseY+290, 20, 20)
    ctx.fillRect(houseX+75, houseY+290, 20, 20)

    ctx.fillStyle = "#8B4513"
    ctx.fillRect(houseX+245, houseY+240, 80, 80)
    ctx.fillStyle = "white"
    ctx.fillRect(houseX+255, houseY+250, 20, 20)
    ctx.fillRect(houseX+295, houseY+250, 20, 20)
    ctx.fillRect(houseX+255, houseY+290, 20, 20)
    ctx.fillRect(houseX+295, houseY+290, 20, 20)
    
    //Door
    ctx.fillStyle = '#c60000'
    ctx.beginPath()
    ctx.moveTo(houseX+130, houseY+400)
    ctx.lineTo(houseX+130, houseY+235)
    ctx.lineTo(houseX+220, houseY+235)
    ctx.lineTo(houseX+220, houseY+400)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(houseX+200, houseY+320, 5, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(houseX+135, houseY+240, 80, 160)

    //Knob
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(houseX+200, houseY+320, 5, 0, Math.PI * 2)
    ctx.fill()

    //windows for first floor
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(houseX+60, houseY+40, 80, 80)
    ctx.fillStyle = "white"
    ctx.fillRect(houseX+70, houseY+50, 20, 20)
    ctx.fillRect(houseX+110, houseY+50, 20, 20)
    ctx.fillRect(houseX+70, houseY+90, 20, 20)
    ctx.fillRect(houseX+110, houseY+90, 20, 20)

    ctx.fillStyle = "#8B4513"
    ctx.fillRect(houseX+210, houseY+40, 80, 80)
    ctx.fillStyle = "white"
    ctx.fillRect(houseX+220, houseY+50, 20, 20)
    ctx.fillRect(houseX+260, houseY+50, 20, 20)
    ctx.fillRect(houseX+220, houseY+90, 20, 20)
    ctx.fillRect(houseX+260, houseY+90, 20, 20)

    //Roof
    ctx.fillStyle = "#8B4513"
    ctx.beginPath()
    ctx.moveTo(houseX-40, houseY)
    ctx.lineTo(houseX+400, houseY)
    ctx.lineTo(houseX+160, houseY-60)
    ctx.closePath()
    ctx.fill()


    // Driveway
    ctx.fillStyle = "#A9A9A9";
    ctx.beginPath();
    ctx.moveTo(houseX+130, houseY+400);
    ctx.lineTo(houseX+220, houseY+400);
    ctx.lineTo(houseX+220, houseY+450);
    ctx.lineTo(houseX+130, houseY+450);
    ctx.closePath();
    ctx.fill();
}

function drawStaticElements() {
    drawLand();
    drawRoad();
    drawTree(canvas.width * 0.2, canvas.height - 200, 100, 150, 12345);
    drawTree(canvas.width * 0.8, canvas.height - 200, 120, 180, 67890);
    drawHouse();
    drawMan();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticElements();
    drawCar(carX, '#3498db');
    drawCar(carY, '#DB7734FF');

    carX += 2;
    carY += 5;
    if (carX > canvas.width) {
        carX = -300;
    }

    if (carY > canvas.width){
        carY = -400;
    }

    requestAnimationFrame(animate);
}

// Initial draw of static elements
drawStaticElements();

// Start animation
animate();