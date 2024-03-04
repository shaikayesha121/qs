// github.com/webFardin
// twitter.com/webFardin0
// instagram.com/webFardin
// t.me/webFardin

"use strict";

let audioTrack = document.createElement("audio");
audioTrack.preload = "metadata";
document.body.append(audioTrack);

let blurElement = document.getElementById("blurElement");

let themes = document.getElementById("themes");

let musicBox = document.getElementById("musicBox");

let trackItemsWrapper = document.getElementById("trackItemsWrapper");

let trackArtistName = document.getElementById("trackArtistName");
let trackAlbumName = document.getElementById("trackAlbumName");

let coverImage = document.getElementById("coverImage");

let playButton = document.getElementById("playButton");
let playButtonIcon = playButton.firstElementChild;
let pauseButtonIcon = playButton.lastElementChild;

let previousButton = document.getElementById("previousButton");
let nextButton = document.getElementById("nextButton");

let volumeWrapper = document.getElementById("volumeWrapper");
let volumeButton = document.getElementById("volumeButton");
let volumeNumber = document.getElementById("volumeNumber");

let wavesVolumeButton = document.getElementById("wavesVolumeButton");
let highVolumeSymbol = document.getElementById("highVolumeSymbol");
let mediumVolumeSymbol = document.getElementById("mediumVolumeSymbol");
let lowVolumeSymbol = document.getElementById("lowVolumeSymbol");
let volumeCross = document.getElementById("volumeCross");

let currentTrackTimeNumber = document.getElementById("currentTrackTimeNumber");
let currentTrackDuration = document.getElementById("currentTrackDuration");

let trackProgressBar = document.getElementById("trackProgressBar");
let trackLoading = document.getElementById("trackLoading");
let currentTrackTimeBar = document.getElementById("currentTrackTimeBar");

let musics = [{
        trackName: "ya-nabi-salam-alayka.mp3",
        artist: "Maher Zain",
        coverImage: "https://www.mp3naat.com/wp-content/uploads/2018/05/maher-zain-300x300.jpg",
        audioSource: "https://www.mp3naat.com/download/maher-zain/ya-nabi-salam-alayka.mp3"
    },
    {
        trackName: "badal-de-dil-ki-duniya",
        artist: " Javeria Saleem",
        coverImage: "https://www.mp3naat.com/wp-content/uploads/2023/03/javeria-saleem-naats-300x300.png",
        audioSource: "https://www.mp3naat.com/download/javeria-saleem/badal-de-dil-ki-duniya.mp3"
    },
    {
        trackName: "eid-mubarak",
        artist: "aayat arif",
        coverImage: "https://www.mp3naat.com/wp-content/uploads/2021/09/aayat-arif-picture.webp",
        audioSource: "https://www.mp3naat.com/download/aayat-arif/eid-mubarak.mp3"
    },
    {
        trackName: "ya-habib-allah",
        artist: "aqsa abdul haq",
        coverImage: "https://www.mp3naat.com/wp-content/uploads/2018/10/aqsa-abdul-haq-300x300.jpg",
        audioSource: "https://www.mp3naat.com/download/aqsa-abdul-haq/ya-habib-allah.mp3"
    },

    {
        trackName: "tajdar-e-haram",
        artist: "danish-dawar",
        coverImage: "https://www.mp3naat.com/wp-content/uploads/2023/03/danish-dawar-naats-300x300.jpg",
        audioSource: "https://mp3naat.com/download/danish-dawar/tajdar-e-haram.mp3"
    },
    {
        trackName: "who-is-the-loved-one",
        artist: "sami-yusuf",
        coverImage: "https://www.mp3naat.com/wp-content/uploads/2018/05/sami-yusuf.jpg",
        audioSource:"https://www.mp3naat.com/download/sami-yusuf/who-is-the-loved-one.mp3"
    }
];

musics.forEach((item, index) => {
    trackItemsWrapper.innerHTML += `<div class="track-item" data-index="${index}">${index + 1
        }. ${item.trackName}</div>`;
});

trackItemsWrapper.firstElementChild.classList.add("active");

function informationUpdate(target) {
    target = target ? target : 0;
    coverImage.src = "";
    coverImage.src = musics[target].coverImage;
    audioTrack.src = musics[target].audioSource;
    trackArtistName.textContent = musics[target].artist;
    trackAlbumName.textContent = musics[target].album;
}

informationUpdate();

themes.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) return;
    let targetTheme = e.target.dataset.theme;

    let activeTheme = document.querySelector(".active-theme");
    activeTheme.classList.remove("active-theme");

    e.target.classList.add("active-theme");

    switch (targetTheme) {
        case "theme1":
            blurElement.style.visibility = "hidden";
            musicBox.style.border = "";
            musicBox.style.boxShadow = "";
            coverImage.style.background = "";
            trackProgressBar.style.background = "";
            currentTrackTimeBar.style.background = "";
            trackLoading.style.background = "";
            break;

        case "theme2":
            blurElement.style.visibility = "visible";
            musicBox.style.border = "1px solid #ffffff12";
            musicBox.style.boxShadow =
                "inset -10px -10px 15px #ffffff0a, inset 10px 10px 15px #ffffff0a";
            blurElement.style.background =
                "linear-gradient(135deg, #dc143c, #009688)";
            coverImage.style.background = "#00968875";
            trackProgressBar.style.background = "#0fd5ca73";
            currentTrackTimeBar.style.background = "#0fd5ca";
            trackLoading.style.background = "#0fd5ca";
            break;

        case "theme3":
            blurElement.style.visibility = "visible";
            musicBox.style.border = "1px solid #ffffff12";
            musicBox.style.boxShadow =
                "inset -10px -10px 15px #ffffff0a, inset 10px 10px 15px #ffffff0a";
            blurElement.style.background =
                "linear-gradient(135deg, #7f0096, #14abdc)";
            coverImage.style.background = "#288bcf75";
            trackProgressBar.style.background = "#0fd5ca73";
            currentTrackTimeBar.style.background = "#0fd5ca";
            trackLoading.style.background = "#0fd5ca";
            break;
    }
});

trackItemsWrapper.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) return;
    let activeAudio = document.querySelector(".active");
    activeAudio.classList.remove("active");
    e.target.classList.add("active");

    let targetIndex = e.target.dataset.index;

    informationUpdate(targetIndex);
});

audioTrack.addEventListener("waiting", waitingEvent);

function waitingEvent() {
    trackLoading.classList.add("track-loading");
}

audioTrack.addEventListener("canplay", (e) => {
    trackLoading.classList.remove("track-loading");
    audioTrack.removeEventListener("waiting", waitingEvent);
});

let firstPlay = true;
audioTrack.addEventListener("loadstart", (e) => {
    audioTrack.addEventListener("waiting", waitingEvent);
    currentTrackTimeBar.style.width = 0;
    if (!firstPlay) {
        audioTrack.play();
    }
    firstPlay = false;
});

let requestAnimationTimeArgument = performance.now();

requestAnimationFrame(function currentTimeUpdater(
    requestAnimationTimeArgument
) {
    let currentTime = audioTrack.currentTime;

    let currentMinute = Math.trunc(currentTime / 60);
    let currentSeconds = Math.trunc(currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    currentTrackTimeNumber.textContent = `${currentMinute}:${currentSeconds}`;

    currentTrackTimeBar.style.width =
        (currentTime / audioTrack.duration) * 100 + "%";

    requestAnimationFrame(currentTimeUpdater);
});

audioTrack.addEventListener("canplay", canPlayEvent);

audioTrack.addEventListener("durationchange", canPlayEvent);

function canPlayEvent(e) {
    let totalTime = audioTrack.duration;

    let totalMinute = Math.trunc(totalTime / 60);
    let totalSeconds = Math.trunc(totalTime % 60);

    if (totalSeconds < 10) {
        totalSeconds = "0" + totalSeconds;
    }

    currentTrackDuration.textContent = `${totalMinute}:${totalSeconds}`;
}

trackProgressBar.addEventListener("pointerdown", (e) => {
    audioTrack.currentTime =
        ((e.offsetX / trackProgressBar.offsetWidth) * 100 * audioTrack.duration) /
        100;
    trackProgressBar.addEventListener("pointermove", trackProgressBarPointerMove);

    function trackProgressBarPointerMove(e) {
        audioTrack.currentTime =
            ((e.offsetX / trackProgressBar.offsetWidth) * 100 * audioTrack.duration) /
            100;
    }
    document.addEventListener("pointerup", (e) => {
        trackProgressBar.removeEventListener(
            "pointermove",
            trackProgressBarPointerMove
        );
    });
});

trackProgressBar.addEventListener("wheel", (e) => {
    if (e.deltaY < 0) {
        audioTrack.currentTime += 5;
    }
    if (e.deltaY > 0) {
        audioTrack.currentTime -= 5;
    }
});

playButton.addEventListener("click", (e) => {
    if (audioTrack.paused) {
        audioTrack.play();
    } else {
        audioTrack.pause();
    }
});

previousButton.addEventListener("click", (e) => {
    let activeAudio = document.querySelector(".active");

    let trackItems = document.querySelectorAll(".track-item");

    let activeIndex = +activeAudio.dataset.index == 0 ?
        trackItems.length :
        +activeAudio.dataset.index;

    let targetIndex = +activeIndex - 1;

    activeAudio.classList.remove("active");
    trackItems[targetIndex].classList.add("active");

    informationUpdate(targetIndex);
});

nextButton.addEventListener("click", (e) => {
    let activeAudio = document.querySelector(".active");

    let trackItems = document.querySelectorAll(".track-item");

    let activeIndex = +activeAudio.dataset.index == trackItems.length - 1 ?
        -1 :
        +activeAudio.dataset.index;

    let targetIndex = +activeIndex + 1;

    activeAudio.classList.remove("active");
    trackItems[targetIndex].classList.add("active");

    informationUpdate(targetIndex);
});

audioTrack.addEventListener("play", (e) => {
    playButtonIcon.style.opacity = 0;
    pauseButtonIcon.style.opacity = 1;
    if (wasPlaying) {
        wasPlaying = false;
    }
});

// prevent from nested animations
let firstTimeAnimation = true;
audioTrack.addEventListener("playing", (e) => {
    if (firstTimeAnimation) {
        blurElement.animate({ filter: "blur(30px)" }, {
            duration: 5000,
            easing: "ease-in-out",
            direction: "alternate",
            iterations: Infinity
        });
        firstTimeAnimation = false;
    }
});

audioTrack.addEventListener("pause", (e) => {
    playButtonIcon.style.opacity = 1;
    pauseButtonIcon.style.opacity = 0;

    blurElement.animate({ filter: "blur(10px)" }, {
        duration: 1000,
        easing: "linear",
        fill: "forwards"
    });

    firstTimeAnimation = true;
});

volumeWrapper.addEventListener(
    "wheel",
    (e) => {
        e.preventDefault();
        switch (true) {
            case e.deltaY < 0:
                audioTrack.volume = (audioTrack.volume += 0.05).toFixed(2);
                break;

            case e.deltaY > 0:
                audioTrack.volume = (audioTrack.volume -= 0.05).toFixed(2);
                break;
        }
        volumeNumberUpdate();
    }, { passive: false }
);

function volumeNumberUpdate() {
    // trunc is just for (0.55 * 100)!
    volumeNumber.textContent = Math.trunc(audioTrack.volume * 100);
}

let wasPlaying;
audioTrack.addEventListener("volumechange", (e) => {
    let currentVolume = audioTrack.volume;
    switch (true) {
        case 0.66 < currentVolume:
            highVolumeSymbol.style.fill = "white";
            mediumVolumeSymbol.style.fill = "white";
            lowVolumeSymbol.style.fill = "white";
            wavesVolumeButton.style.opacity = 1;
            volumeCross.style.opacity = 0;
            if (wasPlaying) {
                audioTrack.play();
                wasPlaying = false;
            }
            break;

        case 0.33 < currentVolume && currentVolume < 0.66:
            highVolumeSymbol.style.fill = "#808080";
            mediumVolumeSymbol.style.fill = "white";
            lowVolumeSymbol.style.fill = "white";
            wavesVolumeButton.style.opacity = 1;
            volumeCross.style.opacity = 0;
            if (wasPlaying) {
                audioTrack.play();
                wasPlaying = false;
            }
            break;

        case 0 < currentVolume && currentVolume < 0.33:
            highVolumeSymbol.style.fill = "#808080";
            mediumVolumeSymbol.style.fill = "#808080";
            lowVolumeSymbol.style.fill = "white";
            wavesVolumeButton.style.opacity = 1;
            volumeCross.style.opacity = 0;
            if (wasPlaying) {
                audioTrack.play();
                wasPlaying = false;
            }
            break;

        case currentVolume == 0:
            wavesVolumeButton.style.opacity = 0;
            volumeCross.style.opacity = 1;
            if (!audioTrack.paused) {
                wasPlaying = true;
                audioTrack.pause();
            }
            break;
    }

    volumeNumberUpdate();
});

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowDown":
            audioTrack.volume = (audioTrack.volume -= 0.05).toFixed(2);
            break;

        case "ArrowUp":
            audioTrack.volume = (audioTrack.volume += 0.05).toFixed(2);
            break;

        case "ArrowLeft":
            audioTrack.currentTime -= 5;
            break;

        case "ArrowRight":
            audioTrack.currentTime += 5;
            break;

        case "Space":
            if (audioTrack.paused) {
                audioTrack.play();
            } else {
                audioTrack.pause();
            }
            break;
    }

    if (e.code == "ArrowDown" || e.code == "ArrowUp") {
        volumeButton.style.opacity = 0;
        volumeNumber.style.opacity = 1;

        document.addEventListener("keyup", (e) => {
            let volumeChangeAnimation = setTimeout(() => {
                volumeButton.style.opacity = 1;
                volumeNumber.style.opacity = 0;
            }, 600);

            document.addEventListener("keydown", (e) => {
                if (e.code == "ArrowDown" || e.code == "ArrowUp") {
                    clearTimeout(volumeChangeAnimation);
                }
            });
        });
    }
});

coverImage.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    let coverImageBigSize = coverImage.cloneNode();
    coverImageBigSize.className = "cover-image-big-size";
    coverImageBigSize.removeAttribute("id");
    document.body.append(coverImageBigSize);

    document.addEventListener("pointerup", (e) => {
        coverImageBigSize.remove();
    });
  });