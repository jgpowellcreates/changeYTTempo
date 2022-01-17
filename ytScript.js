//This script runs on each page (where it's allowed).
//The manifest determines that this particular script will run each time that a video on YouTube is played.
//The script handles a few important elements
// 1) It checks for page changes to see if it needs to update information
// 2) It searches the site's contents to look for a BPM pattern in the title/description
// 3) It saves tempo information to local storage
// 4) It waits to receive a message from the Extension popup.

//1 - Checking for Page Changes
let previousUrl;
const observer = new MutationObserver(function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        handleUpdate(); // If there's a new page, run the updates!
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config)

//2 - Check for Updates
function handleUpdate() {
    setTimeout(grabInfo, 500)   //Anytime that the function is called (new page), we give it a second to let the DOM update

    function grabInfo() {
        let startingTempo = 0;
        let grabTitle = document.querySelector('.title > yt-formatted-string').innerText;
        let grabDesc = document.querySelector('#description > yt-formatted-string.content').children;
        let bpmRegex = /\d{2,3}(?= ?bpm)/i;
        let titleResult = grabTitle.match(bpmRegex);
        let descResult;
        if (!titleResult) {
            for (lines of grabDesc) {
                let descBpm = lines.innerHTML.match(bpmRegex);
                if (descBpm) {descResult = descBpm}
            }
        }
        if (titleResult) {
            startingTempo = titleResult[0]
        } else if (descResult) {
            startingTempo = descResult[0]
        }
    
        console.log("Starting Tempo:", startingTempo,
                    "Title Result:", titleResult ? titleResult : "Tempo N/A in Title",
                    "Description Result:", descResult ? descResult[0] : "Tempo N/A in Description");
    
        //3 - Information is saved to Chrome's local storage. It doesn't need to last long! Only for 1 page!
        chrome.storage.local.set({"origTempo":startingTempo}, function(){
            console.log("Starting Tempo of", startingTempo, "saved to Chrome storage")
        });
    }
}

//4 - It waits to see if it receives a message from the PopUp file.
// THIS PORTION STILL NEEDS TO BE CLEANED UP.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
    
        console.log("Going to alter speed to: "+request.playbackAlt);
        document.querySelector('video').playbackRate = request.playbackAlt;
    
        sendResponse({farewell: "I'm good, thank you popup!"});
    });