const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Please write something first!");
        return;
    }

    const li = createListItem(inputBox.value);
    listContainer.appendChild(li);
    
    inputBox.value = "";
    saveData();
}

function createListItem(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    
    const deleteButton = createDeleteButton();
    li.appendChild(deleteButton);

    li.addEventListener('click', toggleTask);
    return li;
}

function createDeleteButton() {
    const span = document.createElement("span");
    span.textContent = "❌";
    span.addEventListener('click', function() {
        this.parentElement.remove();
        saveData();
    });
    return span;
}

function toggleTask() {
    this.classList.toggle("checked");
    saveData();
}

const style = document.createElement('style');
style.innerHTML = `
    li span { display: none; }
    li:hover span { display: inline; }
`;
document.head.appendChild(style);

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
});
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
