const categories = document.querySelectorAll(".category");
const results = document.getElementById("results");

const API = "https://swapi.info/api";

categories.forEach(card=>{
    card.addEventListener("click", ()=>{

        const category = card.dataset.category;

        loadCategory(category);

    });
});

const IMAGE_PATHS = {
    people: "characters",
    planets: "planets",
    films: "films",
    species: "species",
    vehicles: "vehicles",
    starships: "starships",
    kakukk: ""
};


function getImage(category, item){

    const id = item.url.match(/\/(\d+)\/?$/)[1];

    return `https://starwars-visualguide.com/assets/img/${IMAGE_PATHS[category]}/${id}.jpg`;
}
function createCard(item, category){

    let html = `
        <img
            src="${getImage(category,item)}"
            alt="${item.name || item.title}"
            onerror="this.src='https://starwars-visualguide.com/assets/img/big-placeholder.jpg'"
        >

        <h3>${item.name || item.title}</h3>
    `;

    for(const key in item){

        if(
            key==="name" ||
            key==="title" ||
            key==="url" ||
            Array.isArray(item[key]) ||
            typeof item[key]==="object"
        ) continue;

        html += `<p><strong>${key}</strong>: ${item[key]}</p>`;
    }

    return html;
}

async function loadCategory(category){

    results.innerHTML="<h2>Betöltés...</h2>";

    try{

        const response = await fetch(`${API}/${category}`);

        const data = await response.json();

        results.innerHTML="";

        data.forEach(item=>{

            const div=document.createElement("div");
            div.className="item";

            div.innerHTML=createCard(item, category);

            results.appendChild(div);

        });

    }catch(error){

        results.innerHTML="<h2>Hiba történt.</h2>";
        console.error(error);

    }

}

function createCard(item){

    let html=`<h3>${item.title || item.name}</h3>`;

    for(const key in item){

        if(
            key==="title" ||
            key==="name" ||
            Array.isArray(item[key]) ||
            typeof item[key]==="object"
        ) continue;

        html+=`<p><strong>${key}</strong>: ${item[key]}</p>`;
    }

    return html;

}