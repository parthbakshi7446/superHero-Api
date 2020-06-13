let myStorage = window.localStorage;
let display = document.getElementById("display");
let template = document.getElementsByTagName('template')[0];

let data = JSON.parse(myStorage.getItem('favourite'));
console.log(data)

let outer = document.createElement('div');
for(let id of data){
    getElemAndAdd(id);
}
display.appendChild(outer);


function getElemAndAdd(id){
    $.ajax({
        type:'get',
        url:`https://superheroapi.com/api.php/929970120805510/${id}`,
        success: Add,
        error:function(err){console.log(err.plainText);}
    });
    function Add(post){
        let element = template.content.cloneNode(true);
        element.children[0].children[0].innerHTML=`${post.name}`;
        element.children[0].children[1].innerHTML=`<img src="${post.image.url}" alt="${post.name}">`;
        element.children[0].children[2].setAttribute('heroId',`${post.id}`);
        element.children[0].setAttribute('heroId',`${post.id}`);
        element.children[0].children[2].addEventListener('click',heroDelete);
        outer.appendChild(element);
    }
}
function heroDelete(event){
    let id = event.target.getAttribute('heroid');
    event.target.closest('div').remove();
    let arr = JSON.parse(myStorage.getItem('favourite'));
    let count=0;
    for(let i in arr){
        if(+arr[i]==id){
            arr.splice(count,1);
            console.log(`deleted hero id:${id}`);
            break;
        }
        count++;
    }
    myStorage.setItem('favourite',JSON.stringify(arr));
    console.log(arr);
    event.stopPropagation();
}

document.getElementById("display").addEventListener('click',function(event){
    let id = event.target.closest('div').getAttribute('heroid');
    if(id){
        window.location.href = `hero.html?id=${id}`;
    }
});