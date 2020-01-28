import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { Tasks } from '../../api/tasks.js'


if (Meteor.isClient) {
    Meteor.subscribe('category')
}


Template.home.onCreated(function(){
    Session.set('categoryId', '')
})


Template.home.onRendered()

Template.home.onDestroyed()


Template.home.helpers({
    tasks() {
        return Tasks.find({}).fetch()
    },
    listTasks() {
        return Tasks.findOne({ _id: Session.get('categoryId') }).tasks
    },

    category: function(){
        return Tasks.findOne({_id: Session.get('categoryId')}).category
    }
    
})


Template.registerHelper('Session', function(input){
    return Session.get(input)
})


Template.home.events({
    'submit .addCategory': function(event){
        event.preventDefault()
        const category = event.target.category.value
        const list = Tasks.findOne({category: category})
        if(list != undefined){
            alert("Category Already Exists")
            return false
        }
        Meteor.call('addCategory', category)
        event.target.category.value = ''
    },

    'click .removeCategory': function(event){
        event.preventDefault()
        const id = Session.get('categoryId')
        if(id == ''){
            alert("Click on Category to remove")
        }
        Session.set('categoryId', '')
        Meteor.call('removeCategory', id)
    },

    'click .categoryname': function(event){
        event.preventDefault()
        const id = event.target.id
        Session.set('categoryId', id)
    },

    'submit .addTask': function(event){
        event.preventDefault()
        if(Session.get('categoryId') == ''){
            alert("Select Category to Insert Task")
            return false
        }
        const taskname = event.target.taskname.value
        const description = event.target.description.value
        const list = Tasks.findOne({ _id: Session.get('categoryId') }).tasks
        let exists = 0
        list.forEach(function(task) {
            if(task.name == taskname){ exists = 1 }
        })
        if(exists){
            alert("Task Already Exists")
            return false
        }
        Meteor.call('addTask', Session.get('categoryId'), taskname, description)
        event.target.taskname.value = ''
        event.target.description.value = ''
    },

    'click .removeTask': function(event){
        event.preventDefault()
        const taskname = event.target.id
        Meteor.call('removeTasks', taskname, Session.get('categoryId'))
    }
})
