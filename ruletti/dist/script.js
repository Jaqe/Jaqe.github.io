var rotationsTime = 8;
var wheelSpinTime = 6;
var ballSpinTime = 5;
var numorder = [
  0,
  32,
  15,
  19,
  4,
  21,
  2,
  25,
  17,
  34,
  6,
  27,
  13,
  36,
  11,
  30,
  8,
  23,
  10,
  5,
  24,
  16,
  33,
  1,
  20,
  14,
  31,
  9,
  22,
  18,
  29,
  7,
  28,
  12,
  35,
  3,
  26
];
var numred = [
  32,
  19,
  21,
  25,
  34,
  27,
  36,
  30,
  23,
  5,
  16,
  1,
  14,
  9,
  18,
  7,
  12,
  3
];
var numblack = [
  15,
  4,
  2,
  17,
  6,
  13,
  11,
  8,
  10,
  24,
  33,
  20,
  31,
  22,
  29,
  28,
  35,
  26
];
var balance = $("balance");
var numgreen = [0];
var numbg = $(".pieContainer");
var ballbg = $(".ball");
var btnSpin = $("#btnSpin");
var placeBet = $("#placeBet");
var toppart = $("#toppart");
var pfx = $.keyframe.getVendorPrefix();
var transform = pfx + "transform";
var rinner = $("#rcircle");
var numberLoc = [];
var betAmount = $("#betAmount");
var betMaara = $("#moneyAmount");
var moneyAmount;
var balanceAmount;
var betNumber = $("#betNumber");
var clicked_button = $("button").value;
var isSpinning = 0;

$.keyframe.debug = true;

createWheel();
function createWheel() {
  isSpinning = 0;
  document.getElementById("balance").value = 999;

  var temparc = 360 / numorder.length;
  for (var i = 0; i < numorder.length; i++) {
    numberLoc[numorder[i]] = [];
    numberLoc[numorder[i]][0] = i * temparc;
    numberLoc[numorder[i]][1] = i * temparc + temparc;

    newSlice = document.createElement("div");
    $(newSlice).addClass("hold");
    newHold = document.createElement("div");
    $(newHold).addClass("pie");
    newNumber = document.createElement("div");
    $(newNumber).addClass("num");

    newNumber.innerHTML = numorder[i];
    $(newSlice).attr("id", "rSlice" + i);
    $(newSlice).css(
      "transform",
      "rotate(" + numberLoc[numorder[i]][0] + "deg)"
    );

    $(newHold).css("transform", "rotate(9.73deg)");
    $(newHold).css("-webkit-transform", "rotate(9.73deg)");

    if ($.inArray(numorder[i], numgreen) > -1) {
      $(newHold).addClass("greenbg");
    } else if ($.inArray(numorder[i], numred) > -1) {
      $(newHold).addClass("redbg");
    } else if ($.inArray(numorder[i], numblack) > -1) {
      $(newHold).addClass("greybg");
    }

    $(newNumber).appendTo(newSlice);
    $(newHold).appendTo(newSlice);
    $(newSlice).appendTo(rinner);
  }
  //console.log(numberLoc);
}

$("button").click(function() {
  if(isSpinning == 0)
  {
      var clicked_button = $(this).val();
      document.getElementById("betNumber").value = clicked_button;
  }
});

placeBet.click(function() {
  
  if(isSpinning == 0)
  {
      moneyAmount = document.getElementById("betAmount").value;

      document.getElementById("moneyAmount").value = moneyAmount;
  }
});

btnSpin.click(function() {
	
  if(isSpinning == 0)
  {
      balanceAmount = document.getElementById("balance").value;
        var rndNum = Math.floor(Math.random() * 34 + 0);

        if(!isNaN(moneyAmount) && moneyAmount > 0 && !isNaN(document.getElementById("betNumber").value) && document.getElementById("betNumber").value){

          if(balanceAmount >= moneyAmount) 
          {
              winningNum = rndNum;
              winNumber = winningNum;
              isSpinning = 1;
              spinTo(winningNum);

            balanceAmount -= moneyAmount;   
          }
        }

        document.getElementById("balance").value = balanceAmount;
  }
});

$("#btnb").click(function() {
  $(".spinner").css("font-size", "+=.3em");
});
$("#btns").click(function() {
  $(".spinner").css("font-size", "-=.3em");
});

function resetAni() {
  animationPlayState = "animation-play-state";
  playStateRunning = "running";

  $(ballbg)
    .css(pfx + animationPlayState, playStateRunning)
    .css(pfx + "animation", "none");

  $(numbg)
    .css(pfx + animationPlayState, playStateRunning)
    .css(pfx + "animation", "none");
  $(toppart)
    .css(pfx + animationPlayState, playStateRunning)
    .css(pfx + "animation", "none");

  $("#rotate2").html("");
  $("#rotate").html("");
}

function spinTo(num) {
  //get location
  var temp = numberLoc[num][0] + 4;

  //randomize
  var rndSpace = Math.floor(Math.random() * 360 + 1);

  resetAni();
  setTimeout(function() {
    bgrotateTo(rndSpace);
    ballrotateTo(rndSpace + temp);
  }, 500);
}

function ballrotateTo(deg) {
  var temptime = rotationsTime + 's';
  var dest = -360 * ballSpinTime - (360 - deg);
  $.keyframe.define({
    name: "rotate2",
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(" + dest + "deg)"
    }
  });

  $(ballbg).playKeyframe({
    name: "rotate2", // name of the keyframe you want to bind to the selected element
    duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
    complete: function() {
                isSpinning = 0;
      if(document.getElementById("betNumber").value == winNumber)
      {
          balanceAmount += (document.getElementById("betAmount").value * 14); 
          document.getElementById("balance").value = balanceAmount; 
      }
      finishSpin();
    } //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  });
}

function bgrotateTo(deg) {
  var dest = 360 * wheelSpinTime + deg;
  var temptime = (rotationsTime * 1000 - 1000) / 1000 + 's';

  $.keyframe.define({
    name: "rotate",
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(" + dest + "deg)"
    }
  });

  $(numbg).playKeyframe({
    name: "rotate", // name of the keyframe you want to bind to the selected element
    duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
    complete: function() {} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  });

  $(toppart).playKeyframe({
    name: "rotate", // name of the keyframe you want to bind to the selected element
    duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
    complete: function() {} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  });
}