function activeBox(clicked) {
  const boxes = document.getElementsByClassName("box");
  for (const box of boxes) {
    box.classList.add("inactive");
  }
  if (clicked == a) {
    const clickedBox = document.getElementById("a");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
  } else if (clicked == b) {
    const clickedBox = document.getElementById("b");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
  } else if (clicked == c) {
    const clickedBox = document.getElementById("c");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
  } else {
    const clickedBox = document.getElementById("d");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
  }
}

// Modals
function openInfo() {
  document.getElementById("info").classList.add("is-visible");
}

function closeInfo() {
  document.getElementById("info").classList.remove("is-visible");
}

// QR Scanner
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const payInfoI = document.getElementById("payInfoI");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    payScanned(res);
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    payInfoI.hidden = true;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      payInfoI.hidden = true;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}