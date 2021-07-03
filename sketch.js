var dog, happyDog, database, foods, foodStock, dogImage1, dogImage2,dogImage3,dogImage4;
var butFeedPet,butAddFood;
var fedTime, lastFed=12;
var changeGameState,readGameState;
var bedRoom,garden,washRoom;
var food1;
function preload()
{
	dogImage1=loadImage("Dog.png");
  dogImage2=loadImage("happydog.png");
  bedRoom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  washRoom=loadImage("Wash Room.png");
  dogImage3=loadImage("deadDog.png");
  dogImage4=loadImage("Lazy.png")

}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(400,250,20,20)
  dog.scale=0.2;
  dog.addImage(dogImage1);

  database=firebase.database();
  getFoodStock();
  setStock(20);

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  
  readGameState=database.ref('gameState');
  readGameState.on("value",function(data){
  changeGameState=data.val();
  })

  })

  Food1=new Food(foods);
  butFeedPet=createButton("FEED PET");
  butFeedPet.position(400,60);
  butFeedPet.mousePressed(feedTheDog);
  butAddFood=createButton("ADD FOOD");
  butAddFood.position(400,100);
  butAddFood.mousePressed(addFood);
  
}

function draw() { 
  background("blue");
  drawSprites();
  textSize(20);
  fill ("yellow");
  stroke ("black");
  
  if(lastFed>12){
            text("last feed: "+lastFed%12 +"PM",350,30);
  }else if(lastFed===12){
          text("last feed: 12 PM",350,30);
      }else if(lastFed===0){
        text("last feed: 12 AM",350,30);
    }else{
    text("last feed: "+lastFed+"AM",350,30)
      }
      
  if(changeGameState!=="hungry"){
    hide();
    dog.addImage(dogImage4);
    //Food1.hide();
  }else {
    butFeedPet.show();
    butAddFood.show();
    dog.addImage(dogImage3);
  }

  var currentTime=hour();
  if(currentTime===(lastFed+1)){
          update("playing");
          Food1.garden();
  }else{
        if(currentTime===(lastFed+2)){
          update("sleeping");
          Food1.bedRoom();
        }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4) ){
          update("Bathing");
          Food1.washRoom();
         }else {
          update("hungry");
          Food1.display();
        }
  }
  
}

function readStock(data){
      foods=data.val();
     }

function writeStock(x){
        if(x<=0){
          x=0;
        }else{
          x=x-1
        }
        setStock(x)

        }

function setStock(x){
  database.ref('/food').set(x)
}

function feedTheDog(){
  dog.addImage(dogImage2);
  foods--;
  lastFed=hour();
  Food1.foods=foods;
  Food1.display()
  database.ref('/').update({
  food:foods,
  fedTime:lastFed
  })
}

function addFood(){
  foods++
  }

function getFoodStock() {
    foodStock=database.ref('food')
    foodStock.on("value",readStock)
    }
  
function updateFoodStock(food){
      database.ref('/').update ({foodStock:food})
    }

function update(state){
          database.ref('/').update({changeGameState:state});
}

function hide(){
  butFeedPet.hide();
  butAddFood.hide();
}