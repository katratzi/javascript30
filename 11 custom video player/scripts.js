// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
let mousedown = false;

// #region Build our functions

// start stop playback
function togglePlay(e) {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

// make the toggle button match play/pause
function updateButton() {
    const icon = this.paused ? '▶' : '❚ ❚';
    toggle.textContent = icon;
}

// skip ahead
function skip(e) {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

// sliders for volume & playbackRate
function handleRangeUpdate() {
    // don't fire if mouse isn't down
    if (!mousedown) return;

    // adjust volume or playback rate - name links to property    
    video[this.name] = this.value;
}

// match the video position to progress bar
function handleProgress() {    
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// scrub to a position in timeline
function scrub(e) {   
    
    //const percent = e.layerX / progress.offsetWidth; // also works
    const percent = e.offsetX / progress.offsetWidth;
    const scrubTo = video.duration * percent;
    video.currentTime = scrubTo;
}

// #endregion

// #region hook up listeners

// play & pause
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// match the button to the playback
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// skip forward/back
skipButtons.forEach(button => button.addEventListener('click', skip));
// change to ranges
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
window.addEventListener('mousedown', (e) => { mousedown = true; });
window.addEventListener('mouseup', (e) => { mousedown = false; });
// video progress bar
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // neat trick with &&

// #endregion