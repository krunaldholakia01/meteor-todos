import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Tasks = new Mongo.Collection('tasks')


if (Meteor.isServer) {
    Meteor.publish('category', function() {
        return Tasks.find({userid: Meteor.userId()})
    })
}


Meteor.methods({
    'addCategory': function(category){
        Tasks.insert({
            userid: Meteor.userId(),
            category: category,
            tasks: [],
            createdAt: new Date()
        })
    },

    'removeCategory': function(id){
        Tasks.remove({_id: id, userid: Meteor.userId()})
    },

    'addTask': function(id, taskname, description){
        const task = {
            listid: id,
            name: taskname,
            description: description,
            createdAt: new Date()
        }
        Tasks.update({_id: id, userid: Meteor.userId()}, {$push: { 'tasks': task}})
    },

    'removeTasks': function(taskname, id){
        Tasks.update({_id: id, userid: Meteor.userId()}, {$pull: { 'tasks': {name: taskname}}})
    },
})