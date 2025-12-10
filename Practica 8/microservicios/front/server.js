
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080; 

app.use(require('cors')()); 
app.use(express.json());

app.use(express.static(path.join(__dirname))); 

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});