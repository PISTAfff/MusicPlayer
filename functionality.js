var button = document.getElementById("Button");
var Sound_button = document.getElementById("Sound-Bar-Button");
var Music_Progres_Bar = document.getElementById("Progres-Bar");
var Sound_Progres_Bar = document.getElementById("Sound-Progress-Bar");
var Sound_Value = document.getElementById("Sound-Value");
var Music_Value = document.getElementById("Music-Value");
var Music_Bar_Button_Active = false;
var Sound_Bar_Button_Active = false;
var Start_Pos;
var Current_width;
var isPaused = true;
var isRepeat = false;
var soundHidden = true;
const Song = document.getElementById("Song");
button.addEventListener("mousedown", function (event) {
  if (event.button == 0) {
    Music_Bar_Button_Active = true;
    Start_Pos = event.clientX;
    Current_width = Music_Progres_Bar.offsetWidth;
  }
});
Sound_button.addEventListener("mousedown", function (event) {
  if (event.button == 0) {
    Sound_Bar_Button_Active = true;
    Start_Pos = event.clientY;
    Current_width = Sound_Progres_Bar.offsetHeight;
  }
});
document.addEventListener("mouseup", function (event) {
  if (event.button == 0) {
    Music_Bar_Button_Active = false;
    Sound_Bar_Button_Active = false;
  }
});

document.addEventListener("mousemove", function (event) {
  if (Music_Bar_Button_Active) {
    var Current_pos = event.clientX;
    var Max_Diff = 350;
    var diffrence = Current_pos - Start_Pos;
    diffrence += Current_width;
    if (diffrence > Max_Diff) {
      diffrence = Max_Diff;
    }
    if (diffrence < 0) {
      diffrence = 0;
    }
    Song.currentTime = ((diffrence / Max_Diff) * 100 * Song.duration) / 100;
  }
  if (Sound_Bar_Button_Active) {
    var Current_pos = event.clientY;
    var Max_Diff = 150;
    var diffrence = Start_Pos - Current_pos;
    diffrence += Current_width;
    if (diffrence > Max_Diff) {
      diffrence = Max_Diff;
    }
    if (diffrence < 0) {
      diffrence = 0;
    }
    Sound_Value.textContent = Math.round((diffrence / Max_Diff) * 100);
    Sound_Progres_Bar.style.height = (diffrence / Max_Diff) * 100 + "%";
    Song.volume = diffrence / Max_Diff;
  }
});
function Play_Pause() {
  var Play_Pause_Button = document.getElementById("Play-Pause-Button");
  isPaused = !isPaused;
  Play_Pause_Button.src = isPaused
    ? "assests/play-one.svg"
    : "assests/pause.svg";
  if (isPaused) {
    Song.pause();
  } else {
    Song.play();
  }
  console.log(Song.duration);
}
function Start_All_Over() {
  Song.currentTime = 0;
}
function Move10() {
  Song.currentTime +=
    Song.duration - Song.currentTime < 10
      ? Song.duration - Song.currentTime
      : 10;
}
function Back10() {
  Song.currentTime -= Song.currentTime < 10 ? Song.currentTime : 10;
}
function Change_Repeat_State() {
  isRepeat = !isRepeat;
  var Repeat_Button = document.getElementById("Loop-Button");
  Repeat_Button.style.backgroundColor = isRepeat
    ? "rgba(255, 255, 255, 0.137)"
    : "transparent";
}
Song.addEventListener("ended", function (event) {
  var Play_Pause_Button = document.getElementById("Play-Pause-Button");
  console.log("ended", isRepeat);
  isPaused = true;
  if (isRepeat) {
    Start_All_Over();
    Song.play();
    isPaused = false;
  }
  Play_Pause_Button.src = isPaused
    ? "assests/play-one.svg"
    : "assests/pause.svg";
});
Song.addEventListener("timeupdate", function (event) {
  const minutes = Math.floor(Song.currentTime / 60);
  const seconds = Math.floor(Song.currentTime % 60);
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}/${Math.floor(Song.duration / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(Song.duration % 60)
    .toString()
    .padStart(2, "0")}`;
  Music_Progres_Bar.style.width =
    (Song.currentTime / Song.duration) * 100 + "%";
  Music_Value.textContent = timeString;
});
function Sound_Bar() {
  soundHidden = !soundHidden;
  var Sound_Button = document.getElementById("Sound-Button");
  var Sound_Background = document.getElementById("Sound-Background");
  Sound_Button.style.backgroundColor = soundHidden
    ? "transparent"
    : "rgba(255, 255, 255, 0.137)";
  Sound_Background.style.transform = `scale(${soundHidden ? 0 : 1})`;
}
var Sound_Background = document.getElementById("Sound-Background");
Sound_Background.style.transform = `scale(0)`;
