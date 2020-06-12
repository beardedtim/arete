import glob from 'glob'

const DOMAINS_PATH = __dirname

const usecases_pattern = `${DOMAINS_PATH}/**/UseCases.ts`

const usecases_paths = glob.sync(usecases_pattern)

const get_domain_from_path = (path: string) => {
  const without_root = path.replace(DOMAINS_PATH, '')

  const split = without_root.split('/')

  return split[1]
}

const get_use_cases_from_path = require

export const UseCases = usecases_paths.reduce((a, c) => {
  const domain = get_domain_from_path(c)
  const useCases = get_use_cases_from_path(c)

  a[domain] = useCases

  return a
}, {} as any)
