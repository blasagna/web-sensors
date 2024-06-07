'use strict'

// todo:
// - periodically log latest sample and data rate
// - add websocket client, send sensors to websocket server for signal processing
// - plot samples vs. time

const availableSensorsList = document.getElementById("availableSensors");
const logElement = document.getElementById("log");

let accelerometerSensor = null;
let linearAccelerationSensor = null;
let ambientLightSensor = null;
let gyroscopeSensor = null;
let orientationSensor = null;

function log(msg) {
    console.log(msg);
    logElement.value += `${msg}\n`;
    logElement.scrollTop = logElement.scrollHeight;
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
    if (window.Accelerometer) {
        try {
            accelerometerSensor = new Accelerometer();
            accelerometerSensor.addEventListener("error", (error) => {
                log(`Accelerometer error: ${error.name}`);
            });
            accelerometerSensor.addEventListener("activate", () => {
                log("Accelerometer ready to measure");
            });
            accelerometerSensor.addEventListener("reading", () => {
                const t = accelerometerSensor.timestamp;
                log(`Acceleration along the Y-axis ${accelerometerSensor.y}, time ${t}`);
                log(`Acceleration along the Z-axis ${accelerometerSensor.z}, time ${t}`);
                log(`Acceleration along the X-axis ${accelerometerSensor.x}, time ${t}`);
            });
            accelerometerSensor.start();
        } catch (error) {
            // Handle construction errors.
            if (error.name === "SecurityError") {
                // See the note above about permissions policy.
                log("Accelerometer sensor construction was blocked by a permissions policy.");
            } else if (error.name === "ReferenceError") {
                log("Accelerometer sensor is not supported by the User Agent.");
            } else {
                throw error;
            }
        }
    }

    if (window.LinearAccelerationSensor) {
        try {
            linearAccelerationSensor = new LinearAccelerationSensor();
            linearAccelerationSensor.addEventListener("error", (error) => {
                log(`Linear acceleration error: ${error.name}`);
            });
            linearAccelerationSensor.addEventListener("activate", () => {
                log("Linear acceleration ready to measure");
            });
            linearAccelerationSensor.addEventListener("reading", () => {
                const t = linearAccelerationSensor.timestamp;
                log(`Linear acceleration along the X-axis ${linearAccelerationSensor.x}, time ${t}`);
                log(`Linear acceleration along the Y-axis ${linearAccelerationSensor.y}, time ${t}`);
                log(`Linear acceleration along the Z-axis ${linearAccelerationSensor.z}, time ${t}`);
            });
            linearAccelerationSensor.start();
        } catch (error) {
            // Handle construction errors.
            if (error.name === "SecurityError") {
                // See the note above about permissions policy.
                log("Linear acceleration sensor construction was blocked by a permissions policy.");
            } else if (error.name === "ReferenceError") {
                log("Linear acceleration sensor is not supported by the User Agent.");
            } else {
                throw error;
            }
        }
    }

    if (window.AmbientLightSensor) {
        try {
            ambientLightSensor = new AmbientLightSensor();
            ambientLightSensor.addEventListener("error", (error) => {
                log(`Ambient light sensor error: ${error.name}`);
            });
            ambientLightSensor.addEventListener("activate", () => {
                log("Ambient light ready to measure");
            });
            ambientLightSensor.addEventListener("reading", () => {
                const t = ambientLightSensor.timestamp;
                log(`Current light level: ${ambientLightSensor.illuminance}, time ${t}`);
            });
            ambientLightSensor.start();
        } catch (error) {
            // Handle construction errors.
            if (error.name === "SecurityError") {
                // See the note above about permissions policy.
                log("Ambient light sensor construction was blocked by a permissions policy.");
            } else if (error.name === "ReferenceError") {
                log("Ambient light sensor is not supported by the User Agent.");
            } else {
                throw error;
            }
        }
    }

    if (window.Gyroscope) {
        try {
            gyroscopeSensor = new Gyroscope();
            gyroscopeSensor.addEventListener("error", (error) => {
                log(`Gyroscope sensor error: ${error.name}`);
            });
            gyroscopeSensor.addEventListener("activate", () => {
                log("Gyroscope ready to measure");
            });
            gyroscopeSensor.addEventListener("reading", () => {
                const t = gyroscopeSensor.timestamp;
                log(`Angular velocity along the X-axis ${gyroscopeSensor.x}, time ${t}`);
                log(`Angular velocity along the Y-axis ${gyroscopeSensor.y}, time ${t}`);
                log(`Angular velocity along the Z-axis ${gyroscopeSensor.z}, time ${t}`);
            });
            gyroscopeSensor.start();
        } catch (error) {
            // Handle construction errors.
            if (error.name === "SecurityError") {
                // See the note above about permissions policy.
                log("Gyroscope sensor construction was blocked by a permissions policy.");
            } else if (error.name === "ReferenceError") {
                log("Gyroscope sensor is not supported by the User Agent.");
            } else {
                throw error;
            }
        }
    }

    if (window.AbsoluteOrientationSensor) {
        try {
            orientationSensor = new AbsoluteOrientationSensor();
            orientationSensor.addEventListener("error", (error) => {
                log(`Orientation sensor error: ${error.name}`);
            });
            orientationSensor.addEventListener("activate", () => {
                log("Orientation ready to measure");
            });
            orientationSensor.addEventListener("reading", () => {
                const t = orientationSensor.timestamp;
                const quaternion = orientationSensor.quaternion; // x, y, z, w array
                log(`Quaternion X element ${quaternion[0]}, time ${t}`);
                log(`Quaternion Y element ${quaternion[1]}, time ${t}`);
                log(`Quaternion Z element ${quaternion[2]}, time ${t}`);
                log(`Quaternion W element ${quaternion[3]}, time ${t}`);

            });
            orientationSensor.start();
        } catch (error) {
            // Handle construction errors.
            if (error.name === "SecurityError") {
                // See the note above about permissions policy.
                log("Gyroscope sensor construction was blocked by a permissions policy.");
            } else if (error.name === "ReferenceError") {
                log("Gyroscope sensor is not supported by the User Agent.");
            } else {
                throw error;
            }
        }
    }
}

document.getElementById("startButton").addEventListener(
    "click",
    () => {
        startSensors();
    },
);

document.getElementById("stopButton").addEventListener(
    "click",
    () => {
        if (accelerometerSensor) {
            accelerometerSensor.stop();
            log("Accelerometer stopped");
        }
        if (linearAccelerationSensor) {
            linearAccelerationSensor.stop();
            log("Linear acceleration stopped");
        }
        if (ambientLightSensor) {
            ambientLightSensor.stop();
            log("Ambient light stopped");
        }
        if (gyroscopeSensor) {
            gyroscopeSensor.stop();
            log("Gyroscope stopped");
        }
        if (orientationSensor) {
            orientationSensor.stop();
            log("Orientation stopped");
        }
    },
);

document.getElementById("clearLogsButton").addEventListener(
    "click",
    () => {
        logElement.value = "";
    },
);

// Check permissions and populate html list
checkPermission('accelerometer');
checkPermission('gyroscope');
checkPermission('magnetometer');
checkPermission('ambient-light-sensor');