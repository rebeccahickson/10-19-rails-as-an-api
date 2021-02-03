// make a fetch request to the '/items' and display items on the DOM
const list = document.getElementById('item-list')

fetch('http://localhost:3000/items')
    .then(function(r){
        return r.json()
    })
    .then(renderItems)


function renderItems(arg){
    const items = arg["data"]
    const liElements = items.map(function(item){
        const li = document.createElement('li')
        li.innerText = `${item.attributes.name} - $${item.attributes.price}`
        return li
    })
    // debugger
    liElements.forEach(element => {
        list.appendChild(element)
    });
   

}