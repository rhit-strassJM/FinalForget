var counter = 0;
var color = "white";
var colorWord = "blah";



function updateView(){
    document.querySelector("#countText").innerHTML = counter;
}

function updateColor(){
	document.querySelector("#colorText").textContent = colorWord;
	document.querySelector("#colorText").style.backgroundColor = color;
}

function main(){
    console.log("Ready");

    document.querySelector("#first").onclick = (event) => {
        counter = counter -1;
        updateView();
    }
    document.querySelector("#second").onclick = (event) => {
        counter = 0;
        updateView();
    }
    document.querySelector("#third").onclick = (event) => {
        counter = counter + 1;
        updateView();
    }

	document.querySelector("#green").onclick = (event) => {
        color = "green";
		colorWord = "Green"
        updateColor();
    }

	document.querySelector("#red").onclick = (event) => {
        color = "red";
		colorWord = "Red"
        updateColor();
    }

	document.querySelector("#purple").onclick = (event) => {
        color = "purple";
		colorWord = "Purple"
        updateColor();
    }

	document.querySelector("#blue").onclick = (event) => {
        color = "blue";
		colorWord = "Blue";
        updateColor();
    }
}

main();