const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');

import { clearCart } from './../src/redux/Cart/cart.actions'
import { useDispatch } from 'react-redux'

const dispatch = useDispatch()

const app = express();

app.use(cors({
    origin: true
}));

app.use(express.json());


app.post('/spgateway_notify', (req, res, next) => {
  const JSONData = JSON.parse(req.body.JSONData);
  const Result = JSON.parse(JSONData.Result);
  const data = orders[Result.MerchantOrderNo];
  // console.log('智付通 notify', JSONData, 'data', data);
  // 如果傳入交易成功
  if (JSONData.Status === 'SUCCESS') {
    
    // 解密驗證，注意 Result.TradeNo
    let parameter = `Amt=${data.Amt}&MerchantID=${spgateway.MerchantID}&MerchantOrderNo=${data.timestamp}&TradeNo=${Result.TradeNo}`;
    parameter = `HashIV=${spgateway.HashIV}&${parameter}&HashKey=${spgateway.HashKey}`;

    const sha = sha256(parameter).toUpperCase();
    console.log('parameter', parameter, 'sha', sha, 'CheckCode', Result.CheckCode);
    if (sha === Result.CheckCode) {
      // 另外可自訂其他驗證項目
      data.payment = Result;
      console.log('交易成功', data.payment);
      res.end();
    } else {
      console.log('交易失敗 交易碼不符合');
      res.end();
    }
  }
});


app.post('/spgateway_return', (req, res, next) => {
  try {
        const status = req.body.Status

        if (status === 'SUCCESS') {
          dispatch(clearCart())
          res.redirect('https://react-ecommerce-4adb7.web.app/success');
        } else {
          res.redirect('https://react-ecommerce-4adb7.web.app/fail');
        }

        res.send(req.body)
        

      } catch (err) {
        res
          .status(500)
          .json({
            statusCode: 500,
            message: err.message
          });
      }
});







// app.get('/return', async (req, res) => {
//     try {
//     //   const { amount, shipping } = req.body;
//     //   const paymentIntent = await stripe.paymentIntents.create({
//     //     shipping,
//     //     amount,
//     //     currency: 'usd'
//     //   })
  
//       res
//         .status(200)
//         .send('clear');
  
//     } catch (err) {
//       res
//         .status(500)
//         .json({
//           statusCode: 500,
//           message: err.message
//         });
//     }
//   })



// app.post('/payments/create', async (req, res) => {
//     try {
//       const { amount, shipping } = req.body;
//       const paymentIntent = await stripe.paymentIntents.create({
//         shipping,
//         amount,
//         currency: 'usd'
//       });
  
//       res
//         .status(200)
//         .send(paymentIntent.client_secret);
  
//     } catch (err) {
//       res
//         .status(500)
//         .json({
//           statusCode: 500,
//           message: err.message
//         });
//     }
//   })

app.get('*', (req, res) => {
    res
        .status(404)
        .send('404, Not Found');
})


exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
    