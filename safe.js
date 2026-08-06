// ================================
// SafeHill - script.js (PART 1)
// ================================

// Weather Elements

const weatherStatus = document.getElementById("weatherStatus");
const temperature = document.getElementById("temperature");
const rainfall = document.getElementById("rainfall");
const wind = document.getElementById("wind");

const alertMessage = document.getElementById("alert-message");
const alertBox = document.getElementById("alert-box");

// Siren

const siren = new Audio("Standard Emergency Warning Signal - QuickSounds.com.mp3");

siren.loop = false;

// ------------------------------
// Load Weather
// ------------------------------

async function loadWeather(){

const latitude = 29.60;

const longitude = 79.53;

const api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation`;

try{

const response = await fetch(api);

const data = await response.json();

const current = data.current;

temperature.innerHTML =
current.temperature_2m + " °C";

wind.innerHTML =
current.wind_speed_10m + " km/h";



rainfall.innerHTML =
rain + " mm";
const rain = current.precipitation || 0;

updateDashboard(current, rain);

rainfall.innerHTML = rain + " mm";

if(rain >=10){

dangerAlert();

}

else if(rain>=2){

mediumAlert();

}

else{

safeAlert();

}

}

catch(error){

console.log(error);

weatherStatus.innerHTML="Weather Not Available";

}

}

// ------------------------------
// Safe Alert
// ------------------------------

function safeAlert(){

weatherStatus.innerHTML="☀ Weather Normal";

alertBox.style.background="#00b894";

alertBox.style.color="#ffffff";

alertMessage.innerHTML=
"Safe to Travel";

}

// ------------------------------
// Medium Alert
// ------------------------------

function mediumAlert(){

weatherStatus.innerHTML="🌦 Moderate Rain";

alertBox.style.background="#f39c12";

alertBox.style.color="#ffffff";

alertMessage.innerHTML=
"Moderate Rain. Stay Alert.";

}

// ------------------------------
// Danger Alert
// ------------------------------

// =====================================
// VOICE WARNING FUNCTION
// =====================================

function speakWarning(message) {

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "en-US";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.speak(speech);

}


// =====================================
// DANGER ALERT FUNCTION
// =====================================

function dangerAlert() {

    weatherStatus.innerHTML = "🌧 Heavy Rain";

    alertBox.style.background = "#d32f2f";

    alertBox.style.color = "#ffffff";

    alertBox.style.padding = "15px";

    alertBox.style.borderRadius = "10px";

    alertMessage.innerHTML =
        "⚠ HIGH LANDSLIDE RISK - Avoid Travelling Near Kwarab";

    // Play Siren

    siren.play().catch(() => {
        console.log("Siren file not found.");
    });

    // Voice Warning

    speakWarning(
        "Warning! Heavy rain detected near Kwarab. High landslide risk. Please avoid travelling and stay safe."
    );

    // Popup

    alert(
        "⚠ WARNING!\n\nHeavy Rain Detected Near Kwarab.\n\nHigh Landslide Risk.\n\nAvoid Travelling."
    );

}
// ===================================
// SafeHill - script.js (PART 2)
// ===================================

// ----------- Current Location ------------

function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(showPosition,errorLocation);

}else{

console.log("Geolocation Not Supported");

}

}

function showPosition(position){

const lat = position.coords.latitude;

const lon = position.coords.longitude;

console.log("Latitude : " + lat);

console.log("Longitude : " + lon);

}

function errorLocation(){

alert("Location Permission Denied");

}

// ----------- Form Validation ------------

const form = document.querySelector("form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name=document.querySelector("input[type='text']").value;

if(name==""){

alert("Please Enter Your Name");

return;

}

alert("✅ Report Submitted Successfully");

form.reset();

});

}

// ----------- Dark Mode ------------

function toggleDarkMode(){

document.body.classList.toggle("dark");

}

// ----------- Risk Meter ------------

function updateRisk(level){

const risk=document.getElementById("risk-level");

if(!risk) return;

if(level=="LOW"){

risk.innerHTML="🟢 LOW";

risk.style.color="green";

}

else if(level=="MEDIUM"){

risk.innerHTML="🟡 MEDIUM";

risk.style.color="orange";

}

else{

risk.innerHTML="🔴 HIGH";

risk.style.color="red";

}

}

// ----------- Auto Refresh Weather ------------

setInterval(function(){

loadWeather();

},600000);

// Every 10 Minutes

// ----------- Page Load ------------

window.onload=function(){

loadWeather();

getLocation();

};
// ======================================
// SafeHill - script.js (PART 3)
// ======================================

// Stop Siren
function stopSiren() {
    siren.pause();
    siren.currentTime = 0;
}

// Start Siren
function startSiren() {
    siren.play();
}

// Manual Emergency Button
const emergencyBtn = document.getElementById("emergencyBtn");

if (emergencyBtn) {

    emergencyBtn.addEventListener("click", function () {

        startSiren();

        alert("🚨 Emergency Alert Activated!");

    });

}

// ----------------------
// Heavy Rain Popup
// ----------------------

function showPopup(message) {

    const popup = document.createElement("div");

    popup.innerHTML = message;

    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.background = "red";
    popup.style.color = "white";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.zIndex = "9999";
    popup.style.fontSize = "18px";
    popup.style.fontWeight = "bold";

    document.body.appendChild(popup);

    setTimeout(function () {

        popup.remove();

    }, 6000);

}

// ----------------------
// Simulated Rain Check
// ----------------------

function simulateRain() {

    const rain = Math.floor(Math.random() * 15);

    if (rain >= 10) {

        updateRisk("HIGH");

        showPopup("🚨 Heavy Rain Detected! High Landslide Risk.");

        startSiren();

    } else if (rain >= 2) {

        updateRisk("MEDIUM");

        showPopup("⚠ Moderate Rain. Stay Alert.");

    } else {

        updateRisk("LOW");

    }

}

// ----------------------
// Kwarab Information
// ----------------------

console.log("Danger Zone : Kwarab Pool, Almora");

console.log("Risk : HIGH During Heavy Rain");

console.log("Coordinates : 29.60 , 79.53");

// ----------------------
// Refresh Simulation
// ----------------------

setInterval(function () {

    simulateRain();

}, 300000);

// Every 5 Minutes

// ----------------------
// Welcome Message
// ----------------------

console.log("===================================");

console.log(" SafeHill Disaster Alert System ");

console.log(" Developed for BCA Project ");

console.log(" Location : Almora, Uttarakhand ");

console.log("===================================");
const reportForm =
document.getElementById("reportForm");

if(reportForm){

reportForm.addEventListener("submit",function(e){

e.preventDefault();

document.getElementById("reportSuccess").innerHTML=

"✅ Your report has been submitted successfully.";

reportForm.reset();

});

}
// Kwarab Coordinates
const kwarabLat = 29.60;
const kwarabLng = 79.53;

// Create Map
const map = L.map("map").setView([kwarabLat, kwarabLng], 11);

// OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
maxZoom:19
}).addTo(map);

// Kwarab Marker
L.marker([kwarabLat,kwarabLng])
.addTo(map)
.bindPopup("⚠ Kwarab Landslide Danger Zone")
.openPopup();


// Get User Location

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(position){

const userLat = position.coords.latitude;
const userLng = position.coords.longitude;

// Blue Marker
L.marker([userLat,userLng])
.addTo(map)
.bindPopup("📍 You are Here")
.openPopup();

// Line Between User & Kwarab
L.polyline([
[userLat,userLng],
[kwarabLat,kwarabLng]
],{
color:"blue",
weight:3
}).addTo(map);

});

}
function updateDashboard(current, rain) {

    document.getElementById("dashboardTemp").innerHTML =
        current.temperature_2m + " °C";

    document.getElementById("dashboardWind").innerHTML =
        current.wind_speed_10m + " km/h";

    document.getElementById("dashboardRain").innerHTML =
        rain + " mm";

    if (rain >= 10) {
        document.getElementById("dashboardRisk").innerHTML = "🔴 HIGH";
    } 
    else if (rain >= 2) {
        document.getElementById("dashboardRisk").innerHTML = "🟡 MEDIUM";
    } 
    else {
        document.getElementById("dashboardRisk").innerHTML = "🟢 LOW";
    }

    document.getElementById("lastUpdated").innerHTML =
        new Date().toLocaleTimeString();

}
