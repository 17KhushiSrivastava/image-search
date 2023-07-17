const accessKey='8-FQoWbW9Bvr93oe2Zk-wDD6O7S4lvawNY3x8JuMXkk'

const formEl= document.querySelector("form");
const inputEl= document.querySelector("#search-input")
const searchRes= document.querySelector(".seach-results")
const showMore= document.querySelector("#show-more-button")

let inputData=""
let page=1;

let searchImages = async function(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  
    try{
    const response= await fetch(url)
    const data= await response.json()

    const results=data.results;


    if(page===1)
    {
        searchRes.innerHTML="";
    }

    results.forEach((result)=>{
        const imageWrapper=document.createElement("div")
        imageWrapper.classList.add("images")
        const image = document.createElement('img')
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink= document.createElement('a')
        imageLink.href= result.links.html;
        imageLink.target="_blank"
        imageLink.textContent=result.alt_description


        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchRes.appendChild(imageWrapper)

    })

    page++
    if(page > 1)
    {
        showMore.style.display="block"
    }
} catch(error)
{
    console.log(error);
}
};

formEl.addEventListener("submit" , (event) =>{
    event.preventDefault()
    page=1;
    searchImages()
});

showMore.addEventListener("click" , () =>{
    searchImages()
})
