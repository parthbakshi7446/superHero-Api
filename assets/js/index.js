let input = document.getElementById("hero-input");
let display = document.getElementById("display");

//on every char input, heroes are updated
input.addEventListener('keyup',searchHero);

//accessing local storage
let myStorage = window.localStorage;

//creating storage
if(myStorage.getItem('favourite')){
    console.log("Storage Already There");
}else{
    let arr = [];
    myStorage.setItem('favourite',JSON.stringify(arr));
    console.log("Storage Created");
}


//function which makes an ajax call and search for hero
function searchHero(){
    if(input.value==""){
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('get',`https://superheroapi.com/api.php/929970120805510/search/${input.value}`);
    xhr.send();
    xhr.onload = updateDOM;
    xhr.onerror = function(err){console.log(err.responseText);};
}

//display all heroes in DOM after fetched 
function updateDOM(data){

    //converting response to JSON format
    data = JSON.parse(data.target.response);
    
    //returning if multiple requests are made and returning only final one
    if(input.value!=data["results-for"]){
        return;
    }

    display.innerHTML="";
    let template = document.getElementsByTagName("template")[0];
    if(!data.results){
        return;//if nothing is returned from ajax call
    }

    //adding all elemnets to outer div
    //to avoid performance issue due to multiple operations on DOM
    let outer = document.createElement('div');
    for(let post of data.results){
        let element = template.content.cloneNode(true);
        element.children[0].children[0].innerHTML=`${post.name}`;
        element.children[0].children[1].innerHTML=`<img src="${post.image.url}" alt="${post.name}">`;
        element.children[0].children[2].setAttribute('heroId',`${post.id}`);
        element.children[0].setAttribute('heroid',`${post.id}`);
        outer.appendChild(element);
    }
    display.appendChild(outer);
}


//if found , update that hero to local storage 
function addFavHero(id){
    let arr = myStorage.getItem('favourite');
    arr = JSON.parse(arr);
    
    if(!arr.includes(id)){
        alert("added to favourites");
        arr.push(id);
    }
    else{
        alert("Already Added");
    }
    myStorage.setItem('favourite',JSON.stringify(arr));
}

//event listener forr all the heroes to show their info & adding them to fav using event delgation
document.getElementById("display").addEventListener('click',function(event){
    //adding them to favourite
    let head = event.target.closest('div');
    if(event.target==head.children[2]){
        addFavHero(head.children[2].getAttribute("heroid"));
        event.stopPropagation();
        return;
    }
    //redirecting them to show their info
    let id = event.target.closest('div').getAttribute('heroid');
    if(id){
        window.location.href = `hero.html?id=${id}`;
    }
});