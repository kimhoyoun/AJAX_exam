const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
// post 데이터 전송
const bodyParser = require('body-parser');
// 크로스 도메인 문제 해결
const cors = require('cors');

// 미들웨어
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"))
app.use(cors());
// ejs 뷰엔진 설정
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

router.route("/").get((req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
    res.write("<h1>Hompage</h1>");
    res.end("<h1>Hello AJAX world</h1>");
});

router.route("/home").get((req, res)=>{
    req.app.render("home", {"user":"홍길동"}, (err, html)=>{
        if(err) throw err;
        res.end(html);
    });
});

router.route("/data/:user/:message").get((req, res)=>{
    const user = req.params.user;
    const message = req.params.message;

    const messageData = {user, message};
    res.send(messageData);
});

router.route("/input").post((req, res)=>{
    const user = req.body.user;
    const message = req.body.message;

    const messageData = {user, message};
    res.send(messageData);
});


app.use("/", router);
var server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("서버 실행 중 >>> http://localhost:3000 ...");
});