import express from "express";
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello World!'));

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server started at http://localhost:${port}!`));