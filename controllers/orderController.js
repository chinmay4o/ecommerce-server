import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create New Order
// @ post api/orders
// @ access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if(orderItems && orderItems.length === 0 ) {
      res.status(400);
      throw new Error("No orderItems")

      return
  } else {
      const order = new Order({
        orderItems,
        userId : req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
  }
});


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'userId',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    try {
      res.status(404)
      throw new Error('Order not found')
    } catch (error) {
      res.json(error.message)
    }
  
  }
})

export {addOrderItems, getOrderById}