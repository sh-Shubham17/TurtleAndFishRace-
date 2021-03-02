let fish = {
  elemBluefish: document.getElementById("bluefish"),
  bluefishWin: document.getElementById("bluefishwin"),
  posBluefish: 0,
};
let turtle = {
  elemTurtle: document.getElementById("turtle"),
  turtleWin: document.getElementById("turtlewin"),
  posTurtle: 0,
};
let trafficLights = {
  greenLight: document.getElementById("goLight"),
  redLight: document.getElementById("stopLight"),
};
let Winner = false;
let stopWatch = document.getElementById("display");
let closeInterval;

function myMove() {
  let speed = document.getElementById("choice").value;
  speed = !Number.isInteger(speed) ? 10 : speed;
  reset();
  let interval_Id;
  let startTime;
  let maxwidth = findWidth();
  closeInterval = false;
  starting_Race(); //countDown

  setTimeout(() => {
    //setInterval will be set after 3seconds
    startTime = Date.now();
    interval_Id = setInterval(frame, 50);
  }, 3000);

  function frame() {
    trafficLights.greenLight.style.background = "rgb(59, 248, 11)";
    trafficLights.redLight.style.background = "#111";
    let elapsedTime = Date.now() - startTime;
    stopWatch.innerHTML = time(elapsedTime);
    if (checkWinner(interval_Id, maxwidth)) {
      return;
    }
    moveFish(maxwidth, speed);
    moveTurtle(maxwidth, speed);
  }
}
function starting_Race() {
  var startsIn = document.getElementById("startsIn");
  startsIn.innerHTML = " 3";
  setTimeout(() => {
    startsIn.innerHTML = "2";
  }, 1000);
  setTimeout(() => {
    startsIn.innerHTML = "1";
  }, 2000);
  setTimeout(() => {
    startsIn.innerHTML = "GO";
  }, 3000);
}

function time(eTime) {
  let diffInMinutes = eTime / (1000 * 60); //minutes
  let mm = Math.floor(diffInMinutes);
  let diffInSeconds = (diffInMinutes - mm) * 60;
  let ss = Math.floor(diffInSeconds);
  let diffInMilliseconds = (diffInSeconds - ss) * 100;
  let milli = Math.floor(diffInMilliseconds);
  mm = mm.toString().padStart(2, "0");
  ss = ss.toString().padStart(2, "0");
  milli = milli.toString().padStart(2, "0");
  return `${mm}:${ss}:${milli}`; //template literals, inplace of this
  //return mm + ":" + ss + ":" + milli; // we can use string also to return output
}
function findWidth() {
  let width;
  if (screen.width > 1000) {
    width = screen.width - 200;
  } else if (screen.width > 700) {
    width = screen.width - 100;
  } else {
    width = screen.width - 80;
  }
  return width;
}

function checkWinner(id, maxwidth) {
  if (
    (fish.posBluefish >= maxwidth && turtle.posTurtle >= maxwidth) ||
    closeInterval
  ) {
    clearInterval(id);
    document.getElementById("startsIn").innerHTML = "";
    trafficLights.greenLight.style.background = "#111";
    trafficLights.redLight.style.background = "red";
    console.log("interval closed");
    return;
  }
}

function moveFish(maxwidth, speed) {
  let { elemBluefish, bluefishWin, posBluefish } = fish;
  if (posBluefish < maxwidth) {
    posBluefish += Math.round(Math.random() * speed);
    if (posBluefish >= maxwidth) {
      posBluefish = maxwidth;
      if (!Winner) {
        Winner = true;
        console.log("fish win");
        bluefishWin.style.display = "unset";
      }
    }
    elemBluefish.style.left = posBluefish + "px";
  }
  fish = { elemBluefish, bluefishWin, posBluefish };
}

function moveTurtle(maxwidth, speed) {
  let { elemTurtle, turtleWin, posTurtle } = turtle;
  if (posTurtle < maxwidth) {
    posTurtle += Math.round(Math.random() * speed);
    if (posTurtle >= maxwidth) {
      posTurtle = maxwidth;
      if (!Winner) {
        Winner = true;
        console.log("turtle win");
        turtleWin.style.display = "unset";
      }
    }
    elemTurtle.style.left = posTurtle + "px";
  }
  turtle = { elemTurtle, turtleWin, posTurtle };
}
function reset() {
  Winner = false;
  document.getElementById("display").innerHTML = "00:00:00";
  fish.elemBluefish.style.left = 0 + "px";
  fish.bluefishWin.style.display = "none";
  fish.posBluefish = 0;
  turtle.elemTurtle.style.left = 0 + "px";
  turtle.turtleWin.style.display = "none";
  turtle.posTurtle = 0;
  closeInterval = true;
  let r = checkWinner();
}
