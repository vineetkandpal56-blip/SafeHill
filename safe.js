
/* =========================================================
   SAFEHILL
   ORIGINAL GPS LOCATION + REAL DISTANCE TO KWARAB
   ========================================================= */

const KWARAB = {
    lat: 29.60,
    lon: 79.53,
    name: "Kwarab Pool, Almora, Uttarakhand"
};

let map = null;
let userMarker = null;
let accuracyCircle = null;
let locationWatchId = null;

let currentLatitude = null;
let currentLongitude = null;
let currentAccuracy = null;


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeMap();
    setupButtons();
    detectCurrentLocation();

});


/* =========================================================
   BUTTONS
   ========================================================= */

function setupButtons() {

    const button =
        document.getElementById("detectLocationBtn");

    if (button) {

        button.addEventListener("click", () => {

            button.disabled = true;
            button.innerText = "📍 Detecting...";

            detectCurrentLocation();

            setTimeout(() => {
                button.disabled = false;
                button.innerText = "📍 Detect My Location";
            }, 3000);

        });

    }


    const retry =
        document.getElementById("locationPopupRetry");

    if (retry) {

        retry.addEventListener("click", () => {

            retry.style.display = "none";

            detectCurrentLocation();

        });

    }


    const refresh =
        document.getElementById("refreshWeather");

    if (refresh) {

        refresh.addEventListener("click", () => {

            if (
                currentLatitude !== null &&
                currentLongitude !== null
            ) {

                loadWeather(
                    currentLatitude,
                    currentLongitude
                );

            } else {

                showLocationMessage(
                    "Location has not been detected yet."
                );

            }

        });

    }

}


/* =========================================================
   GET REAL DEVICE LOCATION
   ========================================================= */

function detectCurrentLocation() {

    if (!navigator.geolocation) {

        showLocationError(
            "Geolocation is not supported by this browser."
        );

        return;

    }


    showLocationPopup();

    showLocationMessage(
        "Requesting your current location..."
    );


    navigator.geolocation.getCurrentPosition(

        function(position) {

            processRealLocation(position);

            startContinuousLocation();

        },

        function(error) {

            handleLocationError(error);

        },

        {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        }

    );

}


/* =========================================================
   CONTINUOUS REAL LOCATION
   ========================================================= */

function startContinuousLocation() {

    if (!navigator.geolocation) {
        return;
    }


    if (locationWatchId !== null) {

        navigator.geolocation.clearWatch(
            locationWatchId
        );

    }


    locationWatchId =
        navigator.geolocation.watchPosition(

            function(position) {

                processRealLocation(position);

            },

            function(error) {

                console.warn(
                    "Location update:",
                    error.message
                );

            },

            {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
}

        );

}


/* =========================================================
   PROCESS ACTUAL LOCATION
   ========================================================= */

async function processRealLocation(position) {

    const latitude =
        position.coords.latitude;

    const longitude =
        position.coords.longitude;

    const accuracy =
        position.coords.accuracy;


    /*
       IMPORTANT:
       These values come directly from the
       browser/device geolocation API.
    */

    currentLatitude = latitude;
    currentLongitude = longitude;
    currentAccuracy = accuracy;


    console.log(
        "REAL DEVICE LOCATION:",
        latitude,
        longitude,
        "Accuracy:",
        accuracy,
        "meters"
    );


    /* =====================================================
       SHOW RAW GPS COORDINATES
       ===================================================== */

    setText(
        "userLatitude",
        latitude.toFixed(6)
    );

    setText(
        "userLongitude",
        longitude.toFixed(6)
    );


    setText(
        "currentCoordinates",
        `Latitude: ${latitude.toFixed(6)}
         Longitude: ${longitude.toFixed(6)}`
    );


    /* =====================================================
       CALCULATE REAL DISTANCE
       ===================================================== */

       const distance =
    await calculateRoadDistanceKm(
        latitude,
        longitude
    );

if (distance === null) {
    showLocationMessage(
        "Unable to calculate road distance."
    );
    return;
}


    /*
       This is the actual calculated distance.
       Nothing is hard-coded here.
    */

    setText(
        "locationDistance",
        formatDistance(distance)
    );


    setText(
        "zoneDistance",
        "Distance from Kwarab: " +
        formatDistance(distance)
    );


    /* =====================================================
       SHOW LOCATION RESULT
       ===================================================== */

    const result =
        document.getElementById("locationResult");

    if (result) {
        result.style.display = "block";
    }


    /* =====================================================
       UPDATE MAP
       ===================================================== */

    updateUserOnMap(
        latitude,
        longitude,
        accuracy
    );


    /* =====================================================
       CHECK KWARAB WARNING ZONE
       IMPORTANT:
       10 KM IS ONLY WARNING THRESHOLD.
       IT IS NOT THE DISTANCE.
       ===================================================== */

    updateKwarabSafety(distance);


    /* =====================================================
       GET ACTUAL PLACE NAME
       ===================================================== */

    reverseGeocode(latitude, longitude);


    /* =====================================================
       WEATHER FOR ACTUAL CURRENT LOCATION
       ===================================================== */

    loadWeather(
        latitude,
        longitude
    );


    /* =====================================================
       LAST UPDATED
       ===================================================== */

    setText(
        "lastUpdated",
        new Date().toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        )
    );


    showLocationMessage(
        "📍 Current location detected successfully."
    );


    const touristStatus =
        document.getElementById(
            "touristLocationStatus"
        );

    if (touristStatus) {

        touristStatus.innerText =
            "📍 Current location detected.";

    }


    /* Close popup */

    setTimeout(() => {

        closeLocationPopup();

    }, 1200);

}


/* =========================================================
   REAL ROAD DISTANCE TO KWARAB
   ========================================================= */

async function calculateRoadDistanceKm(latitude, longitude) {

    try {

        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${longitude},${latitude};${KWARAB.lon},${KWARAB.lat}` +
            `?overview=false`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Road routing failed");
        }

        const data = await response.json();

        if (
            data.code !== "Ok" ||
            !data.routes ||
            !data.routes.length
        ) {
            throw new Error("No road route found");
        }

        // OSRM distance is in meters
        const distanceKm =
            data.routes[0].distance / 1000;

        console.log(
            "REAL ROAD DISTANCE FROM KWARAB:",
            distanceKm,
            "km"
        );

        return distanceKm;

    } catch (error) {

        console.error(
            "Road distance error:",
            error
        );

        return null;
    }
}


/* =========================================================
   DISTANCE DISPLAY
   ========================================================= */

function formatDistance(distanceKm) {

    if (distanceKm < 1) {

        return (
            (distanceKm * 1000).toFixed(0) +
            " m"
        );

    }


    return (
        distanceKm.toFixed(2) +
        " km"
    );

}


/* =========================================================
   KWARAB SAFETY STATUS
   ========================================================= */

function updateKwarabSafety(distance) {

    const zone =
        document.getElementById(
            "nearbyZone"
        );

    const alert =
        document.getElementById(
            "touristAlert"
        );

    const message =
        document.getElementById(
            "touristAlertMessage"
        );


    /*
       IMPORTANT:
       Distance itself is NOT changed.
       10 km is ONLY used for safety warning.
    */


    if (distance <= 2) {

        if (zone) {

            zone.innerText =
                "🔴 You are very close to Kwarab Risk Zone.";

        }

        if (message) {

            message.innerText =
                "🔴 HIGH ATTENTION: You are very close to the monitored Kwarab area. Follow official safety instructions.";

        }

        if (alert) {

            alert.style.background =
                "rgba(239,68,68,0.12)";

            alert.style.borderColor =
                "rgba(239,68,68,0.3)";

        }

    }

    else if (distance <= 10) {

        if (zone) {

            zone.innerText =
                "🟠 You are within the Kwarab monitoring area.";

        }

        if (message) {

            message.innerText =
                "🟠 CAUTION: You are within 10 km of the monitored Kwarab area. Stay alert to weather and official warnings.";

        }

    }

    else {

        if (zone) {

            zone.innerText =
                "🟢 You are outside the 10 km Kwarab monitoring zone.";

        }

        if (message) {

            message.innerText =
                "🟢 You are outside the Kwarab monitoring zone.";

        }

        if (alert) {

            alert.style.background =
                "rgba(34,197,94,0.08)";

            alert.style.borderColor =
                "rgba(34,197,94,0.2)";

        }

    }

}


/* =========================================================
   REVERSE GEOCODING
   CURRENT LOCATION NAME
   ========================================================= */

async function reverseGeocode(
    latitude,
    longitude
) {
    

    try {


        const url =
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;


        const response =
            await fetch(url, {
                headers: {
                    "Accept": "application/json"
                }
            });


        if (!response.ok) {

            throw new Error(
                "Reverse geocoding failed"
            );

        }


        const data =
            await response.json();


        const address =
            data.address || {};


        /*
           Pick the most specific place available.
        */

        const locality =
    address.house_number && address.road
        ? `${address.house_number}, ${address.road}`
        : address.road ||
          address.village ||
          address.town ||
          address.city ||
          address.municipality ||
          address.suburb ||
          address.neighbourhood ||
          "Current Location";

        const state =
            address.state || "";


        const country =
            address.country || "";


        let currentPlace =
            locality;


        if (
            state &&
            !currentPlace.includes(state)
        ) {

            currentPlace +=
                ", " + state;

        }


        if (
            country &&
            country !== "India" &&
            !currentPlace.includes(country)
        ) {

            currentPlace +=
                ", " + country;

        }


        console.log(
            "CURRENT PLACE:",
            currentPlace
        );


        /* Dashboard */

        const currentLocation =
    document.getElementById("nearestLocation");

        if (currentLocation) {
    currentLocation.innerText = currentPlace;
}


        /* Main location status */

        const locationStatus =
            document.getElementById(
                "locationStatus"
            );

        if (locationStatus) {

            locationStatus.innerText =
                "📍 " + currentPlace;

        }


        /* Tourist location */

        const touristStatus =
            document.getElementById(
                "touristLocationStatus"
            );

        if (touristStatus) {

            touristStatus.innerText =
                "📍 " + currentPlace;

        }


        /* Weather title */

        const weatherStatus =
            document.getElementById(
                "weatherStatus"
            );

        if (weatherStatus) {

            weatherStatus.innerText =
                "🌦️ Weather at " +
                currentPlace;

        }


    }

    catch (error) {

        console.warn(
            "Could not get location name:",
            error
        );


        const nearest =
            document.getElementById(
                "nearestLocation"
            );

        if (nearest) {

            nearest.innerText =
                "Current location detected";

        }

    }

}


/* =========================================================
   MAP
   ========================================================= */

function initializeMap() {

    const mapElement =
        document.getElementById("map");

    if (!mapElement) {
        return;
    }


    map =
        L.map("map").setView(
            [KWARAB.lat, KWARAB.lon],
            10
        );


    /* ================= MAP LAYERS ================= */

/* 🛰️ Clear Satellite */
const satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "Tiles © Esri"
    }
);

/* 🗺️ Normal Street Map */
const streetLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors"
    }
);

/* Satellite default */
satelliteLayer.addTo(map);


/* 🔄 Map Layer Switcher */
L.control.layers(
    {
        "🛰️ Satellite": satelliteLayer,
        "🗺️ Street Map": streetLayer
    },
    null,
    {
        collapsed: false
    }
).addTo(map);


    /* Kwarab marker */

    const kwarabMarker =
        L.marker([
            KWARAB.lat,
            KWARAB.lon
        ]).addTo(map);


    kwarabMarker.bindPopup(`
        <b>⚠️ Kwarab Pool</b><br>
        Monitored Disaster Risk Zone<br>
        Almora, Uttarakhand
    `);


    /* Kwarab monitoring circle */

    L.circle(
        [KWARAB.lat, KWARAB.lon],
        {
            radius: 10000,
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.10
        }
    ).addTo(map);

}


/* =========================================================
   USER MAP LOCATION
   ========================================================= */

function updateUserOnMap(
    latitude,
    longitude,
    accuracy
) {

    if (!map) {
        return;
    }


    const position =
        [latitude, longitude];


    if (!userMarker) {

        userMarker =
            L.marker(position)
                .addTo(map)
                .bindPopup(
                    "<b>📍 You are here</b>"
                );

    }

    else {

        userMarker.setLatLng(
            position
        );

    }


    if (!accuracyCircle) {

        accuracyCircle =
            L.circle(
                position,
                {
                    radius:
                        accuracy || 50,

                    color: "#38bdf8",

                    fillColor: "#38bdf8",

                    fillOpacity: 0.10
                }
            ).addTo(map);

    }

    else {

        accuracyCircle.setLatLng(
            position
        );

        accuracyCircle.setRadius(
            accuracy || 50
        );

    }


    /*
       IMPORTANT:
       Map follows the REAL USER LOCATION.
    */

    map.setView(
        position,
        14
    );

}


/* =========================================================
   WEATHER – CURRENT USER LOCATION
   ========================================================= */

function loadWeather(
    latitude,
    longitude
) {

    const weatherStatus =
        document.getElementById(
            "weatherStatus"
        );


    if (weatherStatus) {

        weatherStatus.innerText =
            "🌦️ Loading weather for your current location...";

    }


    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m,wind_gusts_10m&hourly=precipitation,precipitation_probability&forecast_hours=12&timezone=auto`;


    fetch(url)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Weather API error"
                );

            }

            return response.json();

        })

        .then(data => {

            updateWeather(
                data
            );

        })

        .catch(error => {

            console.error(
                "Weather error:",
                error
            );


            const errorElement =
                document.getElementById(
                    "weatherError"
                );

            if (errorElement) {

                errorElement.innerText =
                    "Unable to load current weather.";

            }

        });

}


/* =========================================================
   WEATHER UI
   ========================================================= */

function updateWeather(data) {

    const current =
        data.current;


    const temperature =
        current.temperature_2m;

    const rainfall =
        current.rain ??
        current.precipitation ??
        0;

    const wind =
        current.wind_speed_10m ??
        0;

    const humidity =
        current.relative_humidity_2m ??
        0;

    const gust =
        current.wind_gusts_10m ??
        0;


    setText(
        "temperature",
        `${temperature} °C`
    );

    setText(
        "rainfall",
        `${rainfall} mm`
    );

    setText(
        "wind",
        `${wind} km/h`
    );

    setText(
        "humidity",
        `${humidity}%`
    );

    setText(
        "windGusts",
        `${gust} km/h`
    );


    setText(
        "dashboardTemp",
        `${temperature}°C`
    );

    setText(
        "dashboardRain",
        `${rainfall} mm`
    );

    setText(
        "dashboardWind",
        `${wind} km/h`
    );


    let probability = 0;

    if (
        data.hourly &&
        data.hourly.precipitation_probability
    ) {

        probability =
            data.hourly
                .precipitation_probability[0] || 0;

    }


    setText(
        "rainProbability",
        `${probability}%`
    );


    let next3hRain = 0;

    if (
        data.hourly &&
        data.hourly.precipitation
    ) {

        next3hRain =
            data.hourly.precipitation
                .slice(0, 3)
                .reduce(
                    (sum, value) =>
                        sum + (value || 0),
                    0
                );

    }


    setText(
        "next3hRain",
        `${next3hRain.toFixed(1)} mm`
    );


    calculateRisk(
        rainfall,
        next3hRain,
        probability,
        wind,
        gust,
        current.weather_code
    );

}


/* =========================================================
   WEATHER RISK
   ========================================================= */

function calculateRisk(
    rain,
    next3h,
    probability,
    wind,
    gust,
    weatherCode
) {

    let score = 0;


    if (rain >= 10) {

        score += 3;

    }

    else if (rain >= 2) {

        score += 2;

    }

    else if (rain > 0) {

        score += 1;

    }


    if (next3h >= 15) {

        score += 3;

    }

    else if (next3h >= 5) {

        score += 2;

    }

    else if (next3h > 1) {

        score += 1;

    }


    if (probability >= 80) {

        score += 2;

    }

    else if (probability >= 50) {

        score += 1;

    }


    if (
        wind >= 35 ||
        gust >= 50
    ) {

        score += 1;

    }


    if (
        [65, 82, 95, 96, 99]
            .includes(weatherCode)
    ) {

        score += 2;

    }


    let level = "LOW";
    let emoji = "🟢";


    if (score >= 5) {

        level = "HIGH";
        emoji = "🔴";

    }

    else if (score >= 2) {

        level = "MEDIUM";
        emoji = "🟡";

    }


    setText(
        "dashboardRisk",
        `${emoji} ${level}`
    );


    setText(
        "risk-level",
        `Current Risk : ${emoji} ${level}`
    );


    const alertMessage =
        document.getElementById(
            "alert-message"
        );


    if (alertMessage) {

        if (level === "HIGH") {

            alertMessage.innerText =
                "🔴 HIGH WEATHER RISK: Severe weather conditions detected. Follow official alerts.";

        }

        else if (level === "MEDIUM") {

            alertMessage.innerText =
                "🟡 MEDIUM WEATHER RISK: Changing weather conditions detected. Stay alert.";

        }

        else {

            alertMessage.innerText =
                "🟢 LOW WEATHER RISK: Current weather conditions appear relatively normal.";

        }

    }

}


/* =========================================================
   LOCATION POPUP
   ========================================================= */

function showLocationPopup() {

    const popup =
        document.getElementById(
            "locationStartupPopup"
        );

    if (popup) {

        popup.style.display =
            "flex";

    }

}


function closeLocationPopup() {

    const popup =
        document.getElementById(
            "locationStartupPopup"
        );

    if (popup) {

        popup.style.opacity = "0";

        setTimeout(() => {

            popup.style.display =
                "none";

            popup.style.opacity =
                "1";

        }, 300);

    }

}


/* =========================================================
   LOCATION STATUS
   ========================================================= */

function showLocationMessage(message) {

    setText(
        "locationStatus",
        message
    );

}


function showLocationError(message) {

    console.error(
        "LOCATION ERROR:",
        message
    );


    setText(
        "locationStatus",
        message
    );


    const error =
        document.getElementById(
            "locationError"
        );

    if (error) {

        error.innerText =
            message;

        error.style.display =
            "block";

    }


    const popupTitle =
        document.getElementById(
            "locationPopupTitle"
        );

    const popupMessage =
        document.getElementById(
            "locationPopupMessage"
        );

    const popupStatus =
        document.getElementById(
            "locationPopupStatus"
        );

    const retry =
        document.getElementById(
            "locationPopupRetry"
        );


    if (popupTitle) {

        popupTitle.innerText =
            "Location Not Detected";

    }


    if (popupMessage) {

        popupMessage.innerText =
            "Please allow location access so SafeHill can calculate your actual distance from Kwarab.";

    }


    if (popupStatus) {

        popupStatus.innerText =
            message;

    }


    if (retry) {

        retry.style.display =
            "inline-block";

    }

}


/* =========================================================
   LOCATION ERRORS
   ========================================================= */

function handleLocationError(error) {

    if (error.code === 1) {

        showLocationError(
            "Location permission denied. Please allow location access."
        );

    }

    else if (error.code === 2) {

        showLocationError(
            "Your device could not determine your location. Please turn on GPS/location services."
        );

    }

    else if (error.code === 3) {

        showLocationError(
            "Location request timed out. Please try again."
        );

    }

    else {

        showLocationError(
            "Unable to detect your current location."
        );

    }

}


/* =========================================================
   HELPER
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerText =
            value;

    }

}
// ===============================
// 🚨 SAFEHILL EMERGENCY ALARM
// ===============================

const alarmSound = new Audio("Standard Emergency Warning Signal - QuickSounds.com.mp3");
alarmSound.loop = true;

function startAlarm() {
    alarmSound.play().catch(() => {
        console.log("🔊 Alarm ke liye user interaction required hai.");
    });
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

