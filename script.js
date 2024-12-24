let countdownInterval;
let isMusicPlaying = false; // Track if music is playing

// Handle Background Music
const backgroundMusic = document.getElementById('background-music');
const toggleMusicButton = document.getElementById('toggle-music');

// Function to play background music
function playMusic() {
  if (!isMusicPlaying) {
    backgroundMusic.play().then(() => {
      isMusicPlaying = true;
      toggleMusicButton.textContent = '🔊'; // Update button icon
    }).catch(error => {
      console.error("Background music could not be played.", error);
    });
  }
}

// Toggle Music Button
toggleMusicButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    toggleMusicButton.textContent = '🔇'; // Change icon to muted
    isMusicPlaying = false;
  } else {
    playMusic();
  }
});

// Countdown Functionality
function updateCountdown(testDate) {
  const philippinesTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
  const now = testDate ? new Date(testDate) : new Date(philippinesTime);
  const christmas = new Date(now.getFullYear(), 11, 25); // December 25

  if (now.getMonth() === 11 && now.getDate() > 25) {
    christmas.setFullYear(christmas.getFullYear() + 1); // Next year's Christmas
  }

  const totalSeconds = Math.floor((christmas - now) / 1000);

  if (totalSeconds <= 0) {
    clearInterval(countdownInterval); // Stop the interval
    goToGreetingPage();
    return;
  }

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor((totalSeconds / 3600) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

function goToGreetingPage() {
  const countdownContainer = document.getElementById('countdown-container');
  const greetingPage = document.getElementById('greeting-page');

  // Hide the countdown container
  countdownContainer.style.display = "none";

  // Show the greeting page
  greetingPage.classList.remove('hidden');

  // Start fireworks
  startFireworks();

  // Play music
  playMusic();
}

function startFireworks() {
  const container = document.getElementById('fireworks-canvas');
  const fireworks = new Fireworks(container, {
    autoresize: true,
    acceleration: 1.05,
    friction: 0.98,
    gravity: 1.5,
    particles: 70,
    trace: 3,
    explosion: 6,
    boundaries: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
  });
  fireworks.start();
  setTimeout(() => fireworks.stop(), 20000); // Stop fireworks after 20 seconds
}

document.getElementById('test-button').addEventListener('click', () => {
  const testDate = document.getElementById('test-date').value;
  if (testDate) {
    const testDateObj = new Date(testDate);
    if (testDateObj.getMonth() === 11 && testDateObj.getDate() === 25) {
      clearInterval(countdownInterval); // Stop the countdown interval
      goToGreetingPage(); // Trigger the greeting page
    } else {
      alert('The test date must be December 25 to trigger the fireworks and music!');
    }
  } else {
    alert('Please select a test date.');
  }
});

// Start the countdown interval
countdownInterval = setInterval(() => updateCountdown(), 1000);

// Initial call to set the correct time
updateCountdown();
