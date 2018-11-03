"use strict";

const rooms = document.querySelector(".rooms");
const bathrooms = document.querySelector(".bathrooms");
const result = document.querySelector(".result");

class Calc {
  constructor(rooms, bathrooms, result) {
    this.rooms = rooms;
    this.bathrooms = bathrooms;
    this.result = result;

    this.roomPrice = this.rooms.dataset.roomPrice.split(",");
    this.bathRoomPrice = this.bathrooms.dataset.bathroomPrice.split(",");

    this.maxRoom = this.roomPrice.length;
    this.maxBathRoom = this.bathRoomPrice.length;

    this.roomAmount = +this.rooms.dataset.roomDefult;
    this.bathRoomAmount = +this.bathrooms.dataset.bathroomDefult;
  }
  RoomText(count) {
    let text = "";
    if (count > 1 && count <= this.maxRoom) {
      text = " комнаты";
    } else if (count >= this.maxRoom) {
      text = " комнат";
    } else {
      text = " комната";
    }
    return text;
  }
  BathRoomText(count) {
    let text = "";
    if (count > 1 && count <= this.maxBathRoom) {
      text = " санузла";
    } else if (count >= this.maxBathRoom) {
      text = " санузлов";
    } else {
      text = " санузел";
    }
    return text;
  }
  nextRoom() {
    this.roomAmount++;
    roomText.innerHTML = this.roomAmount + this.RoomText(this.roomAmount);
  }
  prevRoom() {
    this.roomAmount--;
    roomText.innerHTML = this.roomAmount + this.RoomText(this.roomAmount);
  }
  nextBathRoom() {
    this.bathRoomAmount++;
    bathRoomText.innerHTML =
      this.bathRoomAmount + this.BathRoomText(this.bathRoomAmount);
  }
  prevBathRoom() {
    this.bathRoomAmount--;
    bathRoomText.innerHTML =
      this.bathRoomAmount + this.BathRoomText(this.bathRoomAmount);
  }
  Result() {
    let totalPrice =
      +this.roomPrice[this.roomAmount - 1] +
      +this.bathRoomPrice[this.bathRoomAmount - 1];
    this.result.innerHTML = "Заказать за " + totalPrice.toFixed(2) + " руб";
  }
  init() {
    let self = this;
    this.rooms.addEventListener("click", function(e) {
      let target = e.target;
      if (
        target.classList.contains("next") &&
        self.roomAmount != self.maxRoom
      ) {
        self.nextRoom();
      }
      if (target.classList.contains("prev") && self.roomAmount != 1) {
        self.prevRoom();
      }
      self.Result();
    });
    this.bathrooms.addEventListener("click", function(e) {
      let target = e.target;
      if (
        target.classList.contains("next") &&
        self.bathRoomAmount != self.maxBathRoom
      ) {
        self.nextBathRoom();
      }
      if (target.classList.contains("prev") && self.bathRoomAmount != 1) {
        self.prevBathRoom();
      }
      self.Result();
    });
  }
}
let calc = new Calc(rooms, bathrooms, result);
calc.init();
