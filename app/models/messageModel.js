window.Message = Backbone.Model.extend({
    postMessage: function(message, usergridlogin){
        var self = this;
        var displayName = usergridlogin.username;
        var postData = { actor: {
                            displayName:displayName,
                            image: {
                                url:"http://www.gravatar.com/avatar/3cbd344c6275d97d15849c33cace8ef1",
                                height:80,
                                width:80
                            },
                            email:"test@apigee.com"
                        },
                        verb:"post",
                        content:message
                    };
        var postDataString = JSON.stringify(postData);
        console.log('posting message');
        return $.ajax({
            type: "POST",
            url: apiUrl + '/' + appName + '/activities',
            data : postDataString,
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                if (usergridlogin.accessToken) {
                    console.log('setting bearer token');
                    xhr.setRequestHeader("Authorization", "Bearer " + usergridlogin.accessToken);
                    xhr.withCredentials = true;
                }
            }
            }).done(function( response ) {
                console.log('message posted');
            });
    },
    getMessages: function(usergridlogin){
        var self = this;
        console.log('getting messages');
        return $.ajax({
            type: "GET",
            url: apiUrl + '/' + appName + '/activities',
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                if (usergridlogin.accessToken) {
                    console.log('setting bearer token');
                    xhr.setRequestHeader("Authorization", "Bearer " + usergridlogin.accessToken);
                    xhr.withCredentials = true;
                }
            }
            }).done(function( response ) {
                console.log('messages retrieved');
            });
    }
});