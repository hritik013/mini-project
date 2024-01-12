// s.js (Speech-to-Text)
document.addEventListener('DOMContentLoaded', function () {
    const startConversionButton = document.getElementById('start_conversion');
    const convertedText = document.getElementById('converted_text');

    if (!startConversionButton || !convertedText) {
        console.error('Missing start button or converted text element.');
        return;
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.interimResults = true;

        recognition.onresult = function (event) {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            convertedText.value = transcript;
            console.log(transcript);
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
        };

        startConversionButton.addEventListener('click', function () {
            try {
                recognition.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
            }
        });
    } else {
        console.error('Web Speech API is not supported in this browser.');
    }
});
