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
        url: BASE_URL + `clients`,
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
  body('officeId').not().isEmpty(),
  body('firstname').not().isEmpty(),
  body('lastname').not().isEmpty(),
  body('externalId').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('active').not().isEmpty().isBoolean(),
  body('activationDate').not().isEmpty(),
  body('submittedOnDate').not().isEmpty(),
  body('savingsProductId').not().isEmpty(),
  body('datatables').not().isEmpty().isJSON(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let {
        officeId, firstname, lastname, externalId, dateFormat, locale,
        active, activationDate, submittedOnDate, savingsProductId, datatables
      } = req.body
      datatables = JSON.parse(datatables);
      if (datatables.length < 1)
        return res.json(ERRORS.MSSINGS_PARAMS)

      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `clients`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          officeId, firstname, lastname, externalId, dateFormat, locale,
          active, activationDate, submittedOnDate, savingsProductId, datatables
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

router.post('/add-note',
  body('client_id').not().isEmpty(),
  body('note').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { client_id, note } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `clients/${client_id}/notes`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: { note }
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

router.post('/add-identifier',
  body('client_id').not().isEmpty(),
  body('documentTypeId').not().isEmpty(),
  body('documentKey').not().isEmpty(),
  body('description').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { client_id, documentTypeId, documentKey, description } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `clients/${client_id}/identifiers`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          documentTypeId, documentKey, description, "status": "Active",
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


  router.post('/add-family-members',
  body('client_id').not().isEmpty(),
  body('firstName').not().isEmpty(),
  body('middleName').not().isEmpty(),
  body('lastName').not().isEmpty(),
  body('qualification').not().isEmpty(),
  body('relationshipId').not().isEmpty(),
  body('maritalStatusId').not().isEmpty(),
  body('genderId').not().isEmpty(),
  body('dateFormat').not().isEmpty(),
  body('dateOfBirth').not().isEmpty(),
  body('locale').not().isEmpty(),
  body('age').not().isEmpty(),
  body('professionId').not().isEmpty(),
  body('mobileNumber').not().isEmpty(),
  body('isDependent').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      let { client_id, documentTypeId, documentKey, description } = req.body
      let config = {
        rejectUnauthorized: false,
        method: 'post',
        url: BASE_URL + `clients/${client_id}/identifiers`,
        headers: {
          'Accept': 'application/json',
          'Fineract-Platform-TenantId': 'Default',
          'Authorization': 'Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': 'application/json',
          'rejectUnauthorized': 'false'
        },
        data: {
          documentTypeId, documentKey, description, "status": "Active",
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

router.post('/add-document',
  body('client_id').not().isEmpty(),
  body('name').not().isEmpty(),
  body('description').not().isEmpty(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: errors.errors });
      }
      if (!req.files || !req.files.file)
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: ['File Missing'] });


      if (Array.isArray(req.files.file))
        return res.json({ ...ERRORS.MSSINGS_PARAMS, errors: ['Multiple Files Detected'] });

      let { client_id, name, description } = req.body
      const fPath = `./${Date.now()}.${req.files.file.name.split('.')[1]}`;
      await req.files.file.mv(fPath)

      var req = unirest('POST', BASE_URL + `clients/${client_id}/documents`)
        .headers({
          'Fineract-Platform-TenantId': ' Default',
          'Authorization': ' Basic bWlmb3M6cGFzc3dvcmQ=',
          'Content-Type': ' multipart/form-data',
          'rejectUnauthorized': ' false'
        })
        .field('name', name)
        .field('description', description)
        .attach('file', fs.createReadStream(fPath))
        .end(function (resp) {
          fs.unlinkSync(fPath)
          if (resp.error) return res.send(resp.body);
          res.json(resp.body)
        });

    } catch (error) {
      console.log(error)
      if (error.response)
        return res.json(error.response.data)
      else
        return res.json(ERRORS.SOMETHING_WRONG)
    }
  });

module.exports = router;
