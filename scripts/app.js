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

    // Getting all delete buttons.
    const DeleteBtn = document.querySelectorAll('#delete-btn');

    // Adding event listeners to each buttons so that when it is clicked then remove that list item from the output-container.
    DeleteBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.closest('.output').remove();
        })
    });

    // Getting all buttons which will mark the task as completed.
    const CompletedBtn = document.querySelectorAll('#completed');

    // Adding event listener to each CompletedBtn so that when it is clicked, then it toggles the status between completed and pending and also toggles the image of the button respectively.
    CompletedBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            const Status = button.parentElement.previousElementSibling;

            if (button.querySelector('img').src.includes('tick')) {
                button.querySelector('img').src = `./images/cross.png`;
                Status.innerHTML = `Completed`;
            } else {
                button.querySelector('img').src = `./images/tick.png`;
                Status.innerHTML = `Pending`;
            }
        })
    })
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