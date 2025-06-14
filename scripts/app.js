import { loadFaceModels, analyzeFrame } from './facial.js';

async function init() {
  await loadFaceModels();
  const video = document.getElementById('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    setInterval(async () => {
      const detection = await analyzeFrame(video);
      if (detection) updateFacialEmotionsUI(detection.expressions);
    }, 200);
  };
}

document.addEventListener('DOMContentLoaded', init);


