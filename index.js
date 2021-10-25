const album = document.querySelector('.album');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');

const sounds = document.querySelectorAll('.sound-selection button');

const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');
const outlineLength = outline.getTotalLength();



const app = () => {

  let duration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  sounds.forEach(sound => {
    sound.addEventListener('click', function() {
      album.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(album);
    })
  })


  play.addEventListener('click', () => {
    checkPlaying(album)
  });

  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
      duration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(duration / 60)} : 00`
    })
  })

  const checkPlaying = album => {
    if(album.paused) {
      album.play()
      video.play()
      play.src = './pause.svg';
    } else {
      album.pause()
      video.pause()
      play.src = './play.svg';
    }
  }
  album.ontimeupdate = () => {
    let currentTime = album.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= duration) {
      album.pause();
      album.currentTime = 0;
      play.src = './play.svg';
      video.pause()
    }
  }

}

app();