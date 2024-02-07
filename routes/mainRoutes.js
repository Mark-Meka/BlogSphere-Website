const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readerController'); // If readerController handles guest access

router.get('/', (req, res) => res.render('login'));

// Handle the login logic for admin
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.redirect('/author-home');
    } else {
        res.render('login', { error: 'Invalid Credentials' });
    }
});
router.get('/guest-access', readerController.guestAccess);
// Handle guest access
router.get('/guest', readerController.guestAccess); // Assuming readerController has a method guestAccess

module.exports = router;
