const { json } = require('express');
const express = require('express'); 
const axios = require('axios');
const app = express(); 

app.use(express.json());             
app.use(express.urlencoded());       



let users = [ 
  { id: 1, name: 'Lily', age: 20 }, 
  { id: 2, name: 'Jazz', age: 23 }, 
  { id: 3, name: 'Rosy', age:22 },
  { id: 4, name: 'Fiyona', age:24 },
  { id: 5, name: 'Jasmin', age:25 },
]; 


http://localhost:8080/
app.get('/', (req, res) => { 
  res.send("Welcome to our server");
}); 

 
http://localhost:8080/users
app.get('/users', (req, res) => { 
  res.json(users); 
}); 

app.get('/localuser', (req, res) => { 
  const data = axios.get('http://conatiner2:8080/hello')
  res.json(data); 
}); 

app.get('/hello', (req, res) => { 
  res.send('Hello from container 2'); 
}); 


app.get('/hello/health', (req, res) => { 
  res.send('Am up and running'); 
});


app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("ERROR: User with ID " + userID + " does not exist");
    }
});


 

app.post('/users', (req, res) => {

  if (req.body === undefined) {
    
    console.log("ERROR: req.body is undefined");
    res.status(400).send("ERROR: req.body is undefined");
  } 
  else {
    
    userData = JSON.stringify(req.body);
    console.log("Adding new user with data: " + userData);

    
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
  }
  
}); 

 


app.put('/users/:id', (req, res) => { 

  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);

  const updatedUser = req.body; 

  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 

 


app.delete('/users/:id', (req, res) => { 
  
  const userId = parseInt(req.params.id);

  
  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
}); 

 

app.listen(8080, () => { 
  console.log('Server is listening on port 8080'); 
}); 