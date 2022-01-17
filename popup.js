// Removing the function to see how Extension behaves w/ automatically run behavior
console.log("changeYTTemplate script runs EACH TIME I open the window");
let receivedStartTempo;
let startTempoInput = document.querySelector('input#startTempoInput');
chrome.storage.local.get("origTempo", function(origTempo){
  receivedStartTempo = origTempo.origTempo;
  startTempoInput.value = origTempo.origTempo;
});



let submitBtn = document.querySelector("button#submitChange");

submitBtn.addEventListener('click', sayTempo);

function sayTempo(e) {
    e.preventDefault();
    console.log("Clicked button",)
    console.log("Found Start Tempo?", startTempoInput)
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