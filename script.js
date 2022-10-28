
    const volume = document.getElementById("volume");
    const brightness = document.getElementById("brightness");
    const volumeIcon = document.getElementById("volumeIcon");
    const wrapBluetooth = document.getElementsByClassName("wrap-bluetooth")[0];
    const bluetoothCheckbox = document.getElementById("bluetoothCheckbox");
    const wrapWifi = document.getElementsByClassName("wrap-wifi")[0];
    const wifiCheckbox = document.getElementById("wifiCheckbox");
      const volumeOnInput = ()=>{
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
      const brightOnInput = ()=>{
        document.getElementById("progressBright").setAttribute("style","--value:"+brightness.value);
      }
      brightness.oninput = brightOnInput;
      volume.oninput = volumeOnInput;
      window.onload = function (){
        brightOnInput();
        volumeOnInput();
        bluetoothCheckbox.onchange();
        wifiCheckbox.onchange();
      }
      bluetoothCheckbox.onchange = function(){
        if(bluetoothCheckbox.checked==true){
            wrapBluetooth.classList.remove("btnDisable");
            // const execSync = require('child_process').execSync;
            // const output = execSync('rfkill unblock bluetooth', { encoding: 'utf-8' });
        }
        else{
            wrapBluetooth.classList.add("btnDisable");
            // const execSync = require('child_process').execSync;
            // const output = execSync('rfkill unblock bluetooth', { encoding: 'utf-8' });
        }
      }
      wifiCheckbox.onchange = function(){
        if(wifiCheckbox.checked==true){
            wrapWifi.classList.remove("btnDisable");
        }
        else{
            wrapWifi.classList.add("btnDisable");
        }
      }
      wrapWifi.onclick = function(){
        wifiCheckbox.checked = !wifiCheckbox.checked;
        wifiCheckbox.onchange();
      }
      wrapBluetooth.onclick = function(){
        bluetoothCheckbox.checked = !bluetoothCheckbox.checked;
        bluetoothCheckbox.onchange();
      }
      
    
    