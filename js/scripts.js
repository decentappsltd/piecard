function activeBox(clicked) {
  const menu = document.getElementById("popup");
  if (menu.style.display == "none") {     // || window.screen.width >= 750
  const boxes = document.getElementsByClassName("box");
  const landingItems = document.querySelectorAll(".landing");
  for (const landing of landingItems) {
    landing.style.display = "none";
  }
  for (const box of boxes) {
    box.classList.add("inactive");
  }
  document.getElementById("activeCSS").setAttribute("href", "/css/expanded.css");
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
    for (const item of d) {
      item.style.display = "none";
    }
    const iconA = document.getElementById("iconA");
    if (iconA) iconA.style.display = "none";
    const iconB = document.getElementById("iconB");
    if (iconB) iconB.style.display = "block";
    const iconC = document.getElementById("iconC");
    if (iconC) iconC.style.display = "block";
    const iconD = document.getElementById("iconD");
    if (iconD) iconD.style.display = "block";
    document.getElementById("balance").style.display = "block";
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
    for (const item of d) {
      item.style.display = "none";
    }
    const iconA = document.getElementById("iconA");
    if (iconA) iconA.style.display = "block";
    const iconB = document.getElementById("iconB");
    if (iconB) iconB.style.display = "none";
    const iconC = document.getElementById("iconC");
    if (iconC) iconC.style.display = "block";
    const iconD = document.getElementById("iconD");
    if (iconD) iconD.style.display = "block";
    document.getElementById("balance").style.display = "block";
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
    for (const item of d) {
     m.style.display = "none";
    }
    document.getElementById("wallet").value = "add from wallet";
    document.getElementById("crypto").value = "buy with crypto";
    const iconA = document.getElementById("iconA");
    if (iconA) iconA.style.display = "block";
    const iconB = document.getElementById("iconB");
    if (iconB) iconB.style.display = "block";
    const iconC = document.getElementById("iconC");
    if (iconC) iconC.style.display = "none";
    const iconD = document.getElementById("iconD");
    if (iconD) iconD.style.display = "block";
    document.getElementById("balance").style.display = "none";
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
    for (const item of d) {
      item.style.display = "block";
    }
    const iconA = document.getElementById("iconA");
    if (iconA) iconA.style.display = "block";
    const iconB = document.getElementById("iconB");
    if (iconB) iconB.style.display = "block";
    const iconC = document.getElementById("iconC");
    if (iconC) iconC.style.display = "block";
    const iconD = document.getElementById("iconD");
    if (iconD) iconD.style.display = "none";
    document.getElementById("balance").style.display = "block";
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

function openInvoiceQR() {
  document.getElementById("invoiceQR").classList.add("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "block";
}

function closeInvoiceQR() {
  document.getElementById("invoiceQR").classList.remove("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "none";
  document.getElementById("invoiceStatus").textContent = `payment pending...`;
  document.getElementById("loaderOne").style.display = "block";
  document.getElementById("qrcode").textContent = "";
  const messages = document.querySelectorAll(".paymentSuccessful");
  for (const message of messages) {
    message.style.display= "none";
  }
}

function openInvoiceURL() {
  document.getElementById("invoiceURL").classList.add("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "block";
}

function closeInvoiceURL() {
  document.getElementById("invoiceURL").classList.remove("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "none";
  document.getElementById("urlTab").textContent = "generating url...";
}

function openPayQR() {
  document.getElementById("payQR").classList.add("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "block";
}

function closePayQR() {
  document.getElementById("payQR").classList.remove("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "none";
  const messages = document.querySelectorAll(".paymentSuccessful");
  for (const message of messages) {
    message.style.display= "none";
  }
  document.getElementById("payStatus").textContent = "waiting for camera to open...";
}

function openPayUsername() {
  document.getElementById("payUsername").classList.add("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "block";
}

function closePayUsername() {
  document.getElementById("payUsername").classList.remove("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "none";
  document.getElementById("processingPaymentUsername").style.display = "none";
  const messages = document.querySelectorAll(".paymentSuccessful");
  for (const message of messages) {
    message.style.display= "none";
  }
}

function openTopupModal() {
  document.getElementById("topupModal").classList.add("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "block";
}

function closeTopupModal() {
  document.getElementById("topupModal").classList.remove("is-visible");
  const tint = document.getElementById("darkTint");
  tint.style.display = "none";
  document.getElementById("topupLoader").style.display = "block";
  document.getElementById("topupSuccessful").style.display = "none";
  document.getElementById("topupMessage").textContent = "";
  const messages = document.querySelectorAll(".paymentSuccessful");
  for (const message of messages) {
    message.style.display= "none";
  }
}

function toggleMenu() {
  const menu = document.getElementById("popup");
  const tint = document.getElementById("tint");
  if (menu.style.display !== "none") {
    menu.style.display = "none";
    tint.style.display = "none";
  } else {
    menu.style.display = "block";
    tint.style.display = "block";
  }
}

window.addEventListener('click', function(e){
  menu = document.getElementById("popup");
  if (!document.getElementById("menu").contains(e.target) && !menu.contains(e.target) && window.screen.width < 900) {
   document.getElementById('popup').style.display = "none";
   document.getElementById("tint").style.display = "none";
  }
});

function copyURL() {
  navigator.clipboard.writeText(document.getElementById("urlTab").value);
  alert("Copied");
}



// QR Scanner
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const btnScanQR = document.getElementById("btn-scan-qr");
const payStatus = document.getElementById("payStatus");

let scanning = false;

qrcode.callback = res => {
  if (res) {
    payScanned(res);
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
    payStatus.textContent = "QR code found, processing...";
  }
};

btnScanQR.onclick = () => {
  openPayQR();
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