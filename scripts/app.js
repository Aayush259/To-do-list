// Getting theme button.
const ThemeButton = document.getElementById('theme-button');

// Gettign Body element.
const Body = document.querySelector('body');

// Getting App element.
const App = document.getElementById('app');

// Getting AddButton element.
const AddButton = document.getElementById('add-button');

// Adding click event listener to ThemeButton so that when it is clicked the theme of the app changes.
ThemeButton.addEventListener('click', () => {

    // Getting the themeImage inside the theme button.
    let themeImage = ThemeButton.querySelector('img');

    // Changing the theme icon when the theme is changed.
    if (themeImage.src.includes('theme1')) {
        themeImage.src = './images/theme2.png';
    } else {
        themeImage.src = './images/theme1.png';
    }

    // Creating an array of all elements which are responsible to change the theme.
    const ArrayOfThemeElements = [Body, App, AddButton];

    // Changing theme using for loop and toggling the class 'active' to the elements present in ArrayOfThemeElements.
    ArrayOfThemeElements.forEach(element => {
        element.classList.toggle('active');
    });
})