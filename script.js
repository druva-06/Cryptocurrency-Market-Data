
const gridBtn = document.querySelector('.type-container .grid')
const listBtn = document.querySelector('.type-container .list')
const itemsContainer = document.getElementsByClassName('items-container')[0]

let isGrid;

async function getCryptoDetails(type){
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    const response = await fetch(url)
    const jsonData = await response.json()
    console.log(jsonData)
    if(type == 'grid') appendDatatoGridView(jsonData)
    else appendDatatoListView(jsonData)
}

function appendDatatoGridView(cryptoList){
    isGrid = true
    let gridItems = document.createElement('div')
    gridItems.className = 'grid-items'
    for(let i = 0; i < cryptoList.length; i++){
        gridItems.appendChild(cnvrtJsonToGridView(cryptoList[i]))
    }
    itemsContainer.appendChild(gridItems)
}

function appendDatatoListView(cryptoList){
    isGrid = false
    let listItems = document.createElement('div')
    listItems.className = 'list-items'
    for(let i = 0; i < cryptoList.length; i++){
        listItems.appendChild(cnvrtJsonToListView(cryptoList[i]))
    }
    itemsContainer.appendChild(listItems)
}


function cnvrtJsonToGridView(cryptoEle){
    let priceChangePerc = cryptoEle.price_change_percentage_24h;
    priceChangePerc = priceChangePerc.toFixed(2)
    let singleItem = document.createElement('div')
    singleItem.className = 'single-item'
    let gridItem =`
    <div class="heading">
        <div class="icon">
            <img src="${cryptoEle['image']}" alt="">
        </div>
        <div class="about">
            <p id="symbol">${(cryptoEle.symbol).toUpperCase()}</p>
            <p id="name">${cryptoEle.name}</p>
        </div>
    </div>
    <div class="percentage">
        <span>${priceChangePerc}%</span>
    </div>
    <div class="price">
        <p>$${cryptoEle.current_price}</p>
    </div>
    <div class="details">
        <p id="total-price">Total Volume: ${cryptoEle.total_volume}</p>
        <p id="market-cap">Market Cap: ${cryptoEle.market_cap}</p>
    </div>
    `
    if(priceChangePerc < 0){
        gridItem = `
        <div class="heading">
            <div class="icon">
                <img src="${cryptoEle['image']}" alt="">
            </div>
            <div class="about">
                <p id="symbol">${(cryptoEle.symbol).toUpperCase()}</p>
                <p id="name">${cryptoEle.name}</p>
            </div>
        </div>
        <div class="percentage">
            <span style="border: 1px solid red; color: red;">${priceChangePerc}%</span>
        </div>
        <div class="price">
            <p style="color: red;">$${cryptoEle.current_price}</p>
        </div>
        <div class="details">
            <p id="total-price">Total Volume: ${cryptoEle.total_volume}</p>
            <p id="market-cap">Market Cap: ${cryptoEle.market_cap}</p>
        </div>
        `
    }
    singleItem.innerHTML = gridItem
    return singleItem
}

function cnvrtJsonToListView(cryptoEle){
    let priceChangePerc = cryptoEle.price_change_percentage_24h;
    priceChangePerc = priceChangePerc.toFixed(2)
    let singleItem = document.createElement('div')
    singleItem.className = 'single-item'
    let listItem =`
    <div class="heading">
        <div class="icon">
            <img src="${cryptoEle['image']}" alt="">
        </div>
        <div class="about">
            <p id="symbol">${(cryptoEle.symbol).toUpperCase()}</p>
            <p id="name">${cryptoEle.name}</p>
        </div>
    </div>
    <p id="percentage">${priceChangePerc}%</p>
    <p id="price">$${cryptoEle.current_price}</p>
    <p id="total-price">${cryptoEle.total_volume}</p>
    <p id="market-cap">$${cryptoEle.market_cap}</p>
    `
    if(priceChangePerc < 0){
        listItem =`
        <div class="heading">
            <div class="icon">
                <img src="${cryptoEle['image']}" alt="">
            </div>
            <div class="about">
                <p id="symbol">${(cryptoEle.symbol).toUpperCase()}</p>
                <p id="name">${cryptoEle.name}</p>
            </div>
        </div>
        <p id="percentage" style="border: 1px solid red; color: red;">${priceChangePerc}%</p>
        <p id="price" style="color: red;">$${cryptoEle.current_price}</p>
        <p id="total-price">${cryptoEle.total_volume}</p>
        <p id="market-cap">$${cryptoEle.market_cap}</p>
        `
    }
    singleItem.innerHTML = listItem
    return singleItem
}

gridBtn.addEventListener('click',() => {
    if(isGrid) return
    gridBtn.style.color = 'rgb(72, 151, 231)'
    gridBtn.style.borderBottom = '1px solid rgb(72, 151, 231)'
    listBtn.style.color = 'white'
    listBtn.style.borderBottom = '1px solid black'
    let listItems = document.getElementsByClassName('list-items')[0]
    listItems.remove()
    getCryptoDetails('grid')
})

listBtn.addEventListener('click',() => {
    if(!isGrid) return
    listBtn.style.color = 'rgb(72, 151, 231)'
    listBtn.style.borderBottom = '1px solid rgb(72, 151, 231)'
    gridBtn.style.color = 'white'
    gridBtn.style.borderBottom = '1px solid black'
    let gridItems = document.getElementsByClassName('grid-items')[0]
    gridItems.remove()
    getCryptoDetails('list')
})

getCryptoDetails('grid')

// async function getCryptoDetails(){
//     const url ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
//     const response = await fetch(url)
//     const jsonData = await response.json()
//     console.log(jsonData)
// }
// getCryptoDetails()