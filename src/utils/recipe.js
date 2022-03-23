const request = require('request')
const findId = (recipe) => {
    return new Promise((resolve, reject) => {
   const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(recipe)}&number=1000&apiKey=b8a0c062a3c34261a82881e10c0a7a7a`
   
      request({url, json: true}, (error, {body} = {}) => {
      if (error) {
          reject('Unable to connect to recipe!')
      } 
      
      if (body.results.length === 0) {
     reject('Unable to find recipe, Try another search.')
      } else {
          let  number = body.totalResults
       
        if(number >= 100) {
            number = 100
           
        }
     
        const num = Math.floor((Math. random() * number));
   
          resolve({
              id: body.results[num].id,
              title : body.results[num].title, 
              numb: body.totalResults
          })
      }
    })

    })
}
const getInfo = (id) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=b8a0c062a3c34261a82881e10c0a7a7a` 
        request({url, json: true}, (error, {body} = {}) => {
if(error) {
    reject(error) 
} else {
    resolve({
        readyInminutes : body.readyInMinutes,
        pricePerServing : body.pricePerServing,
        image : body.image,
        summary: body.summary
    })
}
      })
    })
}
 

module.exports = {
   findId, getInfo
}
// findId('roasted beef').then((data) => {
//     console.log(data)
// }).catch((error)=> {
//     console.log(error)
// })