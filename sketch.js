var back, back1;
var bee, happyB, searchB, hive, hives, hiveImg, wing;
var flower, flowers, f1, f2, f3, f4, stem, stems;
var count, honey, branch, branches;
var time;

function preload()
{
  
  //load background images
  back1 = loadImage("bush2.png");
  
  //load bee images
  happyB = loadImage("bee4.png");
  searchB = loadImage("bee3.png");
  
  //load flower images
  f1 = loadImage("f1.png");
  f2 = loadImage("f4.png");
  f3 = loadImage("f7.png");
  f4 = loadImage("f6.png");
  
  //load hive image
  hiveImg = loadImage("hive1.png");
  
}

function setup() 
{
 
  
  //create background
  back = createSprite(300,300,600,600);
  back.addImage("back1",back1);
  back.scale = 1.7;
  
  //create bee
  bee = createSprite(300,510,50,50);
  bee.addImage("bee", searchB);
  bee.scale = 0.4;
  
  
  //create flowers group
  flowers = createGroup();
  stems = createGroup(); 
  hives = createGroup();
  branches = createGroup();
  
  
  //create wing
  wing = createSprite(300,560,600,10);
  wing.visible = false;
  
  count = 0;
  honey = 0; 
  time = 0;
}

function draw() 
{
  background("lightgrey");
  
  createCanvas(600,600);
  drawSprites();
  fill("red");
  textSize(18);
  text("Help The Bee Make a Bigger Hive by Collecting Honey From Flowers",20,100);
  text("HONEY IN HIVE : "+honey+"%" ,400,50);
  
  bee.collide(wing);
  if(count != count %10)
    {
      bee.addImage("bee", searchB);
    }
  
  //move the bee
  if(keyDown("space"))
  {
    bee.velocityY = -6;    
  }
  bee.velocityY = bee.velocityY + 0.8;
  if(keyDown("left"))
  {
    bee.x = bee.x - 3;
  }
  if(keyDown("right"))
  {
    bee.x = bee.x + 3;
  }
  
 
  back.velocityY = 2;
  if(back.y > 500)
    {
      back.y = 100;
    }
  spawnFlowers();
  spawnHive();
  
  
  if(stems.isTouching(bee))
    {
      stem.destroy();
      bee.velocityY = 0;
      count = count + 1;
      console.log(count);
    }
  if(count % 10 === 0 && count > 0)
    {
      text("GO TO HIVE",300,300); 
      bee.addImage("bee", happyB);
      count = count;
      time = time + 1;
      if(time === 300)
      {
        time = 0;
        bee.destroy();
        text("BEE IS DEAD",300,300);
      }  
    }
  if((branches.isTouching(bee)) && (count > 0) && (count % 10 === 0) && (time < 300))
    {
      branch.destroy();
      hive.scale = hive.scale + 0.1;
      honey = honey + 10;
      count = count + 1;
    }
  
}

function spawnFlowers()
{
  if(frameCount % 150 === 0)
    {
      flower = createSprite(random(100,500),random(100,400),20,20);
      flower.depth = bee.depth - 1;
      stem = createSprite(200,200,20,20);
      stem.visible = false;
      stem.x = flower.x;
      stem.y = flower.y;
      stem.velocityY = 2;
      stem.lifetime = 100;
      flower.velocityY = 2;
      flower.scale = 0.2;
      flower.lifetime = 150;
      var any = Math.round(random(1,3));
    switch(any) {
      case 1: flower.addImage("flower", f1);
              break;
      case 2: flower.addImage("flower", f2);
              break;
      case 3: flower.addImage("flower", f3);
              break;      
      case 4: flower.addImage("flower", f4);
              break;              
     default: break;
    }
      flowers.add(flower); 
      stems.add(stem);
    }
  
}

function spawnHive()
{
  if(frameCount % 800 === 0)
    {
      //create hive
        hive = createSprite(random(100,500),(100,500),30,30);
        branch = createSprite(300,300,30,30);
        branch.visible = false;
        branch.x = hive.x;
        branch.y = hive.y;
        hive.addImage("hive", hiveImg);
        hive.scale = 0.2;
        hive.lifetime = 80;
        branch.lifetime = 80;
        hives.add(hive);
        branches.add(branch);
  
    }
}