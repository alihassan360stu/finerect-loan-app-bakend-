var express = require('express');
var { ERRORS, BASE_URL } = require('../utils/constants');
var router = express.Router();
var axios = require('axios');

router.get('/provision-entries',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `provisioningentries`,
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

router.get('/accounting-closures',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `glclosures`,
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

router.get('/journal-entries',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `journalentries`,
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

router.get('/accounting-rules',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `accountingrules`,
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

router.get('/general-ledger-accounts',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `glaccounts`,
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

router.get('/financial-activity-accounts',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `financialactivityaccounts`,
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
module.exports = router;
