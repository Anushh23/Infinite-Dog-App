async function start(){
    try{
        const response= await fetch('https://dog.ceo/api/breeds/list/all');
        const dogData = await response.json();
        createBreedList(dogData.message);
    }
     catch(e){
         console.log('Error!')
    }
}
let x,y;
start();
function createBreedList(breedList){
    document.querySelector('#breedSelect').innerHTML=`
       <form>
        <select class="form-group" onchange="loadBreedImage(this.value)">
             <option class="form-control">Choose a Dog Breed</option>
             ${Object.keys(breedList).map(function(breed){
                 return `<option class="form-control">${breed[0].toUpperCase()+ breed.substr(1)}</option>`
             }).join('')}
        </select>
        </form>
    `
}

async function loadBreedImage(breed){
    if(breed!='Choose a Dog Breed'){
        const response= await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images`)
        const data= await response.json();
        createSlideshow(data.message);
    }
    else{
        clearTimeout(y);
        clearInterval(x);
    }
}

function createSlideshow(images){
    let position=0;
    clearInterval(x);
    clearTimeout(y);
    if(images.length>1){   
    document.getElementById('slidee').innerHTML=`
           <div class="slide" style="background-image: url('${images[0]}')"></div>  
           <div class="slide" style="background-image: url('${images[1]}')"></div>  
    `
    position+=2;
    if(images.length==2){position=0;}
    x= setInterval(nextSlide,3000)}
    else{
        document.getElementById('slidee').innerHTML=`
           <div class="slide" style="background-image: url('${images[0]}')"></div>  
           <div class="slide"></div>  
    `
    }

    function nextSlide(){
        document.getElementById('slidee').insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[position]}')"></div>`)
        y= setTimeout(function(){
            document.querySelector('.slide').remove();
        },1000)

        if(position+1>=images.length){
          position=0;
        }
        else
        {
           position++;
        }
    }
}