const jwt = require('jsonwebtoken');
const secretKey = require('../../config').API_SECRET

function extractTokenFromHeader(request){
    const [type, token] = request.header('Authorization').split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }


const auth = (req, res, next) => {
    if(!req.header('Authorization')){
        return res.status(401).send({ message: 'unauthorized' })
    }
    const token = extractTokenFromHeader(req)
    console.log(token)
    if (!token) return res.status(401).send({ message: 'unauthorized' })
    try {
        const payload = jwt.verify(token, secretKey)
        req.user = payload
        next()
    } catch (e) {
        res.status(401).json({ message: 'unauthorized' })
    }
}

module.exports = {
    auth
}