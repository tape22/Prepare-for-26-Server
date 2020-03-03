const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get() // fetch the blog posts
	.then(posts => {
		data['posts'] = posts
		res.render('home', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/posts', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get(req.query)
	.then(posts => {
		data['posts'] = posts
		res.render('home', data) // render home.mustache
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/post/:slug', (req, res) => {
	const data = req.context
	const slug = req.params.slug // dynamic path pattern
	console.log('SLUG == '+slug) // spit out the text

	const ctr = new controllers.post()
	ctr.get({slug:req.params.slug})
	.then(posts => {
		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

		const post = posts[0]
		data['post'] = post
		res.render('post', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/health', (req, rex) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get({category:'health'}) // fetch
	.then(posts=> {
		// const numPosts = posts.length
		// res.send('Found ' + numPosts+ 'blog posts!')

		data['posts']= posts
		res.render('home', data)
	})
	.catch(error => {
		res.send('Oops! Something went wrong: ' + error.message)
	});
})

router.get('/travel', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get({category:'travel'}) // fetch
	.then(posts=> {
		// this is an array

		data['posts']= posts
		res.render('home', data)
	})
	.catch(error => {
		res.send('Oops! Something went wrong: ' + error.message)
	});
})

router.get('/project', (req, res) => {
	const data = req.context

	const postsCtr = new controllers.post()
	postsCtr.get({category:'project'})
	.then(posts => { 
		data['posts'] = posts
		res.render('home', data)
	})
	.catch(err=> {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


router.get('/about', (req, res) => {
	const data = req.context
	res.render('about', data)
})

router.post('/message', (req, res) => {
	const formData = req.body

	// res.json(formData)

	// create Messasage
	const messageCtr = new controllers.message()
	messageCtr.post({name:formData['visitor-name'], email:formData['visitor-email'], text:formData['visitor-message'],})
	.then(message => {
		// success callback
		res.json({
			confirmation: 'success',
			data: message
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail', 
			message: err.message
		})
	})
})

module.exports = router
