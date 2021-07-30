const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then(findRes => res.json(findRes))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({ 
    where: { id: req.params.id },
    include: [Product]
  }).then(findRes => res.json(findRes))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(newCategory => res.json(newCategory))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ 
    where: { id: req.params.id },
    include: [Product]
  }).then(findRes => res.json(findRes))
});

module.exports = router;
