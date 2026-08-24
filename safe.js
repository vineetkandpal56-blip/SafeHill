// // ================================
// // SafeHill - script.js (PART 1)
// // ================================

// // Weather Elements

// const weatherStatus = document.getElementById("weatherStatus");
// const temperature = document.getElementById("temperature");
// const rainfall = document.getElementById("rainfall");
// const wind = document.getElementById("wind");

// const alertMessage = document.getElementById("alert-message");
// const alertBox = document.getElementById("alert-box");

// // Siren

// const siren = new Audio("Standard Emergency Warning Signal - QuickSounds.com.mp3");

// siren.loop = false;

// // ------------------------------
// // Load Weather
// // ------------------------------

// async function loadWeather(){

// const latitude = 29.60;

// const longitude = 79.53;

// const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation`;

// try{

// const response = await fetch(api);

// const data = await response.json();

// const current = data.current;

// temperature.innerHTML =
// current.temperature_2m + " °C";

// wind.innerHTML =
// current.wind_speed_10m + " km/h";



// rainfall.innerHTML =
// rain + " mm";
// const rain = current.precipitation || 0;

// updateDashboard(current, rain);

// rainfall.innerHTML = rain + " mm";

// if(rain >=10){

// dangerAlert();

// }

// else if(rain>=2){

// mediumAlert();

// }

// else{

// safeAlert();

// }

// }

// catch(error){

// console.log(error);

// weatherStatus.innerHTML="Weather Not Available";

// }

// }

// // ------------------------------
// // Safe Alert
// // ------------------------------

// function safeAlert(){

// weatherStatus.innerHTML="☀ Weather Normal";

// alertBox.style.background="#00b894";

// alertBox.style.color="#ffffff";

// alertMessage.innerHTML=
// "Safe to Travel";

// }

// // ------------------------------
// // Medium Alert
// // ------------------------------

// function mediumAlert(){

// weatherStatus.innerHTML="🌦 Moderate Rain";

// alertBox.style.background="#f39c12";

// alertBox.style.color="#ffffff";

// alertMessage.innerHTML=
// "Moderate Rain. Stay Alert.";

// }

// // ------------------------------
// // Danger Alert
// // ------------------------------

// // =====================================
// // VOICE WARNING FUNCTION
// // =====================================

// function speakWarning(message) {

//     window.speechSynthesis.cancel();

//     const speech = new SpeechSynthesisUtterance(message);

//     speech.lang = "en-US";

//     speech.rate = 0.9;

//     speech.pitch = 1;

//     speech.volume = 1;

//     window.speechSynthesis.speak(speech);

// }


// // =====================================
// // DANGER ALERT FUNCTION
// // =====================================

// function dangerAlert() {

//     weatherStatus.innerHTML = "🌧 Heavy Rain";

//     alertBox.style.background = "#d32f2f";

//     alertBox.style.color = "#ffffff";

//     alertBox.style.padding = "15px";

//     alertBox.style.borderRadius = "10px";

//     alertMessage.innerHTML =
//         "⚠ HIGH LANDSLIDE RISK - Avoid Travelling Near Kwarab";

//     // Play Siren

//     siren.play().catch(() => {
//         console.log("Siren file not found.");
//     });

//     // Voice Warning

//     speakWarning(
//         "Warning! Heavy rain detected near Kwarab. High landslide risk. Please avoid travelling and stay safe."
//     );

//     // Popup

//     alert(
//         "⚠ WARNING!\n\nHeavy Rain Detected Near Kwarab.\n\nHigh Landslide Risk.\n\nAvoid Travelling."
//     );

// }
// // ===================================
// // SafeHill - script.js (PART 2)
// // ===================================

// // ----------- Current Location ------------

// function getLocation(){

// if(navigator.geolocation){

// navigator.geolocation.getCurrentPosition(showPosition,errorLocation);

// }else{

// console.log("Geolocation Not Supported");

// }

// }

// function showPosition(position){

// const lat = position.coords.latitude;

// const lon = position.coords.longitude;

// console.log("Latitude : " + lat);

// console.log("Longitude : " + lon);

// }

// function errorLocation(){

// alert("Location Permission Denied");

// }

// // ----------- Form Validation ------------

// const form = document.querySelector("form");

// if(form){

// form.addEventListener("submit",function(e){

// e.preventDefault();

// const name=document.querySelector("input[type='text']").value;

// if(name==""){

// alert("Please Enter Your Name");

// return;

// }

// alert("✅ Report Submitted Successfully");

// form.reset();

// });

// }

// // ----------- Dark Mode ------------

// function toggleDarkMode(){

// document.body.classList.toggle("dark");

// }

// // ----------- Risk Meter ------------

// function updateRisk(level){

// const risk=document.getElementById("risk-level");

// if(!risk) return;

// if(level=="LOW"){

// risk.innerHTML="🟢 LOW";

// risk.style.color="green";

// }

// else if(level=="MEDIUM"){

// risk.innerHTML="🟡 MEDIUM";

// risk.style.color="orange";

// }

// else{

// risk.innerHTML="🔴 HIGH";

// risk.style.color="red";

// }

// }

// // ----------- Auto Refresh Weather ------------

// setInterval(function(){

// loadWeather();

// },600000);

// // Every 10 Minutes

// // ----------- Page Load ------------

// window.onload=function(){

// loadWeather();

// getLocation();

// };
// // ======================================
// // SafeHill - script.js (PART 3)
// // ======================================

// // Stop Siren
// function stopSiren() {
//     siren.pause();
//     siren.currentTime = 0;
// }

// // Start Siren
// function startSiren() {
//     siren.play();
// }

// // Manual Emergency Button
// const emergencyBtn = document.getElementById("emergencyBtn");

// if (emergencyBtn) {

//     emergencyBtn.addEventListener("click", function () {

//         startSiren();

//         alert("🚨 Emergency Alert Activated!");

//     });

// }

// // ----------------------
// // Heavy Rain Popup
// // ----------------------

// function showPopup(message) {

//     const popup = document.createElement("div");

//     popup.innerHTML = message;

//     popup.style.position = "fixed";
//     popup.style.top = "20px";
//     popup.style.right = "20px";
//     popup.style.background = "red";
//     popup.style.color = "white";
//     popup.style.padding = "20px";
//     popup.style.borderRadius = "10px";
//     popup.style.zIndex = "9999";
//     popup.style.fontSize = "18px";
//     popup.style.fontWeight = "bold";

//     document.body.appendChild(popup);

//     setTimeout(function () {

//         popup.remove();

//     }, 6000);

// }

// // ----------------------
// // Simulated Rain Check
// // ----------------------

// function simulateRain() {

//     const rain = Math.floor(Math.random() * 15);

//     if (rain >= 10) {

//         updateRisk("HIGH");

//         showPopup("🚨 Heavy Rain Detected! High Landslide Risk.");

//         startSiren();

//     } else if (rain >= 2) {

//         updateRisk("MEDIUM");

//         showPopup("⚠ Moderate Rain. Stay Alert.");

//     } else {

//         updateRisk("LOW");

//     }

// }

// // ----------------------
// // Kwarab Information
// // ----------------------

// console.log("Danger Zone : Kwarab Pool, Almora");

// console.log("Risk : HIGH During Heavy Rain");

// console.log("Coordinates : 29.60 , 79.53");

// // ----------------------
// // Refresh Simulation
// // ----------------------

// setInterval(function () {

//     simulateRain();

// }, 300000);

// // Every 5 Minutes

// // ----------------------
// // Welcome Message
// // ----------------------

// console.log("===================================");

// console.log(" SafeHill Disaster Alert System ");

// console.log(" Developed for BCA Project ");

// console.log(" Location : Almora, Uttarakhand ");

// console.log("===================================");
// const reportForm =
// document.getElementById("reportForm");

// if(reportForm){

// reportForm.addEventListener("submit",function(e){

// e.preventDefault();

// document.getElementById("reportSuccess").innerHTML=

// "✅ Your report has been submitted successfully.";

// reportForm.reset();

// });

// }
// // Kwarab Coordinates
// const kwarabLat = 29.60;
// const kwarabLng = 79.53;

// // Create Map
// const map = L.map("map").setView([kwarabLat, kwarabLng], 11);

// // OpenStreetMap
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
// maxZoom:19
// }).addTo(map);

// // Kwarab Marker
// L.marker([kwarabLat,kwarabLng])
// .addTo(map)
// .bindPopup("⚠ Kwarab Landslide Danger Zone")
// .openPopup();


// // Get User Location

// if(navigator.geolocation){

// navigator.geolocation.getCurrentPosition(function(position){

// const userLat = position.coords.latitude;
// const userLng = position.coords.longitude;

// // Blue Marker
// L.marker([userLat,userLng])
// .addTo(map)
// .bindPopup("📍 You are Here")
// .openPopup();

// // Line Between User & Kwarab
// L.polyline([
// [userLat,userLng],
// [kwarabLat,kwarabLng]
// ],{
// color:"blue",
// weight:3
// }).addTo(map);

// });

// }
// function updateDashboard(current, rain) {

//     document.getElementById("dashboardTemp").innerHTML =
//         current.temperature_2m + " °C";

//     document.getElementById("dashboardWind").innerHTML =
//         current.wind_speed_10m + " km/h";

//     document.getElementById("dashboardRain").innerHTML =
//         rain + " mm";

//     if (rain >= 10) {
//         document.getElementById("dashboardRisk").innerHTML = "🔴 HIGH";
//     } 
//     else if (rain >= 2) {
//         document.getElementById("dashboardRisk").innerHTML = "🟡 MEDIUM";
//     } 
//     else {
//         document.getElementById("dashboardRisk").innerHTML = "🟢 LOW";
//     }

//     document.getElementById("lastUpdated").innerHTML =
//         new Date().toLocaleTimeString();

// }

/* =====================================================
   SAFEHILL — TOURIST SAFETY SYSTEM
   Location → Danger Zone → Notification
   → Weather → Alarm/Voice → Safety Guidance
===================================================== */


/* =====================================================
   1. WEATHER ELEMENTS
===================================================== */

const weatherStatus = document.getElementById("weatherStatus");
const temperature = document.getElementById("temperature");
const rainfall = document.getElementById("rainfall");
const wind = document.getElementById("wind");

const alertMessage = document.getElementById("alert-message");
const alertBox = document.getElementById("alert-box");


/* =====================================================
   2. EMERGENCY SIREN
===================================================== */

const siren = new Audio("Standard Emergency Warning Signal - QuickSounds.com.mp3");

siren.volume = 1.0;
siren.loop = false;

function playSiren() {
    siren.currentTime = 0;

    siren.play().catch(error => {
        console.log("Siren blocked:", error);
    });
}


/* =====================================================
   3. UTTARAKHAND MONITORED DISASTER LOCATIONS
===================================================== */

const disasterZones = [

    {
        name: "Kwarab",
        district: "Almora",
        lat: 29.60,
        lng: 79.53,
        radius: 5000,
        risk: "HIGH"
    },

    {
        name: "Nainital",
        district: "Nainital",
        lat: 29.3919,
        lng: 79.4542,
        radius: 5000,
        risk: "HIGH"
    },

    {
        name: "Joshimath",
        district: "Chamoli",
        lat: 30.5560,
        lng: 79.5640,
        radius: 7000,
        risk: "HIGH"
    },

    {
        name: "Kedarnath",
        district: "Rudraprayag",
        lat: 30.7346,
        lng: 79.0669,
        radius: 5000,
        risk: "HIGH"
    },

    {
        name: "Badrinath",
        district: "Chamoli",
        lat: 30.7433,
        lng: 79.4938,
        radius: 5000,
        risk: "HIGH"
    },

    {
        name: "Uttarkashi",
        district: "Uttarkashi",
        lat: 30.7268,
        lng: 78.4354,
        radius: 5000,
        risk: "HIGH"
    },

    {
        name: "Dharchula",
        district: "Pithoragarh",
        lat: 29.8477,
        lng: 80.5150,
        radius: 5000,
        risk: "HIGH"
    },

    {
        name: "Devprayag",
        district: "Tehri Garhwal",
        lat: 30.1460,
        lng: 78.6020,
        radius: 5000,
        risk: "MODERATE"
    }

];


/* =====================================================
   4. DISTANCE CALCULATION
===================================================== */

function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
}


/* =====================================================
   5. FIND NEAREST DISASTER ZONE
===================================================== */

function findNearbyDangerZone(lat, lng) {

    let nearestZone = null;
    let nearestDistance = Infinity;

    disasterZones.forEach(zone => {

        const distance =
            calculateDistance(
                lat,
                lng,
                zone.lat,
                zone.lng
            );

        if (distance < nearestDistance) {

            nearestDistance = distance;
            nearestZone = zone;

        }

    });

    if (
        nearestZone &&
        nearestDistance <= nearestZone.radius
    ) {

        return {
            zone: nearestZone,
            distance: nearestDistance
        };

    }

    return null;
}


/* =====================================================
   6. DISTANCE FORMAT
===================================================== */

function formatDistance(distance) {

    if (distance < 1000) {

        return Math.round(distance) + " metres";

    }

    return (
        (distance / 1000).toFixed(1)
        + " km"
    );

}


/* =====================================================
   7. BROWSER NOTIFICATION
===================================================== */

async function requestNotificationPermission() {

    if (!("Notification" in window)) {

        console.log(
            "Browser notifications are not supported."
        );

        return false;

    }

    if (Notification.permission === "granted") {

        return true;

    }

    if (Notification.permission !== "denied") {

        const permission =
            await Notification.requestPermission();

        return permission === "granted";

    }

    return false;

}


function sendNotification(title, message) {

    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification(title, {

            body: message,

            icon: "pexels-jplenio-20364510.jpg"

        });

    }

}


/* =====================================================
   8. VOICE WARNING
===================================================== */

function speakWarning(message) {

    if (!("speechSynthesis" in window)) {

        return;

    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(message);

    speech.lang = "en-US";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.speak(speech);

}


/* =====================================================
   9. SAFETY GUIDANCE
===================================================== */

function showSafetyGuidance(zone, rain) {

    const guidance =
        document.getElementById("safetyGuidance");

    if (!guidance) {

        return;

    }

    guidance.innerHTML = `

        <div class="safety-alert-card">

            <h3>
                🛡️ Safety Guidance
            </h3>

            <p>
                You are near
                <strong>${zone.name}</strong>,
                a monitored landslide-prone area.
            </p>

            ${
                rain >= 10

                ?

                `
                <p>
                    🚨 Heavy rainfall is currently detected.
                    Please avoid unnecessary travel.
                </p>
                `

                :

                `
                <p>
                    Weather conditions are currently
                    being monitored.
                </p>
                `
            }

            <ul>

                <li>
                    Avoid stopping near steep slopes.
                </li>

                <li>
                    Do not cross blocked or flooded roads.
                </li>

                <li>
                    Keep a safe distance from unstable slopes.
                </li>

                <li>
                    Follow local authority instructions.
                </li>

                <li>
                    Move to a safer location if conditions worsen.
                </li>

            </ul>

        </div>

    `;

}


/* =====================================================
   10. DANGER ZONE NOTIFICATION
===================================================== */

let locationWarningShown = false;

function handleDangerZone(zoneData) {

    if (!zoneData) {

        return;

    }

    const zone =
        zoneData.zone;

    const distance =
        zoneData.distance;


    /* First notification */

    if (!locationWarningShown) {

        locationWarningShown = true;

        const message =
            `You are approaching ${zone.name}, ` +
            `a monitored landslide-prone area.`;

        sendNotification(
            "⚠️ SafeHill Location Alert",
            message
        );

        showPopup(
            `
            ⚠️ <strong>LANDSLIDE-PRONE AREA</strong>
            <br><br>
            You are near
            <strong>${zone.name}</strong>.
            <br>
            Distance:
            ${formatDistance(distance)}
            `
        );

        speakWarning(
            `Warning! You are approaching
            a landslide-prone area near
            ${zone.name}. Please stay alert.`
        );

    }

}


/* =====================================================
   11. LOAD WEATHER FOR USER LOCATION
===================================================== */

async function checkLocationWeather(
    latitude,
    longitude,
    zoneData
) {

    const api =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,wind_speed_10m,rain`;


    try {

        const response =
            await fetch(api);

        const data =
            await response.json();

        const current =
            data.current;


        const rain =
            current.rain || 0;


        /* Update normal weather */

        if (temperature) {

            temperature.innerHTML =
                current.temperature_2m +
                " °C";

        }

        if (wind) {

            wind.innerHTML =
                current.wind_speed_10m +
                " km/h";

        }

        if (rainfall) {

            rainfall.innerHTML =
                rain + " mm";

        }


        /* =================================================
           HIGH WEATHER RISK
        ================================================= */

        if (
            zoneData &&
            rain >= 10
        ) {

            weatherStatus.innerHTML =
                "🌧 Heavy Rain";

            if (alertBox) {

                alertBox.style.background =
                    "#c74747";

                alertBox.style.color =
                    "#ffffff";

            }

            if (alertMessage) {

                alertMessage.innerHTML =
                    "⚠ HIGH LANDSLIDE RISK - Avoid Travelling Near " +
                    zoneData.zone.name;

            }


            /* Notification */

            sendNotification(

                "🚨 SAFEHILL HIGH RISK ALERT",

                `Heavy rainfall detected near ` +
                `${zoneData.zone.name}. ` +
                `Please avoid unnecessary travel.`

            );


            /* Voice */

            speakWarning(

                `Warning! Heavy rainfall detected near ` +
                `${zoneData.zone.name}. ` +
                `High landslide risk. ` +
                `Please avoid travelling and stay safe.`

            );


            /* Siren */

            siren.play().catch(() => {

                console.log(
                    "Siren requires user interaction."
                );

            });


            /* Safety guidance */

            showSafetyGuidance(
                zoneData.zone,
                rain
            );


            /* Dashboard */

            updateRisk("HIGH");


        }


        /* =================================================
           MODERATE WEATHER
        ================================================= */

        else if (
            zoneData &&
            rain >= 2
        ) {

            weatherStatus.innerHTML =
                "🌦 Moderate Rain";

            if (alertBox) {

                alertBox.style.background =
                    "#c28a32";

                alertBox.style.color =
                    "#ffffff";

            }

            if (alertMessage) {

                alertMessage.innerHTML =
                    "⚠ Moderate Rain. Stay Alert.";

            }

            showSafetyGuidance(
                zoneData.zone,
                rain
            );

            updateRisk("MEDIUM");

        }


        /* =================================================
           NORMAL WEATHER
        ================================================= */

        else {

            weatherStatus.innerHTML =
                "☀ Weather Normal";

            if (alertBox) {

                alertBox.style.background =
                    "#238b62";

                alertBox.style.color =
                    "#ffffff";

            }

            if (alertMessage) {

                alertMessage.innerHTML =
                    zoneData

                    ?

                    "Area is being monitored. " +
                    "Weather conditions are currently normal."

                    :

                    "Safe to Travel";

            }

            updateRisk("LOW");

        }


        /* Dashboard */

        updateDashboard(
            current,
            rain
        );


    }

    catch (error) {

        console.log(
            "Weather error:",
            error
        );

        if (weatherStatus) {

            weatherStatus.innerHTML =
                "Weather Not Available";

        }

    }

}


/* =====================================================
   12. CHECK USER LOCATION
===================================================== */

function checkUserLocation(position) {

    const latitude =
        position.coords.latitude;

    const longitude =
        position.coords.longitude;


    console.log(
        "User Latitude:",
        latitude
    );

    console.log(
        "User Longitude:",
        longitude
    );


    /* Find danger zone */

    const zoneData =
        findNearbyDangerZone(
            latitude,
            longitude
        );


    /* Location warning */

    if (zoneData) {

        handleDangerZone(
            zoneData
        );

    }


    /* Weather check */

    checkLocationWeather(
        latitude,
        longitude,
        zoneData
    );


    /* Update map */

    updateUserMapLocation(
        latitude,
        longitude
    );

}


/* =====================================================
   13. LOCATION ERROR
===================================================== */

function locationError(error) {

    console.log(
        "Location error:",
        error
    );

    if (weatherStatus) {

        weatherStatus.innerHTML =
            "📍 Location Permission Required";

    }

}


/* =====================================================
   14. START LOCATION MONITORING
===================================================== */

function startLocationMonitoring() {

    if (!navigator.geolocation) {

        alert(
            "Your browser does not support GPS location."
        );

        return;

    }


    navigator.geolocation.watchPosition(

        checkUserLocation,

        locationError,

        {

            enableHighAccuracy: true,

            maximumAge: 30000,

            timeout: 15000

        }

    );

}


/* =====================================================
   15. MAP
===================================================== */

const kwarabLat = 29.60;
const kwarabLng = 79.53;

let map = null;
let userMarker = null;


function initializeMap() {

    const mapElement =
        document.getElementById("map");

    if (!mapElement) {

        return;

    }


    map =
        L.map("map")
            .setView(
                [kwarabLat, kwarabLng],
                7
            );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }

    ).addTo(map);


    /* Add all disaster locations */

    disasterZones.forEach(zone => {

        L.marker([
            zone.lat,
            zone.lng
        ])

        .addTo(map)

        .bindPopup(`
            <strong>⚠️ ${zone.name}</strong>
            <br>
            ${zone.district}
            <br>
            Risk: ${zone.risk}
        `);

    });

}


/* =====================================================
   16. UPDATE USER MARKER
===================================================== */

function updateUserMapLocation(
    latitude,
    longitude
) {

    if (!map) {

        return;

    }


    if (userMarker) {

        userMarker.setLatLng([
            latitude,
            longitude
        ]);

    }

    else {

        userMarker =
            L.marker([
                latitude,
                longitude
            ])

            .addTo(map)

            .bindPopup(
                "📍 You are Here"
            );

    }

}


/* =====================================================
   17. RISK METER
===================================================== */

function updateRisk(level) {

    const risk =
        document.getElementById(
            "risk-level"
        );

    if (!risk) {

        return;

    }


    if (level === "LOW") {

        risk.innerHTML =
            "🟢 LOW";

        risk.style.color =
            "green";

    }

    else if (level === "MEDIUM") {

        risk.innerHTML =
            "🟡 MEDIUM";

        risk.style.color =
            "orange";

    }

    else {

        risk.innerHTML =
            "🔴 HIGH";

        risk.style.color =
            "red";

    }

}


/* =====================================================
   18. DASHBOARD
===================================================== */

function updateDashboard(
    current,
    rain
) {

    const temp =
        document.getElementById(
            "dashboardTemp"
        );

    const windElement =
        document.getElementById(
            "dashboardWind"
        );

    const rainElement =
        document.getElementById(
            "dashboardRain"
        );

    const risk =
        document.getElementById(
            "dashboardRisk"
        );

    const updated =
        document.getElementById(
            "lastUpdated"
        );


    if (temp) {

        temp.innerHTML =
            current.temperature_2m +
            " °C";

    }

    if (windElement) {

        windElement.innerHTML =
            current.wind_speed_10m +
            " km/h";

    }

    if (rainElement) {

        rainElement.innerHTML =
            rain + " mm";

    }


    if (risk) {

        if (rain >= 10) {

            risk.innerHTML =
                "🔴 HIGH";

        }

        else if (rain >= 2) {

            risk.innerHTML =
                "🟡 MEDIUM";

        }

        else {

            risk.innerHTML =
                "🟢 LOW";

        }

    }


    if (updated) {

        updated.innerHTML =
            new Date()
                .toLocaleTimeString();

    }

}


/* =====================================================
   19. POPUP
===================================================== */

function showPopup(message) {

    const popup =
        document.createElement("div");


    popup.innerHTML =
        message;


    popup.style.position =
        "fixed";

    popup.style.top =
        "20px";

    popup.style.right =
        "20px";

    popup.style.maxWidth =
        "360px";

    popup.style.background =
        "#10232d";

    popup.style.color =
        "#ffffff";

    popup.style.padding =
        "20px";

    popup.style.borderRadius =
        "12px";

    popup.style.border =
        "1px solid rgba(255,255,255,0.15)";

    popup.style.boxShadow =
        "0 10px 30px rgba(0,0,0,0.4)";

    popup.style.zIndex =
        "99999";

    popup.style.fontSize =
        "16px";

    popup.style.lineHeight =
        "1.6";


    document.body.appendChild(
        popup
    );


    setTimeout(
        function () {

            popup.remove();

        },
        7000
    );

}


/* =====================================================
   20. REQUEST PERMISSIONS
===================================================== */

async function initializeSafeHill() {

    await requestNotificationPermission();

    initializeMap();

    startLocationMonitoring();

}


/* =====================================================
   21. PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function () {

        initializeSafeHill();

    }
);
/* =========================================
   SAFEHILL — LOCATION DETECTION
========================================= */

function detectUserLocation() {

    const status =
        document.getElementById("locationStatus");

    const result =
        document.getElementById("locationResult");

    const errorBox =
        document.getElementById("locationError");

    const button =
        document.getElementById("detectLocationBtn");


    // Clear old messages
    errorBox.style.display = "none";
    errorBox.innerHTML = "";

    status.innerHTML =
        "📍 Detecting your location...";

    button.disabled = true;

    button.innerHTML =
        "⏳ Detecting...";


    // Browser does not support GPS
    if (!navigator.geolocation) {

        status.innerHTML =
            "❌ Location is not supported by this browser.";

        button.disabled = false;

        button.innerHTML =
            "📍 Detect My Location";

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            console.log(
                "Latitude:",
                latitude
            );

            console.log(
                "Longitude:",
                longitude
            );


            document.getElementById(
                "userLatitude"
            ).textContent =
                latitude.toFixed(6);


            document.getElementById(
                "userLongitude"
            ).textContent =
                longitude.toFixed(6);


            status.innerHTML =
                "✅ Location detected successfully.";


            result.style.display =
                "block";


            button.disabled = false;

            button.innerHTML =
                "🔄 Detect Again";


            // Find nearest monitored location
            findNearestLocation(
                latitude,
                longitude
            );

        },


        function(error) {

            button.disabled = false;

            button.innerHTML =
                "📍 Detect My Location";


            let message =
                "Unable to detect location.";


            if (error.code === 1) {

                message =
                    "❌ Location permission denied. " +
                    "Please allow location access.";

            }

            else if (error.code === 2) {

                message =
                    "❌ Location unavailable. " +
                    "Please check GPS/internet.";

            }

            else if (error.code === 3) {

                message =
                    "❌ Location request timed out. " +
                    "Please try again.";

            }


            status.innerHTML =
                message;


            errorBox.style.display =
                "block";

            errorBox.innerHTML =
                message;


            console.log(
                "Location Error:",
                error
            );

        },


        {
            enableHighAccuracy: true,

            timeout: 20000,

            maximumAge: 0
        }

    );

}


/* =========================================
   MONITORED UTTARAKHAND LOCATIONS
========================================= */

const monitoredLocations = [

    {
        name: "Kwarab, Almora",
        lat: 29.60,
        lng: 79.53
    },

    {
        name: "Nainital",
        lat: 29.3919,
        lng: 79.4542
    },

    {
        name: "Joshimath",
        lat: 30.5560,
        lng: 79.5640
    },

    {
        name: "Badrinath",
        lat: 30.7433,
        lng: 79.4938
    },

    {
        name: "Kedarnath",
        lat: 30.7346,
        lng: 79.0669
    },

    {
        name: "Uttarkashi",
        lat: 30.7268,
        lng: 78.4354
    },

    {
        name: "Dharchula",
        lat: 29.8477,
        lng: 80.5150
    }

];


/* =========================================
   FIND NEAREST LOCATION
========================================= */

function findNearestLocation(
    userLat,
    userLng
) {

    let nearest = null;

    let shortestDistance =
        Infinity;


    monitoredLocations.forEach(
        function(location) {

            const distance =
                calculateDistance(
                    userLat,
                    userLng,
                    location.lat,
                    location.lng
                );


            if (
                distance <
                shortestDistance
            ) {

                shortestDistance =
                    distance;

                nearest =
                    location;

            }

        }
    );


    if (nearest) {

        document.getElementById(
            "nearestLocation"
        ).textContent =
            nearest.name;


        document.getElementById(
            "locationDistance"
        ).textContent =
            formatDistance(
                shortestDistance
            );

    }

}


/* =========================================
   DISTANCE CALCULATION
========================================= */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(
            lat1 * Math.PI / 180
        ) *

        Math.cos(
            lat2 * Math.PI / 180
        ) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;

}


/* =========================================
   FORMAT DISTANCE
========================================= */

function formatDistance(
    distance
) {

    if (distance < 1) {

        return (
            Math.round(
                distance * 1000
            ) +
            " metres"
        );

    }


    return (
        distance.toFixed(2) +
        " km"
    );

}
function speakHindiWarning() {
    const message =
        "सावधान! आप भूस्खलन संभावित क्षेत्र में हैं। कृपया सुरक्षित रहें।";

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "hi-IN";
    speech.rate = 0.85;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}