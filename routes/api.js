var express = require('express');
var { ERRORS, BASE_URL } = require('../utils/constants');
var router = express.Router();
var axios = require('axios');

router.get('/datatables',
  async function (req, res, next) {
    try {
      let config = {
        rejectUnauthorized: false,
        method: 'get',
        url: BASE_URL + `datatables`,
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
