let snowmanParts = [];
let selectedPart = null;
let offsetX = 0;
let offsetY = 0;
let snowflakes = []; // Array for snowflakes

function setup() {
  createCanvas(windowWidth, windowHeight); // Responsive canvas size
  noStroke();

  // Create initial snowflakes
  for (let i = 0; i < 100; i++) { // Decreased snowflakes for smaller screens
    snowflakes.push(new Snowflake());
  }

  // Add snowman parts
  snowmanParts.push(new SnowmanPart('Eye', 50, 50, 10, color(0))); // Eye
  snowmanParts.push(new SnowmanPart('Eye', 80, 50, 10, color(0))); // Eye
  snowmanParts.push(new SnowmanPart('Nose', 65, 90, 20, color(255, 165, 0))); // Nose
  snowmanParts.push(new SnowmanPart('Button', 50, 150, 15, color(0))); // Button
  snowmanParts.push(new SnowmanPart('Button', 80, 180, 15, color(0))); // Button
  snowmanParts.push(new SnowmanPart('Arm', 30, 230, 50, color(139, 69, 19))); // Left arm
  snowmanParts.push(new SnowmanPart('Arm', 120, 230, 50, color(139, 69, 19))); // Right arm
  snowmanParts.push(new SnowmanPart('Hat', 70, 20, 40, color(0))); // Hat
  snowmanParts.push(new SnowmanPart('Scarf', 100, 100, 60, color(200, 0, 0))); // Scarf
}

function draw() {
  background(50, 150, 255); // Winter sky

  // Draw ground
  fill(240);
  rect(0, height - 100, width, 100); // Adjust the ground to fit mobile screens

  // Draw snowflakes
  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }

  // Draw snowman body
  fill(255);
  ellipse(width / 2, height - 300, 200, 200); // Base (centered)
  ellipse(width / 2, height - 450, 150, 150); // Middle
  ellipse(width / 2, height - 575, 100, 100); // Head

  // Draw all parts
  for (let part of snowmanParts) {
    part.update();
    part.display();
  }

  // Draw explanation box
  drawExplanationBox();
}

function touchStarted() {
  for (let part of snowmanParts) {
    if (part.isHovered(mouseX, mouseY)) {
      selectedPart = part;
      offsetX = mouseX - part.x;
      offsetY = mouseY - part.y;
      break;
    }
  }
}

function touchMoved() {
  if (selectedPart) {
    selectedPart.x = mouseX - offsetX;
    selectedPart.y = mouseY - offsetY;
  }
}

function touchEnded() {
  selectedPart = null;
}

function keyPressed() {
  // Use UP and DOWN arrows to resize the selected part
  if (selectedPart) {
    if (keyCode === UP_ARROW) {
      selectedPart.size += 5;
    } else if (keyCode === DOWN_ARROW) {
      selectedPart.size = max(5, selectedPart.size - 5);
    }
    // Use LEFT and RIGHT arrows to rotate parts that support rotation
    if (
      selectedPart.type === 'Arm' || 
      selectedPart.type === 'Hat' || 
      selectedPart.type === 'Nose' || 
      selectedPart.type === 'Scarf'
    ) {
      if (keyCode === LEFT_ARROW) {
        selectedPart.angle -= 10;
      } else if (keyCode === RIGHT_ARROW) {
        selectedPart.angle += 10;
      }
    }
  }
}

function drawExplanationBox() {
  // Background for the explanation box
  fill(255, 255, 255, 200);
  rect(20, height - 220, width - 40, 120, 10);

  // Text content for the explanation
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(
    "Velkommen til Sneemanden, så fin,\n" +
    "Træk dele og gør den din!\n\n" +
    "- Brug op/ned pile for at ændre størrelse.\n" +
    "- Brug venstre/højre pile for at rotere skovlen.\n" +
    "- Skab din drømme-sneemand.\n" +
    "- Er det sjovt? Ja, det er vi enige om!\n", 
    30, height - 200
  );
}

class SnowmanPart {
  constructor(type, x, y, size, col) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.angle = 0; // For rotation
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle)); // Apply rotation
    fill(this.col);

    // Draw based on type
    if (this.type === 'Eye') {
      ellipse(0, 0, this.size, this.size);
    } else if (this.type === 'Nose') {
      triangle(
        -this.size / 2, 0,
        this.size / 2, 0,
        0, -this.size
      );
    } else if (this.type === 'Button') {
      ellipse(0, 0, this.size, this.size);
    } else if (this.type === 'Arm') {
      rect(0, 0, this.size, this.size / 5);
    } else if (this.type === 'Hat') {
      rect(-this.size, -this.size / 2, this.size * 2, this.size / 2); // Brim
      rect(-this.size / 2, -this.size, this.size, this.size / 2); // Top
    } else if (this.type === 'Scarf') {
      rect(-this.size / 2, 0, this.size, this.size / 5); // Horizontal part
      rect(0, 0, this.size / 5, this.size / 2); // Vertical part
    }
    pop();
  }

  update() {
    // No snapping
  }

  isHovered(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size;
  }
}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-50, height); // Start above the canvas
    this.size = random(2, 5);
    this.speed = random(1, 3);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-50, -10); // Reset above the canvas
      this.x = random(width);
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
