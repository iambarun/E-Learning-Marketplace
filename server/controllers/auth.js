export const register = (req, res) => {
    console.log('Register User', req.body);
    res.json('Register User, response from controller');
};