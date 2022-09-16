const {Router} = require ('express');
const {Dogs, Temper} = require ('../db');
const router = Router();
const axios = require('axios');
const {API_KEY} = process.env;

router.get('/', async (req, res, next) => {
    if (req.query.name) {
        return next();
    };
    try{
        const allDogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const allDogsApiFiltered = await allDogsApi.data.map(e => {
            return {
                id: e.id,
                img: e.image.url,
                name: e.name,
                temper: e.temperament,
                weight: e.weight.metric
            };
        });
        const allDogsDb = await Dogs.findAll({
            attributes: ['id', 'name', 'weight', 'inDB'],
            include: {
                model: Temper,
                attributes: ['name'],
            }
        });
        res.json(allDogsApiFiltered.concat(allDogsDb));
    } catch(e) {
        console.log(e.message);
        res.status(400).send('Error');
    };
});

router.get('/', async (req, res) => {
    const name = req.query.name;
    try{
        const dogByNameApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&&api_key=${API_KEY}`);
        const dogByNameApiFiltered = await dogByNameApi.data.map(e => {
            return {
                name: e.name
            };
        });
        const dogByNameDb = await Dogs.findAll({
            where: {name: name.toLocaleLowerCase()},
            attributes: ['name']
        });
        res.json(dogByNameApiFiltered.concat(dogByNameDb));
    } catch(e) {
        console.log(e.message);
        res.status(404).send('error');
    };
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        if(typeof parseInt(id) === 'number') {
            console.log('entro al primer if');
            const allDogsFromApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            var dogByIdApi = await allDogsFromApi.data.filter(e => e.id === parseInt(id))
            .map(e => {
                return {
                    img: e.image.url,
                    name: e.name,
                    temper: e.temperament,
                    height: e.height.metric,
                    weight: e.weight.metric,
                    yearsOld: e.life_span
                };
            });
        }
        if(typeof parseInt(id) === 'NaN') {
            console.log('entro al if');
            const dogByIdDb = await Dogs.findByPk(id, {
                attributes: ['name', 'height', 'weight', 'yearsOld'],
                include: {
                    model: Temper,
                    attributes: ['name']
                }
            });
            return res.json(dogByIdApi.concat(dogByIdDb));
        }
        res.json(dogByIdApi);
    } catch(e) {
        console.log(e.message);
        res.status(400).send(e.message);
    };
});

router.post('/', async (req, res) => {
    const {name, height, weight, yearsOld} = req.body;
    try {
        if(!name || !height || !weight || !yearsOld) return res.status(404).send('Faltan datos obligatorios');
        const newDog = await Dogs.create(req.body);
        const newTemper = await newDog.createTemper({name: req.body.temper});
        res.send('Perro creado con éxito!');
    } catch (e) {
        console.log(e.message);
        res.status(400).send('error');
    };
});

module.exports = router;