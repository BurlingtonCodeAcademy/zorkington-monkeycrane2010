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
let mancontainer = [];


///
///// HIDDEN ITEMS
///
class Object{
  constructor(item, note1, state){
      this.item = item
      this.note1 = note1
      this.state = state
  }

    read1() {
      console.log(this.note1);
  }

    flip() {  
      this.state =! this.state;  
      return this.state;
  }
   
    add() {
      playerInventory.push(this.item);
      return "Print playerInventory " +  playerInventory.length;
  }
 
    mancontainer(){
        mancontainer.push(this.item);
        return "Print ManContainer  " +  mancontainer.length;
    }
}

let myNote = new Object('note', 'Note says: Feeling hungry? Try the kitchen', true);
let myClock = new Object('clock', "RRrrrrrriiinggg -alarm clock rings-", false);
let myFlashlight = new Object('flashlight', "Gosh, this flashlight needs batteries. I'll tuck this away in my bag for now", false);
let myMan = new Object ('man', 'Zzzzz, hey what\'s the big idea?!!! I\'m sleeping.\n (TALK TO MAN AGAIN)', false);
let myMan2 = new Object ('man2',"You're still here? OK, well, since you're here. Can you find my dog?\n I think I left the 'DOGBONE' in the kitchen... (GO VISIT KITCHEN)", false);
let myEnvelope = new Object('envelope', "type exactly 'code 12345'", true);
let myDogbone = new Object ('dogbone', "'That dog sure better be here some where,\n so I can feed it with this DOGBONE.\n Woof woof'", true);
let myDog = new Object ('dog', "'Woof woof!' (wags tail)'", false);





// GAME MENU
let menu = {
  options: ["Status: " + " Bedroom: " + myBedroom.state + " Kitchen:  " + myKitchen.state + " Yard: " + myYard.state, 
            "Inventory: type check inventory", 
            "Quit game: type quit or exit"]
}

class Mission{
  constructor(item, description, state){
      this.item = item
      this.description = description
      this.state = state
  }

    describe() {
      return this.description;
    }

    flip() {
      this.state = true;
      console.log(this.state);
    }
  }
let Task1 = new Mission('task1', 'Visit bedroom STATUS', true);
let Task2 = new Mission('task2', 'Check bedroom for hidden items STATUS', false);
let Task3 = new Mission('task3', 'Talk to man in bedroom STATUS', false);
let Task4 = new Mission('task4', 'Find out how you can help the man STATUS', false);
let Task5 = new Mission('task5', 'Find dogbone STATUS', false);
let Task6 = new Mission('task6', 'Enter right code to unlock door to code STATUS', false);
let Task7 = new Mission('task7', 'Visit Yard STATUS', false);


////
///////  'YOU' , the PLAYER
///
console.log(
  "Hello. Welcome to 182 Main St. You are standing on Main Street between Church and South Winooski\n There is a door here. A keypad sits on the handle\n On the door is a handwritten sign\n ");

process.stdin.on("data", (chunk) => {
  let newlocation = chunk.toString().trim();
  if (newlocation.includes("menu")){
      console.log("MISSION: \n" + 
      "Task 1: " + Task1.describe() + " - " + Task1.state + "\n" +
      "Task 2: " + Task2.describe() + " - " + Task2.state + "\n" +
      "Task 3: " + Task3.describe() + " - " + Task3.state + "\n" +
      "Task 4: " + Task4.describe() + " - " + Task4.state + "\n" +
      "Task 5: " + Task5.describe() + " - " + Task5.state + "\n" +
      "Task 6: " + Task6.describe() + " - " + Task6.state + "\n" +
      "Task 7: " + Task7.describe() + " - " + Task7.state);
      console.log("Here are your game controls:");
      console.log(menu['options']);
  } else if (newlocation.includes('available roooms')) {
      console.log("Open rooms to visit. " + visitedRooms['roomsAvailable']);
  } else if (newlocation.includes("read sign")){
    console.log("The sign says 'Welcome to Burlington Code Academy!' Come on in... You are in the foyer.");
    console.log("Type 'menu' then press ENTER");
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
              Task2.flip();
              console.log(myNote.add());
              console.log(myClock.add());
              console.log(myFlashlight.add());
              console.log(myMan.add());
              console.log("CHECK INVENTORY? type check inventory."); 
          
          }

      }
     
    
  } else if (newlocation.includes('talk to man') && playerInventory.includes('man')) {
    console.log(myMan.mancontainer());
    if (mancontainer.length === 1){   
        console.log(myMan.read1());
        console.log(myMan.flip());
    }
    if (mancontainer.length === 2 && myMan.state === true ){
        console.log(myMan2.read1());
        myKitchen.state = "open";
        Task3.flip();
        Task4.flip();
    }

 } else if (newlocation.includes('note') && playerInventory.includes('note')) {
  console.log(myNote.read1());
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
              console.log(myEnvelope.add());
              Task5.flip();
              console.log("CHECK INVENTORY? type check inventory."); 
          }
          
      }

  } else if (newlocation.includes("yard")){
      ///
      //// Yard
      ///           
      if(myYard.state === "closed"){
          console.log(myYard.blockentry());
          console.log("barking in the distance\n I think that man\'s lost dog is behind this door. But this door is locked. (there's a number pad lock)\n Come back to the YARD when you have the 5-digit code. What's the code?");
              if(newlocation.includes("code 12345")){
                  myYard.state = "open";
                  Task6.flip();
              }
      } else if (myYard.state === 'open') {
          console.log ("you are in the YARD");
          Task7.flip();
      }
  } else if (newlocation.includes('use envelope') && playerInventory.includes('envelope')) {
    console.log(myEnvelope.read1());
  } else if (newlocation.includes('dogbone') && playerInventory.includes('dogbone')) {
      console.log(myDogbone.read1());
      console.log("THANK YOU SO MUCH!! You've found my dog.\n THE END");
      process.exit();
      ///
      //// GAME END
      ///   
  } else if(newlocation.includes("change") || newlocation.includes("leave")){
      console.log('You are back in the main foyer. Rooms available to visit: ' + visitedRooms['roomsAvailable'] + " " + "Which room do you want to visit?");
  } else if (newlocation.includes("exit") || newlocation.includes("quit")) {
      process.exit();
  } else if(newlocation.includes("inventory")){
      console.log(playerInventory);
      console.log("length is " + playerInventory.length);
      console.log("Type 'use [item]' or 'talk to [item]'");
  } else {
      console.log( "Do you like apple pie? What would you like to do next?");
  }
});