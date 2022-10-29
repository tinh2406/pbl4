const { execSync } = require("child_process");
export const turnOnBluetooth = ()=>{
  execSync("rfkill unblock bluetooth");
}
export const turnOffBluetooth = ()=>{
    execSync("rfkill block bluetooth");
}
export const turnOnWifi = ()=>{
    execSync("nmcli radio wifi on")
}
export const turnOffWifi = ()=>{
    execSync("nmcli radio wifi off")
}
export const getStateBluetooth = () => {
    const output = execSync("rfkill list bluetooth",{encoding: 'utf-8' });
    return (output.split("\n")[1].indexOf("yes") < 0);
}
export const getStateWifi = () => {
    const output = execSync("nmcli radio wifi",{encoding: 'utf-8' });
    if (output.trim()==="enabled")
        return true;
    return false;
}
