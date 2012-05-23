window.UsergridLoginView = Backbone.View.extend({
    template:_.template($('#login').html()),
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
    events:{
        "click #loginClientSecret":"loginClientSecret"
    },
    loginClientSecret: function (event) {
        //Make sure the username is at least 6 chars
        if ($("#username").val().length < 6) {
            alert ('Usernames must be at least 6 characters!');
            return;
        }
        //Grab the provided username and log in
        this.options.usergridLogin.username = $('#username').val();
        this.options.usergridLogin.loginClientSecret().
            success(function(jqXHR){
                top.location="#messages";
            }).
            fail(function(jqXHR, textStatus) {
                alert( "We are experiencing network issues, please try again." );
            });
    }
});