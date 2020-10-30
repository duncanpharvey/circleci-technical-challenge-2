document.addEventListener('DOMContentLoaded', initializeEventListeners);

function initializeEventListeners() {
    listenForButtonClick();
    listenForMouseMove();
}

function listenForButtonClick() {
    document.querySelector('#button').addEventListener('click', () => {
        const textStyle = document.querySelector('#hidden-text').style;
        textStyle.setProperty('opacity', 1 - textStyle.getPropertyValue('opacity'));
    });
}

function listenForMouseMove() {
    const button = document.querySelector('#button');
    button.style.left = '0px';
    button.style.top = '0px';
    const left_offset = button.offsetLeft;
    const top_offset = button.offsetTop;
    const padding = 30;

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
            button.style.left = `${random(window.innerWidth - (2 * button.offsetWidth) - (4 * padding), button.offsetWidth + (2 * padding)) - left_offset}px`;
            button.style.top = `${random(window.innerHeight - (2 * button.offsetHeight) - (4 * padding), button.offsetHeight + (2 * padding)) - top_offset}px`;
        }
    }

    var timer;

    document.addEventListener('mousemove', (event) => {
        if (timer) window.clearTimeout(timer);

        timer = window.setTimeout(() => {
            var x = event.clientX;
            var y = event.clientY;

            while (
                x > button.offsetLeft - padding &&
                y > button.offsetTop - padding &&
                x < button.offsetLeft + button.offsetWidth + padding &&
                y < button.offsetTop + button.offsetHeight + padding
            ) {
                var centerX = button.offsetLeft + (button.offsetWidth / 2);
                var centerY = button.offsetTop + (button.offsetHeight / 2);
                var dist = Math.sqrt(((centerX - x) ** 2) + ((centerY - y) ** 2));

                button.style.left = `${parseInt(button.style.left.replace('px', '')) + (centerX - x) / (dist / 3)}px`;
                button.style.top = `${parseInt(button.style.top.replace('px', '')) + (centerY - y) / (dist / 3)}px`;
                checkBorders();
            }
        }, 2);
    });
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}