module.exports = (req, res, next) => {
    // Dummy token validation
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('auth.mw:', token);
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' }); //401 Unauthorized - Auth Error

    // Simulate validation
    const secret = 'valid-token';
    if (token !== secret) return res.status(403).json({ message: 'Invalid Token!' }); //403 Forbidden - Auth Error
    next();
    // jwt.verify(token, secret, (err, user) => {
    //     //if (err) return res.sendStatus(403);
    //     if (err) return res.status(403).json({ message: 'Invalid Token!' }); //403 Forbidden - Auth Error
    //     //req.user = user;
    //     next();
    // });
}
