const ERRORS = {
  MSSINGS_PARAMS: { status: false, message: 'Missing Parameters' },
  SOMETHING_WRONG: { status: false, message: 'Something Went Wrong, Please Try Again Later' },
}

module.exports = {
  ERRORS,
  BASE_URL: 'https://ec2-54-206-17-11.ap-southeast-2.compute.amazonaws.com/fineract-provider/api/v1/',
}