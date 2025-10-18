import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json('No Token Provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({message: 'Invaid or Expired token'})
    }
}