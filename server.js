const express = require("express");
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlRoutes");



// Initialise the app
const app = express();
const PORT = process.env.PORT || 3001


// Middleware and serving files
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// Starting the server on the Port
app.listen(PORT, () => console.log("Server Running"));