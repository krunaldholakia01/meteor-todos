import { Template } from 'meteor/templating'


Template.register.events({
    'submit form': function(event){
        event.preventDefault()
        const target = event.target
        const email = target.email.value
        const password = target.password.value
        const username = target.username.value
        const cpassword = target.confirmpassword.value
        const mobile = target.mobile.value
        if(!validate(target)){
            return false
        }
        else{
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
                    alert(error.reason)
                } else {
                    Meteor.call('register', username, email, mobile, password)
                    Router.go("/")
                }
            })
        }
    }
})


function validate(target){
    const emailfilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const mobilefilter = /^\d{10}$/
    if(!emailfilter.test(target.email.value)){
        alert("Enter valid email address")
        return false
    }
    if(target.password.value != target.confirmpassword.value){
        alert("Enter both passwords same")
        return false
    }
    if(!target.mobile.value.match(mobilefilter)){
        alert("Enter valid mobile number")
        return false
    }
    return true
}