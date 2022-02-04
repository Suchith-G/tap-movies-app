const  express = require("express");
const router = express.Router();

const moviesRoutes =  require("./movieRoutes");

router.use('/movies', moviesRoutes);

module.exports = router;
