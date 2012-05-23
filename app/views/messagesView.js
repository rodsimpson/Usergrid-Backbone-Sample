window.MessagesView = Backbone.View.extend({
    template:_.template($('#messages').html()),
    render:function (eventName) {
        $(this.el).html(this.template());
        this.model.getMessages(this.options.usergridLogin).
            success(function(jqXHR){
                $("#messages-holder").empty();
                for (count in jqXHR.entities){
                    var createdDate  = new Date(jqXHR.entities[count].created);
                    var created = dateFormat(createdDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");                    
                    $("#messages-holder").append('<div class="message"><b>'+jqXHR.entities[count].actor.displayName+'</b> - '+created+'<br/>'+jqXHR.entities[count].content+'<br/></div><div style="height: 5px;">&nbsp;</div>');
                }
            }).
            fail(function(jqXHR, textStatus) {
                alert( "We are experiencing network issues - messages could not be retrieved");
            });

        return this;
    },
    events:{
        "click #gotopostmessage":"gotoPostMessage",
        "click #logout":"logout"
    },
    logout: function (event) {
        top.location="#logout";
    },
    gotoPostMessage: function (event) {
        top.location="#postmessage";
    }
});

window.PostMessageView = Backbone.View.extend({
    template:_.template($('#postmessage').html()),
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
    events:{
        "click #actionpostmessage":"postMessage",
        "click #actioncancel":"cancel"
    },
    cancel: function (event) {
        top.location="#messages";
    },
    postMessage:function (event) {
        console.log('posting message');
        //grab the username and password from the form
        self.message = $('#message').val();
        this.model.postMessage(self.message, this.options.usergridLogin).
            success(function(jqXHR){
                top.location="#messages";
                console.log( "Message Posted" );
            }).
            fail(function(jqXHR, textStatus) {
                alert( "We are experiencing network issues - message could not be posted" );
            });
    },
    message: ""

});