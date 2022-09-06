import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

player.on('timeupdate', throttle(onStopPlayer, 1000));

function onStopPlayer(event) {
  let pause = event.seconds;
  console.log(pause);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(pause));
}

const currentTime = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(currentTime)
  .then(function (pause) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
