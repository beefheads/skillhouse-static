window.addEventListener('DOMContentLoaded', (event) => {
  if (document.querySelector('.yt-video') == null) return;

  const CLASSES = {
  	inited: 'video--inited',
  	markedup: 'video--marked-up',
  }

  function initYtVideos(videos) {
    videos.forEach((video, index) => {
      if (video.classList.contains(CLASSES.init)) return;

      const ytId = video.dataset.ytId;
      // const thumbs = getVideoThumb(ytId);

      makeVideoMarkup(video, index);
      setVideoThumbs(video, ytId);

      video.classList.add(CLASSES.init)
    })
  }

  function getVideoThumb(id) {
    const thumbs = {
      thumb: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      webp: `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
      // thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      // webp: `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
    }
    return thumbs;
  }

  function setVideoThumbs(video, id) {
    const {thumb, webp} = getVideoThumb(id);
    video._ytVideo.img.src = thumb;
    video._ytVideo.webp.srcset = webp;
    video._ytVideo.thumbs = {
      thumb,
      webp,
    }
    video._ytVideo.id = id;
  }

  function makeVideoMarkup(video, index) {

    if (video.classList.contains(CLASSES.markedup)) return;

    let pic = document.createElement('picture');
    pic.classList.add('yt-video__pic');

    let img = document.createElement('img');
    img.classList.add('yt-video__img');

    let picWebp = document.createElement("source");
    picWebp.type = "image/webp";

    let mediaWrap = document.createElement('div');
    mediaWrap.classList.add('yt-video__media');

    let videoFrame = document.createElement('div');
    videoFrame.classList.add('yt-video__video');
    videoFrame.id = `yt-video-${index}`;

    pic.appendChild(picWebp);
    pic.appendChild(img);

    mediaWrap.appendChild(videoFrame);

    video.appendChild(pic);
    video.appendChild(mediaWrap);

    video._ytVideo = {
      player: {},
      pic,
      webp: picWebp,
      img,
      media: mediaWrap,
      videoFrame: videoFrame,
    };

    if (!video.classList.contains('yt-video--bg')) {
      const playButton = document.createElement('button')
      playButton.classList.add('yt-video__play');
      video.appendChild(playButton);

      playButton.addEventListener('click', initVideo);

      video._ytVideo.play = playButton;
    }
    video.classList.add(CLASSES.markedup);
  }

  function initPlayers(videos) {
    videos.forEach(video => {
      // const videoElementId = video.id;//`yt-video-${index}`
      video._ytVideo.player = new YT.Player(video._ytVideo.videoFrame.id, {
        videoId: video._ytVideo.id,
        events: {
          onReady: onPlayerReady,
          onStateChange: cahngePlayerState,
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          playsinline: 1,
          mute: 1,
          loop: 1,
          rel: 0,
          version: 3,
          origin: window.location.href,
        },
      });
    });
  }

  function onPlayerReady(e) {
    const videoId = e.target.h.g.videoId
    const video = document.querySelector(`[data-yt-id="${videoId}"`);
    video._ytVideo.player.setVolume(40);
    video._ytVideo.player.playVideo();
    setTimeout(() => {
      video.classList.add('yt-video--video-play');
    }, 1000);
  }

  function cahngePlayerState(e) {
    // const video = e.target.h.closest('.yt-video');
    const videoId = e.target.h.g.videoId
    const video = document.querySelector(`[data-yt-id="${videoId}"`);

    // show video when loaded instead of thumb
    if (e.data == 1) {
      // document.querySelector(".yt-video__media").style.display = "block";
    } else if (e.data == 0) {
      // document.querySelector(".yt-video__media").remove();
    }

    // loop video
    if (e.data === YT.PlayerState.ENDED) {
      video._ytVideo.player.playVideo();
    }
  }   

  const videos = document.querySelectorAll('.yt-video')
  initYtVideos(videos);

  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  function onYouTubePlayerAPIReady() {
    initPlayers(videos)
  }
  window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
});
