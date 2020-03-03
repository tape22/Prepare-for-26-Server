const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const Controller = vertex.Controller
const Message = require('../models/Message')

class MessageController extends Controller {
	constructor(){
		super(Message, process.env)
	}

	get(params) {
		return new Promise((resolve, reject) => {
			Controller.checkCollectionDB(Message.collectionName())
			.then(data => {
				return Message.find(params, Controller.parseFilters(params))
			})
			.then(messages => {
				resolve(Message.convertToJson(messages))
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			Controller.checkCollectionDB(Message.collectionName())
			.then(data => {
				return Message.findById(id)
			})
			.then(message => {
				if (message == null){
					throw new Error(Message.resourceName + ' ' + id + ' not found.')
					return
				}

				resolve(message.summary())
			})
			.catch(err => {
				reject(new Error(Message.resourceName + ' ' + id + ' not found.'))
			})
		})
	}

	post(body) {
		return new Promise((resolve, reject) => {
			let payload = null
			Message.create(body)
			.then(message => {
				payload = message.summary()
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Message.collectionName())
			})
			.then(data => {
				resolve(payload)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	put(id, params) {
		return new Promise((resolve, reject) => {
			let payload = null
			Message.findByIdAndUpdate(id, params, {new:true})
			.then(message => {
				payload = message.summary()
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Message.collectionName())
			})
			.then(data => {
				resolve(payload)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			Message.findByIdAndRemove(id)
			.then(() => {
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Message.collectionName())
			})
			.then(data => {
				resolve()
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}

module.exports = MessageController

