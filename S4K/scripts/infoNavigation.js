let materials=["Wooden", "Rubber", "Plastic"];
let shapes=["Short neck", "Open wing", "Long neck"];
let shapeInformation = [
    "This shape produces more air and water resistance than other ducky shapes because it has large area (it is Big!).  Less area means less resistance!",
    "This shape produces more air and water resistance than other ducky shapes because it has large area (it is Big!).  Less area means less resistance! ",
    "A duck with this shape offers least air and water resistance as it has the least frontal area (most aerodynamically efficient shape)"
]
let matlInformation = [
    "Wood is least dense of material of the three options. ",
    "Rubber is heaviest (most dense) among the three material options. ",
    "Plastic is heavier than wood but lighter than rubber. "
]
let videoPath=[
    "../S4K/media/Duck-1.mp4",
    "../S4K/media/Duck-3.mp4",
    "../S4K/media/Duck-2.mp4"
]
function showInfo(matl, shape)
{
    document.getElementById("itemTitle").innerHTML= materials[matl]+" "+shapes[shape];
    document.getElementById("shapeInfo").innerHTML= shapeInformation[shape];
    document.getElementById("matlInfo").innerHTML= matlInformation[matl];
    document.getElementById("genInfo").innerHTML="All the ducks start the race with the same amount of energy imparted to them by the “catapult”. Thus, the lightest duck will start with the largest initial velocity. Assuming no losses, this means elastic energy of the catapult gets converted to kinetic energy for the duck";
    document.getElementById("eqtn").style.visibility = "visible";
    document.getElementById("simVid").src= videoPath[shape];
    document.getElementById("simVid").style.visibility = "visible";
}