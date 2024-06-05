const elapsedMilliseconds = parseInt(sessionStorage.getItem('elapsedTime'), 10);

// Check if the elapsedMilliseconds is a valid number
if (!isNaN(elapsedMilliseconds)) {
    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedMilliseconds % 1000) / 10); // Adjust to display two-digit milliseconds

    document.getElementById('hr').innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById('min').innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById('sec').innerHTML = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById('count').innerHTML = milliseconds < 10 ? "0" + milliseconds : milliseconds;
} else {
    console.error("Invalid elapsed time");
}