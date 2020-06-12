export default {
  type: 'object',
  title: 'User Return Type',
  description: 'The types that we expect to be returned',
  required: ['email', 'id', 'created_at', 'last_updated', 'meta'],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    id: {
      type: 'string',
      format: 'uuid'
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    last_updated: {
      type: 'string',
      format: 'date-time'
    },
    meta: {
      type: 'object'
    }
  }
}