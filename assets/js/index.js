let input = document.getElementById("hero-input");
let display = document.getElementById("display");
input.addEventListener('keyup',searchHero);
let myStorage = window.localStorage;

if(myStorage.getItem('favourite')){
    console.log("Storage Already There");
}else{
    let arr = [];
    myStorage.setItem('favourite',JSON.stringify(arr));
    console.log("Storage Created");
}



function searchHero(){
    console.log(input.value);
    if(input.value==""){
        return;
    }
    $.ajax({
        type:'get',
        url:`https://superheroapi.com/api.php/929970120805510/search/${input.value}`,
        success: searchSuccess,
        error:function(err){console.log(err.responseText);}
    })
}
function searchSuccess(data){
    if(input.value!=data["results-for"]){
        return;
    }
    console.log(data);
    display.innerHTML="";
    let template = document.getElementsByTagName("template")[0];
    if(!data.results){
        return;
    }
    let outer = document.createElement('div');
    for(let post of data.results){
        let element = template.content.cloneNode(true);
        element.children[0].children[0].innerHTML=`${post.name}`;
        element.children[0].children[1].innerHTML=`<img src="${post.image.url}" alt="${post.name}">`;
        element.children[0].children[2].setAttribute('heroId',`${post.id}`);
        element.children[0].setAttribute('heroid',`${post.id}`);
        element.children[0].addEventListener('click',heroClick);
        outer.appendChild(element);
    }
    display.appendChild(outer);
}

function addFav(id){
    console.log(id);
    let arr = myStorage.getItem('favourite');
    arr = JSON.parse(arr);
    
    if(!arr.includes(id)){
        alert("added to favuorites");
        arr.push(id);
    }
    else{
        alert("Already Added");
    }
    myStorage.setItem('favourite',JSON.stringify(arr));
}

function heroClick(event){
    let head = event.target.closest('div');
    if(event.target==head.children[2]){
        addFav(head.children[2].getAttribute("heroid"));

        event.stopPropagation();
        return;
    }

}

document.getElementById("display").addEventListener('click',function(event){
    let id = event.target.closest('div').getAttribute('heroid');
    if(id){
        window.location.href = `hero.html?id=${id}`;
    }
});