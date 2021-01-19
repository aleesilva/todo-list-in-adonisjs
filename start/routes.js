'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.get('/users','UserController.find')
Route.post('/users','UserController.create')
Route.put('/users/:id','UserController.update')
Route.delete('/users/:id','UserController.delete')
Route.get('/users/:id','UserController.findById')

/**
 * Tasks Routers
 */
Route.get('/tasks','TaskController.find')
Route.post('/tasks/:user_id','TaskController.create')
Route.put('/tasks/:id','TaskController.update')
Route.delete('/tasks/:id','TaskController.delete')
