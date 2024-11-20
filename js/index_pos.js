var app = {
    // Application Constructor
     LINK: "http://igurukenya.com/PKM/scripts/",
    MA3PARCEL: localforage.createInstance({
        name: "MA3PARCEL"
    }),
    macAddress: "", // get your mac address from bluetoothSerial.list
    chars: "",
    current_location_id: "",
    printerName:"InnerPrinter",
    saccoName:"PICK-UP MTAANI",
    saccoContacts:"[07123456789-NRB][070000000-NRB]",
    isInternetConnected: 0,
    isPrinterConnected: false,
    printer_status:"",
    connectionLabel: "",
    loadingSheet:"",
    TIDS:[],
    temp_sent_to_me:"",

    loggedInUser:"",


    initialize: function() {
        this.bindEvents();
        //console.log("Starting SimpleSerial app");

        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(value) {
            // This code runs once the value has been loaded
            // from the offline store.
            if (value === null) {
                //console.log("NOT SET");   
                var p_transaction = {
                    LOG: 0,
                    parcels: [],
                    CID: 0,
                    user: "",
                    vehicles: "",
                    name: "",
                    prefix: "",
                    stage: "",
                    routes: "",
                    location_id:"",
                    user_id:"",
                    locations: "",
                    agent_locations: "",
                    agent_offices: "",
                    quota_start: 0,
                    quota_end: 0,
                    quota_current: 0
                };
                app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(p_transaction)).then(function(value) {
                    // Do other things once the value has been saved.
                    console.log(value);
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
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // connectButton.addEventListener('touchend', app.manageConnection, false);
        //printButton.addEventListener('touchend', app.printReceipt, false);

    },

    synchStart: function() {

        console.log("WHY IS THIS");
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

            app.sendOnline(dat);
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

    },

    openParcels: function() {
        location.href = "sent_parcels.html";
    },
    
    openQuotas: function() {
        location.href = "quota.html";
    },
    timeNow: function() {
        var d = new Date(); // for now
        var t_now = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
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




    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log("FFFFFFFFFFFFFFFFff");
        //this.receivedEvent('deviceready');
        var listPorts = function() {
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    results.forEach(function(device) {
                            console.log(device.name);
                            if (device.name == app.printerName) {
                                app.macAddress = device.id;
                                app.connectionLabel=device.name;
                                app.manageConnection();

                            }
                        })
                        //app.displayPrinterMessage(JSON.stringify(results));
                },
                function(error) {
                    app.displayPrinterMessage(JSON.stringify(error)+"121","red");
                    app.setPrinterStatus("disconnected");
                }
            );
        }

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {           
            app.setPrinterStatus("bt-off");
            app.displayPrinterMessage("Bluetooth is Off","red");
            //app.displayPrinterMessage("Bluetooth is Off","red");
        }

        // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
    },

    findPrinter:function()
    {
        
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    results.forEach(function(device) {
                            console.log(device.name);
                            if (device.name == app.printerName) {
                                app.macAddress = device.id;
                                app.connectionLabel=device.name;
                                app.manageConnection();

                            }
                        })
                        //app.displayPrinterMessage(JSON.stringify(results));
                },
                function(error) {
                    app.displayPrinterMessage(JSON.stringify(error)+"121","red");
                }
            );
        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    isLoggedIn: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

            var name = dat.name;
            var stage = dat.stage;
            var LOG = dat.LOG;
            if (LOG == 1) {
                app.loggedInUser=name;
                $("#profile_name").text(name);
                $("#profile_stage").text(stage);
            } else {
               app.toastIt('Please Log In', 2000, 'red accent-2');
              //  app.toastIt({html:'Please Log In', displayLength:2000, classes:"red accent-1"});

                location.href = "index.html";
            }



        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
    displayQuota: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

            var quota_start = dat.quota_start;
            $("#quota_start").text(quota_start);
            var quota_end = dat.quota_end;
            $("#quota_end").text(quota_end);


            var quota_current = dat.quota_current;
            $("#quota_current").text(quota_current);



        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    loadParcelDetails: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

            var U_NAME = dat.name;
            $("#profile_name").text(U_NAME);
            $("#current_user").text(U_NAME);


            var STAGE = dat.stage;
            $("#current_stage").text(STAGE);

            //var pmtaani_locations=;
//console.log(dat.locations);
            var json_pmtaani_locations=dat.locations;
            var locs=json_pmtaani_locations.length;
             var html_code = "<option disabled selected>Choose...</option>";
            for (var i = 0; i < locs; i++) {
                console.log(json_pmtaani_locations[i].location_name);
                 html_code = html_code + '<option value="' + json_pmtaani_locations[i].id + '">' + json_pmtaani_locations[i].location_name + '</option>';
            }
          
            $("#p_to").html(html_code);




            


        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    refreshData: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

            var name = dat.name;
            $("#home_name").text(name);
            var stage = dat.stage;
            $("#home_stage").text(stage);

             var json_pmtaani_locations=dat.locations;
            var locs=json_pmtaani_locations.length;
             var html_code = "";
            for (var i = 0; i < locs; i++) 
            {
            //html_code = "<tr>";
           // console.log(json_pmtaani_locations[i].location_name);
            p_m_location_id= json_pmtaani_locations[i].id;
            html_code = html_code + '<div class="location yellow_text black accent-4">' + json_pmtaani_locations[i].location_name + '</div>';

                 /************OFFICE LOCATIONS*************/
                var json_pmtaani_agent_locations=dat.agent_locations;
                var locsx=json_pmtaani_agent_locations.length;
               // var html_code = "<span>";
                for (var x = 0; x < locsx; x++) 
                {
                    console.log(json_pmtaani_agent_locations[x].agent_location);
                    
                     current_pmtaani_agent_location=json_pmtaani_agent_locations[x].location;
                     current_pmtaani_agent_location_id=json_pmtaani_agent_locations[x].id;
                     if (p_m_location_id==current_pmtaani_agent_location) 
                     {
                       html_code = html_code + '<div class="current_pm_location yellow_text black accent-3">' + json_pmtaani_agent_locations[x].agent_location + '</div>';

                       /*************AGENT**************/
                        /*var json_pmtaani_agent_offices=dat.agent_offices;
                        var locsy=json_pmtaani_agent_offices.length;
                       // var html_code = "";
                        for (var y = 0; y < locsy; y++) 
                        {
                          // console.log(json_pmtaani_agent_offices[i].name);
                           office_location=json_pmtaani_agent_offices[y].agent_location;
                           if (office_location==current_pmtaani_agent_location_id) 
                           {
                             html_code = html_code + '<div class="office yellow_text  black accent-2">' + json_pmtaani_agent_offices[y].name + '</div>';
                           }
                            
                        }*/
                       /**************AGENT*************/
      
                     }
                }

                 /*************OFFICE LOCATIONS***************/

            }

          
         
          
            $("#refresh_details").html(html_code);



        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
    getLoading: function() {
        
        var current_stage = $("#current_stage").text();
        var unsanitized_date = $("#date_selected").val();
        
        var serialized = "p_agent_location=" + app.current_location_id + "&date=" + unsanitized_date ;
     //   var print_str="\nFROM: "+ current_stage+" TO: "+p_to+"\n******************************";
       app.TIDS=[];
        $.ajax({
            type: "POST",
            url: app.LINK + "GP.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                $('#get_loading').html('Fetching <i class="fa fa-spin"></i>');

            },
            success: function(server_response) {
               // $('#get_loading').text("Loading Sheet");
                $('#get_loading').html('Get Parcels <i class="fa fa-download"></i>');
                response = server_response.response;
                html_code = '';
                if (response == "success") {

                    count_i=0;
                    app.temp_sent_to_me=server_response.items;
                    for (var key in server_response.items) {

                        // id,sender_name,receiver_name, parcel_description, , 

                        sender_name = server_response.items[key].sender_name;
                        receiver_name = server_response.items[key].receiver_name;
                        parcel_description = server_response.items[key].parcel_description;
                        parcel_cost = server_response.items[key].parcel_cost;
                        receipt_no = server_response.items[key].receipt_no;
                        sender_location = server_response.items[key].sender_location;
                        id = server_response.items[key].id;
                        app.TIDS.push(id);
                        //console.log(tot)
                        //html_code = html_code + '<div class="load_div"><p>Receipt:' + receiver_name + ' Cost: ' + parcel_cost + '</p> <p><span> Sender:' + sender_name + '</span><span>Recipient: ' + receiver_name + '</span> <span ></p>Description: ' + parcel_description + '</span></div>';
                         html_code = html_code + '<div data-id="'+key+'"  class="maleo-card p_sent_to_me maleo-event_list margin-bottom_low animated fadeInUp"><div id="p_' + id + '" class="event-date yellow"><span class="month">&nbsp;</span><span class="date">' + parcel_cost + '</span><span class="year">' + receipt_no + '</span></div><div class="event-content"><div class="event-name"><a href="#">' + parcel_description + '</a></div><div class="event-location"> <strong>From:</strong> ' + sender_location + '<br><strong>Sender:</strong> ' + sender_name + '<br> <strong>Recipient:</strong> ' + receiver_name + '</div></div></div>';
                        //print_str=print_str+ "\nSender: "+sender_name+ "\nRecipient:"+receiver_name+"\nReceipt: "+receipt_no+"\nCost:"+parcel_cost+"\nDescription:"+parcel_description+"\n-------------------------------\n";

                   
count_i++;
                    }
                    app.toastIt('Displaying Records for  ' + unsanitized_date, 2000, 'green accent-3');
                     // app.toastIt({html:'Please Log In', displayLength:2000, classes:"red accent-1"});

                   // $("#print_loading").removeClass("hidden");
                   // app.loadingSheet=print_str;
                    // console.log(datY);
                } 
                else if(response == "0")
                {
                    app.toastIt('No Records found for ' + unsanitized_date, 2000, 'red accent-2');
                    html_code = html_code + '<div class="load_div"><h5>No Records Found for ' + unsanitized_date + '</h5></div>';

                }

                else  {
                   
                     app.toastIt('Unable to get data' + unsanitized_date, 2000, 'red accent-2');
                    html_code = html_code + '<div class="load_div"><h5>There was an issue trying to get the data' + unsanitized_date + '</h5></div>';
                }

                $("#loading").html(html_code);
            }
            ,
                error: function(jqXHR, textStatus, errorThrown) {
                    
                   // $('#get_loading').text('Loading Sheet');
                    swal("Error", "Could not load data", "error");
                }
        });
    },

    getTotals: function() {
        unsanitized_date = $("#date_selected").val();

        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            serialized = "PD=" + unsanitized_date + "&current_stage=" + dat.stage;
            $.ajax({
                type: "POST",
                url: app.LINK + "GT.php",
                data: serialized,
                dataType: 'json',
                beforeSend: function() {
                    //$('#bounce').show('fast');

                },
                success: function(server_response) {

                    response = server_response.response;
                    html_code = '';
                    if (response == "success") {

                        for (var key in server_response.items) {


                            transaction_by = server_response.items[key].transaction_by;
                            tot = server_response.items[key].tot;
                            //console.log(tot)
                            app.toastIt('Displaying Records for  ' + unsanitized_date, 2000, 'green accent-3');
                            html_code = html_code + '<tr><td>' + transaction_by + '</td><td>' + tot + '</td><td>' + unsanitized_date + '</td></tr>';


                        }

                        // console.log(datY);
                    } else {
                        app.toastIt('No Records found for ' + unsanitized_date, 2000, 'red accent-2');
                        html_code = html_code + '<tr><td colspan="3" class="red accent-2">No Records Found for ' + unsanitized_date + '</td></tr>';

                        // console.log(server_response)
                    }

                    $("#user_totals").html(html_code);
                }
            });

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    cleanOldData: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);
            holder = JSON.parse(p_tranc);
            // holder=dat;
            holder.parcels.splice(0, holder.parcels.length);
            //holder.parcels.length=0

             // console.log("ORIGINAL "+JSON.stringify(dat))
            //   console.log("LEN2 "+JSON.stringify(holder))

            current_date = app.todayDate();
            // var indices=array();
            //  var dat = dat2.parcels;
            len = dat.parcels.length;
            //         console.log("LEN "+len)       
            for (var i = 0; i < len; i++) {
                //console.log(dat.parcels[i].tid)
                len2 = dat.parcels.length;
               
                parcel_date = dat.parcels[i].t_date;

                 // console.log("DEL "+current_date+"---"+parcel_date);

                if (new Date(current_date) > new Date(parcel_date)) {
                    if (dat.parcels[i].status === 0) {
                        holder.parcels.push(dat.parcels[i]);

                        // console.log("STORE UN " + parcel_date)
                    }
                    else
                    {
                       // console.log("TO DELETE" + parcel_date)
                    }

                     // console.log("DEL " + parcel_date)
                } else {
                 // console.log("STORE " + parcel_date)
                    holder.parcels.push(dat.parcels[i]);
                    // console.log(holder.parcels)
                }

            }

 //console.log("AFTER " + JSON.stringify(holder));


            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(holder)).then(function(value) {
                // Do other things once the value has been saved.
              //  console.log(value);
                // $("#parcel_form")[0].reset();
                //location.href = "parcel.html";

                //  loadContent();

            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });


            // wheelStorage.setItem("user_data",JSON.stringify(dat))

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    sendOnline: function(dat) {
        cur_id = 0;
        //var for_upload_json=
        var Upload_object = {
            parcels: []
        };

        Upload_object.parcels = dat.parcels.filter(function(el) {
            cur_id = el.tid;
            return el.status <= 0;
        });

        // Upload_object.parcel.push(for_upload)



        // /console.log(Upload_object);

        if (Upload_object.parcels.length > 0) {
          //  serialized = "PD=" + JSON.stringify(Upload_object);

             var UPS=JSON.stringify(Upload_object);
           var UPS2="PD=" + UPS.replace(/\\n/g, " ").replace(/\\'/g, " ").replace(/\\"/g, ' ').replace(/\\&/g, " ").replace(/\\r/g, " ").replace(/\\t/g, " ")
.replace(/\\b/g, " ").replace(/\\f/g, " ").replace("&"," ");
          // .replace(/\\n/g, '')
           console.log(UPS2+"-----kkkkk");

            serialized = UPS2;

            $.ajax({
                type: "POST",
                url: app.LINK + "NT.php",
                data: serialized,
                dataType: 'json',
                beforeSend: function() {
                    //$('#bounce').show('fast');

                },
                success: function(server_response) {

                    response = server_response.response;

                    if (response == "success") {
                        success = server_response.success;
                        app.updateStatus(success, 1);
                        app.toastIt(success.length + ' Records Uploaded Successfully', 2000, 'green accent-4');

                        failure = server_response.failure;
                        //  var fail_data = JSON.parse(f_ids);
                        if (failure.length > 0) {
                            app.toastIt(failure.length + ' Records NOT Uploaded', 2000, 'red accent-2');

                        }

                        // console.log(datY);
                    } else {
                        app.toastIt('Something Went wrong. Please contact Admin', 2000, 'red accent-2');

                        //  console.log(server_response)
                    }
                }
            });
        } //END IF
        else {
            app.toastIt(' No records found to Upload', 2000, 'amber darken-3');

        }
    },

    fetchData: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            user_id = dat.user_id;


            serialized = "user_id=" + user_id;
            $.ajax({
                type: "POST",
                url: app.LINK + "RC.php",
                data: serialized,
                dataType: 'json',
                beforeSend: function() {
                    $('#action_progress').removeClass('hidden');

                },
                success: function(server_response) {

                    $('#action_progress').addClass('hidden');

                    response = server_response.response;

                    if (response == "success") {

                        //  app.toastIt('Records Updated', 2000, 'green accent-4')

                        
                        stage = server_response.stage;
                       
                        name = server_response.name;
                        prefix = server_response.prefix;
                        user_id = server_response.user_id;
                        location_id = server_response.location_id;
                        stage = server_response.stage;
                       
                        locations = server_response.locations;
                        agent_locations = server_response.agent_locations;
                        agent_offices=server_response.agent_offices;



                        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {

                            p_tranc = JSON.parse(p_tranc);
                            p_tranc.name = name;
                            p_tranc.prefix = prefix;
                            p_tranc.stage = stage;
                           // p_tranc.routes = routes;                            
                            p_tranc.name = name;
                            p_tranc.user_id = user_id;
                            p_tranc.location_id = location_id;                            
                           
                            p_tranc.locations = locations;
                            p_tranc.agent_locations = agent_locations;
                            p_tranc.agent_offices = agent_offices;
                           



                            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(p_tranc)).then(function(value) {
                                // Do other things once the value has been saved.
                                console.log("***************"+value);

                                app.toastIt('Records Updated', 2000, 'green accent-4');
                                // $("#parcel_form")[0].reset();
                                // location.href = "parcel.html";refresh
                                app.refreshData();

                            }).catch(function(err) {
                                // This code runs if there were any errors
                                app.toastIt('Update Error', 2000, 'red accent-4');
                                console.log(err);
                            });


                        }).catch(function(err) {
                            // This code runs if there were any errors
                            console.log(err);
                        });


                    }


                }
            });


        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    fetchQuota: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);
            quota_start = dat.quota_start;
            quota_end = dat.quota_end;
            quota_current = dat.quota_current;
            user = dat.user_id;
            location_id = dat.location_id;

            diff = Number(quota_end) - Number(quota_current);

            if (diff < 1) {
                serialized = "quota_start=" + quota_start + "&quota_end=" + quota_end + "&quota_current=" + quota_current + "&user=" + user + "&location_id=" + location_id;
                $.ajax({
                    type: "POST",
                    url: app.LINK + "FQ.php",
                    data: serialized,
                    dataType: 'json',
                    beforeSend: function() {
                        //$('#bounce').show('fast');

                    },
                    success: function(server_response) {

                        response = server_response.response;
                        html_code = '';
                        if (response == "success") {

                            dat.quota_start = server_response.quota_start;
                            dat.quota_end = server_response.quota_end;
                            dat.quota_current = server_response.quota_current;

                            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(dat)).then(function(value) {
                                // Do other things once the value has been saved.
                                console.log(value);
                                // $("#parcel_form")[0].reset();
                                //location.href = "parcel.html";
                                app.displayQuota();
                                app.toastIt('Quotas Updated Sucessfully', 2000, 'green accent-4');


                                //  loadContent();

                            }).catch(function(err) {
                                // This code runs if there were any errors
                                console.log(err);
                            });


                        } else {
                            app.toastIt('Error Updating Quotas', 2000, 'green accent-4');
                            //report errors

                        }


                    }
                });
            } else {
                app.toastIt('Please finish your quotas', 2000, 'red accent-2');

            }

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
    checkQuotas: function() {

        //console.log("BREAKS HERE 708")
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);
            quota_start = dat.quota_start;
            quota_end = dat.quota_end;
            quota_current = dat.quota_current;


            diff = Number(quota_end) - Number(quota_current);

            if (diff < 1) {
                location.href = "quota.html";
            }
        });
    },
    loadContent: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            html_code = "";
            var TOT_PARCEL = 0;
            var UNSYNCH_TOT = 0;

            i = 0;
            //console.log(dat.parcels.length)
            if (dat.parcels.length === 0) {
                $("#parcel_data").html('<div class="row"><div class="col s12 m5"><div class="card-panel red lighten-1"><span class="white-text">No parcels found</span></div></div></div>');
            } else {

                for (var key in dat.parcels) {
                    // if it's not something from the prototype


                    if (dat.parcels.hasOwnProperty(key)) {
                        p_from = dat.parcels[key].p_from;
                        p_to = dat.parcels[key].p_to;
                        description = dat.parcels[key].description;
                        recipient_phone = dat.parcels[key].recipient_phone;
                        recipient_name = dat.parcels[key].recipient_name;
                        sender_name = dat.parcels[key].sender_name;
                        sender_phone = dat.parcels[key].sender_phone;
                        tid = dat.parcels[key].tid;
                        amount = dat.parcels[key].amount;
                        receipt_number = dat.parcels[key].receipt_number;
                        user = dat.parcels[key].user;
                        parcel_upload_status = dat.parcels[key].status;
                        t_date = dat.parcels[key].t_date;
                        i++;
                        cls = "green accent-3";
                        if (parcel_upload_status === 0) {
                            cls = "red accent-2";
                            UNSYNCH_TOT = UNSYNCH_TOT + Number(amount);
                        }

                        TOT_PARCEL = TOT_PARCEL + Number(amount);




                        html_code = html_code + '<div  class="maleo-card maleo-event_list margin-bottom_low animated fadeInUp"><div id="p_' + tid + '" class="event-date ' + cls + '"><span class="month">&nbsp;</span><span class="date">' + amount + '</span><span class="year">' + receipt_number + '</span></div><div class="event-content"><div class="event-name"><a href="#">' + description + '</a></div><div class="event-location"> <strong>From:</strong> ' + p_from + ' <i class="fa fa-arrow-right"></i> <strong>To:</strong>' + p_to + '<br><strong>Sender:</strong> ' + sender_name + '<br> <strong>Recipient:</strong> ' + recipient_name + '</div></div></div>';
                        /*if (status==0) 
                        {
                            html_code=html_code+'<tr class="table-danger" ><td  >'+i+'</td><td>'+phone+'</td><td>'+sku+'</td><td>'+age+'</td><td>'+gender+'</td><td>'+prize+'</td></tr>';
                        }

                        else
                        {
                            html_code=html_code+'<tr class="table-success" ><td  >'+i+'</td><td>'+phone+'</td><td>'+sku+'</td><td>'+age+'</td><td>'+gender+'</td><td>'+prize+'</td></tr>';
                        }*/

                        // console.log(dat2); 
                        $("#parcel_data").html(html_code);
                    }
                }

                $("#total_parcel").text(TOT_PARCEL);
                $("#total_unsync").text(UNSYNCH_TOT);


            } //end else
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    saveChanges: function() {
        app.MA3PARCEL.setItem('PARCEL_TRANSACTION', user_data).then(function(value) {
            console.log(value);

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
    homeTabs: function() {
        var UNSYNCH_TOT = 0;
        var TOT_PARCEL = 0;

        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);
            console.log(dat)
            parcel_count = dat.parcels.length;

            current = dat.quota_current;
            name = dat.name;
            stage = dat.stage;
            end = dat.quota_end;

            REMAINING = Number(end) - Number(current);

            for (var key in dat.parcels) {

                if (dat.parcels.hasOwnProperty(key)) {

                    amount = dat.parcels[key].amount;
                    parcel_upload_status = dat.parcels[key].status;
                    console.log(amount + " ----");
                    TOT_PARCEL = TOT_PARCEL + Number(amount);
                    if (parcel_upload_status === 0) {
                        UNSYNCH_TOT = UNSYNCH_TOT + Number(amount);
                    }


                }

            }

            $("#home_total").text(TOT_PARCEL);
            $("#home_unsynch").text(UNSYNCH_TOT);
            $("#home_parcels").text(parcel_count);
            $("#home_quotas").text(REMAINING);
            $("#home_name").text(name);
            $("#home_stage").text(stage);

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
    parcels: function() {
        var PARCELS = 0;
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            PARCELS = dat.parcels.length;


        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

        return PARCELS;
    },
    quotas: function() {
        var REMAINING = 0;
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            current = dat.quota_current;
            end = dat.end;

            REMAINING = Number(end) - Number(current);

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

        return REMAINING;
    },
    totalUnsych: function() {
        var UNSYNCH_TOT = 0;
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            for (var key in dat.parcels) {

                if (dat.parcels.hasOwnProperty(key)) {

                    amount = dat.parcels[key].amount;
                    parcel_upload_status = dat.parcels[key].status;
                    if (parcel_upload_status === 0) {
                        UNSYNCH_TOT = UNSYNCH_TOT + Number(amount);
                    }


                }

            }

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

        return UNSYNCH_TOT;
    },

    totalToday: function() {
        var TOT_PARCEL = 0;
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            for (var key in dat.parcels) {

                if (dat.parcels.hasOwnProperty(key)) {

                    amount = dat.parcels[key].amount;
                    TOT_PARCEL = TOT_PARCEL + Number(amount);

                }

            }

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });

        return TOT_PARCEL;
    },

    updateStatus: function(success, new_status) {

        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            //  var dat = dat2.parcels;
            len = dat.parcels.length;
            for (var key in success) {
                success_key = success[key];
                for (var i = 0; i < len; i++) {
                    //console.log(dat.parcels[i].tid)
                    if (dat.parcels[i].tid == success_key) {
                        dat.parcels[i].status = new_status;
                        // console.log("TEST " + dat.parcels[i].tid)
                        $("#p_" + dat.parcels[i].tid).removeClass("red accent-2");
                        $("#p_" + dat.parcels[i].tid).addClass("green accent-3");
                        // return;
                    }
                }
            } //end for 1
            // console.log(dat)
            user_data = JSON.stringify(dat);

            app.saveChanges(user_data);


            // wheelStorage.setItem("user_data",JSON.stringify(dat))

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },

    tryAndUpload: function(Upload_object) {
        serialized = "PD=" + JSON.stringify(Upload_object);
        $.ajax({
            type: "POST",
            url: app.LINK + "NT.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                //$('#bounce').show('fast');

            },
            success: function(server_response) {

                response = server_response.response;
                if (response == "success") {
                    success = server_response.success;
                    app.updateStatus(success, 1);
                    app.toastIt('Transaction Uploaded Sucessfully', 2000, 'green accent-4');
                    console.log(server_response);
                } else {
                    console.log("ERR");
                }


            }
        });
    },
    validateForm: function()
    {
        var shouldProceed=true;
        //p_from = $('#p_from').val();
        p_to = $('#p_to').val();
        p_agent_location = $('#p_agent_location').val();
        p_agent_name = "";
       // p_to = $('#p_to').val();
        description = $('#description').val();
        sender_name = $('#sender_name').val();
        sender_phone = $('#sender_phone').val();
        recipient_name = $('#recipient_name').val();
        recipient_phone = $('#recipient_phone').val();
        amount = $('#amount').val();
        payment_mode = $('#payment_mode').val();
        

         if(p_to==null || p_to=="")
        {
             app.appNotifier("Destination Location is required");
             $('#p_to').focus();
             shouldProceed=false;
        }
        else if(p_agent_location==null || p_agent_location=="")
        {
             app.appNotifier("Destination Agent Location is required");
             $('#p_agent_location').focus();
             shouldProceed=false;
        }
      /*  else if(p_agent_name==null || p_agent_name=="")
        {
             app.appNotifier("Destination Agent is required");
             $('#p_agent_name').focus();
             shouldProceed=false;
        }*/

        else if(description==null || description=="")
        {
             app.appNotifier("Destination is required");
             $('#description').focus();
             shouldProceed=false;
        }
        else if(sender_name==null || sender_name=="")
        {
             app.appNotifier("Sender name is required");
             $('#sender_name').focus();
             shouldProceed=false;
        }
        else if(sender_phone==null || sender_phone=="")
        {
             app.appNotifier("Sender Phone number is required");
             $('#sender_phone').focus();
             shouldProceed=false;
        }
        else if(recipient_name==null || recipient_name=="")
        {
             app.appNotifier("Recipient Name is required");
             $('#recipient_name').focus();
             shouldProceed=false;
        }
        else if(recipient_phone==null || recipient_phone=="")
        {
             app.appNotifier("Recipient Phone number is required");
             $('#recipient_phone').focus();
             shouldProceed=false;
        }
        else if(payment_mode==null || payment_mode=="")
        {
             app.appNotifier("Choose Payment Mode");
             $('#payment_mode').focus();
             shouldProceed=false;
        }
        else if(amount==null || amount=="")
        {
             app.appNotifier("Amount Cannot be null");
             $('#amount').focus();
             shouldProceed=false;
        }
        else
        {
         amount=Number(amount);
            if (isNaN(amount)) 
            {
                        app.appNotifier("Amount has to be a number");
                        $('#amount').focus();
                        shouldProceed=false;
            }
            else
            {
                if (amount<100) 
                {
                        app.appNotifier("Amount Cannot be less than 100");
                        $('#amount').focus();
                        shouldProceed=false;
                }
                

            }   
        }

    

    return shouldProceed;
    },
    appNotifier:function(message){
        M.toast({html:message, displayLength:2000, classes:"red accent-3"});
    },
    saveData: function() {
      //  app.checkBluetoothConnection();

      //  if (app.isPrinterConnected) 
      if(true)
        {
            var formStatus=app.validateForm();
            if (formStatus) 
            {
        p_to = $('#p_to').val();
        p_agent_location = $('#p_agent_location').val();
        p_agent_name = "-";
        description = $('#description').val();
        sender_name = $('#sender_name').val();
        sender_phone = $('#sender_phone').val();
        recipient_name = $('#recipient_name').val();
        recipient_phone = $('#recipient_phone').val();
        amount = $('#amount').val();
        p_agent_location = $('#p_agent_location').val();
        p_agent_name = "-";
        payment_mode = $('#payment_mode').val();



        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            console.log(p_tranc);

            p_tranc = JSON.parse(p_tranc);
            var CID = p_tranc.CID;
            nextCID = Number(CID) + 1;

            var stage = p_tranc.stage;
            var prefix = p_tranc.prefix;
            var current_user = p_tranc.user;
            var location_id=p_tranc.location_id;
            quota_end = p_tranc.quota_end;
            user_id = p_tranc.user_id;

            console.log("LOc:"+ location_id +" USER:"+user_id);
            quota_current = p_tranc.quota_current;

            var Upload_object = {
                parcels: []
            };
            t_time = app.timeNow();
            t_date = app.todayDate();
            receipt_number = prefix + " " + quota_current;
            p_tranc.parcels.push({
                "p_from": stage,
                "location_id": location_id,
                "p_to": p_to,
                "user_id": user_id,
                "p_agent_location": p_agent_location,
                "p_agent_name": p_agent_name,
                "description": description,
                "sender_name": sender_name,
                "sender_phone": sender_phone,
                "recipient_name": recipient_name,
                "recipient_phone": recipient_phone,
                "amount": amount,
                "t_date": t_date,
                "t_time": t_time,
                "receipt_number": receipt_number,
                "user": current_user,
                "quota": quota_current,
                "status": 0,
                "tid": nextCID,
                "payment_mode": payment_mode
                
            });
            Upload_object.parcels.push({
                "p_from": stage,
                "p_to": p_to,
                "user_id": user_id,
                "location_id": location_id,
                "p_agent_location": p_agent_location,
                "p_agent_name": p_agent_name,
                "description": description,
                "sender_name": sender_name,
                "sender_phone": sender_phone,
                "recipient_name": recipient_name,
                "recipient_phone": recipient_phone,
                "amount": amount,
                "t_date": t_date,
                "t_time": t_time,
                "receipt_number": receipt_number,
                "user": current_user,
                "quota": quota_current,
                "tid": nextCID,
                "payment_mode": payment_mode
            });

            p_tranc.CID = nextCID;
            c_q = Number(quota_current);
            next_count = c_q + 1;
            p_tranc.quota_current = next_count;
            q_end = Number(quota_end);
            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(p_tranc)).then(function(value) {
                str = "";
                var head = app.saccoName +"\n"+app.saccoContacts+"\n________________________________\nRECEIPT:     " + receipt_number + "\n" + t_date + " : " + t_time + "\n";
                var formattedReceipt = "FROM: " + stage  + "\n"+ "TO: " + p_to + "\n" + "Sender Name: " + sender_name + "\nSender Phone: " + sender_phone + "\nReceiver Name: " + recipient_name + "\nReceiver Phone: " + recipient_phone + "\nDescription: " + description + "\nAMOUNT PAID : Ksh. " + amount;
                var foot = "\n________________________________\nServed by:" + current_user.toUpperCase() + "\n";
                var foot3 = "Powered By: iGuru Limited\n www.igurukenya.com \n\n--------------------------------\n";
                var foot2 = "\n *TERMS AND CONDITIONS APPLY* \n";
                var spacer = "\n\n";
                 var foot4 = "Sacco Motto";
                var str = head + formattedReceipt + foot +foot4+ foot2 + foot3 + spacer;
                app.printReceipt(str)
                app.tryAndUpload(Upload_object);
                $("#parcel_form")[0].reset();
                app.checkQuotas();

            }).catch(function(err) {
                console.log(err);
            });


        }).catch(function(err) {
            console.log(err);
        });

    }//vorm validator

           
        }
        else
        {
            swal("Printer is not connected","Please connect printer","error");
            app.setPrinterStatus("disconnected")
        }
        
    },

    logOut: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);
            dat.LOG = 0;


            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(dat)).then(function(value) {
                // Do other things once the value has been saved.
                location.href = "index.html";

                console.log(value);

            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });



        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
    loadingPage: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            U_NAME = dat.name;
            $("#profile_name").text(U_NAME);
            $("#current_user").text(U_NAME);


            STAGE = dat.stage;
            $("#current_stage").text(STAGE);

            ROUTES = dat.routes;
            var fragments = ROUTES.split(',');
            count = fragments.length;
            html_code = "<option disabled selected>Choose...</option>";
            for (i = 0; i < count; i++) {
                html_code = html_code + "<option value=" + fragments[i] + ">" + fragments[i] + "</option>";
            }
            $("#p_to").html(html_code);

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });


    },
    parcelsSentToMe: function() {
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            dat = JSON.parse(p_tranc);

            U_NAME = dat.name;
            app.current_location_id=dat.location_id;
            $("#profile_name").text(U_NAME);
            $("#current_user").text(U_NAME);
            STAGE = dat.stage;
            $("#current_stage").text(STAGE);

            console.log(app.current_location_id);

           /* var json_pmtaani_locations=dat.locations;
            var locs=json_pmtaani_locations.length;
             var html_code = "<option disabled selected>Choose...</option>";
            for (var i = 0; i < locs; i++) {
                console.log(json_pmtaani_locations[i].location_name);
                 html_code = html_code + '<option value="' + json_pmtaani_locations[i].id + '">' + json_pmtaani_locations[i].location_name + '</option>';
            }
          
            $("#p_to").html(html_code);

*/

        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });


    },

    printReceipt: function(str) {
        bluetoothSerial.write(str, app.success, app.failure);
        bluetoothSerial.write(str, app.success, app.failure);
},

    printLoading: function() {
        // str = "HELLO\n THIS IS A SAMPLE\nAND\n ANOTHER\nONE\n";
        bluetoothSerial.write(app.loadingSheet+"\n\n\n\n", app.success, app.failure);
     // console.log("---"+app.TIDS) 
      // console.log(+"-----------------------"+JSON.stringify(app.TIDS))
serialized="user="+app.loggedInUser+"&LOAD="+JSON.stringify(app.TIDS);
        $.ajax({
            type: "POST",
            url: app.LINK + "load_synch.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                //$('#get_loading').text("Fetching..");

            },
            success: function(server_response) {
                //$('#get_loading').text("Loading Sheet");
                console.log(server_response)
            },
             error: function(jqXHR, textStatus, errorThrown) {
                    
                  //  $('#get_loading').text('Loading Sheet');
                    console.log( "Could not connect to the server");
                }
        });
    },
    manageConnection: function() {

        // connect() will get called only if isConnected() (below)
        // returns failure. In other words, if not connected, then connect:
        /*  var connect = function() {
              // if not connected, do this:
              // clear the screen and display an attempt to connect
              app.clear();
              console.log("Attempting to connect. " +
                  "Make sure the serial port is open on the target device.");
              // attempt to connect:
              bluetoothSerial.connect(
                  app.macAddress, // device to connect to
                  app.openPort, // start listening if you succeed
                  app.showError // show the error if you fail
              );
          };*/

        // disconnect() will get called only if isConnected() (below)
        // returns success  In other words, if  connected, then disconnect:
        /* var disconnect = function() {
             console.log("attempting to disconnect");
             // if connected, do this:
             bluetoothSerial.disconnect(
                 app.closePort, // stop listening to the port
                 app.showError // show the error if you fail
             );
         };*/

        // here's the real action of the manageConnection function:
        // bluetoothSerial.isConnected(disconnect, connect);

        bluetoothSerial.isConnected(
            function() {
              //  app.displayPrinterMessage("Connected to InnerPrinter","green");               
                app.setPrinterStatus("connected");
                app.displayPrinterMessage("Connected to "+app.connectionLabel,"green");
                app.isPrinterConnected=true;

            },
            function() {
                console.log("ATTEMPTING TO CONNECT");
               // app.displayPrinterMessage()
                bluetoothSerial.connect(
                    app.macAddress, // device to connect to
                    app.openPort, // start listening if you succeed
                    app.showError // show the error if you fail
                );

            }
        )

    },
    /*
        subscribes to a Bluetooth serial listener for newline
        and changes the button:
    */
    openPort: function() {
        // if you get a good Bluetooth serial connection:
       // app.displayPrinterMessage("Connected to: 1163" + app.macAddress);
       // displayPrinterMessage()
            // change the button's name:
            // connectButton.innerHTML = "Disconnect";
            // set up a listener to listen for newlines
            // and display any new data that's come in since
            // the last newline:
        bluetoothSerial.subscribe('\n', function(data) {
           // app.clear();
            app.displayPrinterMessage("Connected to "+app.connectionLabel+" 1172","green");
            app.setPrinterStatus("connected");

            app.isPrinterConnected=true;
        });
    },

    /*
        unsubscribes from any Bluetooth serial listener and changes the button:
    */
    closePort: function() {
        // if you get a good Bluetooth serial connection:
        app.displayPrinterMessage("Disconnected from: 1185" + app.macAddress,"red");
        app.setPrinterStatus("disconnected");
        // change the button's name:
        // connectButton.innerHTML = "Connect";
        // unsubscribe from listening:
        bluetoothSerial.unsubscribe(
            function(data) {
                app.displayPrinterMessage(data+" 1187","red");
                app.setPrinterStatus("disconnected");
            },
            app.showError
        );
    },
    /*
        appends @error to the message div:
    */
    showError: function(error) {
        app.setPrinterStatus("disconnected");
        app.displayPrinterMessage(error+" 1200","red");
        app.isPrinterConnected=false;
    },

    checkBluetoothConnection:function() {
         bluetoothSerial.isEnabled(
            //bluetooth is on
            function(){

                bluetoothSerial.isConnected(
            function() {
               app.isPrinterConnected=true;

            },
            function() {
                console.log("ATTEMPTING TO CONNECT");
                //app.displayPrinterMessage()
                bluetoothSerial.connect(
                    app.macAddress, // device to connect to
                    app.openPort, // start listening if you succeed
                    app.showError // show the error if you fail
                );

            }
        )

            },
            //bluettoth is off
            function(){
                app.isPrinterConnected=false;
                swal("Bluetooth is Off","Please turn on bluetooth","error");
                app.displayPrinterMessage("Bluetooth is Off","red");
                app.setPrinterStatus("bt-off");
            }
        );

        
    },

    enableBluetooth: function()
    {
        bluetoothSerial.enable(
    function() {
       // console.log("Bluetooth is enabled");
       // app.displayPrinterMessage("Bluetooth enabled","green");
        app.displayPrinterMessage("Bluetooth enabled","green");
        app.findPrinter();
    },
    function() {
        console.log("The user did *not* enable Bluetooth");
    }
);
    },

    /*
        appends @message to the message div:
    */
    display: function(message,status) {
        var color = "";
        if (status == "red") {
            color = "red accent-3";
        } else if (status == "amber") {
            color = "amber darken-2";
        } else if (status == "green") {
            color = "green accent-3";
        }
        $("#display").html("<h5>" + message + "</h5>").addClass(color); // add a line break

    },
    /*
        clears the message div:
    */
    clear: function() {
        // var display = document.getElementById("message");
        $("#display").html("");
    },
    failure: function() {
        console.log("PRINT FAIL");
    },
    success: function() {
        console.log("PRINT SUCCESS");
    },
    checkInternetConnection: function() {
        var networkState = navigator.connection.type;

        if (networkState == Connection.NONE) {
            app.isInternetConnected = 0;
        } else {
            app.isInternetConnected = 0;
        }



    },
    displayPrinterMessage: function(message, status) {
        var color = "";
        if (status == "red") {
            color = "red accent-3";
        } else if (status == "amber") {
            color = "amber darken-2";
        } else if (status == "green") {
            color = "green accent-3";
        }
       // $("#printer_status").removeClass('red accent-3 amber darken-2 green accent-3');
       // $("#display").html("")
        $("#display").html("<h5>" + message + "</h5>").addClass(color); // add a line break

        app.toastIt(message, 2000, color);
    },
    deviceOnline: function() {

        //put marker/indicator green

        var networkState = navigator.connection.type;

        if (networkState !== Connection.NONE) {
            if (dataFileEntry) {
                //try and synch all
            }
        }

    },
    deviceOffline: function() {
        //put marker/indicator red
    },
    managePrinter: function() {

        app.printer_status=$("#printer_indicator").data("value");
        if (app.printer_status=="bt-off") 
        {
            app.enableBluetooth();
            //turn off printer
            swal("Bluetooth is Off", "Please turn on bluetooth", "error");
        }
        else if(app.printer_status=="disconnected")
        {
            app.findPrinter();
            //initiate connection
        }
        else if(app.printer_status=="connected")
        {
             //app.displayPrinterMessage("Printer Is already connected ","green");
            //ask if to disconnect
        }
        else
        {
            app.displayPrinterMessage("Printer Issue "+app.printer_status,"red");
        }


    },
    setPrinterStatus: function(status)
    {
        $("#printer_indicator").data("value",status);

        //if(sta)
        console.log(status+" New Status");
        // console.log($("#printer_indicator").data("value")+"==========");
    },
    destinationChanged:function()
    {
       current_val= $("#p_to").val();
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

             var json_pmtaani_agent_locations=dat.agent_locations;
            var locs=json_pmtaani_agent_locations.length;
             var html_code = "<option disabled selected>Choose Location</option>";
            for (var i = 0; i < locs; i++) {
                    current_pmtaani_agent_location=json_pmtaani_agent_locations[i].location;
                     current_pmtaani_agent_location_id=json_pmtaani_agent_locations[i].id;
                     console.log(json_pmtaani_agent_locations[i].location+"-"+current_val);

                     if (current_pmtaani_agent_location==current_val) 
                     {
                          html_code = html_code + '<option value="' + json_pmtaani_agent_locations[i].id + '">' + json_pmtaani_agent_locations[i].agent_location + '</option>';

                     }

                           }

            

          
            $("#p_agent_location").html(html_code);


        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },
   /* agentLocationChanged:function()
    {
         current_val= $("#p_agent_location").val();
        app.MA3PARCEL.getItem('PARCEL_TRANSACTION').then(function(p_tranc) {
            var dat = JSON.parse(p_tranc);

             var json_pmtaani_agent_offices=dat.agent_offices;
            var locs=json_pmtaani_agent_offices.length;
             var html_code = "<option disabled selected>Choose Agent-</option>";
            for (var i = 0; i < locs; i++) {
              //   console.log(json_pmtaani_agent_offices[i].name);
                        office_location=json_pmtaani_agent_offices[i].agent_location;
                           if (office_location==current_val) 
                           {
                            html_code = html_code + '<option value="' + json_pmtaani_agent_offices[i].id + '">' + json_pmtaani_agent_offices[i].name + '</option>';
                           }
            }
          
            $("#p_agent_name").html(html_code);


        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    },*/
    toastIt:function(message,length,classes)
    {
        M.toast({html:message, displayLength:length, classes:classes});

    },
    processParcelDetails:function() {
        current_key=$(this).data('id');
        $(this).addClass("border_selected")
        var items= app.temp_sent_to_me;
        app.takeMeTo("#sent_to_me","#parcel_details");
        console.log(items[current_key].sender_name)
        $("#sender").text(items[current_key].sender_name);
        $("#description").text(items[current_key].parcel_description);
        $("#receipt_number").text(items[current_key].receipt_no);
        $("#sender").text(items[current_key].sender_name);
        $("#sender").text(items[current_key].sender_name);  
        $("#sender_phone").text(items[current_key].sender_phone);  
        $("#recipient").text(items[current_key].receiver_name);  
        $("#recipient_phone").text(items[current_key].receiver_phone);  
        $("#sent_from").text(items[current_key].sender_location);       
        $("#send_time").text(items[current_key].t_time);  
        $("#send_date").text(items[current_key].t_date);  
        $("#transaction_by").text(items[current_key].transaction_by);  
        $("#payment_mode").text(items[current_key].payment_mode);
        $("#amount").text(items[current_key].parcel_cost); 
    },
    takeMeTo:function(current_loc,next_loc){
    //window.scrollTo(0, 0); 
    //$(".answer_text").removeClass("choice_selected");
    
    $(current_loc).addClass('animate__animated animate__fadeOutLeft');
    $(current_loc).on('animationend webkitAnimationEnd oAnimationEnd', () => {
      $(current_loc).addClass("hidden");
      $(next_loc).removeClass("animate__animated animate__fadeOutLeft");     
      $(next_loc).removeClass("hidden");
      
      $(next_loc).addClass('animate__animated', 'animate__fadeInRight');
    });




},
goBack:function()
{
     app.takeMeTo("#parcel_details","#sent_to_me");
},
search: function() {      
        var search_term = $("#search_term").val();       
        var serialized = "search_term=" + search_term ;
        app.TIDS=[];
        $.ajax({
            type: "POST",
            url: app.LINK + "search.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                $('#get_loading').html('Searching <i class="fa fa-spin spin"></i>');

            },
            success: function(server_response) {
                $('#get_loading').html('Search <i class="fa fa-search"></i>');
                response = server_response.response;
                html_code = '';
                console.log(response);
                if (response == "success") {

                    count_i=0;
                    app.temp_sent_to_me=server_response.items;
                    for (var key in server_response.items) {

                        // id,sender_name,receiver_name, parcel_description, , 

                        sender_name = server_response.items[key].sender_name;
                        receiver_name = server_response.items[key].receiver_name;
                        parcel_description = server_response.items[key].parcel_description;
                        parcel_cost = server_response.items[key].parcel_cost;
                        receipt_no = server_response.items[key].receipt_no;
                        sender_location = server_response.items[key].sender_location;
                        id = server_response.items[key].id;
                        app.TIDS.push(id);
                         html_code = html_code + '<div data-id="'+key+'"  class="maleo-card p_sent_to_me maleo-event_list margin-bottom_low animated fadeInUp"><div id="p_' + id + '" class="event-date yellow"><span class="month">&nbsp;</span><span class="date">' + parcel_cost + '</span><span class="year">' + receipt_no + '</span></div><div class="event-content"><div class="event-name"><a href="#">' + parcel_description + '</a></div><div class="event-location"> <strong>From:</strong> ' + sender_location + '<br><strong>Sender:</strong> ' + sender_name + '<br> <strong>Recipient:</strong> ' + receiver_name + '</div></div></div>';
                        count_i++;
                    }
                    app.toastIt('Displaying Records for  ' + search_term, 2000, 'green accent-3');
                } 
                else if(response == "0")
                {
                    app.toastIt('No Records found for ' + search_term, 2000, 'red accent-2');
                    html_code = html_code + '<div class="load_div"><h5>No Records Found for ' + search_term + '</h5></div>';

                }

                else  {                   
                     app.toastIt('Unable to get data' + search_term, 2000, 'red accent-2');
                    html_code = html_code + '<div class="load_div"><h5>There was an issue trying to get the data' + search_term + '</h5></div>';
                }

                $("#loading").html(html_code);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    swal("Error", "There was a problem loading the data", "error");
                }
        });
    }




};


$('body').on('touchend', '#log_out', app.logOut);
$('body').on('touchend', '#print_btn', app.saveData);
$('body').on('touchend', '#download_data', app.fetchData);
$('body').on('touchend', '#get_totals', app.getTotals);
$('body').on('touchend', '#get_loading', app.getLoading);
$('body').on('touchend', '#search', app.search);
$('body').on('touchend', '#fetch_quota', app.fetchQuota);
$('body').on('touchend', '#synch_transactions', app.synchStart);
$('body').on('touchend', '#total_link', app.openParcels);
$('body').on('touchend', '#to_quotas', app.openQuotas);

$('body').on('touchend', '#parcel_link', app.openParcels);
$('body').on('touchend', '#printer_indicator', app.managePrinter);
$('body').on('touchend', '.p_sent_to_me', app.processParcelDetails);
$('body').on('touchend', '#print_loading', app.printLoading);
$('body').on('change', '#p_to', app.destinationChanged);
$('body').on('click', '#go_back_sent_to_me', app.goBack);
//$('body').on('change', '#p_agent_location', app.agentLocationChanged);
$( "#parcel_form" ).submit(function(event) { app.saveData; event.preventDefault();});
app.initialize();
app.isLoggedIn();

