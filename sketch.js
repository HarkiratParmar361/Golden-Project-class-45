var playerImage,playerSprite
var bgImg
var stoneImg
var stoneGroup
var lazerImg
var lazerGroup
var winingScore=0
var play=1;
var end=0;
var gameState=play
var playerHealth=100;

function preload() {
 playerImage=loadImage("Sprites/playerShip.png");
 bgImg=loadImage("Sprites/bg.png");
 stoneImg=loadImage("Sprites/stone.png")
 lazerImg=loadImage("Sprites/lazer.png")
}
function setup() {
  
  createCanvas(displayWidth,displayHeight-220);
  playerSprite=createSprite(displayWidth/2,displayHeight-350);
  playerSprite.addImage(playerImage);
  playerSprite.scale=0.5;
  stoneGroup=new Group();
  lazerGroup=new Group();
}

function draw() {
  background(bgImg);
  if(gameState===play){
    playerMovement();
    spawnStones();
    lazers();
    destroyStone();
    playerHealthCheck()
    if(playerHealth===1){
      gameState=end;
    }
  }
  else if(gameState===end){

  }
 
  
 
  drawSprites();
  
  fill("Yellow");
  textSize(15);
  text("Score:"+winingScore,displayWidth-200,50);

}
function playerMovement(){
    if(keyWentDown("LEFT_ARROW")){
      playerSprite.velocityX=-20;
    }
    if(keyWentDown("RIGHT_ARROW")){
      playerSprite.velocityX=20;
    }
    if(keyWentUp("LEFT_ARROW")){
      playerSprite.velocityX=0;
    }
    if(keyWentUp("RIGHT_ARROW")){
      playerSprite.velocityX=0;
    }

}
function spawnStones(){
 
 if(frameCount%60===0){
  var stone=createSprite(random(50,displayWidth-200),-20,80,20)
  stone.addImage(stoneImg);
  stone.velocityY=10
  console.log(frameCount);
  stone.scale=0.5;
  stone.lifetime=displayHeight/10;
  stoneGroup.add(stone);
 }
}
function lazers(){
 if(keyWentDown ("SPACE")){
  var lazer=createSprite(playerSprite.x,playerSprite.y,10,20);
  lazer.addImage(lazerImg);
  lazer.velocityY=-3;
  lazer.scale=0.5;
  lazerGroup.add(lazer);

 }

}
function destroyStone(){
  for(var i=0;i<stoneGroup.length;i=i+1){
    if(lazerGroup.isTouching(stoneGroup.get(i))){
      stoneGroup.get(i).lifetime=0;
      stoneGroup.get(i).remove();
      lazerGroup.destroyEach();
      winingScore=winingScore+1
      }
  }
  
}
function playerHealthCheck(){
  //if the stone is touching the player for each and every stone, reduce the player health count-1
  
}
