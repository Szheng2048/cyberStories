const topstories = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty/v0/topstories"

const Parent = document.querySelector("#pieces")

function fetchData(response){
    let newstory = `https://hacker-news.firebaseio.com/v0/item/${response}.json?print=pretty`
    return fetch(newstory)
}


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
                for(let item of data){
                    let newElement = document.createElement('li')
                    newElement.innerHTML = `<a href="${item.url}">`
                }
            })
    })