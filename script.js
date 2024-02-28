function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = read;
}

let Library = [];

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let readStatus = document.querySelector('input[name="read"]').checked? "read": "not-read";
  
   if (!title || !author || !pages) {
     alert("Please fill out all fields");
     return;
   }
  
  let book = new Book(title, author, pages, readStatus);
  console.log(book);
  Library.push(book);
  save();
  show();
    document.getElementById("bookForm").reset();

  

}

let bookbtn = document.querySelector(".addBtn");
let bookform = document.getElementById("card");
let overlay = document.querySelector(".overlay");
window.addEventListener("load", function () {
  showLibrary();
});

bookbtn.addEventListener("click", function () {
  
  bookform.style.display = "flex";
  overlay.style.display="block";

});

document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  addBookToLibrary();
   bookform.style.display = "none";
   overlay.style.display = "none";

});



let libraryEl = document.querySelector(".library");

function show() {
  libraryEl.innerHTML = " ";

  for (let i = 0; i < Library.length; i++) {
    let book = Library[i];

    let div = document.createElement("div");

    div.innerHTML = `<div class="bookcard">
        <p class="title" > "${book.title}" </p>
        <p class="author" >  ${book.author} </p>
        <p class="pages" > ${book.pages} Pages </p>
        
        <button class ="readbtn" onclick="toggleRead(${i})"> ${
      book.readStatus === "read" ? "Read" : "Not Read Yet"
    }</button>
        <button class="removebtn" onclick="removeBook(${i})">Delete </button>
        </div>`;
     let readBtn = div.querySelector(".readbtn");
     readBtn.classList.add(book.readStatus === "read" ? "read" : "not-read");
    libraryEl.appendChild(div);
  }
  save();
}
function removeBook(index) {
  Library.splice(index, 1);
  save();
  show();
};


  function toggleRead(index) {
    let readBtn = document.querySelectorAll(".readbtn")[index];
    if (Library[index].readStatus === "read") {
      Library[index].readStatus = "not-read";
      readBtn.textContent = "Not Read Yet";
      readBtn.classList.remove("read");
      readBtn.classList.add("not-read");
    } else {
      Library[index].readStatus = "read";
      readBtn.textContent = "Read";
      readBtn.classList.remove("not-read");
      readBtn.classList.add("read");
    }
    save();
    show();
  }


function save()
{
  localStorage.setItem("Library", JSON.stringify(Library)); // Store Library array in localStorage
};
function showLibrary() {
  if (localStorage.getItem("Library")) {
    Library = JSON.parse(localStorage.getItem("Library")); // Retrieve Library array from localStorage
    console.log("Library retrieved from localStorage:", Library); // Log the retrieved data
    show();
  }
}
showLibrary();