let sun;
let planet;
let moon;
let G = 1000;
let canvasWidth = 1000

function setup() {
  createCanvas(canvasWidth, canvasWidth);
  sun = new Planet(0.1, createVector(0,0), createVector(0,0))


  let r = random(sun.r+200, canvasWidth/2) //tilfældig startdistance fra solen
  let angle = random(0, 2*PI) //tilfældig vinkel fra solen
  let planetPos = createVector(r*cos(angle), r*sin(angle)) // kartesiske vektor bliver beregent
  let moonPos = createVector(r*cos(angle) + 17, r*sin(angle)) //månen er ved siden an planeten

  let OrbitEnhedVec = createVector((planetPos.x * cos(90) - planetPos.y * sin(90))/r, (planetPos.x * sin(90) + planetPos.y * cos(90))/r)
  let OrbitVel = createVector(OrbitEnhedVec.x * sqrt((G*sun.mass)/r ), OrbitEnhedVec.y * sqrt((G*sun.mass)/r))

  planet = new Planet(0.001, planetPos, OrbitVel);
  moon = new Planet(0.00001, moonPos, createVector(OrbitVel.x, OrbitVel.y + sqrt((G*planet.mass)/30)));
  console.log("Enhedsvektor x: " + OrbitEnhedVec.x + " y: " + OrbitEnhedVec.y)
  console.log("OrbitVel x: " + OrbitVel.x + " y: " + OrbitVel.y)
}

function draw() {
  translate(width/2,height/2)
  background("black");
  sun.show();
  sun.move();
  sun.gravitation(planet);
  sun.gravitation(moon);
  planet.show();
  planet.move();
  planet.gravitation(sun);
  planet.gravitation(moon);
  moon.show();
  moon.move();
  moon.gravitation(planet);
  moon.gravitation(sun);
  
}

class Planet {
  constructor(mass, pos, vel){
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.r = Math.cbrt(mass)*80;
  }
  show(){
    noStroke();
    fill(255);
    ellipse(this.pos.y, this.pos.x, this.r)
  }
  move(){
    this.pos.add(this.vel)
  }
  gravitation(Body2){
    let XDistance = this.pos.x-Body2.pos.x
    let YDistance = this.pos.y-Body2.pos.y
    let r = sqrt((XDistance)**2+(YDistance)**2)//afstand mellem objekterne
    let force = G*((Body2.mass*this.mass)/(r)**2)//kraft mellem objekterne 
    let enhedsVektor = createVector((XDistance)/r, (YDistance)/r)
    let gravity = createVector(-(force*enhedsVektor.x), -(force*enhedsVektor.y));
    let gAcceleration = createVector(gravity.x / this.mass, gravity.y/ this.mass)
    this.vel.add(gAcceleration) //f=m*a
  }
  
}
