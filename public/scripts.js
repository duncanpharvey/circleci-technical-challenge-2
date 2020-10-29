document.addEventListener('DOMContentLoaded', listenForButtonClick);

function listenForButtonClick() {
    document.querySelector('#button').addEventListener('click', () => {
        const textStyle = document.querySelector('#hidden-text').style;
        textStyle.setProperty('opacity', 1 - textStyle.getPropertyValue('opacity'));
    });
}