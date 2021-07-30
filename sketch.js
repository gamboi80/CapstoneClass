//ghost, space button, gravity, lefr right arrow command
var tower, towerImage;
var ghost, ghostImage;
var door, doorImagel, doorsGroup;
var climber, climberImage, climberGroup;
var invisibleBlock, invisibleBlockGroup;

function preload(){
    towerImage = loadImage("tower.png");
    ghostImage = loadImage("ghost-standing.png");
    doorImage1 = loadImage("door.png");
    climberImage = loadImage("climber.png");
}

function setup(){
    createCanvas(600,600);

    tower = createSprite(300,300);
    tower.addImage(towerImage);
    tower.velocityY=1;

    ghost = createSprite(200,200,50,50);
    ghost.addImage(ghostImage);
    ghost.scale=0.3;

    doorsGroup = new Group();
    climberGroup = new Group();
    invisibleBlockGroup = new Group();

    
    }   

    

function draw(){
    background("black");

    if(tower.y>600){
        tower.y=300;
    }

    //Movement
    if(keyDown(LEFT_ARROW)){
        ghost.x=ghost.x-3;
    }
    if(keyDown(RIGHT_ARROW)){
        ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
        ghost.velocityY=-5;
    }
    //Gravity
    ghost.velocityY=ghost.velocityY+0.8

    //Collision
    if(climberGroup.isTouching(ghost)){
        ghost.velocityY=0;
        
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
        ghost.destroy();
    }
    
    



    spawnDoorsAndClimbers();
    drawSprites();
}

function spawnDoorsAndClimbers(){
    if(frameCount%240===0){
        door = createSprite(200,-50);
        door.addImage(doorImage1);

        climber = createSprite(200,10);
        climber.addImage(climberImage);

        invisibleBlock = createSprite(200,15);
        invisibleBlock.width=climber.width;
        invisibleBlock.height=2;

        door.velocityY=1;
        door.x=Math.round(random(100,450));

        climber.x=door.x;
        climber.velocityY=1;

        invisibleBlock.x=door.x;
        invisibleBlock.velocityY=1;
        
        door.lifetime=601;
        doorsGroup.add(door);

        climber.liftetime=601;
        climberGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);

        ghost.depth=door.depth;
        ghost.depth+=1;
    }
}