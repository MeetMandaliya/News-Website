apikey="094c8116c12d4d3b9fe1e7046699a3de"
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".navbar-options");
const options = ["General","Entertainment","Science","Sports","Business","Technology"];

let requestURL = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=094c8116c12d4d3b9fe1e7046699a3de"
const generateUI =(articles) => {
    for(let item of articles){
        let card =document.createElement("div");
        card.classList.add("cards")
        card.innerHTML=`<div class="card-container">
        <div class="row">
            <div class=" col-lg-16">
                <a rel="noreferrer" href="${item.url}" target='_blank'>
                    <div class="card-design">
                        <div class="text-box">
                            <div class="image-box">
                             <img src="${!item.urlToImage? "https://media.istockphoto.com/id/1290904409/photo/abstract-digital-news-concept.jpg?s=1024x1024&w=is&k=20&c=7OjY82-8QWB9DcVeJ5rKfCwXjc6VRjnRjBs_QeAxCNE=":item.urlToImage}" alt="....." />
                            </div>
                        <div class="text-container">
                               <h6>${item.title}</h6>
                            
                            <p>${item.description}</p></div>
                            <b> ${!item.author? "" : "-By " + item.author }</b>
                            </div>
                            </div>
                            </a>`
        container.appendChild(card);
    }
};
//News api call
const getNews =async ()=>{
    container.innerHTML =" ";
    let response = await fetch(`${requestURL}&pageSize=100`);
    if(!response.ok){
        alert("Data unavailble at the moment.Please try again later");
        return false;
    }
    let data=await response.json();
    generateUI(data.articles);

};
const selectCategory =(e, category) =>{
    let options =document.querySelectorAll(".option");
    options.forEach((element)=>{    
        element.classList.remove("active");
    });
    
    if (category === "general") {
        requestURL = `https://newsapi.org/v2/everything?q=&apiKey=${apikey}`;
    } 
    else 
    {
        requestURL = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apikey}`;
    }
    e.target.classList.add("active");
    getNews();
};
const createOptions = () => {
    for (let i of options) {
        const isActive = i === "General"; 
        optionsContainer.innerHTML += `<button class="option ${isActive ? 'active' : ''}" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};
const init = () => {
    if (optionsContainer && container) {
        optionsContainer.innerHTML = "";
        getNews();
        createOptions();
    } else {
        console.error("Error: optionsContainer or container not found in the DOM.");
    }
};


window.onload =() =>{
    requestURL = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${apikey}`
    init();
};