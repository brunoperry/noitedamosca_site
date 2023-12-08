import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import mysql from 'mysql2/promise';
import useragent from 'express-useragent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 80;
const API_PATH = "https://api.brunoperry.net/mnt/public/games/noitedamosca/"
app.use(useragent.express());


const connection = await mysql.createConnection({host:'192.168.1.1', user: 'user', password: 'pass', database: 'brunoperrynet'});

const setVisitor = async (req, game) => {
    try {
        await connection.execute('INSERT INTO visitors (ip, game, browser, date) VALUES (?, ?, ?, ?)', [req.ip, game, req.useragent.browser, Date.now()]);
    } catch (error) {
        console.log(error);
    }
}

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/mac', (req, res) => {
    setVisitor(req, 'NoiteDaMosca_mac');
    res.redirect(`${API_PATH}NoiteDaMosca_mac.zip`);
});
app.get('/linux', (req, res) => {
    setVisitor(req, 'NoiteDaMosca_linux');
    res.redirect(`${API_PATH}NoiteDaMosca_linux.zip`);
});
app.get('/win', (req, res) => {
    setVisitor(req, 'NoiteDaMosca_win');
    res.redirect(`${API_PATH}NoiteDaMosca_win.zip`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});