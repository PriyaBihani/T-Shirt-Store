var braintree = require('braintree');

var gateway = braintree.connect({
   environment: braintree.Environment.Sandbox,
   merchantId: '3p6858n3brw7xtkd',
   publicKey: '838zg58n6d8vzp4k',
   privateKey: 'cd4a73d635428fcbbc9f99e922bcb213	',
});

exports.getToken = (req, res) => {
   gateway.clientToken.generate({}, function (err, response) {
      if (err) {
         return res.status(500).send(err);
      }

      return res.send(response);
   });
};

exports.processPayment = (req, res) => {
   let nonceFromTheClient = req.body.paymentMethodNonce;
   let amounFromTheClient = req.body.amount;

   gateway.transaction.sale(
      {
         amount: amounFromTheClient,
         paymentMethodNonce: nonceFromTheClient,
         options: {
            submitForSettlement: true,
         },
      },
      function (err, result) {
         if (err) {
            return res.status(500).json(error);
         }

         return res.json(result);
      }
   );
};
