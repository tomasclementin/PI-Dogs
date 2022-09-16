const {Router} = require ('express');
const {Dogs, Temper} = require ('../db');
const router = Router();
const axios = require('axios');
const {API_KEY} = process.env;

router.get('/', async (req, res) => {
    try {
        // let temperArray = [];
        const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiDogsFiltered = await apiDogs.data.filter(e => e.temperament).map(e => e.temperament);
        // console.log(apiDogsFiltered);
        for (let i = 0; i < apiDogsFiltered.length; i++) {
            let newArr = apiDogsFiltered[i].split(', ');
            await newArr.forEach(e => {
                return Temper.findOrCreate({where: {name: e}, default: {name: e}});
            });
        };
        // let newArr = apiDogsFiltered.reduce((p, c) => {return p.concat(c)});
        // console.log(newArr);
        // let concatened = newArr.split(', ');
        // console.log(concatened);
        // let temperArray = Array.from(new Set(concatened));
        // console.log(temperArray);
        // await temperArray.forEach(e => {
            // return Temper.findOrCreate({where: {name: e}, defaut:{name: e}});
        // });
        const temperFromDb = await Temper.findAll();
        // temperFromDb.forEach(e => console.log(e.name));
        res.json(temperFromDb);
    } catch(e) {
        console.log(e.message);
        res.status(400).send('error');
    };
});

module.exports = router;