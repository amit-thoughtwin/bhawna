
const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.tokenverify = (req, res, next) => {

  let token
  let {authorization} = req.headers;
 
if(authorization){
token= authorization.split(' ')[1]

}
if(req.headers.token){
  token=req.headers.token
}
if(req.cookies.token)
 token= req.cookies.token
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token , key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.token=token
    next();
  });
};