const handleBtn = document.querySelector("#handle");
const logoutAllBtn = document.querySelector("#logoutAll");
const authNavv = document.querySelectorAll(".authNav");
const unAuthNavv = document.querySelectorAll(".unAuthNav");
const errorFlash = document.querySelector("#error_log");

// Variables
let token;
let flashMessage = "";
let flashBool = false;
const flashTime = 3000;
const pTag = document.createElement("p");
const pTag2 = document.createElement("p");
const imgTag = document.createElement("img");
const linkDom = document.createElement("a");
const divDom = document.createElement("div");
const authToken = localStorage.getItem("userSession");
const sessToken = sessionStorage.getItem("userSession");
const instance = axios.create({
  baseURL: "https://piecard.onrender.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${authToken}`
  },
  withCredentials: true,
  credentials: "same-origin"
});
const urlAPI = "https://piecard.onrender.com";

async function piLogin() {
  try {
    const config = { username: localStorage.username, uid: localStorage.uid };
    const response = await axios.post(
      `${urlAPI}/register/`,
      config
    );
    if (response.status === 200 || response.status === 201) {
      const token = response.data.token;
      sessionStorage.removeItem("userSession");
      localStorage.removeItem("userSession");
      sessionStorage.setItem("userSession", token);
      localStorage.setItem("userSession", token);
      // show logged in
      authNavv.forEach((elem) => {
        elem.classList.remove("authNav");
        elem.classList.add("showNav");
      });
      unAuthNavv.forEach((elem) => {
        elem.classList.remove(elem);
      });
      myProfile();
    }
    if (response.status === 201) {
      alert("Welcome to Pi eCard!");
    }
  } catch (error) {
    console.log(error);
  }
}

// Display profile names
async function myProfile() {
  const username = document.querySelector("#username");
  const name = document.querySelector("#name");
  const balance = document.querySelector("#balance");
  const balanceTwo = document.querySelector("#balanceTwo");
  const elem = document.createElement("i");
  const elemTwo = document.createElement("i");
  const authToken = localStorage.getItem("userSession");

  try {
    const response = await axios.get(`${urlAPI}/register`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
    if (response.status === 200 || 304) {
      balance.textContent = `${response.data.user.balance.toFixed(2)}`;
      elem.textContent = `pi`;
      balanceTwo.textContent = response.data.user.balance.toFixed(2);
      elemTwo.textContent = `pi`;
      balance.appendChild(elem);
      balanceTwo.appendChild(elemTwo);
      username.textContent = `@${response.data.user.username}`;
      name.textContent = response.data.user.username;
      const history = response.data.user.history;
      localStorage.balance = response.data.user.balance;
      shortHistory(history);
    }
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage.length > 0) return errorMessage, error.response;
  }
}

// Log out all other sessions except current session
async function logout() {
  const authToken = localStorage.getItem("userSession");
  try {
    if (authToken === null) {
      flashMessage = "No user is authenticated, please login!!!";
    } else {
      const username = localStorage.username;
      const data = {
        username
      };
      const response = await axios.post(
        `${urlAPI}/logout/`,
        data
      );
      if (response.status === 200) {
        flashMessage = `Successfully logged out from all devices!!!`;
        document.getElementById("historySection").textContent = "";
        document.getElementById("username").textContent = "Please login";
        document.getElementById("balance").textContent = "0";
      }
    }
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage.length > 0) flashdeage = errorMessage;
  }
  flashBool = true;

  // Flash message
  if (flashBool && flashMessage.length > 0) {
    pTag.textContent = flashMessage;
    errorFlash.appendChild(pTag);
    setTimeout(() => {
      flashMessage = "";
      flashBool = false;
      errorFlash.removeChild(pTag);
    }, flashTime);
  }
}

async function displayHistory() {
  document.getElementById("historySection").textContent = "";
  const user = localStorage.username;
  const response = await axios.post(
    `${urlAPI}/register/history`
  );
  if (response == 200) {
    const historySection = document.querySelector("#historySection");
    const history = response["data"]["profile"]["history"];
    for (const transaction of history) {
      const renderDiv = document.createElement("article");
      const renderAmount = document.createElement("a");
      const renderDate = document.createElement("a");
      const renderClient = document.createElement("a");
      const renderMemo = document.createElement("p");
      renderDiv.className = "historyStyle";
      renderAmount.textContent = transaction.amount;
      renderDate.textContent = transaction.date.substring(0, 10);
      renderClient.textContent = transaction.client;
      renderMemo.textContent = transaction.memo;

      renderDiv.appendChild(renderAmount);
      renderDiv.appendChild(renderDate);
      renderDiv.appendChild(renderClient);
      renderDiv.appendChild(renderMemo);
      historySection.appendChild(renderDiv);
    }
  }
}

async function shortHistory(history) {
  document.getElementById("historySection").textContent = "";
  historySection.textContent = "";
  for (const transaction of history) {
    const renderDiv = document.createElement("article");
    const renderAmount = document.createElement("h");
    const renderDate = document.createElement("p2");
    const renderClient = document.createElement("h");
    const renderMemo = document.createElement("p");
    const renderA = document.createElement("h");
    const br = document.createElement("br");
    if (transaction.amount >= 0) {
      renderDiv.className = "historyStyleGreen";
      renderA.textContent = " received from ";
    } else {
      renderDiv.className = "historyStyleRed";
      renderA.textContent = " sent to ";
    }
    renderAmount.className = "renderAmount";
    renderA.className = "renderAmount";
    renderDate.className = "renderDate";
    renderClient.className = "renderClient";
    renderMemo.className = "renderMemo";
    renderAmount.textContent = transaction.amount + " Pi";
    renderDate.textContent = transaction.date.substring(0, 10);
    renderClient.textContent = transaction.client;
    renderMemo.textContent = "Memo: " + transaction.memo;

    renderDiv.appendChild(renderAmount);
    renderDiv.appendChild(renderA);
    renderDiv.appendChild(renderClient);
    renderDiv.appendChild(renderMemo);
    renderDiv.appendChild(br);
    renderDiv.appendChild(renderDate);
    renderDiv.appendChild(br);
    historySection.appendChild(renderDiv);
  }
}

async function payScanned(id) {
  const authToken = sessionStorage.userSession;
  const data = {
    id: id
  };
  const response = await axios.post(
    `${urlAPI}/payment/scanned`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  if (
    response.status === 200 &&
    response.data.payment.payee !== localStorage.username
  ) {
    const payment = response.data.payment;
    document.getElementById("confirmPaymentQR").style.display = "block";
    document.getElementById(
      "confirmPaymentQRMessage"
    ).textContent = `Pay ${payment.amount}Pi to ${payment.payee}?`;
    localStorage.paymentID = payment._id;
    localStorage.amount = payment.amount;
    localStorage.payee = payment.payee;
    localStorage.memo = payment.memo;
    document
      .getElementById("confirmPaymentQRBtn")
      .addEventListener("click", createPayment);
    document
      .getElementById("cancelPaymentQRBtn")
      .addEventListener("click", cancelPayment);
  } else if (response.data.payment.payee == localStorage.username) {
    document.getElementById("payStatus").textContent =
      "cannot transfer to yourself";
    document.getElementById("paymentUnsuccessful").style.display = "block";
  }
}

function cancelPayment() {
  document.getElementById("confirmPaymentQR").style.display = "none";
  document.getElementById("paymentUnsuccessful").style.display = "block";
  document.getElementById("payStatus").textContent = "payment cancelled";
}

function makePaymentByUsername() {
  const amount = document.getElementById("amountUsername").value;
  const payee = document.getElementById("userUsername").value;
  if (amount && payee) {
    openPayUsername();
    document.getElementById("confirmPaymentUsername").style.display = "block";
    document.getElementById(
      "confirmPaymentUsernameMessage"
    ).textContent = `Pay ${amount}Pi to ${payee}?`;
  } else alert("Please fill in all the fields marked with *");
}

function cancelPayByUsername() {
  document.getElementById("confirmPaymentUsername").style.display = "none";
  document.getElementById("paymentUsernameCancelled").style.display = "block";
  document.getElementById("payUsernameStatus").textContent =
    "payment cancelled";
}

async function createInvoice() {
  const data = {
    amount: document.getElementById("amountQR").value,
    memo: document.getElementById("memoQR").value,
    user: localStorage.username
  };
  const authToken = sessionStorage.userSession;
  const response = await axios.post(
    `${urlAPI}/payment/create`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  if (response.status === 200) {
    await openInvoiceQR();
    const data = response.data;
    document.getElementById("invoiceStatus").textContent = "payment pending...";
    document.getElementById("invoiceID").textContent = data.id;
    document.getElementById("qrcode").textContent = "";
    var qrcode = await new QRCode(document.getElementById("qrcode"), {
      text: data.id,
      width: 270,
      height: 270,
      colorDark: "#000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    document.getElementById("qrcode").style.padding = "5px";
    document.getElementById("qrcode").style.background = "#fff";
    document.getElementById("qrcode").style.margin = "auto";
    localStorage.invoiceID = data.id;
    getInvoiceStatus();
  } else alert("Unknown error. Please try again later.");
}

async function getInvoiceStatus() {
  const data = {
    id: localStorage.invoiceID
  };
  const authToken = sessionStorage.userSession;
  const response = await axios.post(
    `${urlAPI}/payment/status`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  if (response.status == 200 && response.data.status == true) {
    document.getElementById(
      "invoiceStatus"
    ).textContent = `Payment received! The Pi has been added to your balance.`;
    document.getElementById("loaderOne").style.display = "none";
    document.getElementById("qrcode").textContent = "";
    document.getElementById("invoiceSuccessful").style.display = "block";
    myProfile();
  } else {
    console.log(response);
    const retry = setTimeout(getInvoiceStatus, 4000);
  }
}

async function createURLInvoice() {
  const data = {
    amount: document.getElementById("amountURL").value,
    memo: document.getElementById("memoURL").value,
    user: localStorage.username
  };
  const authToken = sessionStorage.userSession;
  const response = await axios.post(
    `${urlAPI}/payment/create`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    }
  );
  if (response.status === 200) {
    await openInvoiceURL();
    document.getElementById("urlTab").textContent =
      "https://piecard.co.uk/invoice?id=" + response.data.id;
  } else alert("Unknown error. Please try again later.");
}

async function buyPi() {
  const amount = document.getElementById("topupAmount").value;
  const username = localStorage.username;
  const data = {
    amount,
    username
  };
  openTopupModal();
  if (amount < 1) {
    document.getElementById("topupMessage").textContent = "Please enter an amount of at least one.";
    document.getElementById("topupLoader").style.display = "none";
  } else {
    const response = await axios.post(
      `${urlAPI}/purchase/create`,
      data
    );
    if (response.data.success == true) {
      document.getElementById("topupSuccessful").style.display = "block";
      document.getElementById("topupLoader").style.display = "none";
      window.open(response.data.url);
    } else if (response.data.message) {
      document.getElementById("topupMessage").textContent =
        "We have insufficient Pi to meet this demand. Please try again later or try a smaller amount.";
      document.getElementById("topupLoader").style.display = "none";
      document.getElementById("topupUnsuccessful").style.display = "block";
    } else {
      document.getElementById("topupLoader").style.display = "none";
      document.getElementById("topupUnsuccessful").style.display = "block";
    }
  }
}

function openBrowser() {
  window.open("pi://www.piecard.co.uk");
}

// tempory////////////////////////////////////
async function force() {
  localStorage.uid = "111";
  localStorage.username = "pioneer";
  piLogin();
}
