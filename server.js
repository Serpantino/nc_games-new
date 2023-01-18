const express = require ("express");
const boardGameRoutes = require('./src/routes');
const app = express();
const port = 9090;


app.use(express.json());

app.get('/', (request, response) => {
    response.send(
        `Welcome. The valid route is /api/`
    )
})

app.use('/api/', boardGameRoutes);

//===========================//
//===== Error Handlers =====//
//===========================//
app.use((error, request, response, next) => {
    
    response.status(500).send({message: 'Generic Server Error, please check your request & try again, if this persists contact us.'});
});


app.use((request, response, next) => {
    
    response.status(404).send({message: `Page not found, please check your syntax. You entered: ${request.url}`})
});
//---------------------------//

module.exports = app;

//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
    Remember to keep error Handlers at the bottom. Especially 404.
*/