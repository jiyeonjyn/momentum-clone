const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".js-todo"),
    finishedList = document.querySelector(".js-done");

let pendingArr = [],
    finishedArr = [];

function loadTask() {
    const pending = JSON.parse(localStorage.getItem("pending"));
    const finished = JSON.parse(localStorage.getItem("finished"));
    if (pending)
        pending.forEach(task => paintPending(task));
    if(finished)
        finished.forEach(task => paintFinished(task));
}

function saveState() {
    //새 아이템 저장했을 때, 삭제했을 때, 변경사항이 있을 때 실행
    localStorage.setItem("pending", JSON.stringify(pendingArr));
    localStorage.setItem("finished", JSON.stringify(finishedArr));
}

function buildGenericLi(taskObj) {
    const li = document.createElement("li"),
        span = document.createElement("span"),
        delBtn = document.createElement("button");
    span.innerText = taskObj.text;
    delBtn.innerText = "×";
    delBtn.addEventListener("click", deleteTask);
    li.append(span, delBtn);
    li.id = taskObj.id;
    return li;
}

function paintPending(taskObj) {
    const li = buildGenericLi(taskObj),
        finBtn = document.createElement("button");
    finBtn.addEventListener("click", complete);
    li.prepend(finBtn);
    pendingList.appendChild(li);
    pendingArr.push(taskObj);
    checkFull();
}

function paintFinished(taskObj) {
    const li = buildGenericLi(taskObj),
        backBtn = document.createElement("button");
    backBtn.addEventListener("click", revert);
    li.prepend(backBtn);
    finishedList.appendChild(li);
    finishedArr.push(taskObj);
    checkFull();
}

function checkFull() {
    if (pendingArr.length + finishedArr.length >= 3) {
        toDoInput.disabled = true;
        toDoInput.placeholder = "The list is full.";
    }
}

function deleteTask(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li); //태그삭제
    removeFromFinishedArr(li.id); //객체삭제
    removeFromPendingArr(li.id); //객체삭제
    checkEmpty();
    saveState();
}

function checkEmpty() {
    if (pendingArr.length + finishedArr.length < 3) {
        toDoInput.disabled = false;
        toDoInput.placeholder = "";
    }
}

function removeFromPendingArr(id) {
    pendingArr = pendingArr.filter(task => task.id !== id);
}

function removeFromFinishedArr(id) {
    finishedArr = finishedArr.filter(task => task.id !== id);
}

function findInPending(id) {
    return pendingArr.find(task => task.id === id);
}

function findInFinished(id) {
    return finishedArr.find(task => task.id === id);
}

function complete(e) {
    const li = e.target.parentNode,
        taskObj = findInPending(li.id);
    pendingList.removeChild(li); //태그삭제
    removeFromPendingArr(li.id); //객체삭제
    paintFinished(taskObj); //태그생성, 객체저장
    saveState();
}

function revert(e) {
    const li = e.target.parentNode,
        taskObj = findInFinished(li.id);
    finishedList.removeChild(li); //태그삭제
    removeFromFinishedArr(li.id); //객체삭제
    paintPending(taskObj); //태그생성, 객체저장
    saveState();
}

function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function handleSubmit(e) {
    e.preventDefault();
    const taskObj = getTaskObject(toDoInput.value);
    toDoInput.value = "";
    paintPending(taskObj); //태그생성, 객체저장
    saveState();
}


function init() {
    loadTask();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
