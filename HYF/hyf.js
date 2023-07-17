window.onload = function () {
    const navbar = document.getElementById("navbar");
    const dropdown = document.getElementById("dropdown");

    const popUp = document.getElementById("popUp");
    // const changeBackgroundBtn = document.getElementById("popUp");
    const popupContainer = document.getElementById("popupContainer");
    const closeButton = document.querySelector(".close");
    const popupInput = document.getElementById("popupInput");
    const popupInputButton = document.getElementById("popupInputButton");
    const clearListButton = document.getElementById("clearListButton");
    const popupList = document.getElementById("popupList");

    const loginButton = document.getElementById("loginButton");

    const switchButtons = document.querySelectorAll(".buttons-switch ");
    const stopButton = document.querySelector(".button-stop");
    const audioButtonsPod = document.getElementById("audio-buttons-pod");

    const videoLink = "https://www.youtube.com/embed/";



    const audioArray = [
        [
            new Audio("sound/Jazmine Sullivan - Bust Your Windows.mp3"),
            new Audio("sound/Nicole Scherzinger - Right There ft. 50 Cent.mp3"),
            new Audio("sound/AZEALIA BANKS - 212 FT. LAZY JAY.mp3"),
            new Audio("sound/DUSTY LOCANE - ROLLIN N CONTROLLIN FREESTYLE (Official Video).mp3"),
        ],
        [
            new Audio("sound/Twentysix-10-2014Kumait.mp3"),
            new Audio("sound/Two-11-2014.mp3"),
            new Audio("sound/Nineteen-10-2014.mp3"),
        ],
    ];


    navbar.addEventListener("mouseover", function () {
        dropdown.style.display = "block";
    });

    navbar.addEventListener("mouseout", function () {
        dropdown.style.display = "none";
    });

    function updateTime() {
        const theTime = new Date().toLocaleTimeString();
        document.getElementById("time").textContent = theTime;
    }

    setInterval(updateTime, 1000);
    //trying Arrow function.
    // updateTime = () => {
    //   let theTime = new Date();
    //   document.getElementById("time").innerHTML = theTime.toLocaleTimeString();
    // }; setInterval(updateTime, 1000);


    //this (g)'s: flag to the pattern, we instruct the replace() method to:
    // replace all occurrences of the forward slash with the specified replacement ("-").

    const theDate = new Date().toLocaleDateString().replace(/\//g, "-");
    document.getElementById("date").textContent = theDate;

    popUp.addEventListener("click", function () {
        popupContainer.style.display = "block";
        document.body.style.backgroundImage = "url('https://www.apple.com/v/airpods-max/e/images/overview/audio_quality_spatial_figure_mask__bjqymmhjp876_medium_2x.png')";
    });

    closeButton.addEventListener("click", function () {
        popupContainer.style.display = "none";
        document.body.style.backgroundImage = "url('https://www.apple.com/v/airpods-pro/g/images/overview/noise_reduction_endframe__cc0juowjdaia_large_2x.jpg')";
    });

    popupInputButton.addEventListener("click", function () {
        const popupValue = popupInput.value.trim();
        if (popupValue !== "") {
            //incase i wanna add class for css
            //textPopup.classList.add("class-name");

            const itemPopup = document.createElement("div");

            itemPopup.classList.add("popup-item");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            itemPopup.appendChild(checkbox);

            const textPopup = document.createElement("span");
            textPopup.textContent = popupValue;
            itemPopup.appendChild(textPopup);

            popupList.appendChild(itemPopup);

            //This ensures that after adding an item to the popup list,
            //the input field is reset and ready for the user to enter another value. *empty-string
            popupInput.value = "";
        }
    });

    // Clear only the checked items

    function clearCheckedItems() {
        const checkedItems = document.querySelectorAll(
            '.popup-item input[type="checkbox"]:checked'
        );
        checkedItems.forEach(function (checkbox) {
            checkbox.parentNode.remove();
        });
    }

    // Call the clearCheckedItems function
    clearCheckedButton.addEventListener("click", clearCheckedItems);

    function clearPopupList() {
        popupList.innerHTML = "";
    }

    clearListButton.addEventListener("click", clearPopupList);

    async function fetchData() {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=52.15&longitude=5.35&hourly=temperature_2m,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,apparent_temperature_max&current_weather=true&past_days=1&forecast_days=3&timezone=Europe%2FBerlin"
        );
        const data = await response.json();
        console.log(data);
        return data;
    }

    function processData(data) {
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = data.current_weather.temperature;
    }

    async function displayWeather() {
        processData(await fetchData());
    }
    displayWeather();

    function login() {
        const myUsername = "Kumait";
        const myPassword = "Com8";

        const username = prompt("Enter your username:");

        if (username !== null) {
            const password = prompt("Enter your password:");

            if (password !== null) {
                if (username === myUsername && password === myPassword) {
                    document.getElementById("loginSection").style.display = "none";
                    document.getElementById("userSection").style.display = "block";
                    document.getElementById("userDisplay").textContent =
                        "Hi , " + username + ".";
                } else {
                    alert("Invalid ❌");
                }
            }
        }
    }

    // Call the login function when the login button is clicked. note: when i did this only: addEventListener("click", login); 
    // wherever's clicked the log in window shows up

    loginButton.addEventListener("click", login);




    // const subArray = audioArray[index];

    // audioButtonsPod.innerHTML = ""; without this  the links remain on my page
    //This is necessary because the audioButtonsPod element will contain the buttons from the previous subarray.



    switchButtons.forEach(function (singleSwitchButton, index) {

        singleSwitchButton.addEventListener("click", function () {

            document.body.style.backgroundImage =
                "url('https://www.apple.com/v/airpods-pro/g/images/overview/spatial_audio_startframe__dzixy9bcuzue_large_2x.jpg')";

            //audioButtonsPod.innerHTML = ""; necessary because the audioButtonsPod element will contain the buttons from the previous subarray.
            audioButtonsPod.innerHTML = "";

            const singleArray = audioArray[index];
            singleArray.forEach(function (audio) {
                const audioButton = document.createElement("button");
                audioButton.textContent = "⚪"; //I will rename "audio.src" later on.
                audioButton.addEventListener("click", function () {

                    playMusic(audio);
                });

                audioButtonsPod.appendChild(audioButton);
            });
        });
    });

    let streamingNow = null; // Variable to store the currently playing audio

    function playMusic(audio) {
        if (streamingNow !== null) {
            streamingNow.pause();
        }
        audio.currentTime = 0; //Reset the audio to the beginning
        audio.play();
        streamingNow = audio; // Update the current audio to the new one
    }

    stopButton.addEventListener("click", function () {
        if (streamingNow) {
            streamingNow.pause();
        }
    });

    const videoButton = document.createElement("button");
    videoButton.textContent = "Video";
    videoButton.addEventListener("click", playVideo);
    audioButtonsPod.appendChild(videoButton);




    /*
    * <iframe width="560" height="315" src="https://www.youtube-nocookie."
    * title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;
    * encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    * */

    function playVideo() {
        const videoPlayer = document.createElement("iframe");

        videoPlayer.width = "560";
        videoPlayer.height = "315";
        videoPlayer.src = videoLink;
        videoPlayer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        videoPlayer.allowFullscreen = true;
        videoPlayer.frameborder = "0";
        videoPlayer.allowfullscreen = true;

        audioButtonsPod.innerHTML = "";
        audioButtonsPod.appendChild(videoPlayer);
    }


};