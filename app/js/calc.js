"use strict";
const Widget = document.querySelector(".calc-widget");
const RoomAmount = document.querySelector(".roomamount");
const BathRoomAmount = document.querySelector(".bathroomamount");
const SubmitButton = document.querySelector(".calc-submitbtn");
let roomAmount = 1;
let bathRoomAmount = 1;
let cost = 42.9;
console.log(RoomAmount.dataset.roomCost.split(",").length);
const nextRoom = () => {
  roomAmount++;

  RoomAmount.innerHTML = roomAmount + " rooms";
  cost += 15;
  SubmitButton.innerHTML = "Заказать за " + cost.toFixed(2) + " руб";
};
const prevRoom = () => {
  roomAmount--;
  RoomAmount.innerHTML = roomAmount + " romms";
  cost -= 15;
  SubmitButton.innerHTML = "Заказать за " + cost.toFixed(2) + " руб";
};
const nextBathRoom = () => {
  bathRoomAmount++;
  BathRoomAmount.innerHTML = bathRoomAmount + " batnrooms";
  fo;
  cost += 10;
  SubmitButton.innerHTML = "Заказать за " + cost.toFixed(2) + " руб";
};
const prevBathRoom = () => {
  bathRoomAmount--;
  BathRoomAmount.innerHTML = bathRoomAmount + " bathrooms";
  cost -= 10;
  SubmitButton.innerHTML = "Заказать за " + cost.toFixed(2) + " руб";
};
Widget.addEventListener("click", function(e) {
  let target = e.target;
  if (target.classList.contains("nextroom")) {
    nextRoom();
  }
  if (target.classList.contains("prevroom")) {
    prevRoom();
  }
  if (target.classList.contains("nextbathroom")) {
    nextBathRoom();
  }
  if (target.classList.contains("prevbathroom")) {
    prevBathRoom();
  }
});
