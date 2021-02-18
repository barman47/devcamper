const express = require('express');
const { 
    getBootcamps, 
    getBootcampsInRadius, 
    getBootcamp, 
    createBootcamp, 
    updateBootcamp, 
    deleteBootcamp, 
    bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');


// Include other resourse routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const advancedResults = require('../middleware/advancedResults');
const {  protect, authorize} = require('../middleware/auth');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
    .route('/', )
    .get(advancedResults(Bootcamp, 'courses'),getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;