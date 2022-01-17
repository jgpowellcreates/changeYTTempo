function changeTempoTo(input) {
    let endingTempo = input;
    let startingTempo = 0;
    let grabTitle = document.querySelector('.title > yt-formatted-string').innerHTML;
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

    let altPlayback = (endingTempo/startingTempo).toString().substring(0,6);
    document.querySelector('video').playbackRate = altPlayback;
    let userFeedback = console.log("Starting tempo:",startingTempo); console.log("You wanted to play at:", endingTempo); console.log(`Speed Adjusted to ${altPlayback} the original speed.`)
    return userFeedback
}