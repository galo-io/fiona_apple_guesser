var randomSecond = null; // Declare the randomSecond variable outside the function
var chosenSong = null;
var timeout = 1000;

function howToPlay() {
  return ` Click in the "Play ⏵" button to hear a sample from a random Fiona Apple song. Insert your guess and submit. You have 3 chances to guess the correct song. For each wrong guess, you can listen to one additional second. 
  ` 
}

function getRandomSong() {
  var audio = document.getElementById("player");
  return fetch('./static/assets/songs.json')
    .then(response => response.json())
    .then(jsonData => {
      const albums = Object.keys(jsonData); // Get the albums from the JSON
      const randomAlbumIndex = Math.floor(Math.random() * albums.length); // Generate a random index to select an album
      const album = albums[randomAlbumIndex]; // Select a random album
      const songs = jsonData[album]; // Get the songs from the selected album
      const songsArray = Object.entries(songs); // Convert the songs object into an array of [key, value]

      const randomSongIndex = Math.floor(Math.random() * songsArray.length); // Generate a random index to select a song
      const [song, link] = songsArray[randomSongIndex]; // Select a random song

      sessionStorage.setItem('chosenSong', song);
      sessionStorage.setItem('chosenAlbum', album);
      sessionStorage.setItem('chosenSongLink', link);
      console.log(sessionStorage['chosenSong']);
      audio.src =  `${link}.wav`;
      audio.type = 'audio/wav';

      return {
        album: album,
        song: song,
        link: link
      };
    })
    .catch(error => {
      console.error('Error loading song: ', error);
    });
}

function getAllSongs() {
  return fetch('./static/assets/songs.json')
    .then(response => response.json())
    .then(jsonData => {
      const albums = Object.keys(jsonData);
      const allSongs = [];
      for (let i = 0; i < albums.length; i++) {
        const albumSongs = Object.keys(jsonData[albums[i]]);
        allSongs.push(...albumSongs);
      }
      return allSongs;
    })
    .catch(error => {
      console.error('Error loading songs:', error);
    });
}

async function fetchData() {
  try {
    const songs = await getAllSongs();
    return songs
  } catch (error) {
    console.error('Error:', error);
  }
}

function getChances() {
  var storedChances = sessionStorage.getItem('chances');
  return storedChances ? parseInt(storedChances, 10) : 3;
}

function getScore() {
    var storedScore = sessionStorage.getItem('score');
    return storedScore ? parseInt(storedScore, 10) : 0;
}

function getChosenSong() {
    var storedSong = sessionStorage.getItem('chosenSong');
    return storedSong ? storedSong : 0;
}

function getChosenAlbum() {
  var storedAlbum = sessionStorage.getItem('chosenAlbum');
  return storedAlbum ? storedAlbum : 0;
}

function playRandomSecond() {
    var audio = document.getElementById("player");

    if (randomSecond === null) { // Check if randomSecond is null (first click)
        var duration = audio.duration; // Get the total duration of the audio in seconds
        randomSecond = Math.floor(Math.random() * duration); // Generate a random second within the duration
    }

    audio.currentTime = randomSecond; // Set the current time to the random second
    audio.play(); // Play the audio
    setTimeout(function() {
        audio.pause(); // Pause the audio after one second
    }, timeout);
};


function checkGuess(userGuess) {
  const correctSong = getChosenSong();
  return (correctSong === userGuess) ? true : false;
}

function validateGuess(userGuess) {
  return songs.includes(userGuess);
}

function createInputField() {
  const guessDiv = document.getElementById('guessDiv');
  const guessNumber = 5 - getChances();
  console.log(guessNumber);
  const nextInput = document.getElementById(`guess${guessNumber}`);

  if (!nextInput) {
    const nextInput = document.createElement('input');
    const nextLabel = document.createElement('label');
    nextInput.setAttribute("id", `guess${guessNumber}`);
    nextLabel.setAttribute("for", `guess${guessNumber}`);
    if (guessNumber === 2) {
      nextLabel.textContent = "Second guess: ";
    } else {
      nextLabel.textContent = "Final guess: ";
    }
    
    nextInput.placeholder = "Type your guess...";
    guessDiv.appendChild(nextLabel);
    guessDiv.appendChild(nextInput);
    guessDiv.appendChild(document.createElement("br"));
  } else {
    nextInput.textContent = "";
  }
}

async function processGuess() {
  const songs = await getAllSongs();
  const guessNumber = 4 - getChances();
  inputField = document.getElementById(`guess${guessNumber}`);
  userGuess = inputField.value.trim();
  if (userGuess === '') {return;}
  if (!songs.includes(userGuess)) {
    var warnMessage = "Input a valid song."
    return;
  }
  result = checkGuess(userGuess);
  var redirectURL = "./result.html";
  var score = getScore();
  if (result) {
    score++;
    inputField.style.background = '#00FF0080';
    sessionStorage.setItem('score', score);
    var msg = `You got it! The song was ${getChosenSong()} from ${getChosenAlbum()}`;
    window.location.href = redirectURL;
  } else {
      createInputField();
      inputField = document.getElementById(`guess${guessNumber}`);
      inputField.style.background = '#FF000080';
      timeout += 1000;
      chances = chances - 1;
      sessionStorage.setItem('chances', chances);
      chancesMessage.textContent = `You have ${chances} chances`;
      if (chances === 0) {
        score = 0;
        sessionStorage.setItem('score', score);
        var msg = `You lose :( The song was ${getChosenSong()} from ${getChosenAlbum()}`;
        window.location.href = redirectURL;
      }
  }
  sessionStorage.setItem('resultMessage', msg);
  userGuess.value = '';
}

document.addEventListener('DOMContentLoaded', async function() {
  var infoButton = document.getElementById('infoButton');
  var overlay = document.getElementById('overlay');
  var closeButton = document.getElementById('closeButton');
  var chancesMessage = document.getElementById('chancesMessage');
  var datalist = document.getElementById('suggestions');
  tutorial = document.getElementById('howToPlay');
  tutorial.value = howToPlay();
  sessionStorage.setItem('chances', 3);
  chances = getChances();
  guessNumber = 4 - chances;
  var input = document.getElementById(`guess${guessNumber}`);
  chancesMessage.textContent = `You have ${chances} chances`;
  const songs = await getAllSongs();

  input.addEventListener('input', function() {
    fieldValue = input.value.trim();
    if (fieldValue !== '') {
      datalist.innerHTML = '';
      songs.forEach(function(song) {
        if (song.slice(0, fieldValue.length) == fieldValue) {
          var option = document.createElement('option');
          option.value = song;
          datalist.appendChild(option);
        }
      });
    } else {
      datalist.innerHTML = '';
    }
  });

  getRandomSong();

  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      processGuess();
    }
  });

  infoButton.addEventListener('click', function() {
    overlay.style.display = 'flex';
  });

  closeButton.addEventListener('click', function() {
    overlay.style.display = 'none';
  });

});