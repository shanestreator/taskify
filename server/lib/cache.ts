type Props = {
  timeoutMs: number
}

export const tempCache = ({ timeoutMs = 1000 * 30 }: Props) => {
  const cache = new Map()

  // Timer will automatically delete by key (ip address)
  const timer = (key: string) =>
    setTimeout(() => {
      console.log('DELETED >>>---> ' + key)
      cache.delete(key)
    }, timeoutMs)

  return {
    get(key: string) {
      const node = cache.get(key)
      if (!node) return

      node.timer.refresh()

      return node
    },
    set(key: string, value: object | []) {
      const node = cache.get(key)

      if (node) {
        node.timer.refresh()
        cache.set(key, { ...value })
      } else {
        cache.set(key, {
          timer: timer(key),
          ...value
        })
      }

      return cache.get(key)
    }
  }
}