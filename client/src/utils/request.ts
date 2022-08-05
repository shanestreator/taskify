import { Todo } from '../types'

const request = {
  async get(url: string) {
    const result = await fetch(url)
    return await result.json()
  },
  async post(url: string, todo: Todo) {
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(todo)
    })

    return await data.json()
  },
  async put(url: string, todo: Todo) {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })

    return await data.json()
  },
  delete(url: string) {
    
  }
}

export default request