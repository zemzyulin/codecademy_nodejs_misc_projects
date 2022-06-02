const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    if (!numWeeks || !weeklyRevenue || isNaN(numWeeks) || isNaN(weeklyRevenue) || numWeeks * weeklyRevenue < 1000000) {
        res.status(400).send('Invalid idea');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
