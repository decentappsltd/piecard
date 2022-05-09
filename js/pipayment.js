async function auth() {
  const scopes = ["username", "payments"];
  function onIncompletePaymentFound(payment) {
    var data = {
      paymentId: payment.identifier,
      txid: payment.transaction.txid
    };
    axios.post(
      "https://piecard.herokuapp.com/pi/incomplete",
      data
    );
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

function createPayment() {
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
        axios.post("https://piecard.herokuapp.com/pi/approve", data);
      },
      onReadyForServerCompletion: async function (paymentId, txid) {
        var data = {
          paymentId: paymentId,
          txid: txid,
          id: localStorage.paymentID,
          amount: localStorage.amount,
          username: localStorage.username,
          payee: localStorage.payee,
          memo: localStorage.memo,
        };
        const authToken = localStorage.getItem("userSession");
        const response = await axios.post(
          "https://piecard.herokuapp.com/pi/complete",
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
        document.getElementById("payStatus").textContent = "Transfer successful!";
      },
      onCancel: function (paymentId, txid) {
        var data = {
          paymentId: paymentId,
          txid: txid
        };
        axios.post(
          "https://piecard.herokuapp.com/pi/incomplete",
          data
        );
      },
      onError: function (paymentId, txid) {
        var data = {
          paymentId: paymentId,
          txid: txid
        };
        axios.post(
          "https://piecard.herokuapp.com/pi/incomplete",
          data
        );
      }
    }
  );
}

function withdraw() {
  alert("Pi Core Team haven't enable this feature yet..");
}