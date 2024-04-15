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

let currentId = [0];
let currentIdValue = 0;

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
    This function  returns the index of child inside its parent.
*/
const GetChildIndex = (parent, child) => {
    const Children = Array.from(parent.children)
    return Children.indexOf(child);
}

/*
    This function adds task in the output container.
*/
const Add = (task, date, status) => {

    // If the value of input task or task date is null then do nothing and return nothing.
    if (task === null || date === null) {
        return;
    }

    // Getting Output Container.
    const OutputConatainer = document.querySelector(`.output-container`);

    let image = `./images/tick.png`;

    if (status === `Completed`) {
        image = `./images/cross.png`;
    }

    // Updating the task in the output container.
    if (task) {
        OutputConatainer.innerHTML += `
        <div class="output flex">
            <div class="task-name flex">
                <p>${task}</p>
                <p>${date}</p>
            </div>

            <div class="status">${status}</div>

            <div class="action-buttons flex">

                <button id="completed" class="flex"><img src="${image}" alt="Completed" height="30"></button>

                <button id="delete-btn" class="flex"><img src="./images/delete.png" alt="delete task" height="25"></button>

            </div>
        </div>`
    } else {
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
    }

    // Clearing the input fields.
    TaskDate.value = ``;
    InputTask.value = ``;

    // Getting all delete buttons.
    const DeleteBtn = document.querySelectorAll('#delete-btn');

    // Adding event listeners to each buttons so that when it is clicked then remove that list item from the output-container.
    DeleteBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            // Getting the index of the element inside its parent element which is to be removed.
            const RemovingChildIndex = GetChildIndex(document.querySelector('.output-container'), event.target.closest('.output')) - 1;

            // If the index is 0 then remove it from local storage.
            if (RemovingChildIndex === 0) {
                localStorage.removeItem(`task${RemovingChildIndex}`);
                localStorage.removeItem(`date${RemovingChildIndex}`);
                localStorage.removeItem(`status${RemovingChildIndex}`);
            }

            // Setting the task and date keys in localStorage object to the previous index from the deleted element index so that the flow of the array does not break.
            for (let i = RemovingChildIndex; i < currentId.length; i++) {
                const Task = localStorage.getItem(`task${i+1}`);
                const Date = localStorage.getItem(`date${i+1}`);
                const Status = localStorage.getItem(`status${i+1}`);

                if (Task !== null) {
                    localStorage.setItem(`task${RemovingChildIndex}`, `${Task}`);
                    localStorage.setItem(`date${RemovingChildIndex}`, `${Date}`);
                    localStorage.setItem(`status${RemovingChildIndex}`, `${Status}`);
                }
            }

            // Removing the last element from currentId array.
            currentId.pop(currentId.length);

            // Decreasing the value of currentIdValue by one.
            currentIdValue--;

            // Updating the last task and date keys from localStorage as they are the copy of their previous keys respectively.
            localStorage.removeItem(`task${currentId.length - 1}`);
            localStorage.removeItem(`date${currentId.length - 1}`);
            localStorage.removeItem(`status${currentId.length - 1}`);

            // Updating the currentIdValue in local storage.
            localStorage.setItem(`currentIdValue`, `${currentIdValue}`);

            // Finally removing the task from screen.
            event.target.closest('.output').remove();
        })
    });

    // Getting all buttons which will mark the task as completed.
    const CompletedBtn = document.querySelectorAll('#completed');

    // Adding event listener to each CompletedBtn so that when it is clicked, then it toggles the status between completed and pending and also toggles the image of the button respectively.
    CompletedBtn.forEach(button => {
        button.addEventListener('click', (event) => {
            const Status = button.parentElement.previousElementSibling;

            const CompletedChildIndex = GetChildIndex(document.querySelector('.output-container'), event.target.closest('.output')) - 1;

            if (button.querySelector('img').src.includes('tick')) {
                button.querySelector('img').src = `./images/cross.png`;
                Status.innerHTML = `Completed`;
                localStorage.setItem(`status${CompletedChildIndex}`, `Completed`);
            } else {
                button.querySelector('img').src = `./images/tick.png`;
                Status.innerHTML = `Pending`;
                localStorage.setItem(`status${CompletedChildIndex}`, `Pending`);
            }
        })
    })
}

/*
    This function changes the theme of app when called.
*/
const ChangeTheme = () => {

    // Getting the themeImage inside the theme button.
    let themeImage = ThemeButton.querySelector('img');

    // Changing the theme icon when the theme is changed and store the preferred theme of user in local storage.
    if (themeImage.src.includes('theme1')) {
        themeImage.src = './images/theme2.png';
        localStorage.setItem('theme', 'dark');
    } else {
        themeImage.src = './images/theme1.png';
        localStorage.setItem('theme', 'light');
    }

    // Creating an array of all elements which are responsible to change the theme.
    const ArrayOfThemeElements = [Body, App, AddButton];

    // Changing theme using for loop and toggling the class 'active' to the elements present in ArrayOfThemeElements.
    ArrayOfThemeElements.forEach(element => {
        element.classList.toggle('active');
    });
}

// -------- Flow starts from here ----------

// Set the app theme according the previous user preference.
if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'dark') {
        ChangeTheme();
    }
} else {
    localStorage.setItem('theme', 'light');
}

// Sets the currentIdValue according to the previous user preference.
if (localStorage.getItem('currentIdValue')) {

    currentIdValue = parseInt(localStorage.getItem('currentIdValue'));

    // Updating the currentId array.
    for (let i = 0; i <= currentIdValue; i++) {
        currentId[i] = i;
    }

    // Updating the task list based on previous added tasks by the user.
    for (let i = 0; i <= currentIdValue; i++) {
        const Task = localStorage.getItem(`task${i}`);
        const Date = localStorage.getItem(`date${i}`);
        const Status = localStorage.getItem(`status${i}`);
        Add(Task, Date, Status);
    }
} else {
    localStorage.setItem('currentIdValue', `0`);
}

// Adding click event listener to ThemeButton so that when it is clicked the theme of the app changes.
ThemeButton.addEventListener('click', ChangeTheme);

AddButton.addEventListener('click', () => {

    if (Validate()) {
        // Add task and date in local storage.
        localStorage.setItem(`task${currentId[currentId.length - 1]}`, `${InputTask.value}`);
        localStorage.setItem(`date${currentId[currentId.length - 1]}`, `${TaskDate.value}`);
        localStorage.setItem(`status${currentId[currentId.length - 1]}`, `Pending`);

        // Updating the currentId array and currentIdValue.
        currentId.push(currentId.length);
        currentIdValue++;

        // Updatin the currentIdValue in local storage.
        localStorage.setItem('currentIdValue', `${currentIdValue}`);

        // Finally adding the task in list.
        Add();
    }

})