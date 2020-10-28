const { response } = require('express');
const express = require('express');
const shortid = require('shortid');

let hubs = [];

const server = express();

server.get('/', (request, response) => {
    response.json({hello: 'world'});
});

server.get('/whatever', (request, response) => {
    response.json({doing: 'stuff'});
});

//Create
server.post('/api/hubs', (request, response) => {
    const hubInfo = request.body;
    hubInfo.id = shortid.generate();
    hubs.push(hubInfo);

    response.status(201).json(hubInfo);
})

//Read
server.get('/api/hubs', (request, respnse) => {
    response.status(200).json(hubs);
})

//Update
server.put('/api/hubs/:id', (request, response) => {
    const {id} = request.params;
    const changes = request.body;

    let index = hubs.findIndex(hub => hub.id === id);

    if(index !== -1){
        changes.id = id;
        hubs[index] = changes;
        response.status(200).json(hubs[index]);
    }else {
        response.status(404).json({nessage: "hub not found"};)
    }
    
})

server.patch('/api/hubs/:id', (request, response) => {
    const {id} = request.params;
    const changes = response.body;

    let found = hubs.find(hub => hub.id === id)

    if(found){
        Object.assign(found, changes);
        response.status(200).json(found)
    }else{
        response.status(404).json({message: 'id not found'})
    }
})

//Delete
server.delete('/api/hubs/:id', (request, response) => {
    const {id} = request.params;

    const deleted = hubs.find(hub => hub.id === id);

    if(deleted){
        hubs = hubs.filter(hub => hub.id !== id);
        response.status(200).json(deleted)
    } else {
        response.status(404).json({message: "id not found"});
    }
})


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`*** listening on port ${PORT}`)
});