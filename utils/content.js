export const content = (username, resetLink) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
<style>
body {
width: 600px;
font-family: 'Courier New', Courier, monospace;
}

.container {
border-radius: 20px;
max-width: 600px;
padding: 2rem;
background: -webkit-linear-gradient(to left, yellow, rgb(255, 250, 0));
background: linear-gradient(to right, yellow, rgb(255, 250, 0));
}

.email {
color: #171819;
text-wrap: pretty;
line-height: 1.7;
}

.heading {
text-align: center;
text-decoration: underline;
text-underline-offset: 0.6rem;
}

.resetButton {
border: none;
outline: none;
padding: 10px 20px;
background-color: rgb(155, 6, 6);
color: whitesmoke;
font-weight: 800;
}

.warning {
margin-top: 1.2rem;
font-size: 0.8rem;
color: rgb(85, 9, 9);
font-weight: 600;
text-wrap: wrap;
}

.under-content {
/* margin-top: 0.8rem; */
height: 0.5px;
border: none;
margin: none;
background-color: rgb(112, 112, 112);
width: 530px;
}

.copyright {
text-align: center;
font-size: 0.6rem;
color: gray;
}
</style>
</head>
<body>
<div class="container">
<div class="email">
<h2 class="heading">moviesnodejs</h2>
<br>
<p>
  Dear ${username},<br>
  It seems someone has initiated a password reset request for your account. If the request has not been initiated
  by you or do you have any query, please reach our support team at <b
    style="text-decoration: underline; text-underline-offset: 8px;">hr@company.com</b>
</p>
<a class="resetLink" href=${resetLink} target="_blank" >
  <button class="resetButton" onclick="handleClick()">
    Reset Password
  </button>
</a>
<br>
<p class="warning">Please click on the link above to reset your password.</p>
<br>
<hr class="under-content" />
<br>
<p class="copyright">&copy; moviesnodejs LLC</p>
</div>
</div>
</body>
</html>`
}