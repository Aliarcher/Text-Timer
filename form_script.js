document.getElementById("input-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    const text = document.getElementById('text-input').value;
    sessionStorage.setItem('inputText', text); // Store the input text in sessionStorage
    sessionStorage.setItem('startTime', Date.now().toString()); // Store the start time
    window.location.href = 'index.html'; // Navigate to index.html
});