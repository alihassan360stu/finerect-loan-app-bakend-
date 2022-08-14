var express = require('express');
var { ERRORS, BASE_URL } = require('../utils/constants');
var router = express.Router();
const { body, validationResult, header, check } = require('express-validator');
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs')
var unirest = require('unirest');

router.get('/',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `fixeddepositaccounts`,
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
  body('clientId').not().isEmpty(),
  body('productId').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('submittedOnDate').not().isEmpty(),
  body('depositAmount').not().isEmpty(),
  body('depositPeriod').not().isEmpty().isBoolean(),
  body('depositPeriodFrequencyId').not().isEmpty(),
  // body('submittedOnDate').not().isEmpty(),
  // body('savingsProductId').not().isEmpty(),
  // body('datatables').not().isEmpty().isJSON(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let {
        clientId, productId, locale, dateFormat,
        submittedOnDate, depositAmount, depositPeriod, depositPeriodFrequencyId
      } = req.body
      datatables = JSON.parse(datatables);
      if (datatables.length < 1)
        return res.json(ERRORS.MSSINGS_PARAMS)

      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          clientId, productId, locale, dateFormat,
          submittedOnDate, depositAmount, depositPeriod, depositPeriodFrequencyId
        }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
  });

router.post('/approve',
  body('account_id').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('approvedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { account_id, locale, dateFormat, approvedOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts/${account_id}?command=approve`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { locale, dateFormat, approvedOnDate  }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
  });


router.post('/undo-approval',
  body('account_id').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { account_id } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts/${account_id}?command=undoApproval`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {  }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
});

router.post('/reject',
  body('account_id').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('rejectedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { account_id, locale, dateFormat, rejectedOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts/${account_id}?command=reject`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { locale, dateFormat, rejectedOnDate  }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
  });

router.post('/withdraw',
  body('account_id').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('withdrawnOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { account_id, locale, dateFormat, withdrawnOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts/${account_id}?command=withdrawnByApplicant`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { locale, dateFormat, withdrawnOnDate  }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
  });

router.post('/activate',
  body('account_id').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('activatedOnDate').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { account_id, locale, dateFormat, activatedOnDate } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts/${account_id}?command=activate`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { locale, dateFormat, activatedOnDate  }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
});

router.post('/close',
  body('account_id').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('closedOnDate').not().isEmpty(),
  body('note').not().isEmpty(),
  body('onAccountClosureId').not().isEmpty(),
  body('toSavingsAccountId').not().isEmpty(),
  body('transferDescription').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { account_id, locale, dateFormat, closedOnDate, note, onAccountClosureId, 
        toSavingsAccountId, transferDescription  } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `fixeddepositaccounts/${account_id}?command=close`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { locale, dateFormat, closedOnDate, note, onAccountClosureId, 
          toSavingsAccountId, transferDescription  }
      };
      let response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
});


module.exports = router;
