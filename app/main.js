//reference:  http://coenraets.org/blog/2012/03/using-backbone-js-with-jquery-mobile/

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"login",
        "login":"login",
        "logout":"logout",
        "messages":"messages",
        "postmessage":"postmessage"
    },
    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        console.log('creating login');
        this.usergridLoginModel = new UsergridLogin();
        this.usergridLoginModel.client_id = client_id;
        this.usergridLoginModel.client_secret = client_secret;
        this.messageModel = new Message();
    },
    login:function () {
        console.log('#login');
        this.changePage(new UsergridLoginView({usergridLogin: this.usergridLoginModel}));
    },
    logout:function () {
        this.usergridLoginModel.accessToken = null;
        console.log('#login');
        this.changePage(new UsergridLoginView({usergridLogin: this.usergridLoginModel}));
    },
    messages:function () {
        if (this.usergridLoginModel.accessToken && this.usergridLoginModel.username) {
            console.log('#messages');
            this.changePage(new MessagesView({model: this.messageModel, usergridLogin: this.usergridLoginModel}));
        } else {
            console.log('No Token');
            top.location="#login";
            this.changePage(new UsergridLoginView({model: this.messageModel, usergridLogin: this.usergridLoginModel}));
        }
    },
    postmessage:function () {
        if (this.usergridLoginModel.accessToken && this.usergridLoginModel.username) {
            console.log('#follow');
            this.changePage(new PostMessageView({model: this.messageModel, usergridLogin: this.usergridLoginModel}));
        } else {
            console.log('No Token');
            top.location="#login";
            this.changePage(new UsergridLoginView({model: this.messageModel, usergridLogin: this.usergridLoginModel}));
        }
    },
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }
});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});