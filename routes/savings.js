var express = require('express');
var { ERRORS, BASE_URL } = require('../utils/constants');
var router = express.Router();
const { body, validationResult, header, check } = require('express-validator');
var axios = require('axios');

router.get('/',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `savingsaccounts`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      return res.json(ERRORS.SOMETHING_WRONG)
    }
  });


router.post('/',
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('clientId').not().isEmpty(),
  body('productId').not().isEmpty(),
  body('submittedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { dateFormat, locale, clientId, productId, submittedOnDate } = req.body

      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `savingsaccounts`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { dateFormat, locale, clientId, productId, submittedOnDate }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      return res.json(ERRORS.SOMETHING_WRONG)
    }
  });

router.post('/approve',
  body('savings_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('approvedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { savings_id, dateFormat, locale, approvedOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `savingsaccounts/${savings_id}?command=approve`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { dateFormat, locale, approvedOnDate }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      try {
        return res.json(error.response.data)
      } catch (error2) {
        console.log(error2)
        return res.json(ERRORS.SOMETHING_WRONG)
      }
    }
  });

router.post('/reject',
  body('savings_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('rejectedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { savings_id, dateFormat, locale, rejectedOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `savingsaccounts/${savings_id}?command=reject`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { dateFormat, locale, rejectedOnDate }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      try {
        return res.json(error.response.data)
      } catch (error2) {
        console.log(error2)
        return res.json(ERRORS.SOMETHING_WRONG)
      }
    }
  });

router.post('/activate',
  body('savings_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('activatedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { savings_id, dateFormat, locale, activatedOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `savingsaccounts/${savings_id}?command=activate`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { dateFormat, locale, activatedOnDate }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      try {
        return res.json(error.response.data)
      } catch (error2) {
        console.log(error2)
        return res.json(ERRORS.SOMETHING_WRONG)
      }
    }
  });

router.post('/close',
  body('savings_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('closedOnDate').not().isEmpty(),
  body('note').optional(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { savings_id, dateFormat, locale, closedOnDate, note } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `savingsaccounts/${savings_id}?command=close`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { dateFormat, locale, closedOnDate, note }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      try {
        return res.json(error.response.data)
      } catch (error2) {
        console.log(error2)
        return res.json(ERRORS.SOMETHING_WRONG)
      }
    }
  });

module.exports = router;
