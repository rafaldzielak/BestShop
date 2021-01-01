import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        count: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        isReviewed: { type: Boolean, required: true, default: false },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: "PL" },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    isDispatched: { type: Boolean, required: true, default: false },
    stripeOrderId: { type: String },
    stripePaymentIntent: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
