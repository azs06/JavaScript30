const player = document.querySelector('.player');

const video = document.querySelector('.viewer');

const progress = document.querySelector('.progress');

const progressBar = document.querySelector('.progress__filled');

const toggle = document.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');

const fullScreenButton = document.querySelector('.fullscreen')

function togglePlay(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.innerHTML = icon;
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function toggleFullScreen(){
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else {
        video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }	
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((button)=>button.addEventListener('click', skip));

ranges.forEach((range)=>range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range)=>range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=>{
	if(mousedown) scrub(e);
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreenButton.addEventListener('click', toggleFullScreen);



