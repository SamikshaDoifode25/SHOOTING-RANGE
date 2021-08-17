var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  heading= createElement("h1");
  scoreboard= createElement("h1");

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  
}

function draw() {
  background("#BDA297");

  scoreboard.html("Score: "+score);
  scoreboard.style("color:red");
  scoreboard.position(width-200,20);

  heading.html("life: "+life);
  heading.style("color:red");
  heading.position(150,20);


  if(gameState===1){
    gun.y=mouseY  

    if (keyDown("space")){
      shootbullet();
    }

    if (frameCount % 80 === 0){
      drawBlueBubble();
    }

    if (frameCount % 100 === 0){
      drawRedBubble();
    }

    if (blueBubbleGroup.collide(backBoard)){ 
      handleGameOver(blueBubbleGroup); } 
      if (redBubbleGroup.collide(backBoard)) { 
        handleGameOver(redBubbleGroup); } 
        if(blueBubbleGroup.collide(bulletGroup)){ 
          handleBubbleCollision(blueBubbleGroup); } 
          if(redBubbleGroup.collide(bulletGroup)){ 
            handleBubbleCollision(redBubbleGroup); }
    
    drawSprites();
  }
     
}

function shootbullet(){
  bullet=createSprite(150,width/2,50,20);
  bullet.y=gun.y-20;
  bullet.velocityX=7;
  bullet.addImage(bulletImg);
  bullet.scale=0.1;
  bulletGroup.add(bullet);
}

function drawBlueBubble(){
  blueBubble=createSprite(800,random(20,780),40,40);
  blueBubble.velocityX=-8;
  blueBubble.addImage(blueBubbleImg);
  blueBubble.scale=0.1;
  blueBubble.lifetime= 400;
  blueBubbleGroup.add(blueBubble);
}

function drawRedBubble(){
  RedBubble=createSprite(800,random(20,780),40,40);
  RedBubble.velocityX=-8;
  RedBubble.addImage(redBubbleImg);
  RedBubble.scale=0.1;
  RedBubble.lifetime= 400;
  redBubbleGroup.add(RedBubble);
}

function handleBubbleCollision(bubbleGroup){
  if (life > 0) {
    score= score+1;
  }

  blast=createSprite(bullet.x+60,bullet.y,50,50);
  blast.addImage(blastImg);
  blast.scale=0.1;
  blast.lifetime= 20;
  

  bulletGroup.destroyEach()
  bubbleGroup.destroyEach()
}

function handleGameOver(bubbleGroup){
  life = life-1;
  bubbleGroup.destroyEach();
  if(life===0){
    gameState=2;
    swal({ 
      title: `Game Over`, 
      text: "Oops you lost the game....!!!", 
      text: "Your Score is " + score, 
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png", 
      imageSize: "100x100", 
      confirmButtonText: "Thanks For Playing" 
    });
  }
}
