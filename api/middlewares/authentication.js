const jwt = require('jsonwebtoken');

let checkAuth = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, "securePasswordHere", (err, decoded) => {

        if (err){
          const response = {
            status: "error",
            error: err
          };
          return res.status(401).json(response);
        }

        req.userData = decoded.userData;

        next();

    });

}

module.exports = {checkAuth}


