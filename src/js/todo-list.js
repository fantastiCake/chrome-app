const pendingList = document.querySelector(".pending-list");
const finishedList = document.querySelector(".finished-list");

const PENDING_CHILD_CLASSNAME = "pending-list__li";
const FINISHED_CHILD_CLASSNAME = "finished-list__li";

const localStorage = window.localStorage;
const PENDING_LS_KEY = "PENDING";
const FINISHED_LS_KEY = "FINISHED";
const LASTKEY_LS_KEY = "LASTKEY";

const handleDeleteTask = (event) => {
  const li = event.target.parentNode;
  const key = li.key;
  li.remove();
  if (Object.values(li.classList).includes(PENDING_CHILD_CLASSNAME)) {
    let currentPendingDict = JSON.parse(localStorage.getItem(PENDING_LS_KEY));
    delete currentPendingDict[key];
    localStorage.setItem(PENDING_LS_KEY, JSON.stringify(currentPendingDict));
  } else {
    let currentFinishedDict = JSON.parse(localStorage.getItem(FINISHED_LS_KEY));
    delete currentFinishedDict[key];
    localStorage.setItem(FINISHED_LS_KEY, JSON.stringify(currentFinishedDict));
  }
};

const handleChangeTask = (event) => {
  const li = event.target.parentNode;
  const key = li.key;
  let currentPendingDict = JSON.parse(localStorage.getItem(PENDING_LS_KEY));
  let currentFinishedDict = JSON.parse(localStorage.getItem(FINISHED_LS_KEY));
  if (Object.values(li.classList).includes(PENDING_CHILD_CLASSNAME)) {
    finishedList.appendChild(li);
    event.target.innerText = "🔁";
    li.classList.remove(PENDING_CHILD_CLASSNAME);
    li.classList.add(FINISHED_CHILD_CLASSNAME);

    currentFinishedDict[key] = currentPendingDict[key];
    delete currentPendingDict[key];
    localStorage.setItem(PENDING_LS_KEY, JSON.stringify(currentPendingDict));
    localStorage.setItem(FINISHED_LS_KEY, JSON.stringify(currentFinishedDict));
  } else {
    pendingList.appendChild(li);
    event.target.innerText = "✅";
    li.classList.remove(FINISHED_CHILD_CLASSNAME);
    li.classList.add(PENDING_CHILD_CLASSNAME);

    currentPendingDict[key] = currentFinishedDict[key];
    delete currentFinishedDict[key];
    localStorage.setItem(PENDING_LS_KEY, JSON.stringify(currentPendingDict));
    localStorage.setItem(FINISHED_LS_KEY, JSON.stringify(currentFinishedDict));
  }
};

const addTask = (taskName, key, listName) => {
  const li = document.createElement("li");
  const liText = document.createElement("span");
  const liDeleteButton = document.createElement("button");
  const liChangeButton = document.createElement("button");
  liText.innerText = taskName;
  liDeleteButton.innerText = "❌";
  li.appendChild(liText);
  li.appendChild(liDeleteButton);
  li.appendChild(liChangeButton);
  if (listName === "pendingList") {
    liChangeButton.innerText = "✅";
    li.classList.add(PENDING_CHILD_CLASSNAME);
    pendingList.appendChild(li);
  } else {
    liChangeButton.innerText = "🔁";
    li.classList.add(FINISHED_CHILD_CLASSNAME);
    finishedList.appendChild(li);
  }

  li.key = key;
  liDeleteButton.addEventListener("click", handleDeleteTask);
  liChangeButton.addEventListener("click", handleChangeTask);
};

const handleAddTask = (event) => {
  const taskInputText = document.querySelector(".task-input-text");
  const newTask = taskInputText.value;
  taskInputText.value = "";
  if (newTask) {
    const key = 1 + Number(localStorage.getItem(LASTKEY_LS_KEY));
    localStorage.setItem(LASTKEY_LS_KEY, key);
    addTask(newTask, key, "pendingList");

    const currentPendingDict = JSON.parse(localStorage.getItem(PENDING_LS_KEY));
    currentPendingDict[key] = newTask;
    localStorage.setItem(PENDING_LS_KEY, JSON.stringify(currentPendingDict));
  }
};

function init() {
  if (localStorage[PENDING_LS_KEY]) {
    const currentPendingDict = JSON.parse(localStorage.getItem(PENDING_LS_KEY));
    for (let key in currentPendingDict) {
      addTask(currentPendingDict[key], key, "pendingList");
    }
  } else {
    localStorage.setItem(PENDING_LS_KEY, "{}");
  }

  if (localStorage[FINISHED_LS_KEY]) {
    const currentFinishedDict = JSON.parse(
      localStorage.getItem(FINISHED_LS_KEY)
    );
    for (let key in currentFinishedDict) {
      addTask(currentFinishedDict[key], key, "finishedList");
    }
  } else {
    localStorage.setItem(FINISHED_LS_KEY, "{}");
  }

  if (!localStorage[LASTKEY_LS_KEY]) {
    localStorage.setItem(LASTKEY_LS_KEY, "0");
  }

  const taskForm = document.querySelector(".task-form");
  taskForm.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddTask(event);
    }
  });
  const taskInputButton = document.querySelector(".task-input-button");
  taskInputButton.addEventListener("click", handleAddTask, false);
}

init();
