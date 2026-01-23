let addTaskbtn = document.getElementById("addTaskBtn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let state = JSON.parse(localStorage.getItem("state")) || [];
if (addTaskbtn) {
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
        `;
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
                    date: dateValue.value,
                    completed: false
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                box.remove();
            } else {
                alert("Please Fill All The Fields");
            }
        }
        let closeBtn = box.querySelector(".closeBtn");
        closeBtn.onclick = function() {
            box.remove();
        }
    });
}
function displayTasks() {
    let tasksContainer = document.querySelector(".tasksContainer");
    for (let i = 0; i < tasks.length; i++) {
        setTimeout(() => {
            tasksContainer.innerHTML += `
            <div class="taskCard">
                <div class="task">
                    <h3>${i+1}-&nbsp;${tasks[i].title}</h3>
                    <p>Time: ${tasks[i].time}</p>
                    <p>Date: ${tasks[i].date}</p>
                </div>
                <div class="btns">
                    <input type="checkbox" class="completeTask"/>
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
function editTask(index) {
    let box = document.createElement("div");
    box.className = "taskBox";
    box.innerHTML = `
    <button class="closeBtn">X</button>
    <h2>Edit Task</h2>
    <div class="inputs">
        <input type="text" title="Task Title" id="name" placeholder="Task Title" class="taskTitle"/>
        <input type="time" title="Set Time" id="time" placeholder="Set Time" class="taskTime"/>
        <input type="date" title="Set Date" id="date" placeholder="Set Date" class="taskDate"/>
    </div>
    <button id="btn">Edit The Task</button>
    `;
    document.body.appendChild(box);
    let btn = document.getElementById("btn");
    let nameValue = document.getElementById("name");
    let timeValue = document.getElementById("time");
    let dateValue = document.getElementById("date");
    nameValue.value = tasks[index].title;
    timeValue.value = tasks[index].time;
    dateValue.value = tasks[index].date;
    btn.onclick = function() {
        if (nameValue.value !== "" && timeValue.value !== "" && dateValue.value !== "") {
            location.reload();
            tasks[index] = {
                title: nameValue.value,
                time: timeValue.value,
                date: dateValue.value
            };
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
    let closeBtn = box.querySelector(".closeBtn");
    closeBtn.onclick = function() {
        box.remove();
    }
}
let turn = false;
let items = [];
for (let item = 0 ; item < 4; item++) {
    items[item] = document.getElementById("item"+item);
}
let langs = document.createElement("div");
langs.className = "langs";
langs.innerHTML = `
    <a href="index ar.html">العربية</a><br>
    <a href="index.html">English</a><br>
    <a href="expired.html">Expired Tasks</a><br>
`;
let expired = document.createElement("div");
function Expired() {
    let expiredTasksContainer = document.querySelector(".expiredTasksContainer");
    if (state.length == 0) {
        expiredTasksContainer.innerHTML = `<div class="Empty">You don't have any expired tasks</div>`;
    } else {
        for (let i = 0; i < state.length; i++) {
            expiredTasksContainer.innerHTML += `
            <div class="taskCard">
                <div class="task">
                    <h3>${i+1}-&nbsp;${state[i].title}</h3>
                    <p>Time: ${state[i].time}</p>
                    <p>Date: ${state[i].date}</p>
                </div>
                <div class="btns">
                    <button class="deleteBtn" title="Delete Task" onclick="deleteExpiredTask(${i})">Delete Task</button>
                </div>
            </div>
            `;
        }
    }
}
function back() {
    window.location.href = "index.html";
}
function deleteExpiredTask(index) {
    state.splice(index, 1);
    localStorage.setItem("state", JSON.stringify(state));
    location.reload();
}
function open_menue() {
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
    expired.remove();
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
let srch = document.getElementById("srch");
let searchResult = document.getElementById("searchResult");
function search() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title.includes(srch.value.toLowerCase().trim()) === true) {
            setTimeout(() => {
                searchResult.innerHTML = "";
            },1);
            setTimeout(() => {
                searchResult.innerHTML += `
                <div class="taskCard">
                    <div class="task">
                        <h3>${i+1}-&nbsp;${tasks[i].title}</h3>
                        <p>Time: ${tasks[i].time}</p>
                        <p>Date: ${tasks[i].date}</p>
                    </div>
                    <div class="btns">
                        <input type="checkbox" class="completeTask"/>
                        <button class="deleteBtn" title="Edit Task" onclick="editTask(${i})">Edit Task</button>
                        <button class="deleteBtn" title="Delete Task" onclick="deleteTask(${i})">Delete Task</button>
                    </div>
                </div>
                `;
            },50);
        } else if (srch.value === "") {
            location.reload();
        } else if (tasks[i].title.includes(srch.value.toLowerCase().trim()) === false) {
            searchResult.innerHTML = `
            <h3 style="color: var(--font-color); text-align: center; margin-top: 20px;">No Tasks Found</h3>
            <p style="color: var(--font-color); text-align: center;">Check than name of the task</p>
            `;
        }
    }
}
if (srch) {
    var automaticeLoad = setInterval(() => {
        if (srch.value == "") {
            searchResult.style.display = "none";
        } else {
            searchResult.style.display = "flex";
        }
    },10);
}
function checkthanTimeAndDate() {
    let now = new Date;
    let h = now.getHours().toString().padStart(2,"0");
    let m = now.getMinutes().toString().padStart(2,"0");
    let timeOftask = `${h}:${m}`;
    let y = now.getFullYear().toString();
    let month = now.getMonth()+1;
    let mo = month.toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let dayOfTask = `${y}-${mo}-${day}`
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].time == timeOftask && tasks[i].date == dayOfTask.toString()) {
            alert("The Time for ("+tasks[i].title + ") task is over.");
            state.push({
                title: tasks[i].title,
                time: tasks[i].time,
                date: tasks[i].date
            })
            tasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("state", JSON.stringify(state));
            location.reload();
        }
    }
}
setInterval(checkthanTimeAndDate, 1000);
displayTasks();