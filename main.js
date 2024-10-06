const today = document.querySelector(".date");
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var todayDate = day + "/" + month + "/" + year;
today.textContent = todayDate;
/////////////////////////////
var selectors = document.querySelectorAll("ul.selectors li");

var dels = document.querySelectorAll('img[class="del"]');
dels.forEach((del) => {
    del.addEventListener("click", delparent);
});

var edits = document.querySelectorAll('img[class="edit"]');
edits.forEach((edit) => {
    edit.addEventListener("click", editparent);
});
var submit = document.querySelector('input[type="submit"]');
submit.addEventListener("click", (Event) => {
    if (input.value != "") {
        addToList(input.value);
        input.value = "";
    }
});
var input = document.querySelector('input[type="text"]');
input.addEventListener("keypress", (Event) => {
    if (Event.key == "Enter") {
        if (input.value != "") {
            addToList(input.value);
            input.value = "";
        }
    }
});

var checkboxs = document.querySelectorAll('input[type="checkbox"]');
checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("change", chaneorNot);
});

var selectors = document.querySelectorAll("main ul.selectors li");
selectors.forEach((selector) => {
    selector.addEventListener("click", filter);
});

window.addEventListener("DOMContentLoaded", updateCounts);

/*__________________________________________________________*/
function addToList(x) {
    var ul = document.querySelector("ul.list");
    li1 = ul.lastElementChild;
    var ullength;
    if (li1) {
        ullength = parseInt(li1.id) + 1;
        console.log(ullength);
    } else {
        ullength = 1;
        console.log(ullength);
    }

    //var ullength=document.querySelectorAll("ul.list li").length+1;
    var liItem = document.createElement("li");
    liItem.setAttribute("id", ullength + "lid");
    liItem.setAttribute("class", "remaining total");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "round");
    var input1 = document.createElement("input");
    input1.setAttribute("type", "checkbox");
    input1.setAttribute("id", ullength);
    var label1 = document.createElement("label");
    label1.setAttribute("for", ullength);
    div1.appendChild(input1);
    div1.appendChild(label1);
    var imgdiv = document.createElement("div");
    imgdiv.setAttribute("class", "imgs");
    var img1 = document.createElement("img");
    img1.setAttribute("src", "images/Trash_Full.svg");
    img1.setAttribute('class', "del");
    img1.setAttribute("id", ullength);
    var img2 = document.createElement("img");
    img2.setAttribute("src", "images/edit.svg");
    img2.setAttribute("id", ullength);
    img1.setAttribute('class', "edit");

    imgdiv.appendChild(img1);
    imgdiv.appendChild(img2);
    var text = document.createElement("span");
    text.setAttribute("contenteditable", "false");
    text.textContent = x;
    liItem.appendChild(div1);
    liItem.appendChild(text);
    liItem.appendChild(imgdiv);

    input1.addEventListener("change", chaneorNot);
    img1.addEventListener("click", delparent);
    ul.insertBefore(liItem, ul.lastChild);
    updateCounts();
    img2.addEventListener('click', editparent);
}
/////////////////////////////////

function chaneorNot(event) {
    console.log(checkboxs.length);
    console.log(event.target);
    var id1 = event.target.id;
    //console.log(id1);
    var liparent = document.getElementById(id1 + "lid");
    console.log(liparent);
    if (event.target.checked) {
        liparent.classList.add("completed");
        liparent.classList.remove("remaining");
    } else {
        liparent.classList.remove("completed");
        liparent.classList.add("remaining");
    }
    updateCounts();
    gfilter();
}
/////////////////////////////////

function delparent(event) {
    var id1 = event.target.id;
    gdel(id1);

}
function gdel(x) {
    var liparent = document.getElementById(x + "lid");
    liparent.remove();
    updateCounts();
}
//////////////////////////////////

function updateCounts() {
    var completedTasks = document.querySelectorAll("ul.list li.completed");
    var completedNum = document.querySelector(
        'ul.selectors li[class~="2"] span.count'
    );

    completedNum.textContent = completedTasks.length || 0;

    var remainingTasks = document.querySelectorAll("ul.list li.remaining");
    var remainingNum = document.querySelector(
        'ul.selectors li[class~="1"] span.count'
    );
    remainingNum.textContent = remainingTasks.length || 0;

    var totalTasks = document.querySelectorAll("ul.list li.total");
    var totalNum = document.querySelector(
        'ul.selectors li[class~="3"] span.count'
    );
    totalNum.textContent = totalTasks.length || 0;
}
//////////////////////////////////

function filter(event) {
    var id1 = event.target.id;
    updateselectors(id1);
    gfilter();
}
//////////
function gfilter() {
    var all = document.querySelectorAll("ul.list li");
    var selected = document.querySelector("ul li.selected");
    id1 = selected.id;
    all.forEach((ec) => {
        if (ec.classList.contains(id1)) {
            ec.style.display = "flex";
        } else {
            ec.style.display = "none";
        }
    });
}
////////////

function updateselectors(x) {
    selectors.forEach((selected) => {
        if (selected.id == x) {
            selected.classList.add("selected");
        } else {
            selected.classList.remove("selected");
        }
    });
}

//////////////
function editparent(event) {
    var id1 = event.target.id;
    var img = event.target;
    var liparent = document.getElementById(id1 + 'lid');
    console.log(liparent);
    var spanedit = liparent.childNodes[1];
    console.log(spanedit.textContent);
    if (img.src.includes("images/edit.svg")) {

        spanedit.setAttribute('contenteditable', "true");
        img.setAttribute('src', "images/done.svg");

    }
    else {
        console.log(spanedit.textContent);
        if (spanedit.textContent == "") {
            gdel(id1);
        } else {
            console.log("ahmed");
            console.log(spanedit.textContent);
            spanedit.setAttribute('contenteditable', "false");
            event.target.setAttribute('src', "images/edit.svg");
        }

    }
}



/****************************************************** */
var main = document.querySelector("main")
var header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scrolled");

    }
    else {
        header.classList.remove("scrolled");

    }
})