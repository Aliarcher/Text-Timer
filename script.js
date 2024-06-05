const textContainer = document.getElementById('text-container');
const text = sessionStorage.getItem('inputText'); // Retrieve the stored text
const words = text ? text.split(' ') : [];
const delayPerWord = 400; // Delay in milliseconds for each word
let wordIndex = 0;
const startTime = parseInt(sessionStorage.getItem('startTime'), 10); // Retrieve the start time

function displayNextWord() {
    if (wordIndex < words.length) {
        // Create a new span element for the word
        const wordElement = document.createElement('span');
        wordElement.textContent = words[wordIndex];
        wordElement.classList.add('word');
        wordElement.id = `word-${wordIndex + 1}`;
        textContainer.appendChild(wordElement);

        // Trigger reflow to restart the animation
        void wordElement.offsetWidth;
        wordElement.classList.add('visible');

        // Check if the word ends with a period
        if (words[wordIndex].endsWith('.')) {
            const brElement = document.createElement('br');
            textContainer.appendChild(brElement);
        }

        wordIndex++;
        setTimeout(displayNextWord, delayPerWord); // 0.4 seconds delay
    } else {
        const endTime = Date.now(); // Record the end time
        const elapsedMilliseconds = endTime - startTime; // Calculate total elapsed time in milliseconds
        sessionStorage.setItem('elapsedTime', elapsedMilliseconds.toString()); // Store the elapsed time
        sendWordData(elapsedMilliseconds / 1000); // Send the word data with total elapsed time in seconds
        window.location.href = 'stopwatch.html'; // Navigate to stopwatch.html
    }
}

function sendWordData(totalTime) {
    const wordElements = document.querySelectorAll('.word');
    const wordData = Array.from(wordElements).map((wordElement, index) => ({
        id: wordElement.id,
        text: wordElement.textContent
    }));

    fetch('http://127.0.0.1:8000/save-word-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ words: wordData, totalTime })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

if (words.length > 0) {
    displayNextWord();
}