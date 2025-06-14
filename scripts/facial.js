const MODEL_URL = '/models/face-api';
export async function loadFaceModels() {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
  ]);
  console.log('[OK] Modelos face-api carregados');
}

export async function analyzeFrame(videoEl) {
  const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });
  const result = await faceapi
    .detectSingleFace(videoEl, options)
    .withFaceExpressions();
  return result; // { expressions: { happy: 0.7, ... } }
}

// Teste rápido no console do navegador:
loadFaceModels()
  .then(() => console.log('Pronto para inferência facial'))
  .catch(err => console.error('Falha ao carregar', err));
