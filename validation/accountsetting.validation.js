const { check } = require('express-validator');
module.exports=[
    check('oldpassword').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/),
    check('newpassword').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/),
    check('repassword').custom((value, { req }) => {
        if (value !== req.body.newpassword) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      }),
]