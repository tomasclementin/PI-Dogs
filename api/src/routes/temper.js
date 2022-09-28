const {Router} = require ('express');
const {Dogs, Temper} = require ('../db');
const router = Router();
const axios = require('axios');
const {API_KEY} = process.env;

router.get('/', async (req, res) => {
    try {
        const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiDogsFiltered = await apiDogs.data.filter(e => e.temperament).map(e => e.temperament);
        for (let i = 0; i < apiDogsFiltered.length; i++) {
            let newArr = apiDogsFiltered[i].split(', ');
            await newArr.forEach(e => {
                return Temper.findOrCreate({where: {name: e}, default: {name: e}});
            });
        };
        const temperFromDb = await Temper.findAll();
        res.json(temperFromDb);
    } catch(e) {
        console.log(e.message);
        res.status(400).send('error');
    };
});

module.exports = router;