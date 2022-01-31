function preOrder() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLScbRsHYANkrJCN8xICGLH8dq20R_zrASD8UJCXG85ull42ziQ/formResponse?usp=pp_url&entry.1754518477="+username+"&entry.131502124="+email);
  alert("Pre Order Successful! You will be notified when your card is ready.");
}

//  https://codepen.io/daveredfern/pen/zBGBJV