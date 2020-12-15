function ChangeImage2() {
  document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck?");
  if (conf == true)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
  else
  {
    window.location.href = "screen2.html";
  }
}