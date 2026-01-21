let addTaskbtn = document.getElementById("addTaskBtn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
addTaskbtn.addEventListener("click", function() {
    let box = document.createElement("div");
    box.className = "taskBox";
    box.innerHTML = `
    <button class="closeBtn">X</button>
    <h2>Add New Task</h2>
    <div class="inputs">
        <input type="text" title="Task Title" id="name" placeholder="Task Title" class="taskTitle"/>
        <input type="time" title="Set Time" id="time" placeholder="Set Time" class="taskTime"/>
        <input type="date" title="Set Date" id="date" placeholder="Set Date" class="taskDate"/>
    </div>
    <button id="btn">Add The Task</button>
    `
    document.body.appendChild(box);
    let btn = document.getElementById("btn");
    let nameValue = document.getElementById("name");
    let timeValue = document.getElementById("time");
    let dateValue = document.getElementById("date");
    btn.onclick = function() {
        if (nameValue.value !== "" && timeValue.value !== "" && dateValue.value !== "") {
            location.reload();
            tasks.push({
                title: nameValue.value,
                time: timeValue.value,
                date: dateValue.value
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            box.remove();
            displayTasks();
        } else {
            alert("Please Fill All The Fields");
        }
    }
    let closeBtn = box.querySelector(".closeBtn");
    closeBtn.onclick = function() {
        box.remove();
    }
});
function displayTasks() {
    let tasksContainer = document.querySelector(".tasksContainer");
    for (let i = 0; i < tasks.length; i++) {
        var index = i;
        setTimeout(() => {
            tasksContainer.innerHTML += `
            <div class="taskCard">
                <div class="task">
                    <h3>${i+1}-&nbsp;${tasks[i].title}</h3>
                    <p>Time: ${tasks[i].time}</p>
                    <p>Date: ${tasks[i].date}</p>
                </div>
                <div class="tools">
                    <input type="checkbox" class="completeTask"/>
                    <div class="btns">
                        <button class="deleteBtn" title="Edit Task" onclick="editTask(${i})">Edit Task</button>
                        <button class="deleteBtn" title="Delete Task" onclick="deleteTask(${i})">Delete Task</button>
                    </div>
            </div>
            `;
        },100);
    }
}
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}
displayTasks()
let turn = false;
let items = [];
for (let item = 0 ; item<4;++item) {
    items[item] = document.getElementById("item"+item);
}
let langs = document.createElement("div");
langs.className = "langs";
langs.innerHTML = `
    <a href="#">العربية</a><br>
    <a href="#">English</a><br>
    <a href="#">Data Manager</a><br>
`;
function open_menue() {
    let menu = document.createElement("div");
    items[1].style.transform = "rotate(45deg) translateY(5px) translateX(7px)";
    items[2].style.display = "none";
    items[3].style.transform = "rotate(-45deg) translateY(1px)";
    document.body.appendChild(langs);
}
function close_menue() {
    items[1].style.transform = "rotate(0deg) translateY(0) translateX(0)";
    items[2].style.display = "block";
    items[3].style.transform = "";
    langs.remove();
}
function menu() {
    if (turn === false) {
        open_menue();
        turn = true;
    } else {
        close_menue();
        turn = false;
    }
}
let scrh = document.getElementById("srch");
let searchResult = document.getElementById("searchResult");
function search() {
    let tasksContainer = document.querySelector(".tasksContainer");
    for (let i = 0; i < tasks.length; i++) {
        let half = tasks[i].title.length / 2;
        if (tasks[i].title === scrh.value.trim() && scrh.value.length >= half) {
            console.log(tasks[i].title);
            setTimeout(() => {
                tasksContainer.innerHTML = "";
                searchResult.innerHTML += `
                <div class="taskCard">
                <div class="task">
                    <h3>${i+1}-&nbsp;${tasks[i].title}</h3>
                    <p>Time: ${tasks[i].time}</p>
                    <p>Date: ${tasks[i].date}</p>
                </div>
                <div class="tools">
                    <input type="checkbox" class="completeTask"/>
                    <div class="btns">
                        <button class="deleteBtn" title="Edit Task" onclick="editTask(${i})">Edit Task</button>
                        <button class="deleteBtn" title="Delete Task" onclick="deleteTask(${i})">Delete Task</button>
                    </div>
            </div>
                `;
            });
        } else if (tasks[i].title.includes(scrh.value) === false && scrh.value !== "") {
            searchResult.innerHTML = `
            <h3 style="color: var(--font-color); text-align: center; margin-top: 20px;">No Tasks Found</h3>
            <p style="color: var(--font-color); text-align: center;">Check than name of the task</p>
            `;
        } else if (scrh.value === "") {
            location.reload();
        }
    }
}