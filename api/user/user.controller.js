const models = require('../../models');

exports.show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({error: 'Incorrect id'});

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({error: 'No User'});
    }
    return res.json(user);
  });
};

exports.index = (req, res) => {
  models.User.findAll().then(users => res.json(users));
};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({error: 'Incorrect id'});

  models.User.destroy({
    where: {
      id: id
    }
  }).then(() => res.status(204).send());
};

exports.create = (req, res) => {
  const name = req.body.name.toString().trim() || '';
  if (!name.length) {
    return res.status(400).json({error: 'Incorrenct name'});
  }

  models.User.create({
    name: name
  }).then((user) => res.status(201).json(user))
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({error: 'Incorrect id'});

  const name = req.body.name || '';
  if (!name.length) {
    return res.status(400).json({error: 'Incorrenct name'});
  }

  let user = users.filter(user => user.id === id)[0];
  if (!user) {
    return res.status(404).json({error: 'Unknown user'});
  }

  user.name = name;
  return res.json(user);
};
