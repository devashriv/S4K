let materials=["wood", "rubber", "plastic"];
let shapes=["Shape1", "Shape2", "Shape3"];

function showInfo(matl, shape)
{
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

function getInfo(matl,shape)
{

    return materials[matl]+" "+shapes[shape] ;
}