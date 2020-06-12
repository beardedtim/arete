import { ValidationError } from "jsonschema"

export class InputError extends Error {
  public code = 400
  public errors: ValidationError[]
  constructor(errors: ValidationError[]) {
    super()

    this.message = 'VALIDATION ERROR'
    this.errors = errors
  }
}

export class PasswordMismatchError extends Error {
  public code = 400
  constructor() {
    super()

    this.message = `I'm sorry Dave, I'm afraid I can't do that.`
  }
}

export class DuplicateEntryDBError extends Error {
  public code = 400
  static isDuplicateError(msg: string) {
    return msg.indexOf('duplicate key value violates unique constraint') > -1
  }
  constructor(msg: string) {
    super()
    const key = this.getKeyFromMsg(msg)
    this.message = `You have tried to create a resource with the same ${key} value. Please change this value and try again.`
  }

  private getKeyFromMsg(msg: string) {
    const index = msg.indexOf('duplicate key value violates unique constraint \"')

    return msg.slice(index).replace(/\"/g, '--')
  }
}

export class DBError extends Error {
  public code = 500
  constructor() {
    super()
    this.message = `Internal Server Error`
  }
}

export class AuthenticationError extends Error {
  public code = 401
  constructor() {
    super()
    this.message = `I am sorry. You are not authorized to do that.`
  }
}