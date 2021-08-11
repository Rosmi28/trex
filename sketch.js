var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY =1 
var END = 0 
var gameState=PLAY 
var cloud, cloudsGroup, cloudImage;
var ob1,ob2,ob3,ob4,ob5,ob6,Score
var st,og 
var go,goi,r,ri 
var js, cs,ds 

var newImage;

function preload(){ 
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  cloudImage = loadImage("cloud.png");
goi=loadImage("gameOver.png");
ri=loadImage("restart.png"); 
js=loadSound("jump.mp3");
//cs=loadSound("checkpoint(1).mp3");
//ds=loadSound("die(1).mp3") 
} 

function setup() {
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.debug=true 
  trex.setCollider("circle",0,0,40)
  ground = createSprite(width/2,height-70,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false; 
  Score=0
  console.log("Hello"+ 5)

og = new Group(); 
st = new Group(); 

go=createSprite(width/2,height/2,-50,)
r=createSprite(width/2,height/2,)
go.addImage(goi) 
r.addImage(ri) 
go.scale=0.5
r.scale=0.5 

  
}

function draw() {
  background(180);
  text("Score:"+Score,500,50)

  if(gameState === PLAY ){
 ground.velocityX =-(4+3*Score/100);
 if(touches.length>0||keyDown("space")&& trex.y >= 100) { 
   js.play()
  trex.velocityY = -10;
  touches=[]
} 
trex.velocityY = trex.velocityY + 0.8 
if (ground.x < 0){
  ground.x = ground.width/2;
}
spawnClouds();
  Obsticles();
 Score = Score+Math.round(getFrameRate()/60)  
 if(og.isTouching(trex)){
  gameState=END 
 // trex.velocityY=-10
//ds.play() 

 }
 go.visible=false 
 r.visible=false 
  } 
  else if (gameState === END){
ground.velocityX = 0 
og.setVelocityXEach(0)
st.setVelocityXEach(0)
trex.changeAnimation("collided",trex_collided) 
og.setLifetimeEach(-1)
st.setLifetimeEach(-1) 
trex.velocityY=0
go.visible=true
r.visible=true
if( mousePressedOver(r)) {
  reset ()
}
}

 
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+20,height-200,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = width/3
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
     st.add(cloud); 
     
    }
}

function Obsticles(){
if(frameCount%60 === 0){
var Obsticle = createSprite(600,height-95,20,30) 
Obsticle.velocityX=-(6+Score/100)
var a = Math.round(random(1,6))
switch(a){
  case 1: Obsticle.addImage(ob1)
  break;
  case 2: Obsticle.addImage(ob2)
  break;
  case 3: Obsticle.addImage(ob3)
  break;
  case 4: Obsticle.addImage(ob4)
  break;
  case 5: Obsticle.addImage(ob5)
  break;
  case 6: Obsticle.addImage(ob6)
  break;} 
og.add(Obsticle); 
Obsticle.scale=0.5
Obsticle.lifetime = width/6


}
}
function reset(){
  gameState=PLAY
  go.visible=false 
  r.visible=false 
  og.destroyEach()
  st.destroyEach()
  Score=0
  trex.changeAnimation("running",trex_running)
} 