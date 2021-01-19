'use strict'
const Task = use('App/Models/Task')

class TaskController {

  async create({request,response}){
    try {
      const data = request.only(['title','description'])
      const id = request.params.user_id
      const task = await Task.create({user_id:id,...data})

      return response.status(201).json(task)

    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async find({response}){
    return response.status(200).json(await Task.query().with('user').fetch())
  }

  async delete({request,response}){
    const {id} = request.params
    const task = await Task.find(id)
    await task.delete()
    return response.status(204).json({message:'Task is deleted'})
  }

  async update({request,response}){
    try {
      const {id} = request.params
      const data = request.only(['title','description'])
      const task = await Task.find(id)

      task.merge(data)
      const res = await task.save()

      if(res === true) return response.status(201).json(task)

    } catch (error) {
      return response.status(error.status).json({error:error})
    }
  }
}

module.exports = TaskController
