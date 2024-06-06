'use strict'

// todo:
//  - get timestamps from Sensor interface too
// - logs in scrolling text box
// - button to clear logs
// - replace UI logs with plot and data rate
// - add gyroscope, orientation samples   
// - add websocket client, send sensors to websocket server for signal processing


const availableSensorsList = document.getElementById("availableSensors");
const logElement = document.getElementById("log");

var accelerometerSensor;
var gravitySensor;
var linearAccelerationSensor;
var ambientLightSensor;

function log(msg) {
    console.log(msg);
    logElement.innerHTML += `${msg}<br>`;
}

function checkPermission(sensorName) {
    navigator.permissions.query({ name: sensorName }).then((result) => {
        console.log(`${sensorName} permission: ${result.state}`);
        if (result.state === "denied") {
            log(`Permission to use ${sensorName} sensor denied`);
            return;
        }
        const listElem = document.createElement("li");
        listElem.appendChild(document.createTextNode(sensorName));
        availableSensorsList.appendChild(listElem);
    });
}

function startSensors() {
    accelerometerSensor = new Accelerometer({ frequency: 60 });
    accelerometerSensor.addEventListener("error", (error) => {
        log(`Accelerometer error: ${error.name}`);
    });
    accelerometerSensor.addEventListener("activate", () => {
        log("Accelerometer ready to measure");
    });
    accelerometerSensor.addEventListener("reading", () => {
        log(`Acceleration along the Y-axis ${accelerometerSensor.y}`);
        log(`Acceleration along the Z-axis ${accelerometerSensor.z}`);
        log(`Acceleration along the X-axis ${accelerometerSensor.x}`);
    });
    accelerometerSensor.start();

    gravitySensor = new GravitySensor({ frequency: 60 });
    gravitySensor.addEventListener("error", (error) => {
        log(`Gravity error: ${error.name}`);
    });
    gravitySensor.addEventListener("activate", () => {
        log("Gravity ready to measure");
    });
    gravitySensor.addEventListener("reading", () => {
        log(`Gravity along the X-axis ${gravitySensor.x}`);
        log(`Gravity along the Y-axis ${gravitySensor.y}`);
        log(`Gravity along the Z-axis ${gravitySensor.z}`);
    });
    gravitySensor.start();

    linearAccelerationSensor = new LinearAccelerationSensor({ frequency: 60 });
    linearAccelerationSensor.addEventListener("error", (error) => {
        log(`Linear acceleration error: ${error.name}`);
    });
    linearAccelerationSensor.addEventListener("activate", () => {
        log("Linear acceleration ready to measure");
    });
    linearAccelerationSensor.addEventListener("reading", () => {
        log(`Linear acceleration along the X-axis ${linearAccelerationSensor.x}`);
        log(`Linear acceleration along the Y-axis ${linearAccelerationSensor.y}`);
        log(`Linear acceleration along the Z-axis ${linearAccelerationSensor.z}`);
    });
    linearAccelerationSensor.start();

    ambientLightSensor = new AmbientLightSensor();
    ambientLightSensor.addEventListener("error", (error) => {
        log(`Ambient light sensor error: ${error.name}`);
    });
    ambientLightSensor.addEventListener("activate", () => {
        log("Ambient light ready to measure");
    });
    ambientLightSensor.addEventListener("reading", () => {
        log(`Current light level: ${ambientLightSensor.illuminance}`);
    });
    ambientLightSensor.start();
}

document.getElementById("startButton").addEventListener(
    "click",
    () => {
        startSensors();
    },
    false,
);

document.getElementById("stopButton").addEventListener(
    "click",
    () => {
        if (accelerometerSensor) {
            accelerometerSensor.stop();
            log("Accelerometer stopped");
        }
        if (gravitySensor) {
            gravitySensor.stop();
            log("Gravity stopped");
        }
        if (linearAccelerationSensor) {
            linearAccelerationSensor.stop();
            log("Linear acceleration stopped");
        }
        if (ambientLightSensor) {
            ambientLightSensor.stop();
            log("Ambient light stopped");
        }
    },
    false,
);

// Check permissions and populate html list
checkPermission('accelerometer');
checkPermission('gyroscope');
checkPermission('magnetometer');
checkPermission('ambient-light-sensor');