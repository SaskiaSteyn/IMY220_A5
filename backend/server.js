import express from "express"
import path from 'path'

//CREATE APP
const app = express();

//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("frontend/public"));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend', 'public', 'index.html'));
  });


//PORT TO LISTEN TO
app.listen(3000, () => {
console.log("Listening on localhost:3000");
});