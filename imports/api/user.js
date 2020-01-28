import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const User = new Mongo.Collection('user')


Meteor.methods({
    'register': function(username, email, mobile, password){
        User.insert({
            userid: Meteor.userId(),
            username: username,
            email: email,
            mobile: mobile,
            password: password,
            createdAt: new Date()
        })
    }
})