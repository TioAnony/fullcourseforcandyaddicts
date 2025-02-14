function changeButtonToPressed() {
    var unpressedButton = "http://localhost:8000/images/unpressedbutton.png";
    var pressedButton = "http://localhost:8000/images/pressedbutton.png";

    if (document.getElementById("buttonImage").src == unpressedButton) {
        document.getElementById("buttonImage").src = pressedButton;
        window.setTimeout(changeButtonToUnpressed, 100);
    }
}

function changeButtonToUnpressed() {
    var unpressedButton = "http://localhost:8000/images/unpressedbutton.png";
    var pressedButton = "http://localhost:8000/images/pressedbutton.png";
    
    if (document.getElementById("buttonImage").src == pressedButton) {
      document.getElementById("buttonImage").src = unpressedButton;
      document.getElementById("mainText").style.visibility = "hidden";

      if (document.getElementById("curiosityText") && !document.getElementById("enoughText")) {
        document.getElementById("curiosityText").style.display = "none";
        addEnoughText();
      } else if (!document.getElementById("curiosityText")) {
        getWord();
      }
    }
}

function getWord() {
  var file = "http://localhost:8000/files/words.txt";

  fetch(file).then(function (response) {
      return response.text();
    }).then(function (text) {
      var wordsArray = text.split(', ');
      var min = 0;
      var max = wordsArray.length - 1;
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      var selectedWord = wordsArray[randomNumber];

      console.log(selectedWord);

      callAPI(selectedWord);
    }).catch(function (error) {
      console.error("Error:", error);
    });
}

function callAPI(selectedWord) {
  var apiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + selectedWord + "&formatversion=2&exsentences=1&exlimit=1&explaintext=1";

  fetch(apiUrl, {
    method: 'GET'
  }).then(function(response) {
      return response.json();
    }).then(function (data) {
        addCuriosityText(data);
    }).catch(function (error) {
        console.error('Error:', error);
    });;
}

function addCuriosityText(data) {
  var newText = document.createElement("h1");
  var curiosityText = data.query.pages[0].extract;

  console.log(curiosityText);

  newText.classList.add("text");
  newText.setAttribute("id", "curiosityText");
  document.querySelector(".content").appendChild(newText);

  var newTextBackground = document.createElement("span");

  newTextBackground.classList.add("textBackground");
  newTextBackground.textContent = curiosityText;
  document.querySelector("#curiosityText").appendChild(newTextBackground);
}

function addEnoughText() {
  var newText = document.createElement("h1");

  newText.classList.add("text");
  newText.setAttribute("id", "enoughText");
  document.querySelector(".content").appendChild(newText);

  var newTextBackground = document.createElement("span");

  newTextBackground.classList.add("textBackground");
  newTextBackground.textContent = "That's enough for you!";
  document.querySelector("#enoughText").appendChild(newTextBackground);
}