const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/two-test')

/*Post.create({

	title:'My first post',

	description:'Blog post description',

	content:'lorem ipsum blog'
}, (error, post) =>{

	console.log(error, post)
})*/

Post.find({}, (error, posts) =>{
	console.log(error, posts)
})

/*Post.findById("5d236b0901214025840d43b0", (error, post) =>{
	console.log(error, post)
})*/

/*Post.findByIdAndUpdate("5d236b0901214025840d43b0,", {
	title: 'Yogita'
},(error, post) => {
	console.log(error, post)
})*/