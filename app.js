'use strict'

// todo:
// - add websocket client, send sensors to websocket server for signal processing

function handlePermission(sensorName) {
    navigator.permissions.query({ name: sensorName }).then((result) => {
        if (result.state === "denied") {
            console.log(`Permission to use ${sensorName} sensor is denied`);
            return;
        }
        console.log(`${sensorName} permission: ${result.state}`);
        // todo: log errors to html
    });
}

function startSensors() {
    // todo: populate html list
    handlePermission('accelerometer');
    handlePermission('gyroscope');
    handlePermission('magnetometer');
    handlePermission('ambient-light-sensor');

    const accelerometerSensor = new Accelerometer({ frequency: 60 });
    accelerometerSensor.addEventListener("error", (error) => {
        console.log(`Accelerometer error: ${error.name}`);
    });
    accelerometerSensor.addEventListener("activate", () => {
        console.log("Accelerometer ready to measure");
    });
    accelerometerSensor.addEventListener("reading", () => {
        console.log(`Acceleration along the X-axis ${accelerometerSensor.x}`);
        console.log(`Acceleration along the Y-axis ${accelerometerSensor.y}`);
        console.log(`Acceleration along the Z-axis ${accelerometerSensor.z}`);
    });
    accelerometerSensor.start();

    let gravitySensor = new GravitySensor({ frequency: 60 });
    gravitySensor.addEventListener("error", (error) => {
        console.log(`Gravity error: ${error.name}`);
    });
    gravitySensor.addEventListener("activate", () => {
        console.log("Gravity ready to measure");
    });
    gravitySensor.addEventListener("reading", () => {
        console.log(`Gravity along the X-axis ${gravitySensor.x}`);
        console.log(`Gravity along the Y-axis ${gravitySensor.y}`);
        console.log(`Gravity along the Z-axis ${gravitySensor.z}`);
    });
    gravitySensor.start();

    let linearAccelerationSensor = new LinearAccelerationSensor({ frequency: 60 });
    linearAccelerationSensor.addEventListener("error", (error) => {
        console.log(`Linear acceleration error: ${error.name}`);
    });
    linearAccelerationSensor.addEventListener("activate", () => {
        console.log("Linear acceleration ready to measure");
    });
    linearAccelerationSensor.addEventListener("reading", () => {
        console.log(`Linear acceleration along the X-axis ${linearAccelerationSensor.x}`);
        console.log(`Linear acceleration along the Y-axis ${linearAccelerationSensor.y}`);
        console.log(`Linear acceleration along the Z-axis ${linearAccelerationSensor.z}`);
    });
    linearAccelerationSensor.start();

    // todo: find list of valid strings to check in window
    if ("AmbientLightSensor" in window) {
        const sensor = new AmbientLightSensor();
        sensor.addEventListener("error", (event) => {
            console.log(event.error.name, event.error.message);
        });
        sensor.addEventListener("activate", () => {
            console.log("Ambient light ready to measure");
        });
        sensor.addEventListener("reading", (event) => {
            console.log("Current light level:", sensor.illuminance);
        });
        sensor.start();
    }
}

document.getElementById("startButton").addEventListener(
    "click",
    () => {
        startSensors();
    },
    false,
);

