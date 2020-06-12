import safe_keys from './safeKeys'

export default (requested_keys: string[]) => {
  let allowed_keys = requested_keys.filter(key => safe_keys.has(key))
  if (!allowed_keys.length) {
    allowed_keys = [...safe_keys]
  }

  return allowed_keys
}