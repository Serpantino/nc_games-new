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


// app.listen(port, () => {
//     console.log(`Listening on ${port}`);
// })

module.exports = app;
