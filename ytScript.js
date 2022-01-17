//Confirming the extension content script fires!
console.log("ytScript (default content script) is running")
//Pulling a small chunk of changeYTTempo.js file to see how script runs on YT page
//Let's see what we're grabbing first
//window.onload = (event) => {event.preventDefault(); setTimeout(() => {grabInfo()},500)}

let previousUrl;
const observer = new MutationObserver(function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        handleUpdate();
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config)

function handleUpdate() {
    setTimeout(grabInfo, 1000)

    function grabInfo() {
        console.log('grabbing info!')
        let startingTempo = 0;
        let grabTitle = document.querySelector('.title > yt-formatted-string').innerText;
        let grabDesc = document.querySelector('#description > yt-formatted-string.content')//.children;
        let bpmRegex = /\d{2,3}(?= ?bpm)/i;
        let titleResult = grabTitle.match(bpmRegex);
        let descResult;
        if (!titleResult) {
            for (lines of grabDesc.children) {
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
    
        chrome.storage.local.set({"origTempo":startingTempo}, function(){
            console.log("Starting Tempo of", startingTempo, "saved to Chrome storage")
        });
    }
}