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
 setVisited(){
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

    setTrue() {  
      this.state = true;  
      return this.state;
  }
   
    add() {
      playerInventory.push(this.item);
      return "Print playerInventory " +  playerInventory.length;
  }

    removeItem() {
      console.log ("Position of " + this.item + " " + playerInventory.indexOf(this.item));
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
let myMan2 = new Object ('man2',"You're still here? OK, well, since you're here. Can you help me find my lost dog, please?\n I think I left the 'DOGBONE' in the kitchen... (GO VISIT KITCHEN)", false);
let myEnvelope = new Object('envelope', "type exactly 'code 12345'", false);
let myDogbone = new Object ('dogbone', "'That dog sure better be here some where,\n so I can feed it with this DOGBONE.\n Woof woof'", true);
let myDog = new Object ('dog', "'Woof woof!' (wags tail)'", false);





// GAME MENU
let menu = {
  options: [
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

    setTrue() {
      this.state = true;
      console.log(this.state);
    }
  }
let Task1 = new Mission('task1', 'Bedroom - visit bedroom STATUS', true);
let Task2 = new Mission('task2', 'Bedroom - reveal hidden items STATUS', false);
let Task3 = new Mission('task3', 'Bedroom - talk to man STATUS', false);
let Task4 = new Mission('task4', 'Bedroom - find out how you can help the man STATUS', false);
let Task5 = new Mission('task5', 'Kitchen - find dogbone STATUS', false);
let Task6 = new Mission('task6', 'Yard - enter right code to unlock yard door STATUS', false);
let Task7 = new Mission('task7', 'Yard - open the yard STATUS', false);
let Task8 = new Mission('task8', 'Yard - feed hungry dog', false);


////
///////  'YOU' , the PLAYER
///
console.log("/////\n" + "/// START GAME:\n" + " " + "182 Main St. You are standing on Main Street between Church\n and South Winooski. There is a door here.\n On the door is a handwritten sign.\n TYPE 'read sign', press ENTER");
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
        "Task 7: " + Task7.describe() + " - " + Task7.state + "\n" +
        "Task 8: " + Task8.describe() + " - " + Task8.state);
  } else if (newlocation.includes("read sign")){
        console.log("The sign says 'Welcome to Burlington Code Academy!' Come on in....");
        console.log("Type 'menu' then press ENTER");
  } if (newlocation.includes('bedroom')) {
      ///
      //// Bedroom
      ///
    if(myBedroom.state === "closed"){
        console.log(myBedroom.blockentry());
    } else if (myBedroom.state === "open"){
        console.log("You are in the bedroom ");
        console.log("Check for hidden items? Type: search (room name)");
        if(newlocation.includes('search bedroom')){
        Task2.setTrue();
        if(
          playerInventory.includes("note") === false &&
          playerInventory.includes("clock") === false &&
          playerInventory.includes("flashlight") === false &&
          playerInventory.includes("man") === false
        ){
        console.log(myNote.add());
        console.log(myClock.add());
        console.log(myFlashlight.add());
        console.log(myMan.add());
        }
        console.log("CHECK INVENTORY? type check inventory."); 
        }
    }
     
  } if (newlocation.includes('talk to man') && playerInventory.includes('man')) {
        console.log(myMan.mancontainer());
        if (mancontainer.length === 1){   
        console.log(myMan.read1());
        console.log(myMan.setTrue());
        }
        if (mancontainer.length === 2 && myMan.state === true ){
        console.log(myMan2.read1());
        myKitchen.state = "open";
        Task3.setTrue();
        Task4.setTrue();
        }
 } else if (newlocation.includes('note') && playerInventory.includes('note')) {
        console.log(myNote.read1());
 } else if (newlocation.includes('kitchen')) {
    
      ///
      //// Kitchen
      ///
        if(myKitchen.state === "closed"){
        console.log(myKitchen.blockentry());
        console.log("I think I hear snoring coming from the bedroom....")
        } else if (myKitchen.state === "open"){
        console.log("You are in the kitchen");
        console.log("Check for hidden items? Type: search (room name)");
        if(newlocation.includes('search kitchen')){
          console.log("You searched for KITCHEN")
          if(playerInventory.includes("dogbone") === false && playerInventory.includes("envelope") === false){
            console.log(myDogbone.add());
            console.log(myEnvelope.add());
          }
        Task5.setTrue();
        console.log("CHECK INVENTORY? type check inventory."); 
        }  
        }

  } else if (newlocation.includes('envelope') && playerInventory.includes('envelope')) {
        console.log(myEnvelope.read1());
        console.log(myEnvelope.state = true);
        
  } else if (newlocation.includes('use flashlight') && playerInventory.includes('flashlight')) {
        console.log(myFlashlight.removeItem()); /// CONTINUE CODE7
        console.log(playerInventory.splice(2,1));
        console.log("flashlight was removed from PlayerInventory, CHECK INVENTORY")
  } else if(newlocation.includes("12345")){
        console.log("that's the right code");
        if(myEnvelope.state == true && Task4.state == true && Task5.state == true){
          myYard.state = "open";
        }
        Task6.setTrue();
  } else if (newlocation.includes("yard")){
        ///
        //// Yard
        ///           
        if(myYard.state === 'closed'){
        console.log(myYard.blockentry());
        console.log("This door is locked. If only I knew the 5-digit code.(dog barking behind door)");
        } else if (myYard.state === 'open' && myEnvelope.state === true) {
        console.log ("you are in the yard");
        Task7.setTrue();
        console.log("*barking in the distance*\n What can I use to attract that dog?\n (CHECK YOUR INVENTORY)");
        }
       
  } else if (newlocation.includes('use dogbone') && playerInventory.includes('dogbone') && myYard.state === "open" && myKitchen.state === "open") {
        Task8.setTrue();
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