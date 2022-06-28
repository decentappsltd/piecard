const urlApi = "https://piecard.onrender.com";

async function auth() {
  const scopes = ["username", "payments"];
  function onIncompletePaymentFound(payment) {
    var data = {
      paymentId: payment.identifier,
      txid: payment.transaction.txid
    };
    axios.post(`${urlApi}/pi/incomplete`, data);
  }
  Pi.authenticate(scopes, onIncompletePaymentFound).then(async function (auth) {
    const uid = auth.user.uid;
    const username = auth.user.username;
    localStorage.username = username;
    localStorage.uid = uid;
    if (sessionStorage.userSession == null) {
      piLogin();
    }
  });
}

auth();

async function createPayment() {
  document.getElementById("confirmPaymentQR").style.display = "none";
  document.getElementById("payStatus").textContent = "processing payment, please wait...";
  if (Number(localStorage.amount) <= Number(localStorage.balance)) {
      var data = {
        id: localStorage.paymentID,
        amount: localStorage.amount,
        username: localStorage.username,
        payee: localStorage.payee,
        memo: localStorage.memo
      };
      const response = await axios.post(`${urlApi}/pi/complete`, data);
      if (response.status == 200) {
        document.getElementById("paymentSuccessful").style.display = "block";
        document.getElementById("payStatus").textContent = "transfer successful!";
      } else {
        document.getElementById("paymentUnsuccessful").style.display = "block";
        document.getElementById("payStatus").textContent = response.data.message;
      }
    } else {
  const payment = Pi.createPayment(
    {
      amount: localStorage.amount * 1.01, // amount plus 1% fee
      memo: `Pay ${localStorage.amount} Pi to ${localStorage.payee}`,
      metadata: { paymentType: "webinar_purchase" }
    },
    {
      onReadyForServerApproval: function (paymentId) {
        var data = {
          paymentId: paymentId,
          txid: ""
        };
        axios.post(`${urlApi}/pi/approve`, data);
      },
      onReadyForServerCompletion: async function (paymentId, txid) {
        var data = {
          paymentId: paymentId,
          txid: txid,
          id: localStorage.paymentID,
          amount: localStorage.amount,
          username: localStorage.username,
          payee: localStorage.payee,
          memo: localStorage.memo
        };
        const authToken = localStorage.getItem("userSession");
        const response = await axios.post(
          `${urlApi}/pi/complete`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
            withCredentials: true,
            credentials: "same-origin"
          }
        );
        // Payment success
        if (response.status == 200) {
          document.getElementById("paymentSuccessful").style.display = "block";
          document.getElementById("payStatus").textContent = "transfer successful!";
        } else {
          document.getElementById("paymentUnsuccessful").style.display = "block";
        }
      },
      onCancel: function (paymentId, txid) {
        var data = {
          paymentId: paymentId,
          txid: txid
        };
        axios.post(`${urlApi}/pi/incomplete`, data);
      },
      onError: function (paymentId, txid) {
        var data = {
          paymentId: paymentId,
          txid: txid
        };
        axios.post(`${urlApi}/pi/incomplete`, data);
      }
    }
  );
    }
}

function topUp() {
  const amount = document.getElementById("topupAmount").value;
  if (amount > 0) {
    const payment = Pi.createPayment(
      {
        amount: amount, // no fee
        memo: `Add ${amount} Pi to account`,
        metadata: { paymentType: "webinar_purchase" }
      },
      {
        onReadyForServerApproval: function (paymentId) {
          var data = {
            paymentId: paymentId,
            txid: ""
          };
          axios.post(`${urlApi}/pi/approve`, data);
        },
        onReadyForServerCompletion: async function (paymentId, txid) {
          var data = {
            paymentId: paymentId,
            txid: txid,
            amount,
            username: localStorage.username
          };
          const authToken = localStorage.getItem("userSession");
          const response = await axios.post(
            `${urlApi}/pi/completeTopUp`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
              },
              withCredentials: true,
              credentials: "same-origin"
            }
          );
          // Payment success TODO
          document.getElementById("payStatus").textContent =
            "Transfer successful!";
          myProfile();
        },
        onCancel: function (paymentId, txid) {
          var data = {
            paymentId: paymentId,
            txid: txid
          };
          axios.post(`${urlApi}/pi/incomplete`, data);
        },
        onError: function (paymentId, txid) {
          var data = {
            paymentId: paymentId,
            txid: txid
          };
          axios.post(`${urlApi}/pi/incomplete`, data);
        }
      }
    );
  } else alert("Please enter an amount above");
}

async function payByUsername() {
  document.getElementById("confirmPaymentUsername").style.display = "none";
  document.getElementById("processingPaymentUsername").style.display = "block";
  document.getElementById("payUsernameStatus").textContent = "processing payment..."
  const amount = document.getElementById("amountUsername").value;
  const payee = document.getElementById("userUsername").value;
  const memo = document.getElementById("memoUsername").value;
  openPayUsername();
  if (amount > 0 && payee && payee !== localStorage.username) {
    if (Number(amount) <= Number(localStorage.balance)) {
      var data = {
        amount: amount,
        username: localStorage.username,
        payee: payee,
        memo: memo
      };
      const response = await axios.post(
        `${urlApi}/pi/payUsername`,
        data
      );
      if (response.status == 200) {
        document.getElementById("paymentUsernameSuccessful").style.display = "block";
        document.getElementById("payUsernameStatus").textContent = "transfer successful!";
        document.getElementById("processingPaymentUsername").style.display = "none";
      } else {
        document.getElementById("paymentUsernameUnsuccessful").style.display = "block";
        document.getElementById("payUsernameStatus").textContent = "transfer failed";
        document.getElementById("processingPaymentUsername").style.display = "none";
      }
    } else {
      const payment = Pi.createPayment(
        {
          amount: amount * 1.01, // no fee
          memo: `Add ${amount} Pi to account`,
          metadata: { paymentType: "webinar_purchase" }
        },
        {
          onReadyForServerApproval: function (paymentId) {
            var data = {
              paymentId: paymentId,
              txid: ""
            };
            axios.post(`${urlApi}/pi/approve`, data);
          },
          onReadyForServerCompletion: async function (paymentId, txid) {
            var data = {
              paymentId: paymentId,
              txid: txid,
              amount: amount,
              username: localStorage.username,
              payee: payee,
              memo: memo
            };
            const response = await axios.post(`${urlApi}/pi/payUsername`, data);
            // Payment success
            document.getElementById("processingPaymentUsername").style.display = "none";
            if (response.status == 200) {
              document.getElementById("paymentUsernameSuccessful").style.display = "block";
              document.getElementById("payUsernameStatus").textContent = "transfer successful!";
            } else {
              document.getElementById("paymentUsernameUnsuccessful").style.display = "block";
              document.getElementById("payUsernameStatus").textContent = "tranfer failed";
            }
            myProfile();
          },
          onCancel: function (paymentId, txid) {
            var data = {
              paymentId: paymentId,
              txid: txid
            };
            axios.post(`${urlApi}/pi/incomplete`, data);
          },
          onError: function (paymentId, txid) {
            var data = {
              paymentId: paymentId,
              txid: txid
            };
            axios.post(`${urlApi}/pi/incomplete`, data);
          }
        }
      );
    }
  } else if (payee == localStorage.username) {
    document.getElementById("paymentUsernameUnsuccessful").style.display = "block";
    document.getElementById("processingPaymentUsername").style.display = "none";
    document.getElementById("payUsernameStatus").textContent = "cannot transfer to yourself";
  } else {
    document.getElementById("paymentUsernameUnsuccessful").style.display = "block";
    document.getElementById("processingPaymentUsername").style.display = "none";
    document.getElementById("payUsernameStatus").textContent = "amount must be greater than zero";
  }
}

function maxWithdrawal() {
  document.getElementById("withdrawAmount").value = localStorage.balance;
}

function withdraw() {
  alert("Pi Core Team haven't enable this feature yet..");
}
