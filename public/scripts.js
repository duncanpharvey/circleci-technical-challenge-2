document.addEventListener('DOMContentLoaded', () => {
    listenForButtonClick();
    listenForMouseMove();
});

function listenForButtonClick() {
    document.querySelector('#button').addEventListener('click', () => {
        const text = document.querySelector('#hidden-text');
        text.hidden = !text.hidden;
    });
}

function listenForMouseMove() {
    const button = document.querySelector('#button');
    const sillyButton = document.querySelector('#silly-button');
    button.style.left = '0px';
    button.style.top = '0px';
    const left_offset = button.offsetLeft;
    const top_offset = button.offsetTop;
    const paddingX = 40;
    const paddingY = 70;
    var total_distance = 0;
    var silly = false;

    function startSilliness() {
        if (silly) return;
        document.addEventListener('mousemove', moveButton);
        sillyButton.addEventListener('click', stopSilliness);
        sillyButton.removeEventListener('click', startSilliness);
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

    startSilliness();
    window.setTimeout(showSillyButton, 30000);

    /*
        left = button.offsetLeft
        top = button.offsetTop
        right = button.offsetLeft + button.offsetWidth
        bottom = button.offsetTop + button.offsetHeight
    */

    function checkBorders() {
        if (
            button.offsetLeft < 0 ||
            button.offsetTop < 0 ||
            button.offsetLeft + button.offsetWidth > window.innerWidth ||
            button.offsetTop + button.offsetHeight > window.innerHeight) {
            button.style.left = `${random(window.innerWidth - (2 * button.offsetWidth) - (4 * paddingX), button.offsetWidth + (2 * paddingX)) - left_offset}px`;
            button.style.top = `${random(window.innerHeight - (2 * button.offsetHeight) - (4 * paddingY), button.offsetHeight + (2 * paddingY)) - top_offset}px`;
        }
    }

    var timer;
    function moveButton(event) {
        if (timer) window.clearTimeout(timer);

        timer = window.setTimeout(() => {
            if (Math.sqrt((((button.offsetLeft + (button.offsetWidth / 2) - event.clientX) ** 2) / ((paddingX + (button.offsetWidth / 2)) ** 2)) + (((button.offsetTop + (button.offsetHeight / 2) - event.clientY) ** 2)) / ((paddingY + (button.offsetHeight / 2)) ** 2)) <= 1) {
                var centerX = button.offsetLeft + (button.offsetWidth / 2);
                var centerY = button.offsetTop + (button.offsetHeight / 2);
                var distance = Math.sqrt(((centerX - event.clientX) ** 2) + ((centerY - event.clientY) ** 2));

                var right_step = (centerX - event.clientX) / ((distance / 2) ** 1 / 2);
                var down_step = (centerY - event.clientY) / ((distance / 6) ** 1 / 2);

                var left_pos = parseInt(button.style.left.replace('px', '')) + right_step;
                var top_pos = parseInt(button.style.top.replace('px', '')) + down_step;

                total_distance += Math.sqrt((right_step ** 2) + (down_step ** 2));
                if (total_distance > 2000 && sillyButton.hidden) showSillyButton();

                button.style.left = `${left_pos}px`;
                button.style.top = `${top_pos}px`;
            }
        }, 2);
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}