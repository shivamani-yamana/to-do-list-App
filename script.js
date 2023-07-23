const inputBox = document.getElementById("input-text");
const listContainer = document.getElementById("list-container");


function addTask() {
  if (inputBox.value === "") {
    alert("WRITE SOMETHING!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.draggable = true;
    li.classList.add("draggable");
    //console.log(li.classList);
    li.addEventListener("dragstart",()=>{
      li.classList.add("dragging");
    })
    li.addEventListener("dragend",()=>{
      li.classList.remove("dragging");
      //console.log(li.classList);
      //console.log(document.querySelector(".draggable").classList);
    }
    );
    listContainer.appendChild(li);
    let editItem = document.createElement("button");
    editItem.setAttribute("onclick", "editTask(event)");
    editItem.innerHTML = "EDIT";
    editItem.value = 0;
    li.appendChild(editItem);
    let span = document.createElement("span");
    span.innerHTML = "&#10005;";
    li.appendChild(span);

    //new
    
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (del) {
  if (del.target.tagName === "LI") {
    //console.log(del.target.classList.length);
    del.target.classList.toggle("selected");
    if (del.target.classList.length == 2){
        del.target.childNodes[1].style.display = "none";
        
    }
    else{
        del.target.childNodes[1].style.display = "inline-block"; 
    }

  } else if (del.target.tagName === "SPAN") {
    del.target.parentElement.remove();
  }
  saveData();
}, false);

function editTask(event) {
    let text_this = event.target.innerHTML;
    let li_el = event.target.parentElement;
    if (text_this === "EDIT"){
         inputBox.value = li_el.childNodes[0].nodeValue;
        event.target.innerHTML = "SAVE";
        console.log("edit");
    }
    else if (text_this === "SAVE"){
        if (inputBox.value === ''){
            alert("TASK CANNOT BE EMPTY!");
        }
        else{
            li_el.childNodes[0].nodeValue = inputBox.value;
            inputBox.value = '';
            event.target.innerHTML = "EDIT";
            console.log("save");
        }
    }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showData();

const sortingL = (e) => {
  e.preventDefault();
  //console.log(document.querySelector(".draggable").classList.length);
  //console.log(listContainer.querySelector(".dragging").tagName);
  const draggingItem = listContainer.querySelector(".dragging");
  const siblings = [...listContainer.querySelectorAll(".draggable:not(.dragging)")];
  let nextSibling =siblings.find(sibling => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight/2 ;
  });
  listContainer.insertBefore(draggingItem,nextSibling);
}
listContainer.addEventListener("dragover",sortingL);
listContainer.addEventListener("dragenter",e => e.preventDefault());