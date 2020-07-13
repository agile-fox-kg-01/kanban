const express = require('express');
const app = express();
const { Category } = require('./models/index')

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send("Hello World, this from express")
})

app.get('/categories', async (req, res, next) => {
    try {
        const categories = await Category.findAll({});
        res.json(categories)
    } catch(err) {
        res.status(500).json({
            message: 'Wadidaw'
        })
    }
})

app.listen(PORT, () => console.log(`express on. in port: ${PORT}`))