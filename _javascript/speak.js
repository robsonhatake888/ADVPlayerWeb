
var supportMsg = document.getElementById('supportMsg');
if ('speechSynthesis' in window) {
    supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
} else {
    supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
    supportMsg.classList.add('not-supported');
}

var voiceSelect = document.getElementById('voices');

var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');

function loadVoices() {
 
    var voices = speechSynthesis.getVoices();

    voices.forEach(function(voice, i) {

        var option = document.createElement('option');
    
    // Set the options value and text.
        option.value = voice.name;
        option.innerHTML = voice.name;
          
    // Add the option to the voice selector.
        voiceSelect.appendChild(option);
    });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
    var msg = new SpeechSynthesisUtterance();

    msg.text = text;
    //msg.volume = $('#volume').val() / 100;
    msg.rate = $('#rate').val() / 10;
    msg.pitch = $('#pitch').val();

    
    if (voiceSelect) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
    }

    window.speechSynthesis.speak(msg);

}



