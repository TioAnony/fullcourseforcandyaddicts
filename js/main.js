function changeButtonToPressed() {
    var unpressedButton = "file:///F:/Fabricio/git/fullcourseforcandyaddicts/images/unpressedbutton.png";
    var pressedButton = "file:///F:/Fabricio/git/fullcourseforcandyaddicts/images/pressedbutton.png";

    if (document.getElementById("buttonImage").src == unpressedButton) {
        document.getElementById("buttonImage").src = pressedButton;
        window.setTimeout(changeButtonToUnpressed, 100);
    }
}

function changeButtonToUnpressed() {
    var unpressedButton = "file:///F:/Fabricio/git/fullcourseforcandyaddicts/images/unpressedbutton.png";
    var pressedButton = "file:///F:/Fabricio/git/fullcourseforcandyaddicts/images/pressedbutton.png";
    
    if (document.getElementById("buttonImage").src == pressedButton) {
        document.getElementById("buttonImage").src = unpressedButton;
    }
}