function activeBox(clicked) {
  const boxes = document.getElementsByClassName("box");
  const landingItems = document.querySelectorAll(".landing");
  for (const landing of landingItems) {
    landing.style.display = "none";
  }
  for (const box of boxes) {
    box.classList.add("inactive");
  }
  if (clicked == a) {
    const clickedBox = document.getElementById("a");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
    const a = document.getElementsByClassName("a");
    for (const item of a) {
      item.style.display = "block";
    }
    const b = document.getElementsByClassName("b");
    for (const item of b) {
      item.style.display = "none";
    }
    const c = document.getElementsByClassName("c");
    for (const item of c) {
      item.style.display = "none";
    }
    const d = document.getElementsByClassName("d");
    for (const item of a) {
      item.style.display = "none";
    }
  } else if (clicked == b) {
    const clickedBox = document.getElementById("b");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
    const a = document.getElementsByClassName("a");
    for (const item of a) {
      item.style.display = "none";
    }
    const b = document.getElementsByClassName("b");
    for (const item of b) {
      item.style.display = "block";
    }
    const c = document.getElementsByClassName("c");
    for (const item of c) {
      item.style.display = "none";
    }
    const d = document.getElementsByClassName("d");
    for (const item of a) {
      item.style.display = "none";
    }
  } else if (clicked == c) {
    const clickedBox = document.getElementById("c");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
    const a = document.getElementsByClassName("a");
    for (const item of a) {
      item.style.display = "none";
    }
    const b = document.getElementsByClassName("b");
    for (const item of b) {
      item.style.display = "none";
    }
    const c = document.getElementsByClassName("c");
    for (const item of c) {
      item.style.display = "block";
    }
    const d = document.getElementsByClassName("d");
    for (const item of a) {
      item.style.display = "none";
    }
  } else {
    const clickedBox = document.getElementById("d");
    clickedBox.classList.remove("inactive");
    clickedBox.classList.add("active");
    const a = document.getElementsByClassName("a");
    for (const item of a) {
      item.style.display = "none";
    }
    const b = document.getElementsByClassName("b");
    for (const item of b) {
      item.style.display = "none";
    }
    const c = document.getElementsByClassName("c");
    for (const item of c) {
      item.style.display = "none";
    }
    const d = document.getElementsByClassName("d");
    for (const item of a) {
      item.style.display = "block";
    }
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
const payStatus = document.getElementById("payStatus");

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
    payStatus.textContent = "QR code found, processing..";
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
      payStatus.textContent = "Scanning for QR code..";
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
    const scanningError = setTimeout(scanningErr, 2000);
};

function scanningErr() {
  if (scanning === false) {
    alert("Camera is blocked. Please enable the camera permission for the Pi Browser in your phone's settings");
  }
}

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