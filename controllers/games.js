const Game = require('../models/game.model');

const _ = require('lodash');

//for path of file
const fs = require('fs'); // file system
const { sortBy } = require('lodash');

exports.createGame = (req, res) => {
  const name = req.body.name;
  const status = req.body.status;

  const newGame = new Game({
    name,
    status,
  });

  newGame
    .save()
    .then(() => {
      res.json('Game added');
    })
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.getGame = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.getAllGames = (req, res) => {
  Game.find()
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.deleteGame = (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => res.json('Game deleted successfully'))
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.updateGame = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => {
      game.name = req.body.name;
      game.status = req.body.status;

      game
        .save()
        .then(() => res.json('Game has updated succesfully'))
        .catch((err) => res.status(400).json('Error:' + err));
    })
    .catch((err) => res.status(400).json('Error:' + err));
};
