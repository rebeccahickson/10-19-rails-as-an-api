// make a fetch request to the '/items' and display items on the DOM
const list = document.getElementById("item-list");
const form = document.getElementById("item-form");
const priceInput = document.getElementById("item-price");
const nameInput = document.getElementById("item-name");
const descriptionInput = document.getElementById("item-description");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  //make our params hash
  const itemInfo = {
    price: priceInput.value,
    name: nameInput.value,
    description: descriptionInput.value,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(itemInfo),
  };

  // pessimistic rendering
  fetch("http://localhost:3000/items", configObj)
    .then((r) => r.json())
    .then((json) => renderItem(json.data));
}

function getItems() {
  fetch("http://localhost:3000/items")
    // .then(function(r){
    //     return r.json()
    // })   // this is the same as the .then on line 8
    .then((r) => r.json())
    .then(renderItems);
}

function renderItems(arg) {
  const items = arg["data"];
  items.forEach((element) => {
    renderItem(element);
  });
}

function renderItem(item) {
  const li = document.createElement("li");
  li.dataset["id"] = item.id;
  li.id = `item-${item.id}`;

  renderLi(li, item);

  list.appendChild(li);
  li.addEventListener("click", handleLiClick);

  // const deleteBtn = li.querySelector('.delete')
  // deleteBtn.addEventListener('click', deleteItem)
}

function renderLi(li, item) {
  li.innerHTML = `
        <div data-id="${item.id}">
            $<span class="price">${item.attributes.price}</span>
            <strong class="name">${item.attributes.name}</strong>:
            <span class="description">${item.attributes.description}</span>
        </div>
        <button class="edit" data-id="${item.id}">Edit</button>
        <button class="delete" data-id="${item.id}">Delete</button>
    `;
}

function handleLiClick(e) {
  if (e.target.innerText === "Edit") {
    handleEdit(e);
  } else if (e.target.innerText === "Delete") {
    deleteItem(e);
  } else if (e.target.innerText === "Save") {
    handleSave(e);
  }
}

function handleSave(e) {
  const id = e.target.dataset.id;
  let containerDiv = e.target.parentElement.children[0];

  const itemInfo = {
    price: containerDiv.querySelector(".price").value,
    name: containerDiv.querySelector(".name").value,
    description: containerDiv.querySelector(".description").value,
  };

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(itemInfo),
  };

  fetch(`http://localhost:3000/items/${id}`, configObj)
    .then((r) => r.json())
    .then((json) => updateItem(e.target.parentElement, json.data));
}

function updateItem(li, params) {
  renderLi(li, params);
  debugger;
}

function handleEdit(e) {
  e.target.innerText = "Save";
  e.target.classList.remove("edit");
  e.target.classList.add("save");
  let containerDiv = e.target.parentElement.children[0];

  containerDiv.querySelector(
    ".price"
  ).outerHTML = `<input class="price" value="${
    containerDiv.querySelector(".price").innerHTML
  }"></input>`;

  containerDiv.querySelector(".name").outerHTML = `<input class="name" value="${
    containerDiv.querySelector(".name").innerHTML
  }"></input>`;

  containerDiv.querySelector(
    ".description"
  ).outerHTML = `<input class="description" value="${
    containerDiv.querySelector(".description").innerHTML
  }"></input>`;
}

//optomistic rendering
function deleteItem(e) {
  e.target.parentElement.remove(); // remove it before the fetch request
  const id = e.target.dataset.id;

  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  fetch(`http://localhost:3000/items/${id}`, configObj)
    .then((r) => r.json())
    .then((json) => alert(json.message));
}

// add event listerner
// submit a fetch request to delete
// .remove() it from the DOM

getItems();
