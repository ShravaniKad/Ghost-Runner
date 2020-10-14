var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var block,blockGroup;
var gameState="play";


function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
}

function setup(){
  createCanvas(500,500);
  
  tower=createSprite(250,250,10,10);
  tower.addImage(towerImg);
  tower.velocityY=1;
  tower.scale=0.9;
  
  ghost=createSprite(250,250,10,10);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  blockGroup=new Group();

}

function draw(){
  background(0);
  
  if(gameState==="play"){
    
 
  
  if(tower.y>500){
    tower.y=250;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-2;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+2;
  }  
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    
    if(blockGroup.isTouching(ghost)|| ghost.y > 500){
      gameState="end";
      ghost.destroy();
    }
  
  spawnDoors();
  }
   
  
  drawSprites();
 
  if(gameState==="end"){
    background("black");
   fill("yellow") ;
   textSize(30);
   text("Game Over",150,250);
   
  } 
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(100,-50,10,10);
    door.addImage(doorImg);
    door.x=Math.round(random(100,350));
    door.velocityY=1;
    door.lifetime=600;
    doorGroup.add(door);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    climber=createSprite(5,10,10,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=600;
    climberGroup.add(climber);
    
    ghost.depth=climber.depth;
    ghost.depth=ghost.depth+1;
    
    block=createSprite(3,15,10,2);
    block.width=climber.width;
    block.x=door.x;
    block.velocityY=1;
    block.debug=true;
    blockGroup.add(block);
  }
}