/*
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.
>_`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}
*/

////
///////  GAME SETTINGS
///

// ROOMS
let visitedRooms = {
  roomsAvailable: ["kitchen", "bedroom", "yard"]
}

class Room {
 constructor(description, hiddenitems, state, visited){
   this.description = description
   this.hiddenitems = hiddenitems
   this.state = state
   this.visited = visited
 }
 
 status(){
   return this.state
 }
 flip(){
   this.visited =! this.visited;
 }
 blockentry(){
   if(this.state === "closed"){
     return "Sorry you cannot enter this room: " + this.description;
   }
 }

}
let myBedroom = new Room('bedroom', ['man','alarm clock', 'flashlight'], 'open', false);
let myKitchen = new Room ('kitchen', ['dog bone'], 'closed', false);
let myYard = new Room ('yard', null , 'closed', false);



// INVENTORY
let playerInventory = [];


///
///// HIDDEN ITEMS
///
class Object{
  constructor(item, note1, note2, state){
      this.item = item
      this.note1 = note1
      this.note2 = note2
      this.state = state
  }

    read1() {
      console.log(this.note1);
      if (this.item === 'man'){
        myMan.flip();
      } 
  }

    read2() {
      return this.note2;
  }

    flip() {  
      this.state =! this.state;  
      return this.state;
  }
   
    add() {
      playerInventory.push(this.item);
      return "Print playerInventory " +  playerInventory.length;
  }
 
}

let myNote = new Object('note', 'Note says: Feeling hungry? Try the kitchen', null , true);
let myClock = new Object('clock', "RRrrrrrriiinggg -alarm clock rings-", null, false);
let myFlashlight = new Object('flashlight', "Gosh, this flashlight needs batteries. I'll tuck this away in my bag for now", null , false);
let myMan = new Object ('man', 'Zzzzz, hey what\'s the big idea?!!! I\'m sleeping.\n (TALK TO MAN AGAIN)', "You're still here? OK, well, since you're here. Can you find my dog?\n I think I left the 'DOGBONE' in the kitchen... (GO VISIT KITCHEN)", false);
let myDogbone = new Object ('dogbone', "'That dog sure better be here some where,\n so I can feed it with this DOGBONE.\n Woof woof'", null, true);





// GAME MENU
let menu = {
  options: ["Rooms: " + " Kitchen:  " + myKitchen.state + " Bedroom: " + myBedroom.state, 
            "Change Room: type change ", 
            "Inventory: type check inventory", 
            "Quit game: type quit or exit game"]
}




////
///////  'YOU' , the PLAYER
///
console.log(
  "Hello. Welcome to the game. You are in the foyer.\n" +
  "Rooms you can visit. " + visitedRooms['roomsAvailable'] + "\n"+
  "MISSION: \n" + 
  "1) Type a room name and press ENTER,\n" +  
  "2) Search in the room for hidden objects \n" +
  "At anytime, type 'check inventory' \n" + 
  "To exit game, type (exit)"
);

process.stdin.on("data", (chunk) => {
  let newlocation = chunk.toString().trim();
  if (newlocation.includes("menu")){
      console.log(menu['options']);
  } else if (newlocation.includes('available roooms')) {
      console.log("Open rooms to visit. " + visitedRooms['roomsAvailable']);
  }
  if (newlocation.includes('bedroom')) {
      ///
      //// Bedroom
      ///
      if(myBedroom.state === "closed"){
        console.log(myBedroom.blockentry());
      } else if (myBedroom.state === "open"){

          console.log("You are in the bedroom ");
          console.log("Check for hidden items? Type: search (room name)");
          if(newlocation.includes('search') && newlocation.includes('bedroom')){
          
              console.log(myNote.add());
              console.log(myClock.add());
              console.log(myFlashlight.add());
              console.log(myMan.add());
              console.log("CHECK INVENTORY? type check inventory."); 
          
          }

      }
     
    
  } else if (newlocation.includes('kitchen')) {
       ///
      //// Kitchen
      ///
      if(myKitchen.state === "closed"){
        console.log(myKitchen.blockentry());
        console.log("I think I hear someone snoring in the bedroom...")
      } else if (myKitchen.state === "open"){

          console.log("You are in the kitchen");
          console.log("Check for hidden items? Type: search (room name)");
          if(newlocation.includes('search') && newlocation.includes('kitchen')){
              console.log(myDogbone.add());
              console.log("CHECK INVENTORY? type check inventory."); 
          }
          
      }

  } else if (newlocation.includes('note') && playerInventory.includes('note')) {
      console.log(myNote.read1());
  } else if (newlocation.includes('man') && playerInventory.includes('man')) {
      let talk = 1;
      if (talk === 1){
          console.log(myMan.read1());
      }
      if (playerInventory.includes("man") && myMan.state === true ){
          console.log(myMan.read2());
          myKitchen.state = "open";
      }
  } else if (newlocation.includes('dogbone') && playerInventory.includes('dogbone')) {
      console.log(myDogbone.read1());
  } else if(newlocation.includes("change") || newlocation.includes("leave")){
      console.log('You are back in the main foyer. Rooms available to visit: ' + visitedRooms['roomsAvailable'] + " " + "Which room do you want to visit?");
  } else if (newlocation.includes("exit") || newlocation.includes("quit")) {
      process.exit();
  } else if(newlocation.includes("inventory")){
      console.log(playerInventory);
      console.log("length is " + playerInventory.length);
      console.log("USE ITEM? Type use (item name or talk to item).")
  } else {
      console.log( "Do you like apple pie? What would you like to do next?");
  }
});