var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, groundImage;
var player, shooter;
var gameOver, restart;
var score;
var bulletGroup;
var galaxian1Group, galaxian2Group, galaxian3Group;
var galaxianImage1, galaxianImage2, galaxianImage3;
function preload() {
    groundImage = loadImage("space.png");
    shooter = loadImage("player.png");
    galaxianImage1 = loadImage("1.png");
    galaxianImage2 = loadImage("3.png");
    galaxianImage3 = loadImage("4.png");
    gameOverImg = loadImage("over.jpeg");
    restartImg = loadImage("restart.jpeg");
    gunSound = loadSound("ak.mp3");
    overSound = loadSound("over.mp3");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    player = createSprite(100, 420);
    player.addImage(shooter);
    player.scale = 0.4;

    galaxian1Group = createGroup();
    galaxian2Group = createGroup();
    galaxian3Group = createGroup();
    bulletGroup = createGroup();

    gameOver = createSprite(700, 300);
    gameOver.addImage(gameOverImg);

    restart = createSprite(700, 500);
    restart.addImage(restartImg);

    gameOver.scale = 1;
    restart.scale = 0.2;

    gameOver.visible = false;
    restart.visible = false;

    score = 0;
}

function draw() {
    background(groundImage)
    
    player.x = World.mouseX;
    createEdgeSprites();

    if (gameState === PLAY) {

        if (galaxian1Group.isTouching(player)) {
            gameState = END;
        }

        if (galaxian2Group.isTouching(player)) {
            gameState = END;
        }

        if (galaxian3Group.isTouching(player)) {
            gameState = END;
        }

        if (keyDown("space")) {
            createBullet(player.x);
        }


        var rand = (Math.round(random(0, 2)));

        if (World.frameCount % 30 == 0) {
            if (rand == 0) {
                createGalaxian1();
            } else if (rand == 1) {
                createGalaxian2();
            } else {
                createGalaxian3();
            }
        }


        if (bulletGroup.isTouching(galaxian1Group)) {
            galaxian1Group.destroyEach();
            //createBullet.destroyEach();
            score = score + 2;
        } else if (bulletGroup.isTouching(galaxian2Group)) {
            galaxian2Group.destroyEach();
            //createBullet.destroyEach();
            score = score + 4;
        } else if (bulletGroup.isTouching(galaxian3Group)) {
            galaxian3Group.destroyEach();
           // createBullet.destroyEach();
            score = score + 6;
        }

        if (galaxian1Group.y > 0) {
            score = score - 4;
        }
        if (galaxian2Group.y > 0) {
            score = score - 4;
        }
        if (galaxian3Group.y > 0) {
            score = score - 4;
        }


    } else if (gameState === END) {

        galaxian1Group.setVelocityXEach();
        galaxian2Group.setVelocityXEach();
        galaxian3Group.setVelocityXEach();
        player.visible = false;
        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)) {
            reset();
        }
    }
    

    fill("white");
    textSize(20);
    text("Score: " + score, 1200, 50);

    drawSprites();
}

function createBullet(x) {
    var bullet = createSprite(500, 800, 5, 40);
    bullet.y = 360;
    bullet.x = x;
    bullet.shapeColor = "blue";
    bullet.velocityY = -9;
    bullet.lifetime = 1000;
    bulletGroup.add(bullet);
    
}

function createGalaxian1() {
    var galaxian1 = createSprite(Math.round(random(30, 1500)));
    galaxian1.addImage(galaxianImage1);
    galaxian1.scale = 0.5;
    galaxian1.velocityY = 10;
    galaxian1.lifetime = 1000;
    galaxian1Group.add(galaxian1);
}

function createGalaxian2() {
    var galaxian2 = createSprite(Math.round(random(20, 1500)));
    galaxian2.addImage(galaxianImage2);
    galaxian2.scale = 0.5;
    galaxian2.velocityY = 10;
    galaxian2.lifetime = 1000;
    galaxian2Group.add(galaxian2);
}

function createGalaxian3() {
    var galaxian3 = createSprite(Math.round(random(30, 1500)));
    galaxian3.addImage(galaxianImage3);
    galaxian3.scale = 0.5;
    galaxian3.velocityY = 10;
    galaxian3.lifetime = 1000;
    galaxian3Group.add(galaxian3);
}

function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    galaxian1Group.destroyEach();
    galaxian1Group.destroyEach();
    galaxian1Group.destroyEach();
    bulletGroup.destroyEach();
    player.visible = true
    score = 0;
}