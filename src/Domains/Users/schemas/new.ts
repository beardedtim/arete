export default {
  type: 'object',
  title: 'New User Schema',
  description: 'The expected values to create a new user',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string'
    },
    meta: {
      type: 'object'
    }
  }
}