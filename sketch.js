let orbit_radius;
let planet_size = 50;
let last_minute = -1;
let speed_multiplier = 1;
let stars = [];

function setup() {
  createCanvas(500, 500);
  orbit_radius = width/3;
  angleMode(RADIANS);

  // Generate stars
  for (let i=0; i<100; i++) {
    stars.push({
      x: random(-width/2, width/2),
      y: random(-height/2, height/2),
      brightness: random(50, 120)
    });
  }
}

function draw() {
  // Background gradient
  for (let y=0; y<height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(20, 20, 30), color(10, 10, 20), inter);
    stroke(c);
    line(0, y, width, y);
  }

  translate(width/2, height/2);

  // Draw stars
  strokeWeight(1.5);
  for (let star of stars) {
    stroke(255, star.brightness);
    point(star.x, star.y);
  }

  // Draw sun
  for (let r=50; r>0; r-=2) {
    fill(lerpColor(color(255, 220, 50, 50), color(255, 150, 0, 150), r/50));
    noStroke();
    ellipse(0, 0, r*2);
  }

  // Get real time hour, min, and sec
  let h = hour() + minute()/60 + (second() + millis()/1000)/3600;
  let m = minute() + (second() + millis()/1000)/60;
  let s = second() + millis()/1000;

  // Logging minute & printing to console
  let current_minute = floor(minute());
  if (current_minute !== last_minute) {
    console.log("Min:", current_minute);
    last_minute = current_minute;
  }

  // Planet orbit (24h full revolution)
  noFill();
  stroke(50, 100, 255);
  strokeWeight(2);
  circle(0, 0, orbit_radius*2);

  let planet_angle_orbit = map(h * speed_multiplier, 0, 24, 0, TWO_PI);
  let planet_x = orbit_radius * cos(planet_angle_orbit - PI/2);
  let planet_y = orbit_radius * sin(planet_angle_orbit - PI/2);

  // Planet rotation (1h spin)
  push();
  translate(planet_x, planet_y);
  let planet_angle_spin = map(m * speed_multiplier, 0, 60, 0, TWO_PI);
  rotate(planet_angle_spin - PI/2);

  // Planet body w gradient
  for (let r = planet_size/2; r>0; r--) {
    fill(lerpColor(color(255, 255, 255), color(0, 150, 180), r/(planet_size/2)));
    noStroke();
    ellipse(0, 0, r*2);
  }

  // Hour notch
  fill(191, 64, 191);
  noStroke();
  rectMode(CENTER);
  rect(planet_size/2 - 2, 0, 6, 12, 3);
  pop();

  // Moon orbit (1 min full revolution)
  push();
  translate(planet_x, planet_y);
  let moon_radius = 45;
  let moon_size = 12;
  let moon_angle = map(s * speed_multiplier, 0, 60, 0, TWO_PI);

  let moon_x = moon_radius * cos(moon_angle - PI/2);
  let moon_y = moon_radius * sin(moon_angle - PI/2);

  // Moon orbit ring
  noFill();
  stroke(255, 0, 0, 60);
  strokeWeight(2);
  circle(0, 0, moon_radius*2);

  // Moon w glow
  for (let r=moon_size; r>0; r--) {
    fill(255, 255, 255, map(r, 0, moon_size, 0, 180));
    noStroke();
    ellipse(moon_x, moon_y, r);
  }
  pop();
}