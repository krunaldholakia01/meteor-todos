import { Template } from 'meteor/templating'


Template.login.events({
    'submit form': function(event){
        event.preventDefault()
        const target = event.target
        const email = target.email.value
        const password = target.password.value

        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                alert(error.reason)
            } else {
                Router.go("/")
            }
        })
    }
})
