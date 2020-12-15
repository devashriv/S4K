let materials=["Wooden", "Rubber", "Plastic"];
let shapes=["Short neck", "Open wing", "Long neck"];
let shapeInformation = [
    "A duck with this shape offers more air and water resistance than one of the other options due to its large frontal area",
    "A duck with this shape offers the most air and water resistance as it has the largest frontal area",
    "A duck with this shape offers least air and water resistance as it has the least frontal area (most aerodynamically efficient shape)"
]
let matlInformation = [
    "This is the least dense of the materials and thus for the same volume of the duck, building it out of wood will make it lighter than the other options",
    "This is the densest material here and thus a duck made of rubber will be the heaviest option",
    "This is the second least dense of the materials and building a duck of plastic will make it heavier than wood but lighter than rubber"
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