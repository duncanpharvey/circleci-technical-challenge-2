document.addEventListener('DOMContentLoaded', () => {
    listenForButtonClick();
    listenForMouseMove();
});

function listenForButtonClick() {
    document.querySelector('#button-to-click').addEventListener('click', () => {
        const text = document.querySelector('#hidden-text');
        text.hidden = !text.hidden; // toggle hidden status of text when button is clicked
    });
}

function listenForMouseMove() {
    const buttonToClick = document.querySelector('#button-to-click');
    const sillyToggleButton = document.querySelector('#silly-toggle-button');
    buttonToClick.style.left = '0px';
    buttonToClick.style.top = '0px';
    const leftOffset = buttonToClick.offsetLeft;
    const topOffset = buttonToClick.offsetTop;
    const paddingX = 80;
    const paddingY = 120;
    var totalDistance = 0;
    var silly = false;

    const timeThreshold = 20000;
    const distanceThreshold = 2000;

    startSilliness();

    // show button to stop if threshold distance hasn't been exceeded and time threshold has passed
    window.setTimeout(showSillyToggleButton, timeThreshold);

    function startSilliness() {
        if (silly) return;
        document.addEventListener('mousemove', moveButton);
        sillyToggleButton.removeEventListener('click', startSilliness);
        sillyToggleButton.addEventListener('click', stopSilliness);
        buttonToClick.textContent = 'Click!';
        sillyToggleButton.textContent = 'Stop Silliness!';
        sillyToggleButton.classList = ['stop'];
        silly = true;
    }

    function stopSilliness() {
        if (!silly) return;
        document.removeEventListener('mousemove', moveButton);
        sillyToggleButton.removeEventListener('click', stopSilliness);
        sillyToggleButton.addEventListener('click', startSilliness);
        buttonToClick.style.left = '0px';
        buttonToClick.style.top = '0px';
        buttonToClick.textContent = 'Ok, Click now!';
        sillyToggleButton.textContent = 'Start Silliness!';
        sillyToggleButton.classList = ['start'];
        silly = false;
    }

    function showSillyToggleButton() {
        sillyToggleButton.hidden = false;
    }

    /*
        left = button.offsetLeft
        top = button.offsetTop
        right = button.offsetLeft + button.offsetWidth
        bottom = button.offsetTop + button.offsetHeight
    */

    function moveButton(event) {
        // check if the cursor is inside an ellipse with a width and height of the button (plus padding)
        while (Math.sqrt((((buttonToClick.offsetLeft + (buttonToClick.offsetWidth / 2) - event.clientX) ** 2) / ((paddingX + (buttonToClick.offsetWidth / 2)) ** 2)) + (((buttonToClick.offsetTop + (buttonToClick.offsetHeight / 2) - event.clientY) ** 2)) / ((paddingY + (buttonToClick.offsetHeight / 2)) ** 2)) <= 1) {
            var dist = Math.sqrt(((buttonToClick.offsetLeft + (buttonToClick.offsetWidth / 2) - event.clientX)) ** 2 + ((buttonToClick.offsetTop + (buttonToClick.offsetHeight / 2) - event.clientY)) ** 2);
            
            // take a step away from the cursor along the imaginary line connecting the center of the button and the cursor
            // scale step based on distance from cursor to center of button (nothing significant about the factor of 3, it seemed to work best)
            var rightStep = (buttonToClick.offsetLeft + (buttonToClick.offsetWidth / 2) - event.clientX) * 3 / dist;
            var downStep = (buttonToClick.offsetTop + (buttonToClick.offsetHeight / 2) - event.clientY) * 3 / dist;

            // reposition button away from cursor
            var leftPos = parseInt(buttonToClick.style.left.replace('px', '')) + rightStep;
            var topPos = parseInt(buttonToClick.style.top.replace('px', '')) + downStep;

            buttonToClick.style.left = `${leftPos}px`;
            buttonToClick.style.top = `${topPos}px`;

            // track total distance traveled by the box. Show button to stop once it exceeds the threshold
            totalDistance += Math.sqrt((rightStep ** 2) + (downStep ** 2));
            if (totalDistance > distanceThreshold && sillyToggleButton.hidden) showSillyToggleButton();


            // send the button back to the middle of the screen if it disappears across any of the window borders
            if (buttonToClick.offsetLeft >= window.innerWidth ||
                buttonToClick.offsetTop >= window.innerHeight ||
                buttonToClick.offsetLeft + buttonToClick.offsetWidth <= 0 ||
                buttonToClick.offsetTop + buttonToClick.offsetHeight <= 0) {
                buttonToClick.style.left = `${random(window.innerWidth - buttonToClick.offsetWidth, 0) - leftOffset}px`;
                buttonToClick.style.top = `${random(window.innerHeight - buttonToClick.offsetHeight, 0) - topOffset}px`;
            }
        }
    }
}

// generate a random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}