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


// ROOMS
let visitedRoom = {
  roomsAvailable: ["kitchen", "bedroom"]
}

let bedroom = {
   hiddenitemcount: 2,
   hiddenitems:['man','alarm clock'],
}

let kitchen = {
   hiddenitemcount: 1,
   hiddenitems:['dog bone'],
}

// INVENTORY
let kitchenFound = 0;
let bedroomFound = 0;

let missingItemsCount = bedroom['hiddenitemcount'] + kitchenFound['hiddenitemcount'];
let foundItemsCount = bedroomFound + kitchenFound;

///ACTIONS
function changeRoom(){
   console.log ('Rooms available to visit: ' + visitedRoom['roomsAvailable']);
   console.log('Ok, where do you want to go?' + ' Type kitchen or bedroom');
   process.stdin.on("data", (chunk) => {
   let newlocation = chunk.toString().trim();
   if (newlocation.includes("bedroom")) {
       /// Bed Room
       console.log("You are in the " + newlocation);
       console.log("Check for hidden items? Type: search (room name), for example: search bedroom");
       ///// ENTER CODE
       if(newlocation.includes('search') && newlocation.includes('bedroom')){
          /// myRoom.search();       NOT WORKING YET
          bedroomFound = bedroom['hiddenitemcount'];
          console.log("GREAT JOB Detective! You found the bedrooom hidden items: " + " " + bedroom['hiddenitems']);
          console.log("Current bedroomFound points is " + " " + bedroomFound);
          console.log("closing the bedroom....");
          visitedRoom['roomsAvailable'] = visitedRoom['roomsAvailable'].slice(0,1);
          console.log("Rooms Available to visit: " + " " + visitedRoom['roomsAvailable']);
       }
   } else if (newlocation.includes("kitchen")) {
       console.log("You are in the kitchen");
      /// Kitchen
      console.log("Check for hidden items? Type: search (room name), for example: search kitchen");
      ///// ENTER CODE
      if(newlocation.includes('search') && newlocation.includes('kitchen')){
         /// myRoom.search();       NOT WORKING YET
         kitchenFound = kitchen['hiddenitemcount'];
         console.log("GREAT JOB Detective! You found the kitchen hidden items: " + " " + kitchen['hiddenitems']);
         console.log("Current kitchenFound points is " + " " + kitchenFound);
         console.log("closing the kitchen....");
         visitedRoom['roomsAvailable'] = visitedRoom['roomsAvailable'].slice(0,1);
         console.log("Rooms Available to visit: " + " " + visitedRoom['roomsAvailable']);
      }
   } else if(newlocation.includes("change") || newlocation.includes("leave") ){
       console.log('Ok. Rooms available to visit: ' + visitedRoom['roomsAvailable']);
   } else if (newlocation.includes("exit") || newlocation.includes("quit")) {
       process.exit();
   } else {
       console.log( "I don't understand. Which room do you want to visit? "+ visitedRoom['roomsAvailable']
       );
   }
   });
}



///
///// SEARCH THE ROOOM
///
class Room{
   constructor(newlocation){
       this.room = newlocation

   }
   describe(){
     changeRoom();
   }

   search(){
       if( this.room.includes('search') && this.room.includes('bedroom') ){
           console.log ("Zzz... I'm sleepy because I am in bedroom. I'd better get out");
           if(bedroom['hiddenitemcount'] > 0 ){
               console.log(bedroom['hiddenitems']);// HOW CAN I CHANGE TO  'THIS.ROOM' ?
           }
       } else if(this.room.includes('search') && this.includes('kitchen') ){
           console.log ("Are you hungry? Hmm, I wonder what/ns here for food");
           if(bedroom['hiddenitemcount'] > 0 ){
               console.log(kitchen['hiddenitems']);// HOW CAN I CHANGE TO  'THIS.ROOM' ?
           }
       }
   }

}
let myRoom = new Room('porch');
console.log(myRoom.describe()); //    