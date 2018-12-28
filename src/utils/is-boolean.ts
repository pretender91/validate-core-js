export default function isBoolean(target: any): target is boolean {
  return typeof target === 'boolean'
}
