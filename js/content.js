const spaceId = "lyireg45y3wf"
const environmentId = "master"
const accessToken = "tMTTaW3bl4B7Y-YjOw9iHa6zq8tlP8bfciTVo4hedLw"

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`

const content = document.querySelector(".content .container")
const footer = document.querySelector("footer")
const notice = document.querySelector(".message")

const getCards = function () {
    return fetch(url + `&content_type=item&order=fields.position`).then(response => response.json()).then(data => {
        return data.items.map(item => {
            return item.fields
        })
    })
}

const getFooter = function () {
    return fetch(url + `&content_type=footer`).then(response => response.json()).then(data => {
        return data.items.map(item => {
            return item.fields
        })
    })
}

const getNotice = function () {
    return fetch(url + `&content_type=notice`).then(response => response.json()).then(data => {
        return data.items.map(item => {
            return item.fields
        })
    })
}

getCards().then(data => {
    content.innerHTML = ""
    data.forEach(item => {
        content.innerHTML += `
            <!-- ${item.title} -->
            <div class="card" data-tags="${item.tags}" data-id="${item.position}" tabindex="0">
                <div class="card-bookmark transparent">
                    <img src="assets/icons/bright/add.svg" alt="">
                    <span>Add</span>
                </div>
                <div class="card-media">
                    <div data-tilt>
                        <img class="card-image lazy" src="${item.placeholder}" 
                        data-src="${item.image}" alt="${item.alternateText}">
                        <div class="display" data-id="${item.position}" style="display: none;">
                            <img src="assets/icons/bright/copy.svg" alt="">
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="card-colors">
                    <div class="colors" data-id="${item.position}">
                        <button class="color" data-color="${item.color1}" data-size="large" data-id="${item.position}"></button>
                        <button class="color" data-color="${item.color2}" data-size="medium" data-id="${item.position}"></button>
                        <button class="color" data-color="${item.color3}" data-size="small" data-id="${item.position}"></button>
                    </div>
                </div>
            </div>
        `
    })
}).then(() => {
    // Load remaining scripts after all cards are inserted
    const html = `
    <script src='js/main.js'></script>
    <script src="js/vanilla-tilt.js"></script>
    `
    const scriptTag = document.createRange().createContextualFragment(html);
    document.querySelector("body").append(scriptTag);
})

getFooter().then(data => {
    footer.innerHTML = ""
    data.forEach(item => {
        footer.innerHTML += `
            <div id="description">
                <p>
                    <span>${item.name}</span> ${item.description}
                </p>
            </div>
            <div id="links">
                <p>
                    © ${item.copyright} – All rights reserved. <br>
                    Curated by <a href="${item.website}" target="_blank" rel="noopener noreferrer">${item.author} <span>↗</span></a> <br>
                    Images found on <a href="https://www.unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash <span>↗</span></a>
                </p>
            </div>
        `
    })
})

getNotice().then(data => {
    notice.innerHTML = ""
    data.forEach(item => {
        notice.innerHTML += `<p>${item.message}</p>`
    })
})