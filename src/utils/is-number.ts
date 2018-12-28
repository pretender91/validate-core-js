export default function isNumber(target: any): target is number {
  return typeof target === 'number'
}
