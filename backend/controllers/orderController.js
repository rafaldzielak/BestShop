import asyncHandler from "express-async-handler";
import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import axios from "axios";

import stripeImp from "stripe";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await UserModel.findById(userId);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    shippingPrice,
    totalPrice,
    itemsPrice,
    name,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in the order!");
  }

  // orderItems.forEach(orderItem => {
  for (let orderItem of orderItems) {
    const product = await productModel.findById(orderItem._id);
    if (product) product.countInStock -= orderItem.count;
    product.save();
  }

  let orderToCreate = {
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    shippingPrice,
    totalPrice,
    itemsPrice,
    name,
  };
  let stripeOrder = "";

  let createdOrder = await OrderModel.create(orderToCreate);

  if (paymentMethod === "Stripe") {
    stripeOrder = await createStripeOrder(createdOrder, user.email);
    createdOrder.stripeOrderId = stripeOrder.id;
    createdOrder.stripePaymentIntent = stripeOrder.payment_intent;
    createdOrder.stripePaymentStatus = stripeOrder.payment_status;
  }

  // let order = await OrderModel.create(orderToReturn);
  const orderToReturn = await createdOrder.save();

  res.status(201).json({ ...orderToReturn._doc });
});

const stripeCheckIfOrderIsPaid = async (order) => {
  const stripe = stripeImp(process.env.STRIPE_SECRET);
  const session = await stripe.checkout.sessions.retrieve(order.stripeOrderId);
  const paymentStatus = session.payment_status;
  if (paymentStatus === "paid") {
    order.isPaid = true;
    order.save();
  }
};

const getOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);

  if (!order) {
    res.status(400);
    throw new Error("No such order!");
  }
  if (userId != String(order.user)) {
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user || !user.isAdmin) {
      res.status(401);
      throw new Error("Not authorized!");
    }
  }
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    stripeCheckIfOrderIsPaid(order);
  }
  res.status(201).json(order);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find().sort({ createdAt: "desc" });

  Promise.all(
    orders.map(async (order) => {
      if (order.paymentMethod === "Stripe" && !order.isPaid) {
        stripeCheckIfOrderIsPaid(order);
      }
    })
  );

  res.status(201).json(orders);
});

const updateOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);
  if (!order) {
    res.status(400);
    throw new Error("No such order!");
  }

  const isDispatched = req.body.isDispatched || order.isDispatched;
  const isDelivered = req.body.isDelivered || order.isDelivered;

  const updatedOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { isDispatched, isDelivered },
    { new: true }
  );

  res.status(201).json(updatedOrder);
});

const createStripeOrder = async (order, email = "") => {
  const stripe = stripeImp(process.env.STRIPE_SECRET);

  const line_items = order.orderItems.map((orderItem) => {
    return {
      quantity: orderItem.count,
      price_data: {
        currency: "pln",
        unit_amount: parseInt(orderItem.price * 100),
        product_data: { name: orderItem.name, images: [orderItem.image] },
      },
    };
  });
  line_items.push({
    quantity: 1,
    price_data: {
      currency: "pln",
      unit_amount: parseInt(order.shippingPrice * 100),
      product_data: {
        name: "Shipping",
        images: [
          "https://mpng.subpng.com/20180602/gii/kisspng-computer-icons-delivery-symbol-delivery-boy-5b1324a069ac15.8237795815279812164329.jpg",
        ],
      },
    },
  });
  // console.log(line_items);

  const stripeObj = await stripe.checkout.sessions.create({
    customer_email: email,
    success_url: `http://localhost:3000/order/${order._id}/`,
    cancel_url: `http://localhost:3000/order/${order._id}/`,
    payment_method_types: ["p24", "card"],
    line_items: line_items,
    mode: "payment",
  });
  // console.log(stripeObj);

  return stripeObj;
};

// const payOrder = asyncHandler(async (req, res) => {
//   const orderId = req.params.id;

//   const order = await OrderModel.findById(orderId);

//   if (!order) {
//     res.status(400);
//     throw new Error("No such order!");
//   }

//   if (order.paymentMethod === "PayPal" && !order.isPaid) {
//     order.isPaid = true;
//   }
//   const updatedOrder = await order.save();
//   res.status(201).json(updatedOrder);
// });

const getPaypalToken = asyncHandler(async () => {
  const publicId = process.env.PAYPAL_CLIENT_ID;
  const secretId = process.env.PAYPAL_CLIENT_SECRET;

  const { data } = await axios({
    url: "https://api.sandbox.paypal.com/v1/oauth2/token",
    method: "post",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      "content-type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: publicId,
      password: secretId,
    },
    params: {
      grant_type: "client_credentials",
    },
  });

  return data.access_token;
});

const payForOrderViaPaypal = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;

  const order = await OrderModel.findById(orderId);

  if (!order) {
    res.status(400);
    throw new Error("No such order!");
  }

  if (order.paymentMethod === "PayPal") {
    const { paypalOrderId } = req.body;
    const { create_time } = req.body;
    if (!order.isPaid) {
      const payPalToken = await getPaypalToken();
      console.log(payPalToken);
      const config = { headers: { Authorization: `Bearer ${payPalToken}` } };
      const { data } = await axios.get(
        `https://api.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}`,
        config
      );
      // console.log(order.totalPrice == data.purchase_units[0].amount.value);
      // console.log(data.status);
      // console.log(data.create_time);
      // console.log(create_time);
      // console.log(data.purchase_units[0].amount.currency_code);
      // console.log(data.purchase_units[0].amount.value);
      if (
        data.status === "COMPLETED" &&
        data.purchase_units[0].amount.currency_code == "PLN" &&
        order.totalPrice == data.purchase_units[0].amount.value &&
        create_time == data.create_time
      ) {
        // console.log("SUCCESS");
        order.isPaid = true;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      }
    } else {
      res.json("Order already paid");
    }
  }
});

export { placeOrder, getOrder, payForOrderViaPaypal, getAllOrders, updateOrder };
