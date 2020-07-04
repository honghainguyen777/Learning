const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');
const Dishes = require('../models/dishes');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    //populate so the user and dishes fields have relationships with user and dishes Schema
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // check if user's favorites exists
    Favorites.findOne({user: req.user._id})
    // we dont need to populate anything at the post method
    // .populate('user')
    // .populate('dishes')
    .then((favorites) => {
        // if user's favorites collection does not exist
        if (!favorites) {
            // create a new favorites collection
            favorites = new Favorites({user: req.user._id});
        }
        // map through all the dishIds user wants to add to user's favorites
        req.body.map(favDish => {
            // make sure dishId is in the dishes collection 
            // (what happen if user adds a dish that are not in the available dishes)
            // if the dishId does not in the collection
            if (favorites.dishes.indexOf(favDish._id) == -1) {
                // add the dish in the dishes
                favorites.dishes.push({_id: favDish._id});
            }
        });
        // save the collection
        favorites.save()
        .then((favorites) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        }, (err) => next(err))
    })
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // remove the collection (we can use deleteOne({user: req.user._id}))
    Favorites.findOne({user: req.user._id}).remove()
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// No meanings to have a GET operation in this route
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/' + req.params.dishId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        // if user's favorites collection does not exist
        if (!favorites) {
            // create a new favorites collection
            favorites = new Favorites({user: req.user._id});
        }
        // if the dishId is not in the dishes
        if (favorites.dishes.indexOf(req.params.dishId) == -1) {
            // append/push the dishId to the dishes
            favorites.dishes.push({_id: req.params.dishId});
        }
        favorites.save()
        .then((favorites) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        }, (err) => next(err))
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/' + req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        // if the favorites collection does not exist, raise an error
        if (!favorites) {
            err = new Error('You have no dishes in your favorites to remove!')
            err.status = 404;
            return next(err);
        }
        // if it is available
        else {
            // get the index of the dishId in the dishes
            const index = favorites.dishes.indexOf(req.params.dishId);
            // if it is in the list
            if (index !== -1) {
                // remove the dishId using its index
                favorites.dishes.splice(index, 1);
                favorites.save()
                .then((favorites) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);
                }, (err) => next(err))
                // For check if no favorite dishes in the favorites
                // Then delete the favorites collection of the user
                // if (favorites.dishId.length === 0) {
                //     Favorites.findOne({user: req.user._id}).remove()
                //     .then((resp) => {
                //         res.setHeader('Content-Type', 'application/json');
                //         res.json(resp, {"message": "Dele"});
                //     }, (err) => next(err))
                //     .catch((err) => next(err));
                // }
                // else {
                //     favorites.save()
                //     .then((favorites) => {
                //         res.statusCode = 200;
                //         res.setHeader('Content-Type', 'application/json');
                //         res.json(favorites);
                //     }, (err) => next(err))
                // }
            }
            // if the dishId is not in the dishes, raise an error
            else {
                err = new Error('Dish ' + req.params.dishId + ' is currently not in your favorite collection!')
                err.status = 404;
                return next(err);
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favoriteRouter;