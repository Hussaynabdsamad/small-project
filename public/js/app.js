
 const input =  document.querySelector('input')
document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault()
 let recipe = input.value

 fetch('/recipe?recipeName=' + recipe).then((response) => {
    document.getElementById('quer').innerHTML = 'Loading...'
    document.getElementById('quer2').innerHTML = ''

 response.json().then((data) => {
     if(data.error) {
      document.getElementById('quer').innerHTML = data.error
     } else {
      document.getElementById('query0').innerHTML =  `${data.datea.numb} Results`
      if( data.datea.numb > 30) {
         document.getElementById('query1').innerHTML = 'Be more specific with your search'
      }
           document.getElementById('query2').innerHTML =  data.dtitle
            document.getElementById('query3').innerHTML = data.datea.summary
            document.querySelector('img').setAttribute('src', data.datea.image);
            
     }
    })
 }).catch(err => { document.getElementById('quer').innerHTML =  'Failed to fetch'}) 

})

 
