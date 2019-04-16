import React from 'react'
import { withRouter } from 'react-router-dom';


class Wavelength extends React.Component {
  render(){
    setTimeout(() => {
      var realtimeCanvas = document.getElementById('waveform-realtime');
      var recordingCanvas = document.getElementById('waveform-recording');
      var recordingContainer = document.getElementById('recording-container');
    var mediaRecorderDataChunks = [];

    var gotUserAudio = function(stream) {

      var audioCtx = new AudioContext();
      var source = audioCtx.createMediaStreamSource(stream);
      var analyser = audioCtx.createAnalyser();
      source.connect(analyser);

      var drawVisual;
      visualizeRealtime(stream, realtimeCanvas);
      visualizeRecording(stream, recordingCanvas);

      // visualize realtime waveform
      function visualizeRealtime(stream, canvas) {
        var canvasCtx = canvas.getContext('2d');

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount; // half the FFT value
        var dataArray = new Uint8Array(bufferLength); // create an array to store the data

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        function draw() {
          drawVisual = requestAnimationFrame(draw);

          analyser.getByteTimeDomainData(dataArray);

          canvasCtx.fillStyle = '#1A1629';
          canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
          canvasCtx.lineWidth = 1;
          canvasCtx.strokeStyle = '#FFF';
          canvasCtx.beginPath();

          var sliceWidth = canvas.width * 1.0 / bufferLength;
          var x = 0;

          for(var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * canvas.height/2;

            if(i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasCtx.lineTo(canvas.width, canvas.height/2);
          canvasCtx.stroke();
        };

        draw();
      }

      // visualize stream audio recording style
      function visualizeRecording(stream, canvas) {
        var canvasCtx = canvas.getContext('2d');

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Float32Array(bufferLength);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.fillStyle = '#1A1629';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        var x = 0;

        function draw() {
          if ( x >= canvas.width ) {
            var tempWave = canvas.toDataURL('image/png');
            var img = new Image();
            img.onload = function() {
              // set canvas size
              canvas.width++;
              canvasCtx.fillStyle = '#1A1629';
              canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
              canvasCtx.drawImage(img, 0, 0);

              // todo make sure canvas is inside div and scrolled to end

              strokeWave();
            }
            img.src = tempWave;
          }
          else {
            strokeWave();
          }
        };

        draw();

        function strokeWave() {
          drawVisual = requestAnimationFrame(draw);
          analyser.getFloatTimeDomainData(dataArray);

          canvasCtx.lineWidth = 1;
          canvasCtx.strokeStyle = '#fff';
          canvasCtx.beginPath();

          for(var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] * 128.0;
            var y = canvas.height/2 + v;
            canvasCtx.lineTo(x, y);
          }

          canvasCtx.stroke();
          x++;
        }
      }

}

// start stream on page load!
navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(gotUserAudio)
    .catch(err => console.log('gotLocalMediaStream error', err));
  })
return(
  <div>
  <p id="realtime-container">
  <canvas id="waveform-realtime" width="800"></canvas>
  </p>
  </div>
)
}
}
export default withRouter(Wavelength);
