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
  }).then(findRes => {
    if (!findRes) {
      res.status(404).json({ message: 'No categorywith this ID'});
      return;
    }
   res.json(findRes);
  })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(newCategory => res.json(newCategory))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {id: req.params.id},
    include: [Product]
  })
  .then(updatedCatagory => {
    if (!updatedCatagory[0]) {
      res.status(404).json({ message: 'No category with this ID'});
      return;
    }
    res.json(updatedCatagory);
  })
  .catch(err => {
    res.status(500).json(err);
      });
  });
  


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ 
    where: { id: req.params.id },
    include: [Product]
  }).then(findRes => {
    if (!findRes) {
      res.status(404).json({ message: 'No category with this ID'});
      return;
    }
    res.json(findRes);
  })
    .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
