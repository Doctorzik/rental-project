const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    
    return res.send("You dont have access.");
    }
    
  next();
};

module.exports = {
  isAuthenticated,
};
