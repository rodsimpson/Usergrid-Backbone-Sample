window.UsergridLogin = Backbone.Model.extend({
    login: function(){
        var self = this;
        console.log('logging in');
        return $.ajax({
            type: "POST",
            url: apiUrl + '/' + appName + '/token',
            data: { username: this.username, password: this.password, grant_type: 'password' },
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
        }).done(function( response ) {
            self.accessToken = response.access_token;
            self.email = response.user.email;
            self.username = response.user.username;
        });
    },
    loginClientSecret: function(){
        var self = this;
        console.log('logging in');
        return $.ajax({
            type: "POST",
            url: apiUrl + '/' + appName + '/token',
            data: { client_id: this.client_id, client_secret: this.client_secret, grant_type: 'client_credentials' },
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
        }).done(function( response ) {            
            self.accessToken = response.access_token;
            self.application = response.application;
            //now that we are logged in, make sure the user account exists
            $.ajax({
                type: "GET",
                url: apiUrl + '/' + appName + '/users/'+self.username,
                beforeSend: function ( xhr ) {
                    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                    if (self.accessToken) {
                        console.log('setting bearer token');
                        xhr.setRequestHeader("Authorization", "Bearer " + self.accessToken);
                        xhr.withCredentials = true;
                    }
                }
            }).error(function( response ) {
                self.accessToken = response.access_token;
                self.application = response.application;
                //now that we are logged in, make sure the user account exists
                $.ajax({
                    type: "POST",
                    url: apiUrl + '/' + appName + '/users/',
                    data: '{"username":"'+self.username+'"}',
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                        if (self.accessToken) {
                            console.log('setting bearer token');
                            xhr.setRequestHeader("Authorization", "Bearer " + self.accessToken);
                            xhr.withCredentials = true;
                        }
                    }
                }).done(function( response ) {
                    console.log('new account created.');
                });
            }).done(function(response){
                console.log('account verified.');
            });
        });
    },
    client_id: null,
    client_secret: null,
    username: 'default',
    password: 'default',    
    email: 'default',
    grant_type: 'password',
    accessToken: null
});