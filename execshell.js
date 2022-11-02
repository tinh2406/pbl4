const { execSync } = require("child_process");
export const login = (password) => {
    try {
        execSync("echo "+password+" | sudo -S login");
    } catch (error) {
    }
}
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
export const setValueVolum = (value) => {
    execSync("amixer -D pulse sset Master " + value + "%");
}
export const setValueBright = (value) => {
    const max = execSync("cat /sys/class/backlight/intel_backlight/max_brightness", { encoding: "utf-8" });
    execSync("echo "+ value*Number.parseInt(max)/100 +" | sudo tee /sys/class/backlight/intel_backlight/brightness");
}

export const getValueVolume = () => {
    const output = execSync("amixer -D pulse sget Master",{encoding: 'utf-8' });
    return output.split("[")[1].split("%")[0];
}
export const getValueBright = () => {
    const max = execSync("cat /sys/class/backlight/intel_backlight/max_brightness", { encoding: "utf-8" });
    const current = execSync("cat /sys/class/backlight/intel_backlight/brightness", { encoding: "utf-8" });
    return current / max*100;
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
