function getScore() {
    var storedScore = sessionStorage.getItem('score');
    return storedScore ? parseInt(storedScore, 10) : 0;
}

function getChances() {
  var storedChances = sessionStorage.getItem('chances');
  return storedChances ? parseInt(storedChances, 10) : 3;
}

function getChosenSong() {
    var storedSong = sessionStorage.getItem('chosenSong');
    return storedSong ? storedSong : 0;
}

function getSongLink() {
    var storedLink = sessionStorage.getItem('chosenSongLink');
    return storedLink ? storedLink : 0;
  }

  function getChosenAlbum() {
    var storedAlbum = sessionStorage.getItem('chosenAlbum');
    return storedAlbum ? storedAlbum : 0;
  }

document.addEventListener('DOMContentLoaded', function() {
    const score = getScore();
    const randomSecond = parseFloat(sessionStorage.getItem('randomSecond'));
    var scoreMessage = document.getElementById('scoreMessage');
    const resultMessage = document.getElementById('resultMessage');
    var audioPlayer = document.getElementById('player');
    // TODO: handle the resultMessage here
    var shareButton = document.getElementById('shareButton');
    resultMessage.textContent = sessionStorage['resultMessage'];
    
    scoreMessage.textContent = `Your score: ${score}`;
    
    const chosenSong = getChosenSong();
    const chosenAlbum = getChosenAlbum();
    const chances = getChances();
    var attempt;
    console.log(chances);
    if (chances > 0) {
      if (chances == 3) {
        attempt = "first";
      } else if (chances == 2) {
        attempt = "second";
      } else if (chances == 1) {
        attempt = "third";
      }
      shareButton.href = `https://twitter.com/intent/tweet?text=I%20guessed%20${chosenSong}%20from%20${chosenAlbum}%20in%20my%20${attempt}%20attempt.%20Try%20to%20guess%20the%20Apple%20song%20in%20https%3A%2F%2Fgalo-io.github.io%2Ffiona-apple-guesser`
    } else {
      shareButton.href = `https://twitter.com/intent/tweet?text=I%20couldn%27t%20guess%20${chosenSong}%20from%20${chosenAlbum}.%20Try%20to%20guess%20the%20Apple%20song%20in%20https%3A%2F%2Fgalo-io.github.io%2Ffiona-apple-guesser`
    }
    console.log(chosenSong);
    link = sessionStorage.getItem('chosenSongLink');
    audioPlayer.src = `${link}.wav`;
    audioPlayer.type = 'audio/wav';
    audioPlayer.currentTime = randomSecond;
    audioPlayer.play();
  });