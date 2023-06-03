function getScore() {
    var storedScore = sessionStorage.getItem('score');
    return storedScore ? parseInt(storedScore, 10) : 0;
}

function getChosenSong() {
    var storedSong = sessionStorage.getItem('chosenSong');
    return storedSong ? storedSong : 0;
}

function getSongLing() {
    var storedLink = sessionStorage.getItem('chosenSongLink');
    return storedLink ? storedLink : 0;
  }

document.addEventListener('DOMContentLoaded', function() {
    var score = getScore();
    var scoreMessage = document.getElementById('scoreMessage');
    var audioPlayer = document.getElementById('player');
    var resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = sessionStorage['resultMessage'];
    
    scoreMessage.textContent = `Your score: ${score}`;

    chosenSong = getChosenSong();
    console.log(chosenSong);
    audioPlayer.src = storedLink;
    audioPlayer.type = 'audio/webm';
  });