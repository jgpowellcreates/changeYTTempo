# Change Tempo App
## Turning a Functional Script into a Chrome Extension

changeYTTempo.js is a functional script as it stands.
It can be input into the Console on YT pages. If a BPM is listed in the title or description, it saves that speed.
Cross references this time against the user's desired BPM to alter video playback speed.


### Where It Currently Stands
- functional starting file
- Basic Chrome Extension structure setup using https://developer.chrome.com/docs/extensions/mv3/getstarted/
    - This uses a background script and popup.js to set the background color of the current webpage to green.
    - Button styled in tempoStyle.css file
- Experimenting with a 'ytScript.js' file to see what information is grabbed automatically utilizing a Content script
    - Notice in manifest.json that different URL matches can run different scripts! (It's loading an array of content scripts, currently based on matches)

### What's Working
- Content File runs on YouTube pages, confirms w/ console.log and reports what tempos it has grabbed based on the Regex pattern
- No errors w/ manifest file

#### Important Tidbits for This Project
- The Background Page is a page that lives forever for the life time of your extension.
- The popup page only lives when you click on the popup.
- Data should be structured to reflect this layout!
    - Data for Background Page:
        - Starting Tempo for Page
        - Saved Pages
    - Data for Popup Page:
        - Desired Tempo

- The popup can then access the background page using: `chrome.extension.getBackgroundPage()`
    - Since the background page logs to a different console, is it able to grab info from the DOM?

#### Lifecycle Info & Available Data
- Background page code runs as the 'backend'. It informs the popup and can tinker w/ the Chrome API
- Content Scripts run in the web browser. Mine is currently only setup to run automatically on YouTube URLS
    - Can you change when these are run from inside the manifest?
- Your HTML popup can run scripts - but it becomes the DOM that it will reference.

Therefore, the actualy JavaScript code written in changeYTTempo.js is useless since it can't grab BPM information from the window's DOM.

### What's Next
- Determine structure! What needs to run where and what options does the user need
- Looking into the Chrome API will help understand where to grab what and how to pass between files
- First MVP will only function for YouTube videos where BPM is specified in Title or Description
**Steps**
- [x] Complete Popup UI
    - [x] Title
    - [x] 2 Input Fields (one should be ready to auto-populate)
    - [x] Submit Button
- [x] Pass Info to PopUp - upon Page load, Content Script should run and send 'BPM' or 'false' to popup
    - [x] Check for URL so that 'ytScript' will run on new pages. (Needs to consider SPA setup?)
- [x] Accept User Inputs
- [x] Pass User Inputs to Window
- [ ] Try accessing Spotify's API for BPM Check as a first step - https://developer.spotify.com/documentation/web-api/reference/#/
- [ ] Try accessing SongBPM for BPM Check - https://songbpm.com/searches/1c5626f0-0cb6-49c3-a61a-cd487d08032a
