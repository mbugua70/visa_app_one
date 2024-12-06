var app = {
    // Application Constructor
    LINK: "https://igurukenya.com/BAIMS/scripts/",
    MA3PARCEL: localforage.createInstance({
        name: "MA3PARCEL"
    }),

    initialize: function() {
        this.bindEvents();
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(value) {
            // This code runs once the value has been loaded
            // from the offline store.
            if (value == null) {
                //console.log("NOT SET");   
                var p_transaction = {
                    LOG: 0,
                    parcels: [],
                    CID: 0,
                    user: "",
                    vehicles: "",
                    name: "",
                    user_id:"",
                    merchant:"",
                    merchant_sub_type:"",
                    outlet_id: "",  
                    dates: "",                  
                    outlets: "",
                    quota_current: 0
                };
                app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(p_transaction)).then(function(value) {
                    // Do other things once the value has been saved.
                    //console.log(value);
                }).catch(function(err) {
                    // This code runs if there were any errors
                    console.log(err);
                });
            } else {
                //console.log(value);
            }

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

    },

    bindEvents: function() {
        // document.addEventListener('deviceready', this.onDeviceReady, false);
        login_button.addEventListener('touchend', app.login, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("online", app.onOnline, false);
    },

    login: function() {

        var vally=app.checkConnection();
       //var vally=true;
        //console.log(vally);

        if (vally) {

            username = $("#username").val()
            password = $("#password").val()

            data = "username=" + username + "&password=" + password;
            $.ajax({
                type: "POST",
                url: app.LINK + "login.php",
                data: data,
                dataType: 'json',
                timeout:5000,


                beforeSend: function() {
                    $('#login_button').addClass('loading');
                    $("#login_button").attr("disabled", "disabled");
                    $('#login_button').text('Checking...');

                },
                success: function(server_response, textStatus, jqXHR) {
                    console.log(textStatus + ": " + jqXHR.status);

                    $("#login_button").removeClass("loading");
                    $("#login_button").removeAttr("disabled");

                    response = server_response.response;
                    console.log(response);
                    if (response == 'success') {
                        $('#login_button').text('Loggin in...');
                        name = server_response.name;
                        user_id = server_response.user_id;                       
                        outlets = server_response.outlets;
                        locations = server_response.locations;
                        dates = server_response.dates;
                        merchant = server_response.merchant;
                        merchant_sub_type = server_response.merchant_sub_type;
                        
                        
                        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
                            p_tranc = JSON.parse(p_tranc);
                            p_tranc.name = name;
                            p_tranc.user_id = user_id;
                            p_tranc.outlets = outlets;
                            p_tranc.dates = dates;
                            p_tranc.merchant = merchant;
                            p_tranc.merchant_sub_type = merchant_sub_type;
                            p_tranc.LOG = 1;
                            


                            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(p_tranc)).then(function(value) {
                                // Do other things once the value has been saved.
                                console.log(value);
                                // $("#parcel_form")[0].reset();
                                location.href = "search_outlet.html";

                            }).catch(function(err) {
                                // This code runs if there were any errors
                                console.log(err);
                            });


                        }).catch(function(err) {
                            // This code runs if there were any errors
                            console.log(err);
                        });

                    } else if (response == 'fail') {
                        $('#login_button').text('Login');
                        swal("Invalid Credentials", "The Username or Password you entered may be wrong", "error");
                    } else if (response == 'deactivated') {
                        $('#login_button').text('Login');
                        swal("Account Not Active", "Your Account is not Active, Please cotact Admin", "error");
                    } else {
                        $('#login_button').text('Login');
                        swal("Something went wrong ", "We have a small issue on our end. Please try again later " + response, "error");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#login_button").removeClass("loading");
                        $("#login_button").removeAttr("disabled");
                        $('#login_button').text('Log in');
                    if (textStatus=="timeout") {
                        swal("Timeout", "Took too long to reach the server", "error");
                    }
                    else
                    {

                        swal("Login error", "Could not connect to the server", "error");  
                    }
                    
                }

            });
        }//endif 
        else {
            swal("No Internet Connection", "Please turn on internet connection", "error");
        }


    },

    timeNow: function() {
        var d = new Date(); // for now
        var t_now = d.getHours() + ":" + d.getMinutes(); + ":" + d.getSeconds();
        return t_now;
    },
    todayDate: function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    },
    onOffline: function() {
        console.log('Offline Now');
    },
    onOnline: function() {
        // Handle the online event
        var networkState = navigator.connection.type;

        if (networkState !== Connection.NONE) {

        }
        console.log('Connection type: ' + networkState);
    },

    checkConnection: function() {
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {
            console.log("X")
            return false;

        } else {
            console.log("K")
            return true;
        }

    },
    checkProceed:function()
    {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);
            checkLog=dat.LOG;
            if (checkLog==1) 
            {
                location.href="search_outlet.html";
            }



        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }

};

app.initialize();
app.checkProceed();