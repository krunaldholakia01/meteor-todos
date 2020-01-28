Router.route('/', function(){
    if(!Meteor.userId()){
        Router.go('/login')
    }
    else{
        this.render('home', {
            name: 'home',
            template: 'home'
        })
    }
})

Router.route('/login', function(){
    if(Meteor.userId()){
        Router.go('/')
    }
    else{
        this.render('login', {
            name: 'login',
            template: 'login'
        })
    }
})

Router.route('/register', function(){
    if(Meteor.userId()){
        Router.go('/')
    }
    else{
        this.render('register', {
            name: 'register',
            template: 'register'
        })
    }
})