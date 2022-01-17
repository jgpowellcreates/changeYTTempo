*Turning a Functional Script into a Chrome Extension

changeYTTempo.js is a functional script as it stands.
It can be input into the Console on YT pages. If a BPM is listed in the title or description, it saves that speed.
Cross references this time against the user's desired BPM to alter video playback speed.


*Where It Currently Stands
- functional starting file
- Basic Chrome Extension structure setup using https://developer.chrome.com/docs/extensions/mv3/getstarted/
    - This uses a background script and popup.js to set the background color of the current webpage to green.
    - Button styled in tempoStyle.css file
- Experimenting with a 'ytScript.js' file to see what information is grabbed automatically utilizing a Content script
    - Notice in manifest.json that different URL matches can run different scripts! (It's loading an array of content scripts, currently based on matches)

*What's Working
- Content File runs on YouTube pages, confirms w/ console.log and reports what tempos it has grabbed based on the Regex pattern
- No errors w/ manifest file

*What's Next
- Determine structure! What needs to run where and what options does the user need