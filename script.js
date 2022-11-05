import { getStateBluetooth, getStateWifi, getValueVolume, setValueVolum, turnOffBluetooth, turnOffWifi, turnOnBluetooth, turnOnWifi,login, getValueBright, setValueBright } from './execshell.js';
const volume = document.getElementById("volume");
const brightness = document.getElementById("brightness");
const perform = document.getElementById("perform");
const volumeIcon = document.getElementsByClassName("volumeIcon")[0];
const wrapBluetooth = document.getElementsByClassName("wrap-bluetooth")[0];
const bluetoothCheckbox = document.getElementById("bluetoothCheckbox");
const wrapWifi = document.getElementsByClassName("wrap-wifi")[0];
const wifiCheckbox = document.getElementById("wifiCheckbox");
const progressVolume = document.getElementById("progressVolume");
const progressBright = document.getElementById("progressBright");
const progressPerform = document.getElementById("progressPerform");
const wrapWebcam = document.getElementsByClassName("wrap-webcam")[0];
const webcamCheckbox = document.getElementById("webcamCheckbox");
const wrapPlanemode = document.getElementsByClassName("wrap-planemode")[0];
const planemodeCheckbox = document.getElementById("planemodeCheckbox");


const changeStatusCheckbox = (element,checkbox)=>{
  element.onclick = () => {
    checkbox.checked = !checkbox.checked;
    checkbox.onchange();
  }
}
const changeInputRange = (element,progressElement)=>{
  progressElement.onmousedown = () => {
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
  document.getElementById("progressVolume").setAttribute("style", "--value:" + volume.value);
  if(volume.value>=90){
    volumeIcon.setAttribute("name","volume-high-outline.svg")
  }
  else if(volume.value>=50){
    volumeIcon.setAttribute("name","volume-medium-outline.svg")
  }
  else if(volume.value>0){
    volumeIcon.setAttribute("name","volume-low-outline.svg")
  }
  else {
    volumeIcon.setAttribute("name","volume-mute-outline.svg")
  }
  setValueVolum(volume.value);
}
brightness.oninput = () => {
  document.getElementById("progressBright").setAttribute("style", "--value:" + brightness.value);
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
changeStatusCheckbox(wrapBluetooth,bluetoothCheckbox);
changeStatusCheckbox(wrapWifi,wifiCheckbox);
changeStatusCheckbox(wrapWebcam, webcamCheckbox);
changeStatusCheckbox(wrapPlanemode,planemodeCheckbox);
changeInputRange(volume,document.getElementsByClassName("div")[0]);
changeInputRange(brightness, document.getElementsByClassName("div")[1]);
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
  
