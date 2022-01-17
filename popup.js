// Removing the function to see how Extension behaves w/ automatically run behavior
console.log("changeYTTemplate script runs EACH TIME I open the window");
let receivedStartTempo;
let userTempo;
let startTempoInput = document.querySelector('input#startTempoInput');
chrome.storage.local.get("origTempo", function(origTempo){
  receivedStartTempo = origTempo.origTempo;
  startTempoInput.value = origTempo.origTempo;
});

let userTempoInput = document.querySelector('input#endTempoInput');
userTempoInput.addEventListener('change', updateUserInput);

function updateUserInput(e) {
  e.preventDefault();
  userTempo = userTempoInput.value;
}

let submitBtn = document.querySelector("button#submitChange");
submitBtn.addEventListener('click', btnClick);

let custPlaybackRate = document.querySelector('#playbackInfo > span');
let playbackInfo = document.querySelector("#playbackInfo");

function btnClick(e,tab) {
  e.preventDefault();
  console.log(e,tab)
  let newTempo = (userTempo/startTempoInput.value).toString().substring(0,6);
  custPlaybackRate.innerHTML = newTempo;
  updatePlaybackInfo();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(tabs.length == 0){ 
        console.log("could not send mesage to current tab");
    }else{
        chrome.tabs.sendMessage(tabs[0].id, {"playbackAlt": custPlaybackRate.innerHTML}, function(response) {
            console.log("received message from content script: "+response.farewell);
        });
    }
});
}

function updatePlaybackInfo() {
  custPlaybackRate = document.querySelector('#playbackInfo > span');
  if (custPlaybackRate.innerText != 1) {
    playbackInfo.style.display = "block";
  } else {
    playbackInfo.style.display = "none";
  }
}

//Chrome Set Up Information Below

// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });
//   });
  
//   // The body of this function will be executed as a content script inside the
//   // current page
//   function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({ color }) => {
//       document.body.style.backgroundColor = color;
//     });
//   }