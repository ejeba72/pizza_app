const { Router } = require('express');
const { loginHandler, authVerification } = require('../services/loginService');
const {
  postLogic,
  getByIdLogic,
  getAllLogic,
  patchLogic,
  deleteLogic,
} = require('../business_logic/orderLogic');

const router = Router();

router.use('/', authVerification);
// router.use('/', loginHandler);

router.route('/').post(postLogic).get(getAllLogic);

router.route('/:id').get(getByIdLogic).patch(patchLogic).delete(deleteLogic);

module.exports = { router };
