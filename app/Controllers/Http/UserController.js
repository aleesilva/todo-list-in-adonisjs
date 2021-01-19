'use strict'

const User = use('App/Models/User')

class UserController {

  async create({request,response}) {
    try {
      const data = request.only(['username','email','password'])

      const userExists = await User.findBy('email',data.email)

      if(userExists) {
        return response.status(400).json({message: {error: 'User already exists'}})
      }
      const user = await User.create(data)

      return response.status(201).json(user)

    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async find({response}){
    return response.status(200).json(await User.all())
  }

  async delete({request,response}){
    const {id} = request.params
    const user = await User.find(id)
    await user.delete()
    return response.status(204).json({message:'User is deleted'})
  }

  async update({request,response}){
    try {
      const {id} = request.params
      const data = request.only(['username','email','password'])
      const user = await User.find(id)

      user.merge(data)
      const res = await user.save()
      if(res === true) return response.status(201).json(user)

    } catch (error) {
      return response.status(error.status).json({error:error})
    }
  }

  async findById({request,response}){
    const {id} = request.params
    return response.status(200).json(await User.find(id))
  }
}

module.exports = UserController
