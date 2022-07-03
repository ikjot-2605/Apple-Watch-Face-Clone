import clock from "clock";
import * as document from "document";
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";






// Tick every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let secsBackHand = document.getElementById("secs_back");
let stepsRedRing = document.getElementById("stepsRedRing");
let floorGreenRing = document.getElementById("floorGreenRing");
let activityBlueRing = document.getElementById("activityBlueRing");



if (appbit.permissions.granted("access_activity")) {
  stepsRedRing.sweepAngle = 360 * (today.adjusted.steps / goals.steps);
  floorGreenRing.sweepAngle = 360 * (today.adjusted.elevationGain / goals.elevationGain);
  activityBlueRing.sweepAngle = 360 * (today.adjusted.activeZoneMinutes / goals.activeZoneMinutes?goals.activeZoneMinutes:60);
  stepsRedRing.sweepAngle = 269;
  floorGreenRing.sweepAngle = 178;
  activityBlueRing.sweepAngle = 298;
}

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
  secsBackHand.groupTransform.rotate.angle = (secondsToAngle(secs) + 180) % 360;
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);