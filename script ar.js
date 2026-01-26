//بداية الكود
let addTaskbtn = document.getElementById("addTaskBtn");//زر إضافة المهام
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];//قائمة المهام الرئيسية
let state = JSON.parse(localStorage.getItem("state")) || [];//قائمة المهام المنتيهة الصلاحية
let success = JSON.parse(localStorage.getItem("success")) || [];//قائمة المهام الناجحة
function alertBox(Error) {//إشعارات الأخطاء
    let alert = document.createElement("div");
    alert.className = "alertBox";
    alert.innerHTML = `<h4>${Error}</h3>`;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.style.animationName = "boxRotate";
    }, 400);
    setTimeout(() => {
        alert.style.animationName = "boxExit";
    }, 2600);
    setTimeout(() => {
        alert.remove();
    }, 3200);
}
if (addTaskbtn) {//التحقق من وجود العنصر في الصفحة أم لا
    addTaskbtn.addEventListener("click", function() {//عندما يتم الضغط على زر إضافة مهمة
        let box = document.createElement("div");
        box.className = "taskBox";
        box.innerHTML = `
        <button class="closeBtn">X</button>
        <h2>إضافة مهمة جديدة</h2>
        <div class="inputs" dir="rtl">
            <input type="text" title="Task Title" id="name" placeholder="عنوان المهمة" class="taskTitle"/>
            <input type="time" title="Set Time" id="time" class="taskTime"/>
            <input type="date" title="Set Date" id="date" class="taskDate"/>
        </div>
        <button id="btn">إضافة المهمة</button>
        `;
        document.body.appendChild(box);
        let btn = document.getElementById("btn");
        let nameValue = document.getElementById("name");
        let timeValue = document.getElementById("time");
        let dateValue = document.getElementById("date");
        btn.onclick = function() {
            if (nameValue.value.trim() !== "" && timeValue.value.trim() !== "" && dateValue.value.trim() !== "") {
                location.reload();
                tasks.push({
                    title: nameValue.value,
                    time: timeValue.value,
                    date: dateValue.value,
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                box.remove();
            } else if (nameValue.value.trim() == "" && nameValue.value.trim() == "" && dateValue.value.trim() == ""){
                alertBox("خطأ : المدخلات فارغة");
            } else if (nameValue.value.trim() == ""){
                alertBox("خطأ : ايم المهمة غير موجود");
            } else if (timeValue.value.trim() == ""){
                alertBox("خطأ : وقت المهمة غير موجود");
            } else if (dateValue.value.trim() == ""){
                alertBox("خطأ : تاريخ المهمة غير موجود");
            }
        }
        let closeBtn = box.querySelector(".closeBtn");
        closeBtn.onclick = function() {
            box.remove();
        }
    });
}
let confirmBox = document.createElement("div");
confirmBox.className = "confirmBox";
let tasksContainer = document.querySelector(".tasksContainer");
function displayTasks() {//عرض المهام
    if (tasks.length == 0) {//التأكد من وجود مهام أم لا
        tasksContainer.innerHTML = `<div class="Empty">أنت لا تملك أي مهام</div>`
    } else {
            for (let i = 0; i < tasks.length; i++) {
            setTimeout(() => {
                tasksContainer.innerHTML += `
                <div class="taskCard">
                    <div class="task">
                        <h3>${i+1}-&nbsp;${tasks[i].title}</h3>
                        <p> الوقت: ${tasks[i].time}</p>
                        <p> التاريخ: ${tasks[i].date}</p>
                    </div>
                    <div class="btns">
                        <input type="checkbox" onclick="Success(${i})" id="item2${i}"/>
                        <button class="deleteBtn" title="Edit Task" onclick="editTask(${i})">تعديل المهمة</button>
                        <button class="deleteBtn" title="Delete Task" onclick="deleteTask(${i})">حذف المهمة</button>
                    </div>
                </div>
                `;
            },100);
        }
    }
}
function deleteTask(index) {//حذف مهمة
    //إرسال إشعار أكيد على حذف المهمة
    confirmBox.innerHTML = `
        <div class="Send">هل أنت متأكد من حذف المهمة ؟ </div>
        <div class="confirmBtns confirmBtnsAr">
            <button id="yes">نعم</button>
            <button id="no">لا</button>
        </div>
    `;
    document.body.appendChild(confirmBox);
    let yes = document.getElementById("yes");
    yes.onclick = function() {
        confirmBox.remove();
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
    }
    let no = document.getElementById("no");
        no.onclick = function() {
        confirmBox.remove();
    }
}
function editTask(index) {//تعديل مهمة
    let box = document.createElement("div");
    box.className = "taskBox";
    box.innerHTML = `
    <button class="closeBtn">X</button>
    <h2>تعديل مهمة</h2>
    <div class="inputs">
        <input type="text" title="Task Title" id="name" placeholder="Task Title" class="taskTitle"/>
        <input type="time" title="Set Time" id="time" placeholder="Set Time" class="taskTime"/>
        <input type="date" title="Set Date" id="date" placeholder="Set Date" class="taskDate"/>
    </div>
    <button id="btn">تعديل المهمة</button>
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
        //اقتناص الأخطاء وتعدبل المهمة
        if (nameValue.value.trim() !== "" && timeValue.value.trim() !== "" && dateValue.value.trim() !== "") {
            if (nameValue.value !== "" && timeValue.value !== "" && dateValue.value !== "") {
                location.reload();
                tasks[index] = {
                    title: nameValue.value,
                    time: timeValue.value,
                    date: dateValue.value
                };
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        } else if (nameValue.value.trim() == "" && nameValue.value.trim() == "" && dateValue.value.trim() == ""){
            alertBox("خطأ : المدخلات فارغة");
        } else if (nameValue.value.trim() == ""){
            alertBox("خطأ : اسم المهمة غير موجود");
        } else if (timeValue.value.trim() == ""){
            alertBox("خطأ : وقت المهمة غير موجود");
        } else if (dateValue.value.trim() == ""){
            alertBox("خطأ : تاريخ المهمة غير موجود");
        }
    }
    let closeBtn = box.querySelector(".closeBtn");
    closeBtn.onclick = function() {
        box.remove();
    }
}
//الحصول على عنوان القطع المستقيمة الثلاثة في زر القائمة لصنع أنميشن عند الضغط على زر القائمة
let items = [];
for(let item = 0 ; item < 4; item++) {
    items[item] = document.getElementById("item" + item);
}
//خيارات القائمة
let choice = document.createElement("div");
choice.className = "choice";
choice.innerHTML = `
    <a href="index ar.html">العربية</a><br>
    <a href="index.html">English</a><br>
    <a href="success ar.html">المهام الناجحة</a><br>
    <a href="expired ar.html">المهام المنتهية الصلاحية</a><br>
`;
function Expired() {//عرض المهام المنتيهة الصلاحية
    let expiredTasksContainer = document.querySelector(".expiredTasksContainer");
    if (state.length == 0) {
        expiredTasksContainer.innerHTML = `<div class="Empty">أنت لا تملك أي مهام منتهية الصلاحية</div></div>`;
    } else {
        for (let i = 0; i < state.length; i++) {
            expiredTasksContainer.innerHTML += `
            <div class="taskCard">
                <div class="task">
                    <h3>${i+1}-&nbsp;${state[i].title}</h3>
                    <p> الوقت: ${state[i].time}</p>
                    <p> التاريخ: ${state[i].date}</p>
                </div>
                <div class="btns">
                    <button class="deleteBtn" title="Delete Task" onclick="deleteExpiredTask(${i})">حذف المهمة</button>
                </div>
            </div>
            `;
        }
    }
}
function back() {//العودة إلى الصفحة الرئيسية
    window.location.href = "index ar.html";
}
function deleteExpiredTask(index) {//حذف مهمة منتهية الصلاحية
    state.splice(index, 1);
    localStorage.setItem("state", JSON.stringify(state));
    location.reload();
}
function Success(index) {//إضافة المهام الناجحة إلى قسم المهام الناجحة وفصلها عن بقية المهام
    let item = document.getElementById("item2" + index);
    let item2 = document.getElementById("item2" + index + "s");
    if (item.checked || item2.checked) {
        //إرسال إشعار تأكيد من القيام بالمهمة
        confirmBox.innerHTML = `
            <div class="Send">هل أنت متأكد من فعل المهمة ؟</div>
            <div class="confirmBtns confirmBtnsAr">
                <button id="yes">نعم</button>
                <button id="no">لا</button>
            </div>
        `;
        document.body.appendChild(confirmBox);
        let yes = document.getElementById("yes");
        yes.onclick = function() {
            confirmBox.remove();
            success.push({
                title: tasks[index].title,
                time: tasks[index].time,
                date: tasks[index].date
            });
            tasks.splice(index, 1);
            localStorage.setItem("success", JSON.stringify(success));
            localStorage.setItem("tasks", JSON.stringify(tasks));
            location.reload();
        }
        let no = document.getElementById("no");
        no.onclick = function() {
            confirmBox.remove();
            item.checked = false;
            item2.checked = false;
        }
    }
}
function SuccessTask() {//عرض المهام الناجحة
    let successTasksContainer = document.querySelector(".successTasksContainer");
    if (success.length == 0) {
        successTasksContainer.innerHTML = `<div class="Empty">أنت لا تملك أي مهم ناجحة</div>`;
    } else {
        for (let i = 0; i < success.length; i++) {
            successTasksContainer.innerHTML += `
            <div class="taskCard">
                <div class="task">
                    <h3>${i+1}-&nbsp;${success[i].title}</h3>
                    <p> الوقت: ${success[i].time}</p>
                    <p> التاريخ: ${success[i].date}</p>
                </div>
                <div class="btns">
                    <button class="deleteBtn" title="Delete Task" onclick="deleteSuccessTask(${i})">حذف المهمة</button>
                </div>
            </div>
            `;
        }
    }
}
function deleteSuccessTask(index) {//حذف مهمة من المهام الناجحة
    success.splice(index , 1);
    localStorage.setItem("success", JSON.stringify(success));
    location.reload();
}
let menu = document.getElementById("menu");
let turn = false;//الدور أي إما مقفلة أو مفتوحة
function open_menue() {//فتح القائمة
    items[1].style.transform = "rotate(45deg) translateY(5px) translateX(7px)";
    items[2].style.display = "none";
    items[3].style.transform = "rotate(-45deg) translateY(1px)";
    menu.style.paddingBottom = "7px";
    menu.style.paddingRight = "1px";
    document.body.appendChild(choice);
}
function close_menue() {//إغلاق القائمة
    items[1].style.transform = "rotate(0deg) translateY(0) translateX(0)";
    items[2].style.display = "block";
    items[3].style.transform = "";
    menu.style.paddingBottom = "0";
    menu.style.paddingRight = "0";
    choice.remove();
}
menu.addEventListener("click", function() {//تحديد الدور لفتح أو إغلاق القائمة
    if (turn === false) {
        open_menue();
        turn = true;
    } else {
        close_menue();
        turn = false;
    }
})
let srch = document.getElementById("srch");
let searchResult = document.getElementById("searchResult");
let searchButton = document.getElementById("saerchButton");
if (searchButton) {
    searchButton.addEventListener("click", function() {
    search();
    });
}
function search() {//خوارزمية البحث
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title.toLowerCase().includes(srch.value.toLowerCase().trim()) === true) {//التأكد من إذا كانت إذا كانت هناك مهمة تحتوي على الكلمات التي أدخلها المستخدم مع مطابقة حالة الأحرف خلف أعين المستخدم
            //عرض النتائج
            setTimeout(() => {
                searchResult.innerHTML = "";
            },1);
            setTimeout(() => {
                searchResult.innerHTML += `
                <div class="taskCard">
                    <div class="task">
                        <h3>${i+1}-&nbsp;${tasks[i].title}</h3>
                        <p> الوقت: ${tasks[i].time}</p>
                        <p> التاريخ: ${tasks[i].date}</p>
                    </div>
                    <div class="btns">
                        <input type="checkbox" onclick="Success(${i})" id="item2${i}s"/>
                        <button class="deleteBtn" title="Edit Task" onclick="editTask(${i})">تعديل المهمة</button>
                        <button class="deleteBtn" title="Delete Task" onclick="deleteTask(${i})">حذف المهمة</button>
                    </div>
                </div>
                `;
            },50);
        } else if (srch.value === "") {//إذا كان الحقل فارغاً أعد تحميل الصفحة (هذا الشرط للبحث الأوتوماتيكي)
            location.reload();
        } else if (tasks[i].title.includes(srch.value.toLowerCase().trim()) === false) {//إذا لم يتم العثور على مهمة تحتوي على الكلمات التي أدخلها المستخدم اعرض رسالة خطأ
            searchResult.innerHTML = `
            <h3 style="color: var(--font-color); text-align: center; margin-top: 20px;">لا توجد مهام مطابقة</h3>
            <p style="color: var(--font-color); text-align: center;">تأكد من اسم المهمة</p>
            `;
        }
    }
}
if (srch) {//التحقق من وجود حقل الإدخال في الصفحة
    //البحث عند الضغط على Enter
    srch.addEventListener("keydown", function() {
        search();
    });
    //البحث التلقائي
    var automaticeSearch = setInterval(() => {
        if (srch.value == "" || tasks.length == 0) {//إذا كان حقل الإدخال فارغاً أو عدد المهام يساوي صفر نخفي حاوية البحث
            searchResult.style.display = "none";
        } else {// إذا كان حقل الإدخال ليس فارغاً وعدد المهام أكبر من الصفر نظهر حاوية البحث
            searchResult.style.display = "flex";
        }
    }, 10);
}
//رسالة انتهاء وقت المهمة
function taskTimeOver(massege) {
    let alertOver = document.createElement("div");//إنشاء عنصر جديد
    alertOver.className = "taskTimeOver";
    alertOver.innerHTML = `
    <div class="Send" dir="rtl">${massege}</div>
    <div class="taskTimeOverBtns taskTimeOverBtnsAr">
        <button id="OK">حسناً</button>
    </div>
    `;
    document.body.appendChild(alertOver);
    clearInterval(TimeAndDateOfTask);// لعدم تكرار ظهور الرسالة
    let okBtn = document.getElementById("OK");
    okBtn.onclick = function() {
        alertOver.remove()
        location.reload();
    }
}
//التحقق من الوقت و التاريخ
function checkthanTimeAndDate() {
    //أخذ الوقت من الجهاز
    let now = new Date;
    let h = now.getHours().toString().padStart(2,"0");
    let m = now.getMinutes().toString().padStart(2,"0");
    let timeOftask = `${h}:${m}`;//الشكل النهائي للوقت
    //أخذ بيانات التاريخ من الجهاز
    let y = now.getFullYear().toString();
    let month = now.getMonth()+1;
    let mo = month.toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let dayOfTask = `${y}-${mo}-${day}`;//الشكل النهائي للتاريخ
    for (let i = 0; i < tasks.length; i++) {
        //التأكد من أن وقت المهمة قد انتهى أم لا
        if (tasks[i].time <= timeOftask && tasks[i].date == dayOfTask || tasks[i].date < dayOfTask) {
            taskTimeOver(`وقت مهمة ((${tasks[i].title})) انتهى.`);
            state.push({
                title: tasks[i].title,
                time: tasks[i].time,
                date: tasks[i].date
            });
            tasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("state", JSON.stringify(state));
        }
    }
}
let TimeAndDateOfTask = setInterval(checkthanTimeAndDate, 1000);//تشغيل دالة التحقق كل ثانية
if (tasksContainer) { // التحقق من إذا كانت حاوية المهام موجودة في الصفحة أم لا
    displayTasks();// تشغيل دالة عرض المهام
}
//نهاية الكود