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
  roomsAvailable: ["kitchen", "bedroom", "porch"]
}

let bedroom = {
  hiddenitems:['man','alarm clock', 'flashlight'],
  close: false,
  man: "Zzzzz, hey what's the big idea?!!! I'm sleeping",
  alarm: "RRrrrrrriiinggg -alarm clock rings-",
  flashlight: "Gosh, this flashlight needs batteries. I'll tuck this away in my bag for now"
}

let kitchen = {
  hiddenitems:['dog bone'],
  close: false,
  dogbone: "that dog sure better be here some where, so I can feed it with this dog bone. Woof woof"
}

// INVENTORY
let playerInventory = [];

// GAME MENU
let menu = {
  options: ["Search Room: type search (room name)", 
            "Change Room: type change ", 
            "Check inventory: type check inventory ", 
            "Use item: type use (name of item)", 
            "Quit game: type quit game or exit game"]
}




////
///////  'YOU' , the PLAYER
///
console.log(
  "Hello. Welcome to the game. You are in the foyer.\n" +
  "To see keywords, type 'menu' and press ENTER "
);

process.stdin.on("data", (chunk) => {
  let newlocation = chunk.toString().trim();
  if (newlocation.includes("menu")){
      console.log(menu['options']);
  }
  if (newlocation.includes("bedroom")) {
      ///
      //// Bedroom
      ///
      console.log("You are in the bedroom ");
      console.log("Check for hidden items? Type: search (room name)" + " or leave room");
      if(newlocation.includes('search') && newlocation.includes('bedroom')){
          console.log(bedroom['hiddenitems'].length); /// SANITY CHECK
          for(let x = 0; x <= bedroom['hiddenitems'].length; x++){
              playerInventory[x] = bedroom['hiddenitems'].pop();
              console.log("Player inventory is " +  playerInventory + " ");
          }
          console.log(playerInventory);  /// SANITY CHECK
          console.log(playerInventory.length);   /// SANITY CHECK
          console.log("If you want to use an item, type () or (talk to) + item name");
      }
      if(newlocation.includes('use') && newlocation.includes('alarm')){
          console.log(bedroom['alarm']);
      }
     
  } else if (newlocation.includes("kitchen")) {
       ///
      //// Kitchen
      ///
      console.log("You are in the kitchen");
      console.log("Check for hidden items? Type: search (room name)" + " or leave room");
      if(newlocation.includes('search') && newlocation.includes('kitchen')){
          console.log(kitchen['hiddenitems'].length); /// SANITY CHECK
          for(let x = 0; x <= kitchen['hiddenitems'].length; x++){
              playerInventory[x] = playerInventory + kitchen['hiddenitems'].pop();
              console.log("Player inventory is " +  playerInventory + " ");
          }
          console.log(playerInventory);  /// SANITY CHECK
          console.log(playerInventory.length);   /// SANITY CHECK
          console.log("If you want to use an item, type () or (talk to) + item name");
      }
  } else if(newlocation.includes("change") || newlocation.includes("leave")){
      console.log('You are back in the main foyer. Rooms available to visit: ' + visitedRooms['roomsAvailable'] + " " + "Which room do you want to visit?");
  } else if (newlocation.includes("exit") || newlocation.includes("quit")) {
      process.exit();
  } else if(newlocation.includes("inventory")){
      console.log(playerInventory);
      console.log("length is " + playerInventory.length);
  } else {
      console.log( "Do you like apple pie? What would you like to do next?");
  }
});

///
///// JAVASCRIPT CLASS and METHODS
///




