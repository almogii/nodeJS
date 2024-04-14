const User=require('../models/user')
const userSession=require('../Models/user-sessions')
exports.getLogin = (req, res, next) => {
  
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  console.log( req.session.user);
  userSession.update({userId:req.session.user.id},{where:{userId:null} })
  User.findByPk(1)
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user=user
      
      res.redirect('/')
    }).catch(err => console.log(err));
    
};

  