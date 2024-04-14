const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const app = express();
const db = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const Session=require('./Models/user-sessions')
const CartItem = require('./models/cart-item');
const session = require('express-session');
const pgAdminStore = require('connect-pg-simple')(session);

// Initialize connect-pg-simple with Sequelize instance
const store = new pgAdminStore({
  conString: 'postgres://postgres:123456@localhost/nodeDB',

  tableName:'user-sessions'
  
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized:false,
  store: store
}));


app.use('/admin', adminRoutes);

app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

db.sync()
  .then(result => {
    
    return User.findByPk(1);

  })
  .then(user => {
    console.log(user + "this is user");
    if (!user) {

      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });



// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.engine('hbs', expressHbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminData = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// conadminhopRoutes = require('./routauthhop');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminData.routes);
// app.use(shopRoutes);

// app.use((req, res, next) => {
//   res.status(404).render('404', { pageTitle: 'Page Not Found' });
// });

// app.listen(3001);


// // function that returns a new server instance uses the requestListner as an arg to listen anytime we receive a new request
// const server = http.createServer( route.routeHandler);

// // the listen method runs a process where nodejs will not immediately exit out script and listen to upcoming request
// server.listen(3000);
