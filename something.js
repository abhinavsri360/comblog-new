/*const http = require('http')

const fs = require('fs')


const aboutpg = fs.readFileSync('aboutpg.html')

const contactpg = fs.readFileSync('contactpg.html')

const homepg = fs.readFileSync('homepg.html')


const server = http.createServer((request,response) => {

	if(request.url === '/about')
		return response.end(aboutpg)
	else if(request.url === '/contact')
		return response.end(contactpg)
	else if(request.url === '/')
		return response.end(homepg)
	else{
		response.writeHead(404)
		response.end('PAGE NOT FOUND')
	}
})

server.listen(3000)*/


/*const path = require('path')

const express = require('express')

const app = express()

app.get('/',(request,response) => {
	console.log(path.resolve(__dirname, 'homepg.html'))
	response.sendFile(path.resolve(__dirname, 'homepg.html'))
})

app.get('/about', (request, response) => {
	console.log(path.resolve(__dirname, 'aboutpg.html'))
	response.sendFile(path.resolve(__dirname, 'aboutpg.html'))
})

app.listen(3000, () =>{
	console.log('App is listening to port 3000')
})*/

require('dotenv').config()

//console.log(process.env)

const edge = require('edge.js')

const expressEdge = require('express-edge')

const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const cloudinary = require('cloudinary')

const fileUpload = require('express-fileupload')

const expressSession = require('express-session')

const connectMongo = require('connect-mongo')


const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

const auth = require('./middleware/auth')

const storePost = require('./middleware/storePost')


const storeUserController = require('./controllers/storeUser')

const getPostController = require('./controllers/getPost')

const createHomecontroller = require('./controllers/homePage')

const createPostController = require('./controllers/createPost')

const createStoreController = require('./controllers/storePost')

const createUserController = require('./controllers/createUser')

const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')


const app = new express()

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/comblog', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

const db = mongoose.connection;

db.on('errr', () => {
	throw new Error('> UNABLE TO CONNECT TO THE DATABASE! CHECK CONNECTION');
})

cloudinary.config({
	api_key: process.env.CLOUDINARY_API_KEY,

	api_secret: process.env.CLOUDINARY_API_SECRET,

	cloud_name: process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
	secret: process.env.EXPRESS_SESSION_KEY,

	store: new mongoStore({
		mongooseConnection: mongoose.connection
	})
}))





app.use(fileUpload())

app.use(express.static('public'))

app.use(expressEdge)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))


app.set('views', `${__dirname}/views`)

app.use('*', (req, res, next) => {
	edge.global('auth', req.session.userId)

	next()
})

//app.use('/posts/store', storePost)

//app.use('/posts/new', auth)

app.get('/post/sample', (req, res) => {
	res.render('sample')
})

app.get('/', createHomecontroller)

app.get('/post/:id', getPostController)

app.get('/posts/new', auth, createPostController)

app.post("/posts/store", auth, storePost, createStoreController)

app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)

app.get('/auth/login', redirectIfAuthenticated, loginController)

app.post('/users/login', redirectIfAuthenticated, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => {
	res.render('not-found')
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`"App is listening to port ${port}"`)
})

