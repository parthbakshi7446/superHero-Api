window.addEventListener('load',function(req){
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    $.ajax({
        type:'get',
        url:`https://superheroapi.com/api.php/929970120805510/${id}`,
        success:searchAndUpdate,
        error:function(err){console.log(err.responseText);}
    });
});
var a;
function searchAndUpdate(data){
    console.log(data);
    a=data;
    let heroName = document.getElementById("hero-name");
    let heroImg = document.getElementById("hero-img");
    let heroDet = document.getElementById("hero-detail");

    heroName.innerHTML = `${data.name}`;
    heroImg.innerHTML = `<img src="${data.image.url}" alt="${data.name}">`;
    heroDet.children[0].innerHTML += ` ${data.biography["full-name"] || "Not Available"}`;
    heroDet.children[1].innerHTML += ` ${data.biography["place-of-birth"] || "Not Available"}`;
    heroDet.children[2].innerHTML += ` ${data.biography.publisher || "Not Available"}`;
    heroDet.children[3].innerHTML += ` ${data.biography["first-appearance"] || "Not Available"}`;
    heroDet.children[4].innerHTML += ` ${data.appearance.gender || "Not Available"}`;
    heroDet.children[5].innerHTML += ` ${data.appearance.height[1] || data.appearance.height[0] || "Not Available"}`;
    heroDet.children[6].innerHTML += ` ${data.appearance.weight[1] || data.appearance.weight[0] || "Not Available"}`;
    heroDet.children[7].innerHTML += ` ${data.powerstats.intelligence || "Not Available"}`;
    heroDet.children[8].innerHTML += ` ${data.powerstats.strength || "Not Available"}`;
    heroDet.children[9].innerHTML += ` ${data.powerstats.power || "Not Available"}`;
    heroDet.children[10].innerHTML += ` ${data.powerstats.durability || "Not Available"}`;
    heroDet.children[11].innerHTML += ` ${data.powerstats.combat || "Not Available"}`;
}