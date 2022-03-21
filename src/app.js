const express = require('express')
const path = require('path')
const {findId , getInfo} = require('./utils/recipe')
 const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 4000;
// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static Directory
app.use(express.static(publicDirectoryPath))
  
app.get('', (req, res) => {
    res.render('index', {
        title: 'Nut App',
        name: 'Hussayn Abd-samad'
    })
})




 app.get('/recipe', (req, res) => {
    if(!req.query.recipeName) {
        res.send({
            error: 'You must provide a recipe!'
        })
    } else {
       
         findId(req.query.recipeName).then((data) => {
           getInfo(data.id).then((datea) => {
               res.send({
                   dtitle : data.title,
                   datea
          })

       }).catch((error) => {
        res.send({
            error
        })
       
   })
}).catch((error) => {
    res.send({
        error
    })
   
})  
}
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Hussayn Abd-samad',
        errorMessage: '  Page not found'
    })
})
 app.listen(port , () => {
     console.log('App is running on port' + port)
 })
