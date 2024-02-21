const topstories = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty/v0/topstories"

const parent = document.querySelector("#pieces")
const navigationButtons = document.querySelectorAll(".btn-check")
let choice = 1
let count = 0
function fetchData(response){
    let newstory = `https://hacker-news.firebaseio.com/v0/item/${response}.json?print=pretty`
    return fetch(newstory)
}



renderList()
function renderList(){
    fetch(topstories)
    .then((response)=>{
        return response.json()
    })
    .then((arr)=>{
        arr.length = 100
        let newarr = []
        for(let item of arr){
            newarr.push(fetchData(item))
        }
        Promise.all(newarr)
        .then((results) =>{
            return Promise.all(results.map(res => res.json()))})
            .then((data)=>{
                for(let i = 0;i<data.length;i++){
                    let newElement = document.createElement('li')
                    newElement.innerHTML = `<a href=${data[i].url}>${data[i].title}</a></br>Author: ${data[i].by}, Score: ${data[i].score}, Comments: ${data[i].descendants}`
                    parent.appendChild(newElement)
                    if(i > 24){
                        newElement.classList.add("invisible")
                    }
                }
                let listItems = document.querySelectorAll("li")
                for(let item of navigationButtons){
                    item.addEventListener("click",(event)=>{
                        if(event.target.checked){
                            choice = event.target.value
                        }
                        makeInvisible(choice,listItems)
                    })
                }
            })
        })
    }
    
function makeInvisible(num,arr){
    num = parseInt(num)
    for(let item of arr){
        item.classList.remove("invisible")
    }
    if(num === 1){
        for(let i = 24;i<arr.length;i++){
            arr[i].classList.add("invisible")
        }
    } else if(num === 2){
        for(let i = 0;i<arr.length;i++){
            if(i<25 || i>49){
                arr[i].classList.add("invisible")
            }
        }
    } else if(num === 3){
        for(let i = 0;i<arr.length;i++){
            if(i<50 || i>74){
                arr[i].classList.add("invisible")
            }
        }
    } else {
        for(let i = 0;i<75;i++){
            arr[i].classList.add("invisible")
        }
    }
}