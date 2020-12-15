function ChangeImage11() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, Pink Plastic?");
  if (conf == true)
  {
    document.getElementById("P1P").src = "../S4K/media/check.png";
    document.getElementById("R1Y").height = "200";
    document.getElementById("P1P").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage12() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 12?");
  if (conf == true)
  {
    document.getElementById("R1Y").src = "../S4K/media/check.png";
    document.getElementById("R1Y").height = "200";
    document.getElementById("R1Y").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage13() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 13?");
  if (conf == true)
  {
    document.getElementById("W1B").src = "../S4K/media/check.png";
    document.getElementById("W1B").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage21() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 21?");
  if (conf == true)
  {
    document.getElementById("P2P").src = "../S4K/media/check.png";
    document.getElementById("P2P").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage22() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 22?");
  if (conf == true)
  {
    document.getElementById("R2Y").src = "../S4K/media/check.png";
    document.getElementById("R2Y").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage23() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 23?");
  if (conf == true)
  {
    document.getElementById("W2B").src = "../S4K/media/check.png";
    document.getElementById("W2B").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage31() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 31?");
  if (conf == true)
  {
    document.getElementById("P3P").src = "../S4K/media/check.png";
    document.getElementById("P3P").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage32() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 32?");
  if (conf == true)
  {
    document.getElementById("R3Y").src = "../S4K/media/check.png";
    document.getElementById("R3Y").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function ChangeImage33() {
  //document.getElementById("ClickImage").disabled = true;
  var conf = confirm("Are you sure you want this duck, 33?");
  if (conf == true)
  {
    document.getElementById("W3B").src = "../S4K/media/check.png";
    document.getElementById("W3B").alt = "check"
  }
  if (checkhowmany() == 3)
  {
    document.getElementById("buttonpage").style.visibility = 'visible';
  }
}

function checkhowmany()
{
  var counter = 0;
  if (document.getElementById("P1P").alt == "check") {counter++}

  if (document.getElementById("P2P").alt == "check") {counter++}

  if (document.getElementById("P3P").alt == "check") {counter++}

  if (document.getElementById("R1Y").alt == "check") {counter++}

  if (document.getElementById("R2Y").alt == "check") {counter++}

  if (document.getElementById("R3Y").alt == "check") {counter++}

  if (document.getElementById("W1B").alt == "check") {counter++}

  if (document.getElementById("W2B").alt == "check") {counter++}

  if (document.getElementById("W3B").alt == "check") {counter++}

  return (counter)
}