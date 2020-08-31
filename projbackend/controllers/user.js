const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user is found in DB',
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profil.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorised to update this user',
        });
      }

      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      res.json(user);
    }
  );
};

//  We can just return the purchase List from user model but we also want to do what idk (we want to see everything in order schema)
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No order in this account',
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.id,
    });
  });

  //   Store in this in DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: 'Unable to save purchase list',
        });
      }
      next();
    }
  );
};

// Assignment get all user
exports.getAllUser = (req, res) => {
  User.find((err, userArr) => {
    if (err) {
      return res.status(400).json({
        error: 'No user is found',
      });
    }

    return res.json(userArr);
  });
};
