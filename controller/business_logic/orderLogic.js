const moment = require('moment');
const { Order } = require('../../model/Models/orderModel');

//
//

//
//
//
//

// POST LOGIC
async function postLogic(req, res) {
  const body = req.body;

  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);

  const order = await Order.create({
    items: body.items,
    created_at: moment().toDate(),
    total_price,
  });

  return res.json({ status: true, order });
}

// GET-BY-ID LOGIC
async function getByIdLogic(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  return res.json({ status: true, order });
}

// GET-ALL LOGIC

async function getAllLogic(req, res) {
  //
  //
  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //
  //
  //
  //

  const orders = await Order.find();
  console.log({ status: true, orders });

  return res.status(200).json({ status: true, orders });
}

// PATCH LOGIC
async function patchLogic(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ status: false, order: null });
  }

  if (state < order.state) {
    return res
      .status(422)
      .json({ status: false, order: null, message: 'Invalid operation' });
  }

  order.state = state;

  await order.save();

  return res.json({ status: true, order });
}

// DELETE LOGIC
async function deleteLogic(req, res) {
  const { id } = req.params;

  const order = await Order.deleteOne({ _id: id });

  return res.json({ status: true, order });
}

module.exports = {
  postLogic,
  getByIdLogic,
  getAllLogic,
  patchLogic,
  deleteLogic,
};