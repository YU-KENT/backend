const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const Thing = require('./models/Thing')

mongoose.connect('mongodb+srv://YuKKKK:tianyu12@cluster0.qa9uqy9.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());
app.post('/api/stuff',(req,res,next)=>{
    console.log("post",req.body._id)
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
     .then(()=> res.status(201).json({message:'object engisté !'}))
     .catch(error => res.status(400).json({error}));
});
app.put('/api/stuff/:id',(req,res,next)=>{
    Thing.updateOne({ _id: req.params.id },{...req.body,_id: req.params.id})
    .then(()=> res.status(200).json({message:'object modifié !'}))
    .catch(error => res.status(400).json({error}));

});
app.get('/api/stuff/:id',(req,res,next)=>{
        console.log(req.params.id)
        Thing.findOne({ _id: req.params.id })
        .then((thing)=> res.status(200).json(thing))
        .catch(error => res.status(404).json({error}))


});
app.get('/api/stuff', (req, res, next) => {
        Thing.find()
          .then(things => res.status(200).json(things))
          .catch(error => res.status(400).json({ error }));
 
  });
module.exports = app;