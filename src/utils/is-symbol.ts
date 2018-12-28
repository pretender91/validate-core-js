export default function isSymbol(target: any): target is symbol {
  return typeof target === 'symbol'
}
