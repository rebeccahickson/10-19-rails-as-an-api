// make a fetch request to the '/items' and display items on the DOM
const list = document.getElementById('item-list')
const form = document.getElementById('item-form')
const priceInput = document.getElementById('item-price')
const nameInput = document.getElementById('item-name')
const descriptionInput = document.getElementById('item-description')


fetch('http://localhost:3000/items')
    // .then(function(r){
    //     return r.json()
    // })   // this is the same as the .then on line 8
    .then(r => r.json())
    .then(renderItems)


function renderItems(arg){
    const items = arg["data"]
    items.forEach(element => {
        renderItem(element)
    })
}

function renderItem(item){
    const li = document.createElement('li')
    li.innerHTML = `
        <div>
            $<span class="price">${item.attributes.price}</span>
            <strong class="name">${item.attributes.name}</strong>:
            <span class="description">${item.attributes.description}</span> 
        </div
    `
    list.appendChild(li)
}