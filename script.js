import { getStateBluetooth, getStateWifi, turnOffBluetooth, turnOffWifi, turnOnBluetooth, turnOnWifi } from './execshell.js';

const volume = document.getElementById("volume");
const brightness = document.getElementById("brightness");
const volumeIcon = document.getElementById("volumeIcon");
const wrapBluetooth = document.getElementsByClassName("wrap-bluetooth")[0];
const bluetoothCheckbox = document.getElementById("bluetoothCheckbox");
const wrapWifi = document.getElementsByClassName("wrap-wifi")[0];
const wifiCheckbox = document.getElementById("wifiCheckbox");
  
  volume.oninput = ()=>{
    document.getElementById("progressVolume").setAttribute("style","--value:"+volume.value);
    if(volume.value>=90){
      volumeIcon.setAttribute("src","./source/volume-high-outline.svg")
    }
    else if(volume.value>=50){
      volumeIcon.setAttribute("src","./source/volume-medium-outline.svg")
    }
    else if(volume.value>0){
      volumeIcon.setAttribute("src","./source/volume-low-outline.svg")
    }
    else {
      volumeIcon.setAttribute("src","./source/volume-mute-outline.svg")
    }
  }
  brightness.oninput = ()=>{
    document.getElementById("progressBright").setAttribute("style","--value:"+brightness.value);
  }
  bluetoothCheckbox.onchange = function(){
    if (bluetoothCheckbox.checked == true) {
      turnOnBluetooth();
      wrapBluetooth.classList.remove("btnDisable");
    } else {
      turnOffBluetooth();
      wrapBluetooth.classList.add("btnDisable");
    }
  }
  wifiCheckbox.onchange = function(){
    if (wifiCheckbox.checked == true) {
      turnOnWifi();
      wrapWifi.classList.remove("btnDisable");
    } else {
      turnOffWifi();
      wrapWifi.classList.add("btnDisable");
    }
  }
  wrapWifi.onclick = function(){
    wifiCheckbox.checked = !wifiCheckbox.checked;
  }
  wrapBluetooth.onclick = function(){
    bluetoothCheckbox.checked = !bluetoothCheckbox.checked;
  }
  window.onload = function () {
    console.log(getStateBluetooth());
    wifiCheckbox.checked = getStateWifi();
    bluetoothCheckbox.checked = getStateBluetooth();
    brightness.oninput();
    volume.oninput();
    bluetoothCheckbox.onchange();
    wifiCheckbox.onchange();
  }
  
    
    