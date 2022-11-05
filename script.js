import { getStateBluetooth, getStateWifi, getValueVolume, setValueVolum, turnOffBluetooth, turnOffWifi, turnOnBluetooth, turnOnWifi,login, getValueBright, setValueBright } from './execshell.js';
const volume = document.getElementById("volume");
const brightness = document.getElementById("brightness");
const perform = document.getElementById("perform");
const volumeIcon = document.getElementsByClassName("volumeIcon")[0];
const wrapBluetooth = document.getElementsByClassName("wrap-bluetooth")[0];
const bluetoothCheckbox = document.getElementById("bluetoothCheckbox");
const wrapWifi = document.getElementsByClassName("wrap-wifi")[0];
const wifiCheckbox = document.getElementById("wifiCheckbox");
const wrapMicro = document.getElementsByClassName("wrap-micro")[0];
const microCheckbox = document.getElementById("microCheckbox");
const wrapKeypad = document.getElementsByClassName("wrap-keypad")[0];
const keypadCheckbox = document.getElementById("keypadCheckbox");
const progressVolume = document.getElementById("progressVolume");
const progressBright = document.getElementById("progressBright");
const progressPerform = document.getElementById("progressPerform");
const wrapWebcam = document.getElementsByClassName("wrap-webcam")[0];
const webcamCheckbox = document.getElementById("webcamCheckbox");
const wrapPlanemode = document.getElementsByClassName("wrap-planemode")[0];
const planemodeCheckbox = document.getElementById("planemodeCheckbox");
const brightCover = document.getElementById("brightCover");
const volumeCover = document.getElementById("volumeCover");
const changeStatusCheckbox = (element,checkbox)=>{
  element.onclick = () => {
    checkbox.checked = !checkbox.checked;
    checkbox.onchange();
  }
}
const changeInputRange = (element,progressElement)=>{
  progressElement.onmousedown = (event) => {
    element.value = 220-event.layerY;
    element.oninput();
    progressElement.onmousemove = (event) => {
      element.value = element.value - event.movementY;
      element.oninput();
    }
  }
  progressElement.onmouseup = () => {
    progressElement.onmousemove = () => {
    }
  }
  progressElement.onmouseleave = () => {
    progressElement.onmousemove = () => {
    }
  }
}

volume.oninput = () => {
  progressVolume.setAttribute("style", "--value:" + volume.value);
  if(volume.value>=90){
    volumeIcon.setAttribute("name","volume-high-outline")
  }
  else if(volume.value>=50){
    volumeIcon.setAttribute("name","volume-medium-outline")
  }
  else if(volume.value>0){
    volumeIcon.setAttribute("name","volume-low-outline")
  }
  else {
    volumeIcon.setAttribute("name","volume-mute-outline")
  }
  setValueVolum(volume.value);
}
brightness.oninput = () => {
  progressBright.setAttribute("style", "--value:" + brightness.value);
  setValueBright(brightness.value);
}
bluetoothCheckbox.onchange = function(){
  if (bluetoothCheckbox.checked == true) {
    turnOnBluetooth();
    wrapBluetooth.classList.add("oncheck");
  } else {
    turnOffBluetooth();
    wrapBluetooth.classList.remove("oncheck");
  }
}
wifiCheckbox.onchange = function(){
  if (wifiCheckbox.checked == true) {
    turnOnWifi();
    wrapWifi.classList.add("oncheck");
  } else {
      turnOffWifi();
      wrapWifi.classList.remove("oncheck");
    }
}
webcamCheckbox.onchange = function(){
  if (webcamCheckbox.checked == true) {
    wrapWebcam.classList.add("oncheck");
  } else {
      wrapWebcam.classList.remove("oncheck");
    }
}
planemodeCheckbox.onchange = function(){
  if (planemodeCheckbox.checked == true) {
    wrapPlanemode.classList.add("oncheck");
  } else {
    wrapPlanemode.classList.remove("oncheck");
  }
}
microCheckbox.onchange = function () {
  if (microCheckbox.checked) {
    wrapMicro.classList.add("oncheck");
  }
  else {
    wrapMicro.classList.remove("oncheck");
  }
}
keypadCheckbox.onchange = function () {
  console.log(wrapKeypad);
  if (keypadCheckbox.checked) {
    wrapKeypad.classList.add("oncheck");
  }
  else {
    wrapKeypad.classList.remove("oncheck");
  }
}
wrapWifi.onclick = function () {  
wifiCheckbox.checked = !wifiCheckbox.checked;
wifiCheckbox.onchange();
}
wrapBluetooth.onclick = function(){
  bluetoothCheckbox.checked = !bluetoothCheckbox.checked;
  bluetoothCheckbox.onchange();
}
wrapWebcam.onclick = function () {
  webcamCheckbox.checked = !webcamCheckbox.checked;
  webcamCheckbox.onchange();
}
wrapPlanemode.onclick = function () {
  planemodeCheckbox.checked = !planemodeCheckbox.checked;
  planemodeCheckbox.onchange();
}
wrapMicro.onclick = function () {
  microCheckbox.checked = !microCheckbox.checked;
  microCheckbox.onchange();
}
wrapKeypad.onclick = function () {
  keypadCheckbox.checked = !keypadCheckbox.checked;
  keypadCheckbox.onchange();
}
changeStatusCheckbox(wrapBluetooth,bluetoothCheckbox);
changeStatusCheckbox(wrapWifi,wifiCheckbox);
changeStatusCheckbox(wrapWebcam, webcamCheckbox);
changeStatusCheckbox(wrapPlanemode,planemodeCheckbox);
changeInputRange(volume,volumeCover);
changeInputRange(brightness,brightCover);
window.onload = function () {
  const password = "68709502";
  login(password);
  demo();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function demo() {
  while (true) {
    bluetoothCheckbox.checked = await getStateBluetooth();
    wifiCheckbox.checked = await getStateWifi();
    brightness.value = await getValueBright();
    volume.value = await getValueVolume();
    await brightness.oninput();
    await volume.oninput();
    await bluetoothCheckbox.onchange();
    await wifiCheckbox.onchange();
    await sleep(5);
    }
}
  
