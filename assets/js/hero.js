
//when page is loaded, it executes function to load teh content based on id received in query params
window.addEventListener('load',function(req){
    //accessing id through query params
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    let xhr = new XMLHttpRequest();
    xhr.open('get',`https://superheroapi.com/api.php/929970120805510/${id}`);
    xhr.send();
    xhr.onload = searchAndUpdate;
    xhr.onerror = function(err){console.log(err.responseText);};
});

//searching for the particular hero and updating its info to the DOM
function searchAndUpdate(data){

    //converting response to JSON format
    data = JSON.parse(data.target.response);

    let heroName = document.getElementById("hero-name");
    let heroImg = document.getElementById("hero-img");
    let heroDetail = document.getElementById("hero-detail");

    heroName.innerHTML = `${data.name}`;
    heroImg.innerHTML = `<img src="${data.image.url}" alt="${data.name}">`;
    heroDetail.children[0].innerHTML += ` ${data.biography["full-name"] || "Not Available"}`;
    heroDetail.children[1].innerHTML += ` ${data.biography["place-of-birth"] || "Not Available"}`;
    heroDetail.children[2].innerHTML += ` ${data.biography.publisher || "Not Available"}`;
    heroDetail.children[3].innerHTML += ` ${data.biography["first-appearance"] || "Not Available"}`;
    heroDetail.children[4].innerHTML += ` ${data.appearance.gender || "Not Available"}`;
    heroDetail.children[5].innerHTML += ` ${data.appearance.height[1] || data.appearance.height[0] || "Not Available"}`;
    heroDetail.children[6].innerHTML += ` ${data.appearance.weight[1] || data.appearance.weight[0] || "Not Available"}`;
    heroDetail.children[7].innerHTML += ` ${data.powerstats.intelligence || "Not Available"}`;
    heroDetail.children[8].innerHTML += ` ${data.powerstats.strength || "Not Available"}`;
    heroDetail.children[9].innerHTML += ` ${data.powerstats.power || "Not Available"}`;
    heroDetail.children[10].innerHTML += ` ${data.powerstats.durability || "Not Available"}`;
    heroDetail.children[11].innerHTML += ` ${data.powerstats.combat || "Not Available"}`;
}