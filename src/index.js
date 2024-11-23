require('dotenv').config();
const app = require('./app')
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.get('/server', async (req, res) => {
    res.status(200).send( "Server is up and running" );
});