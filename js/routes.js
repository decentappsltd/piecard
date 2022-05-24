const handleBtn = document.querySelector("#handle");
const logoutAllBtn = document.querySelector("#logoutAll");
const authNavv = document.querySelectorAll(".authNav");
const unAuthNavv = document.querySelectorAll(".unAuthNav");

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
  baseURL: "https://pi-lottery.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${authToken}`
  },
  withCredentials: true,
  credentials: "same-origin"
});

async function piLogin() {
  try {
    const config = { username: localStorage.username, uid: localStorage.uid };
    const response = await axios.post(
      `https://piecard.herokuapp.com/register/`,
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
    const response = await axios.get(`https://piecard.herokuapp.com/register`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
    if (response.status === 200 || 304) {
      balance.textContent = `${response.data.user.balance}`;
      elem.textContent = `pi`;
      balanceTwo.textContent = response.data.user.balance;
      elemTwo.textContent = `pi`;
      balance.appendChild(elem);
      balanceTwo.appendChild(elemTwo);
      username.textContent = `@${response.data.user.username}`;
      name.textContent = response.data.user.username;
      const history = response.data.user.history;
      shortHistory(history);
    }
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage.length > 0) return errorMessage, error.response;
  }
}

// Log out all other sessions except current session
async function logoutAll() {
  const authToken = localStorage.getItem("userSession");

  try {
    if (authToken === null) {
      flashMessage = "No user is authenticated, please login!!!";
    } else {
      const response = await axios.post(
        `https://piecard.herokuapp.com/logout/logout_all`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      if (response.status === 200) {
        flashMessage = `Successfully logged out from other devices!!!`;
      }
    }
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage.length > 0) flashMessage = errorMessage;
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
  const user = localStorage.username;
  const response = await axios.post(
    "https://piecard.herokuapp.com/register/history"
  );
  if (response == 200) {
    const historySection = document.querySelector(".historySection");
    const history = response["data"]["profile"]["history"];
    for (const transaction of history) {
      const renderDiv = document.createElement("article");
      const renderTxid = document.createElement("h3");
      const renderAmount = document.createElement("a");
      const renderDate = document.createElement("a");
      const renderClient = document.createElement("a");
      const renderMemo = document.createElement("p");
      renderDiv.className = "historyStyle";
      renderTxid.textContent = transaction.txid;
      renderAmount.textContent = transaction.amount;
      renderDate.textContent = transaction.date.substring(0, 10);
      renderClient.textContent = transaction.client;
      renderMemo.textContent = transaction.memo;

      renderDiv.appendChild(renderTxid);
      renderDiv.appendChild(renderAmount);
      renderDiv.appendChild(renderDate);
      renderDiv.appendChild(renderClient);
      renderDiv.appendChild(renderMemo);
      historySection.appendChild(renderDiv);
    }
  }
}

async function shortHistory(history) {
  historySection.textContent = "";
  for (const transaction of history) {
    const renderDiv = document.createElement("article");
    const renderTxid = document.createElement("a");
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
    renderTxid.className = "renderTxid";
    renderAmount.className = "renderAmount";
    renderA.className = "renderAmount";
    renderDate.className = "renderDate";
    renderClient.className = "renderClient";
    renderMemo.className = "renderMemo";
    renderTxid.textContent = transaction._id;
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
    renderDiv.appendChild(renderTxid);
    historySection.appendChild(renderDiv);
  }
}

async function payScanned(id) {
  if (navigator.userAgent.toLowerCase().indexOf("pibrowser") < 0) {
    alert("Please go to the Pi Browser to make a crypto payment");
    window.open("pi://www.piecard.co.uk");
  }
  const authToken = sessionStorage.userSession;
  const data = {
    id: id,
  };
  const response = await axios.post(
    `https://piecard.herokuapp.com/payment/scanned`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
  if (response.status === 200) {
    document.getElementById("payStatus").textContent = "Processing payment...";
    const payment = response.data.payment;
    localStorage.paymentID = payment._id;
    localStorage.amount = payment.amount;
    localStorage.payee = payment.payee;
    localStorage.memo = payment.memo;
    const verify = confirm(`Pay ${payment.amount} Pi to ${payment.payee}`);
    if (verify == true){
      createPayment();
    } else {
      alert("Payment cancelled");
      document.getElementById("payStatus").textContent = "Payment cancelled";
    }
  }
}

async function createInvoice() {
  const data = {
    amount: document.getElementById("amount").value,
    memo: document.getElementById("memo").value,
    user: localStorage.username
  };
  const authToken = sessionStorage.userSession;
  const response = await axios.post('https://piecard.herokuapp.com/payment/create', data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
  if (response.status === 200) {
    document.getElementById("payStatus").textContent = "Processing payment...";
    const data = response.data;
    document.getElementById("invoiceProgress").textContent =
      "Payment ID: " + data.id + ". Pending...";
    document.getElementById("qrcode").textContent = "";
    var qrcode = await new QRCode(document.getElementById("qrcode"), {
      text: data.id,
      width: 200,
      height: 200,
      colorDark: "#000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    document.getElementById("qrcode").style.margin = "auto";
    localStorage.invoiceID = data.id;
    getInvoiceStatus();
  }
}

async function getInvoiceStatus() {
  const data = {
    id: localStorage.invoiceID,
  }
  const authToken = sessionStorage.userSession;
  const response = await axios.post(
    'https://piecard.herokuapp.com/payment/status', data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
  if (response.status == 200 && response.data.status == true) {
    document.getElementById(
      "invoiceProgress"
    ).textContent = `Payment received! ${response.data.amount} Pi was added to your balance.`;
    myProfile();
  } else {
    console.log(response);
    const retry = setTimeout(getInvoiceStatus, 4000);
  }
}

function openBrowser() {
  window.open("pi://www.piecard.co.uk");
}