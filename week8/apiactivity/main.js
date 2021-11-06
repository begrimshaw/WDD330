class App {
    constructor() {
        this.starships = []
        this.nextUrl = ""
        this.prevUrl = ""
    }

    async init() {
        await this.getStarships('https://swapi.dev/api/starships/')
        displayHTML(buildListView(this.starships))
    }

    async getStarships(url) {
        const data = await fetchStarships(url)
        console.log(this)
        this.starships = data.results
        this.nextUrl = data.next
        this.prevUrl = data.previous
    }

    async next() {
        if (!this.nextUrl) return
        await this.getStarships(this.nextUrl)
        displayHTML(buildListView(this.starships))
    }
    
    async prev() {
        if (!this.prevUrl) return
        await this.getStarships(this.prevUrl)
        displayHTML(buildListView(this.starships))
    }
}

const app = new App()
app.init()

// async function to get data set and return it
async function fetchStarships(url) {
    try {
        return await fetch(url).then(res => res.json())
    } catch (e) {
        console.error(e)
    }
}

function displayHTML(html) {
    document.getElementById('view').innerHTML = html
}

function buildListView(starships) {
    return `
        <div class="list">
            ${starships.reduce((acc, starship) => {
                return acc + buildStarshipCard(starship)
            }, "")}
        </div>
    `
}

function buildStarshipCard(starship) {
    return `
        <div class="starship__Card">
            <h2 class="starship__name">${ starship.name }</h2>
            <h3 class="starship__manu">${ starship.manufacturer }</h3>
            <p class="starship__content1"><span class="title">Cost:</span> ${ starship.cost_in_credits == "unknown" ? '' : '$'}${ numberWithCommas(starship.cost_in_credits) }</p>
            <p class="starship__content2"><span class="title">Passengers:</span> ${ numberWithCommas(starship.passengers) }</p>
        </div>
    `
}

// add function to window object so it can be used in button onClick handler
const clearData = () => {
    var pageData = document.getElementById("view");
    while (pageData.firstChild) {
        pageData.removeChild(pageData.firstChild);
    }
    
}

// add function to window object so it can be used in button onClick handler
window.prevData = async () => {
    await app.prev()
}

// add function to window object so it can be used in button onClick handler
window.nextData = async () => {
    await app.next()
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}