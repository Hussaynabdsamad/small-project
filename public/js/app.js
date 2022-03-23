
 const input =  document.querySelector('input')
document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault()
 let recipe = input.value

 fetch('/recipe?recipeName=' + recipe).then((response) => {
    document.getElementById('query0').innerHTML = 'Loading...'
    document.getElementById('query1').innerHTML = ''
    document.getElementById('query2').innerHTML = ''
    document.getElementById('query3').innerHTML = ''
    document.querySelector('img').setAttribute('src', '');

 response.json().then((data) => {
     if(data.error) {
      document.getElementById('query0').innerHTML = data.error
     } else {
      document.getElementById('query0').innerHTML =  `${data.number} Results`
      if( data.number > 30) {
         document.getElementById('query1').innerHTML = 'Be more specific with your search'
      }
           document.getElementById('query2').innerHTML =  data.dtitle
            document.getElementById('query3').innerHTML = data.datea.summary
            document.querySelector('img').setAttribute('src', data.datea.image);
            
     }
    })
 }).catch(err => { document.getElementById('quer').innerHTML =  'Failed to fetch'}) 

})

 
