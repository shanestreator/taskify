export type Todo = {
  title: string,
  status: string,
  order: number
}

export type Task = {
  id: string,
  name: string,
  belongsToList: string,
  taskIndex: number
}

export interface List {
  id: string
  name: string
  listIndex: number
  tasks: Task[]
}

export interface Board {
  lists: List[]
}