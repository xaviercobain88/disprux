console.log("....initializing server....")
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var firebase = require('firebase')

var config = {
    apiKey: "AIzaSyBHVlF8cJ3FDvp7QOEdXPAzmQIPkU5OUDc",
    authDomain: "disprux-chat.firebaseapp.com",
    databaseURL: "https://disprux-chat.firebaseio.com",
    storageBucket: "disprux-chat.appspot.com",
    messagingSenderId: "951084883971"
};

var conversations = [

    {
        _id: 2,
        recipients: [{
            _id: 2,
            name: 'Paul',
            avatar: 'http://pbs.twimg.com/profile_images/730797439221964801/M_ezVGPo.jpg'
        }]
    },
    {
        _id: 3,
        recipients: [{
            _id: 3,
            name: 'George',
            avatar: 'http://www.slate.com/content/dam/slate/articles/arts/musicbox/2011/10/111004_MUSIC_harrisonFW.jpg.CROP.article250-medium.jpg'
        }]
    },
    {
        _id: 4,
        recipients: [{
            _id: 4,
            name: 'Ringo',
            avatar: 'http://67.media.tumblr.com/avatar_f844fc6435ee_128.png'
        }]
    }
]

var fbChatDB = firebase.initializeApp(config).database()
var conversationsRef = fbChatDB.ref('users/1/STREAMS/conversations/TIMESTAMP')
conversationsRef.set(Math.random(), function () {
    setTimeout(function () {
        conversations.push({
            _id: 1,
            recipients: [{
                _id: 1,
                name: 'John',
                avatar: 'http://www.dyslexiainthailand.com/img/lennon.jpg'
            }]
        })
        conversationsRef.set(Math.random())
    }, 2000)
})








// var messages = {
//     _id: Math.round(Math.random() * 1000000),
//     text: text,
//     createdAt: new Date(),
//     user: {
//         _id: 2,
//         name: 'React Native',
//         avatar: 'https://avatars1.githubusercontent.com/u/2592468?v=3&s=460',
//     },
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'It\'s working' });
});

router.get('/users/1/conversations', function (req, res) {
    res.json({ data: conversations });
});

app.use('/', router);
app.listen(3000, function () {
    console.log('Disprux chat server listening on port 3000!')
})

