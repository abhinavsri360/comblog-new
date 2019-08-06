const path = require('path')

const cloudinary = require('cloudinary')

const Post = require('../database/models/Post')


module.exports = (req, res) =>{
	
	const { image } = req.files

	const pathUpload = path.resolve(__dirname, '..', 'public/posts', image.name)

	image.mv(pathUpload, (error) =>{
		
		cloudinary.v2.uploader.upload(pathUpload, (error, result) =>{

			if(error){
				return res.redirect('/')
			}

			Post.create({
				...req.body,
				image: result.secure_url,
				author: req.session.userId
			}, (error, post) =>{
				res.redirect('/')
			})
		})		
	})
}