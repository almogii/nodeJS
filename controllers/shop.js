const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then((rows)=>{
   
    res.render('shop/product-list', {
      prods:rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>console.log(err))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({
    where:{
      id:prodId
    }
  }).then((result)=>{
    console.log(result[0]);
    res.render('shop/product-detail', {
      product:result[0],
      pageTitle: 'Shop',
      path: '/product-detail'
    })
  }).catch(err=>{console.log(err)})
}
    

exports.getIndex = (req, res, next) => {
  Product.findAll().then((rows)=>{
    res.render('shop/index', {
      prods:rows,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err=>console.log(err))
 
};

exports.getCart = (req, res, next) => {
 
  req.session.user.getCart().then(
    cart=>{return cart.getProducts().then(products=>{
      console.log(products)
      res.render('shop/cart', {
              path: '/cart',
               pageTitle: 'Your Cart',
              products: products
            });
    }).catch(err=>{console.log(err);})})

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.session.user.
  getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}})
    
  }).then(products=>{
    if(products.length>0){
      product=products[0]

    }
    let newQuantity
    if(product){
      const oldQuantity=product.cartItem.quantity
      newQuantity=oldQuantity+1
    }
    return Product.findByPk(prodId)
    .then(product=>{
      return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
    })
  })
  .catch(err=>{console.log(err);})
 
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
