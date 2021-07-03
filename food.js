class Food{
  constructor(foodStock){
                        
   this.image=loadImage("Milk.png")
          this.foodStock=foodStock, this.lastFeed;
                }

    display(){
                         
        var rows=0;
   var count=0;
         if(this.foodStock%5===0){
       rows=this.foodStock/5;
     }else{
                                    
  rows=this.foodStock/5+1 }

 for(var y=0;y<rows && count<this.foodStock;y++){
   for(var x=0;x<5 && count<this.foodStock;x++){
   image(this.image,30+(x*25),200+(y*50),50,50);
       count++;

                            }
                        }
                    }

                bedroom(){

                    background(bedRoom,250,250);
                }

                garden(){
                    background(garden,250,250);
                }

                washRoom(){
                    background(washRoom,250,250);
                }


                
}