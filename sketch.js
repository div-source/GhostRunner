var tower,door,ghost,climber;
var towerImage,doorImage,ghostImage,climberImage;
var gameState="play";
var climbersGroup,doorsGroup,blockGroup;
var block;
var sound;

function preload(){
  
  towerImage=loadImage("tower.png");
  ghostImage=loadImage("ghost-standing.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  sound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  sound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.3;
  
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  blockGroup=createGroup();
  
}
function draw(){
  background("black")
  
  
  if(gameState==="play"){
    if(keyDown("left")){
      ghost.x = ghost.x-2;
    }
    if(keyDown("right")){
      ghost.x = ghost.x+2;
      
    }
    if(keyDown("space")){
      ghost.velocityY = -10;
      
    }
    ghost.velocityY = ghost.velocityY + 0.5;
    if(tower.y>400){
      tower.y=300;
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
     spawndoors();
    if(blockGroup.isTouching(ghost)){
      ghost.destroy();
      gameState="end";
    }
      drawSprites();
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
  }

  

  
  
  
  
  
}

function spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    block=createSprite(200,15);
    block.width=climber.width;
    block.height=2;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    block.x = door.x;
    door.addImage("door",doorImage);
    climber.addImage("climber",climberImage);
    door.velocityY = 1;
    climber.velocityY = 1;
    block.velocityY = 1;
    
    door.lifetime = 600;
    climber.lifetime = 600;
    block.lifetime = 600;
    
    door.depth = ghost.depth;
    ghost.depth+=1;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
blockGroup.add(block);
    
  }
}
