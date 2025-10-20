document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById('clickMe');

    if (myButton) {
        myButton.addEventListener('click', () => {
            alert('Button clicked!');
            console.log('Button was clicked.');
        });
    }
});