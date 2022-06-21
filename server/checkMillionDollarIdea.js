const checkMillionDollarIdea = (req, res, next) => {
    const ideaValue = req.body.weeklyRevenue * req.body.numWeeks;
    if (ideaValue >= 1000000) {
        next();
    } else {
        next(new Error('This idea is worthless!'));
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
