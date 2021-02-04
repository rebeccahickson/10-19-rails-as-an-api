// make a fetch request to the '/items' and display items on the DOM
const list = document.getElementById('item-list')
const form = document.getElementById('item-form')
const priceInput = document.getElementById('item-price')
const nameInput = document.getElementById('item-name')
const descriptionInput = document.getElementById('item-description')

form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(e){
    e.preventDefault()
    const formData = {
        name: nameInput.value, 
        price: priceInput.value, 
        description: descriptionInput.value, 
    }

    const configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/items', configObj)
        .then(r => r.json())
        .then(data => {
            addItemToDOM(data.data)
            form.reset()
        })
}

function fetchItems(){
    fetch('http://localhost:3000/items')
    // .then(function(r){
    //     return r.json()
    // })   // this is the same as the .then on line 8
    .then(r => r.json())
    .then(renderItems)
}

function renderItems(arg){
    const items = arg["data"]
    items.forEach(element => {
        addItemToDOM(element)
    });
}

function addItemToDOM(item){
    const li = document.createElement('li')
    li.id = `item-${item.id}`
    render(li, item.attributes)
    list.appendChild(li)
    li.addEventListener('click', handleItemClick)
}

function render(li, data){

    li.innerHTML = `
        <div>
        $<span class="price">${data.price}</span> <strong class="item-name">${data.name}</strong>: 
        <span class="description">${data.description}</span><br>
        </div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `
}

function handleItemClick(e){
    if(e.target.innerText === "Edit"){
        renderEditForm(e.target.parentElement)
        e.target.innerText = "Save"
    }else if(e.target.innerText === "Delete"){
        deleteElement(e.target.parentElement)
    }else if(e.target.innerText === "Save"){
        patchElement(e.target.parentElement)
        e.target.innerText = "Edit"
    }
}

function renderEditForm(liElement){
    const name = liElement.querySelector('.item-name').innerText
    const description = liElement.querySelector('.description').innerText
    const price = liElement.querySelector('.price').innerText
    liElement.querySelector('div').innerHTML = `
    <input type="text" name="name" id="update-name" value="${name}">
    <input type="text" name="description" id="update-description" value="${description}">
    <input type="number" name="price" id="update-price" min="0" step=".01" value="${price}">
    `
}

function patchElement(liElement){
    const name = liElement.querySelector('#update-name').value
    const description = liElement.querySelector('#update-description').value
    const price = liElement.querySelector('#update-price').value
  
    const formData = {
        name: name, 
        price: price, 
        description: description, 
    }

    const configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
    }

    const id = liElement.id.split("-")[1]
    fetch(`http://localhost:3000/items/${id}`, configObj)
        .then(r => r.json())
        .then(data => {
            render(liElement, data.data.attributes)
            form.reset()
        })
}

function deleteElement(liTag){
    liTag.remove()
    const id = liTag.id.split("-")[1]

    const configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    }

    fetch(`http://localhost:3000/items/${id}`, configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            alert(data.message)
        })

}


fetchItems()