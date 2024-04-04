// Getting theme button.
const ThemeButton = document.getElementById('theme-button');

// Gettign Body element.
const Body = document.querySelector('body');

// Getting App element.
const App = document.getElementById('app');

// Getting AddButton element.
const AddButton = document.getElementById('add-button');

// Getting Input Elements.
const InputTask = document.getElementById('task');
const TaskDate = document.getElementById('task-date');

/*
    This function validates the input fields and returns true if the input fields are not empty otherwise it returns false.
*/
const Validate = () => {

    if (InputTask.value === `` || TaskDate.value === ``) {
        return false;
    } else {
        return true;
    }
}

/*
    This function adds task in the output container.
*/
const Add = () => {

    // Getting Output Container.
    const OutputConatainer = document.querySelector(`.output-container`);

    // Updating the task in the output container.
    OutputConatainer.innerHTML += `
    <div class="output flex">
        <div class="task-name flex">
            <p>${InputTask.value}</p>
            <p>${TaskDate.value}</p>
        </div>

        <div class="status">Pending</div>

        <div class="action-buttons flex">

            <button id="completed" class="flex"><img src="./images/tick.png" alt="Completed" height="30"></button>

            <button id="delete-btn" class="flex"><img src="./images/delete.png" alt="delete task" height="25"></button>

        </div>
    </div>
    `;

    // Clearing the input fields.
    TaskDate.value = ``;
    InputTask.value = ``;
}

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

AddButton.addEventListener('click', () => {

    if (Validate()) {
        Add();
    }

})