var gameState = "play"
var score=0
var highScore = 0


function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,190,10,30)
  trex.addAnimation("running",trexAnimation)
  trex.addAnimation("collided",trexCollidedAnimation)
  trex.scale = 0.5

  
  trex.setCollider("circle",0,0,30)
  trex.debug = true
  
  ground = createSprite(200,190,1000,5)
  ground.addImage(groundImage)
  
  ground2 = createSprite(200,192,1000,5)
  ground2.visible = false
  
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
  birdsGroup = new Group()
  
  gameOver = createSprite(300,70,10,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.8
  
  restart = createSprite(300,120,10,10)
  restart.addImage(restartImage)
  restart.scale = 0.6
  
}

function preload(){
trexAnimation =loadAnimation("trex1.png","trex3.png","trex4.png")
trexCollidedAnimation = loadAnimation("trex1.png")
  birdAnimation = loadAnimation("bird1.png","bird2.png")
  bird2Animation = loadAnimation("bird2.png")
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1Image = loadImage("obstacle1.png")
  obstacle2Image = loadImage("obstacle2.png")
  obstacle3Image = loadImage("obstacle3.png")
  obstacle4Image = loadImage("obstacle4.png")
  obstacle5Image = loadImage("obstacle5.png")
  obstacle6Image = loadImage("obstacle6.png")
  
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  birdImage = loadImage("bluebird.png")
}


function draw() {  
 
  
  if(score>30 && score<70){
     background("black")
     }
  else{
     background("grey");
  }
  
  if(gameState == "play"){
    score = score+0.1  
     if(keyDown("space") && trex.y>145){
     trex.velocityY = -4
     }
     trex.velocityY = trex.velocityY+0.2
     ground.velocityX = -4
     if(ground.x<0){
     ground.x = ground.width/2
     }
   if(trex.isTouching(obstaclesGroup)){
     ground.velocityX = 0
     gameState = "end"
     trex.velocityY = 0
     }
  
 obstacles()
  clouds() 
  birds()
    
    gameOver.visible = false
    restart.visible = false
    
     }
  
  
  if(gameState == "end"){
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    birdsGroup.setVelocityXEach(0)
    trex.changeAnimation("collided")
    gameOver.visible = true
    restart.visible = true
    
    if(mousePressedOver(restart)){
       reset()
       }
    if(score>highScore){
       highScore = score
       }
     }
  
  fill("white") 
  text("score = "+ Math.round(score),500,50)
  fill("green")
  text("high score = " + Math.round(highScore),500,30)

  trex.collide(ground2)
  
  drawSprites()
}

function reset(){
 gameState = "play"
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  birdsGroup.destroyEach()
  trex.changeAnimation("running")
  score = 0
}


function obstacles(){
  
  if(frameCount%60==0){
  obstacle = createSprite(600,175,20,10)
  obstacle.velocityX = -4-score/10    
  r = Math.round(random(1,6))
  
    switch(r){
            case 1:obstacle.addImage(obstacle1Image)
            break;
            case 2:obstacle.addImage(obstacle2Image)
            break;
            case 3:obstacle.addImage(obstacle3Image)
            break;
            case 4:obstacle.addImage(obstacle4Image)
            break;
            case 5:obstacle.addImage(obstacle5Image)
            break;
            case 6:obstacle.addImage(obstacle6Image)
            break;
            default:break;
           }
    obstacle.scale = 0.4
    obstacle.depth = 1
    trex.depth = 2
    obstaclesGroup.add(obstacle)
    
}
}

function clouds(){
  if(frameCount%100==0){
    cloud = createSprite(600,50,10,10)
    cloud.y = Math.round(random(30,100))
    cloud.addImage(cloudImage)
    cloud.velocityX = -3
    cloud.scale = 0.7
    cloud.depth = 1
    trex.depth = 2
    cloudsGroup.add(cloud)
     }
}

function birds(){
  if(frameCount%50==0){
     bird = createSprite(600,50,10,10)
    bird.addAnimation("birds",birdAnimation)
    bird.addAnimation("birds2",bird2Animation)
    bird.shapeColor = "red"
    bird.y = Math.round(random(0,150))
    bird.scale = 0.1
    bird.velocityX = -4
    bird.depth = 1
    trex.depth = 2
    birdsGroup.add(bird)
     }
}




