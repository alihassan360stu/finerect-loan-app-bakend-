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
        url: BASE_URL + `loans`,
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
  body('principal').not().isEmpty(),
  body('loanTermFrequency').not().isEmpty(),
  body('loanTermFrequencyType').not().isEmpty(),
  body('loanType').not().isEmpty(),
  body('numberOfRepayments').not().isEmpty(),
  body('repaymentEvery').not().isEmpty(),
  body('repaymentFrequencyType').not().isEmpty(),
  body('interestRatePerPeriod').not().isEmpty(),
  body('amortizationType').not().isEmpty(),
  body('interestType').not().isEmpty(),
  body('interestCalculationPeriodType').not().isEmpty(),
  body('transactionProcessingStrategyId').not().isEmpty(),
  body('expectedDisbursementDate').not().isEmpty(),
  body('submittedOnDate').not().isEmpty(),
  body('linkAccountId').not().isEmpty(),
  body('maxOutstandingLoanBalance').not().isEmpty(),
  body('daysInYearType').not().isEmpty(),
  body('disbursementData').not().isEmpty().isJSON(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { dateFormat, locale, clientId, productId, principal, loanTermFrequency,
        loanTermFrequencyType, loanType, numberOfRepayments, repaymentEvery, repaymentFrequencyType, interestRatePerPeriod, amortizationType, interestType,
        interestCalculationPeriodType, transactionProcessingStrategyId, expectedDisbursementDate,
        submittedOnDate, linkAccountId, maxOutstandingLoanBalance, daysInYearType,
        disbursementData } = req.body
      disbursementData = JSON.parse(disbursementData);

      if (Array(disbursementData).length < 1)
        return res.json(ERRORS.MSSINGS_PARAMS)

      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `loans`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          dateFormat, locale, clientId, productId, principal, loanTermFrequency,
          loanTermFrequencyType, loanType, numberOfRepayments, repaymentEvery, repaymentFrequencyType, interestRatePerPeriod, amortizationType, interestType,
          interestCalculationPeriodType, transactionProcessingStrategyId, expectedDisbursementDate,
          submittedOnDate, linkAccountId, maxOutstandingLoanBalance, daysInYearType,
          disbursementData
        }
      };
      const response = await axios(config)
      return res.json(response.data)
    } catch (error) {
      console.log(error)
      return res.json(ERRORS.SOMETHING_WRONG)
    }
  });

router.post('/approve',
  body('loan_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('approvedOnDate').not().isEmpty(),
  body('expectedDisbursementDate').not().isEmpty(),
  body('note').optional(),
  body('disbursementData').optional().isJSON(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { loan_id, dateFormat, locale, approvedOnDate, expectedDisbursementDate, note,
        disbursementData } = req.body

      if (disbursementData) {
        disbursementData = JSON.parse(disbursementData);

        if (Array(disbursementData).length < 1)
          return res.json(ERRORS.MSSINGS_PARAMS)
      }

      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `loans/${loan_id}?command=approve`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          dateFormat, locale, approvedOnDate, expectedDisbursementDate, note,
          disbursementData
        }
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
  body('loan_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('rejectedOnDate').not().isEmpty(),
  body('note').optional(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { loan_id, dateFormat, locale, rejectedOnDate, note } = req.body

      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `loans/${loan_id}?command=reject`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          dateFormat, locale, rejectedOnDate, note
        }
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

router.post('/disburse',
  body('loan_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('actualDisbursementDate').not().isEmpty(),
  body('paymentTypeId').not().isEmpty(),
  body('note').optional(),
  body('accountNumber').not().isEmpty(),
  body('checkNumber').not().isEmpty(),
  body('routingCode').not().isEmpty(),
  body('receiptNumber').not().isEmpty(),
  body('bankNumber').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { loan_id, dateFormat, locale, actualDisbursementDate, paymentTypeId, note,
        accountNumber, checkNumber, routingCode, bankNumber } = req.body

      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `loans/${loan_id}?command=disburse`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          dateFormat, locale, actualDisbursementDate, paymentTypeId, note,
          accountNumber, checkNumber, routingCode, bankNumber
        }
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

router.post('/disburse-to-savings-account',
  body('loan_id').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('actualDisbursementDate').not().isEmpty(),
  body('note').optional(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }

      let { loan_id, dateFormat, locale, actualDisbursementDate, note } = req.body

      let config = {
        rejectUnauthorized: false,
        method: 'POST',
        url: BASE_URL + `loans/${loan_id}?command=disburseToSavings`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          dateFormat, locale, actualDisbursementDate, note
        }
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
