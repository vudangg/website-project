import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true }, // 'cod' hoặc 'transfer'
    items: [
      {
        id: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "completed" }, // Mặc định completed để nhảy doanh thu
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);