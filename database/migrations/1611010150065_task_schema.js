'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('title',500).notNullable()
      table.string('description',1000).notNullable()
      table.integer('user_id')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('users')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
