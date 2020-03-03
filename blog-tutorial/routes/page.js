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

router.get('/about', (req, res) => {
	const data = req.context
	res.render('about', data)
})

module.exports = router
