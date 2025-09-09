const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllProducts = async(req, res) => {
    res.send('get all products')
}
const getProduct = async(req, res) => {
    res.send('get a product')
}
const createProduct = async(req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}
const updateProduct = async(req, res) => {
    res.send('update a product')
}
const deleteProduct = async(req, res) => {
    res.send('delete a product')
}


module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}