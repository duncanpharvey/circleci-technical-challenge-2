document.addEventListener('DOMContentLoaded', () => {
    listenForButtonClick();
    listenForMouseMove();
});

function listenForButtonClick() {
    document.querySelector('#button').addEventListener('click', () => {
        const text = document.querySelector('#hidden-text');
        text.hidden = !text.hidden; // toggle hidden status of text when button is clicked
    });
}

function listenForMouseMove() {
    const button = document.querySelector('#button');
    const sillyButton = document.querySelector('#silly-button');
    button.style.left = '0px';
    button.style.top = '0px';
    const left_offset = button.offsetLeft;
    const top_offset = button.offsetTop;
    const paddingX = 80;
    const paddingY = 120;
    var total_distance = 0;
    var silly = false;

    startSilliness();

    // show button to stop if threshold distance hasn't been exceeded and 30 seconds have passed
    window.setTimeout(showSillyButton, 30000);

    function startSilliness() {
        if (silly) return;
        document.addEventListener('mousemove', moveButton);
        sillyButton.removeEventListener('click', startSilliness);
        sillyButton.addEventListener('click', stopSilliness);
        button.textContent = 'Click!';
        sillyButton.textContent = 'Stop Silliness!';
        sillyButton.classList = ['stop'];
        silly = true;
    }

    function stopSilliness() {
        if (!silly) return;
        document.removeEventListener('mousemove', moveButton);
        sillyButton.removeEventListener('click', stopSilliness);
        sillyButton.addEventListener('click', startSilliness);
        button.style.left = '0px';
        button.style.top = '0px';
        button.textContent = 'Ok, Click now!';
        sillyButton.textContent = 'Start Silliness!';
        sillyButton.classList = ['start'];
        silly = false;
    }

    function showSillyButton() {
        sillyButton.hidden = false;
    }

    /*
        left = button.offsetLeft
        top = button.offsetTop
        right = button.offsetLeft + button.offsetWidth
        bottom = button.offsetTop + button.offsetHeight
    */

    function moveButton(event) {
        // check if the cursor is inside an ellipse with a width and height of the button (plus padding)
        while (Math.sqrt((((button.offsetLeft + (button.offsetWidth / 2) - event.clientX) ** 2) / ((paddingX + (button.offsetWidth / 2)) ** 2)) + (((button.offsetTop + (button.offsetHeight / 2) - event.clientY) ** 2)) / ((paddingY + (button.offsetHeight / 2)) ** 2)) <= 1) {
            var dist = Math.sqrt(((button.offsetLeft + (button.offsetWidth / 2) - event.clientX)) ** 2 + ((button.offsetTop + (button.offsetHeight / 2) - event.clientY)) ** 2);
            
            // take a step away from the cursor along the imaginary line connecting the center of the button and the cursor
            // scale step based on distance from cursor to center of button (nothing significant about the factor of 3, it seemed to work best)
            var right_step = (button.offsetLeft + (button.offsetWidth / 2) - event.clientX) * 3 / dist;
            var down_step = (button.offsetTop + (button.offsetHeight / 2) - event.clientY) * 3 / dist;

            // reposition button away from cursor
            var left_pos = parseInt(button.style.left.replace('px', '')) + right_step;
            var top_pos = parseInt(button.style.top.replace('px', '')) + down_step;

            button.style.left = `${left_pos}px`;
            button.style.top = `${top_pos}px`;

            // track total distance traveled by the box. Show button to stop once it exceeds the threshold
            total_distance += Math.sqrt((right_step ** 2) + (down_step ** 2));
            if (total_distance > 2000 && sillyButton.hidden) showSillyButton();


            // send the button back to the middle of the screen if it disappears across any of the window borders
            if (button.offsetLeft >= window.innerWidth ||
                button.offsetTop >= window.innerHeight ||
                button.offsetLeft + button.offsetWidth <= 0 ||
                button.offsetTop + button.offsetHeight <= 0) {
                button.style.left = `${random(window.innerWidth - button.offsetWidth - (2 * paddingX), button.offsetWidth + (2 * paddingX)) - left_offset}px`;
                button.style.top = `${random(window.innerHeight - button.offsetHeight - (2 * paddingY), button.offsetHeight + (2 * paddingY)) - top_offset}px`;
            }
        }
    }
}

// generate a random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}