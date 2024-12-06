var app = {
    // Application Constructor
    LINK: "https://igurukenya.com/VISA/UG/scripts/",
    // LINK: "scripts/",
    MA3PARCEL: localforage.createInstance({
        name: "MA3PARCEL"
    }),
    chars: "",
    current_location_id: "",
    isInternetConnected: 0,
    flashStore:window.localStorage,
    loadingSheet:"",
    TIDS:[],
    temp_sent_to_me:"",
    loggedInUser:"",
    dates:"",
    curr_merchant:"",
    curr_merchant_sub_type:"",
    logged_in_user_id:"",
    initialize: function() {
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
            console.log(dat)

            var name = dat.name;
            var stage = dat.stage;
            var LOG = dat.LOG;
            app.logged_in_user_id=dat.user_id;
            if (LOG == 1) {
                app.loggedInUser=name;
                app.logged_in_user_id=dat.user_id;
                app.dates=dat.dates;
                app.curr_merchant=dat.merchant;
                app.curr_merchant_sub_type=dat.merchant_sub_type;
                $("#profile_name").text(name);
                $("#home_name").text(name);

               // $("#profile_stage").text(stage);
            } else {
               app.toastIt('Please Log In', 2000, 'red accent-2');

                //location.href = "index.html";
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



            var json_outlets=dat.outlets;
            html_code="";

            for (var key in json_outlets) {
               // `name`, `phone_number`, `talk_to`, `designation`, `location`
                        name = json_outlets[key].name;
                        phone_number = json_outlets[key].phone_number;
                        talk_to = json_outlets[key].talk_to;
                        designation = json_outlets[key].designation;
                        loc = json_outlets[key].loc;
                        id = json_outlets[key].id;
                       // html_code = html_code + '<div data-id="'+key+'"  class="maleo-card p_sent_to_me maleo-event_list margin-bottom_low animated fadeInUp"><div id="p_' + id + '" class="event-date yellow"><span class="month">&nbsp;</span><span class="date">' + parcel_cost + '</span><span class="year">' + receipt_no + '</span></div><div class="event-content"><div class="event-name"><a href="#">' + parcel_description + '</a></div><div class="event-location"> <strong>From:</strong> ' + sender_location + '<br><strong>Sender:</strong> ' + sender_name + '<br> <strong>Recipient:</strong> ' + receiver_name + '</div></div></div>';
                        //count_i++;
                        html_code= html_code + '<div class="col s12 m6"><div class="card blue darken-4"><div class="card-content white-text"><span class="card-title">'+name+'</span>'+phone_number+'<br>'+talk_to+'<br>'+designation+'<br>'+loc+'</div>  <div class="card-action"> <div class="row"> <div class="col s6 m6"><a href="#" data-id="'+id+'" data-name="'+name+'" data-talkto="'+talk_to+'" data-loc="'+loc+'" data-phone_number="'+phone_number+'"  data-designation="'+designation+'" class="btn yellow darken-4 waves-effect waves-light calls">Calls</a></div> <div class="col s6 m6"><a href="#" data-id="'+id+'" data-name="'+name+'" data-talkto="'+talk_to+'" data-loc="'+loc+'" data-phone_number="'+phone_number+'"  data-designation="'+designation+'" class="btn btn-block pink waves-effect waves-light pre-pro">Pre Pro</a></div></div></div></div></div>';
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
           // serialized = "PD=" + JSON.stringify(Upload_object);
 var UPS=JSON.stringify(Upload_object);
           var UPS2="PD=" + UPS.replaceAll(/\\n/g, " ").replaceAll(/\\'/g, " ").replaceAll(/\\"/g, ' ').replaceAll(/\\&/g, " ").replaceAll(/\\r/g, " ").replaceAll(/\\t/g, " ")
.replaceAll(/\\b/g, " ").replaceAll(/\\f/g, " ").replaceAll("&","-");
          // .replace(/\\n/g, '')
           console.log(UPS2+"-----kkkkk");
          // UPS2.replace()

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
                   // app.updateStatus(success, 1);
                    //swal("")
                    swal("Calls Transaction Uploaded Sucessfully", "", "success");
                    app.toastIt('Transaction Uploaded Sucessfully', 2000, 'green accent-4');
                    console.log(server_response);
                } else {
                    console.log("ERR");
                }


            }
        });
    },

     tryAndUpload2: function(Upload_object) {
        serialized = "PD=" + JSON.stringify(Upload_object);
        $.ajax({
            type: "POST",
            url: app.LINK + "NT-PREPRO.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                //$('#bounce').show('fast');

            },
            success: function(server_response) {

                response = server_response.response;
                if (response == "success") {
                    success = server_response.success;
                   // app.updateStatus(success, 1);
                   swal("Pre-Pro Transaction Uploaded Sucessfully", "", "success");
                    app.toastIt('Transaction Uploaded Sucessfully', 2000, 'green accent-4');

                    setTimeout(function(args) {
                         location.reload();
                    }, 2000)

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

       // p_to = $('#p_to').val();
        designation = $('#designation').val();
        address = $('#address').val();
        landmark = $('#landmark').val();
        book_time = $('#book_time').val();
        book_date = $('#book_date').val();
        comment = $('#comment').val();


         if(!address)
        {
             app.appNotifier("Address  is required");
             $('#p_to').focus();
             shouldProceed=false;
        }
        else if(!landmark)
        {
             app.appNotifier("Landmark is required");
             $('#landmark').focus();
             shouldProceed=false;
        }
      /*  else if(p_agent_name==null || p_agent_name=="")
        {
             app.appNotifier("Destination Agent is required");
             $('#p_agent_name').focus();
             shouldProceed=false;
        }*/

        else if(!book_time)
        {
             app.appNotifier("Book Time is required");
             $('#book_time').focus();
             shouldProceed=false;
        }
        else if(!book_date)
        {
             app.appNotifier("Book Date is required");
             $('#book_date').focus();
             shouldProceed=false;
        }






    return shouldProceed;
    },
    validateForm2: function()
    {
        var shouldProceed=true;
        merchant_name = $('#merchant_name').val();
        outlet_name = $('#outlet_name').val();
        loc = $('#loc').val();
        number_of_tills = $('#number_of_tills').val();
        acquirer = $('#acquirer').val();
        number_of_staff = $('#number_of_staff').val();

        t_shaped_holder = $('#t_shaped_holder').val();
        tent_cards = $('#tent_cards').val();
        trifold_leaflet = $('#trifold_leaflet').val();
        a4_sticker = $('#a4_sticker').val();
        a5_sticker = $('#a5_sticker').val();
        till_sticker = $('#till_sticker').val();
        pdq_state = $('#pdq_state').val();
        training_date=$('#training_date').val();
        branding_date=$('#branding_date').val();

        comment = $('#comment').val();
        //tent_cards = $('#tent_cards').val();


         if(!merchant_name)
        {
             app.appNotifier("Merchant Name  is required");
             $('#merchant_name').focus();
             shouldProceed=false;
        }
        else if(!outlet_name)
        {
             app.appNotifier("Outlet Name is required");
             $('#outlet_name').focus();
             shouldProceed=false;
        }
         else if(!loc)
        {
             app.appNotifier("Location is required");
             $('#loc').focus();
             shouldProceed=false;
        }
        else if(!pdq_state)
        {
             app.appNotifier("PDQ state is required");
             $('#pdq_state').focus();
             shouldProceed=false;
        }






    return shouldProceed;
    },
    validateForm3: function()
    {
        var shouldProceed=true;
        merchant_name = $('#merchant_name').val();
        outlet_name = $('#outlet_name').val();
        loc = $('#loc').val();
        number_of_tills = $('#number_of_tills').val();
        acquirer = $('#acquirer').val();
        number_of_staff = $('#number_of_staff').val();

        t_shaped_holder = $('#t_shaped_holder').val();
        tent_cards = $('#tent_cards').val();
        trifold_leaflet = $('#trifold_leaflet').val();
        a4_sticker = $('#a4_sticker').val();
        a5_sticker = $('#a5_sticker').val();
        till_sticker = $('#till_sticker').val();
        pdq_state = $('#pdq_state').val();
        training_date=$('#training_date').val();
        branding_date=$('#branding_date').val();

        comment = $('#comment').val();
        //tent_cards = $('#tent_cards').val();


         if(!merchant_name)
        {
             app.appNotifier("Merchant Name  is required");
             $('#merchant_name').focus();
             shouldProceed=false;
        }
        else if(!outlet_name)
        {
             app.appNotifier("Outlet Name is required");
             $('#outlet_name').focus();
             shouldProceed=false;
        }
         else if(!loc)
        {
             app.appNotifier("Location is required");
             $('#loc').focus();
             shouldProceed=false;
        }







    return shouldProceed;
    },
    appNotifier:function(message){
        M.toast({html:message, displayLength:2000, classes:"red accent-3"});
    },
    saveData: function() {
            var formStatus=app.validateForm();
            if (formStatus)
            {

        designation = $('#designation').val();
        address = $('#address').val();
        landmark = $('#landmark').val();
        book_time = $('#book_time').val();
        book_date = $('#book_date').val();
        outlet_id = app.flashStore.getItem('OUTLET_ID');;
        comment = $('#comment').val();



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

            Upload_object.parcels.push({
                "book_date": book_date,
                "outlet": outlet_id,
                "comment": comment,
                "book_time": book_time,
                "user_id": user_id,
                "landmark": landmark,
                "address": address,
                "designation": designation,
                "t_date": t_date,
                "t_time": t_time
            });

            p_tranc.CID = nextCID;
            c_q = Number(quota_current);
            next_count = c_q + 1;
            p_tranc.quota_current = next_count;
            q_end = Number(quota_end);
            app.MA3PARCEL.setItem('PARCEL_TRANSACTION', JSON.stringify(p_tranc)).then(function(value) {
                str = "";

                app.tryAndUpload(Upload_object);
              //  $("#parcel_form")[0].reset();
               // app.checkQuotas();

            }).catch(function(err) {
                console.log(err);
            });


        }).catch(function(err) {
            console.log(err);
        });

    }//vorm validator




    },

    saveData2: function() {
            var formStatus=app.validateForm2();
            if (formStatus)
            {

         merchant_name = $('#merchant_name').val();
        outlet_name = $('#outlet_name').val();
        loc = $('#loc').val();
        number_of_tills = $('#number_of_tills').val();
        acquirer = $('#acquirer').val();
        number_of_staff = $('#number_of_staff').val();
        t_shaped_holder = $('#t_shaped_holder').val();
        tent_cards = $('#tent_cards').val();
        trifold_leaflet = $('#trifold_leaflet').val();
        a4_sticker = $('#a4_sticker').val();
        a5_sticker = $('#a5_sticker').val();
        till_sticker = $('#till_sticker').val();
        pdq_state = $('#pdq_state').val();
        training_date=$('#training_date').val();
        training_time=$('#branding_date').val();
        comment = $('#comment').val();
        rba_name=$('#rba_name').text();
        rba_phone=$('#rba_phone').text();
        rba_region=$('#rba_region').text();

      //  outlet_id = app.flashStore.getItem('OUTLET_ID');;
        //comment = $('#comment').val();




            var Upload_object = {
                parcels: []
            };
            t_time = app.timeNow();
            t_date = app.todayDate();


            Upload_object.parcels.push({
                "merchant_name": merchant_name,
                "number_of_staff": number_of_staff,
                "outlet_name": outlet_name,
                "comment": comment,
                "loc": loc,
                "number_of_tills": number_of_tills,
                "acquirer": acquirer,
                "number_of_staff": number_of_staff,
                "t_shaped_holder": t_shaped_holder,
                "tent_cards": tent_cards,
                "trifold_leaflet": trifold_leaflet,
                "a5_sticker": a5_sticker,
                "a4_sticker": a4_sticker,
                "till_sticker": till_sticker,
                "pdq_state": pdq_state,
                "training_date": training_date,
                "branding_date": branding_date,
                "t_date": t_date,
                "t_time": t_time,
                "user_name": rba_name,
                "user_phone": rba_phone,
                "user_region": rba_region
            });


            app.tryAndUpload2(Upload_object);





    }//vorm validator




    },

    saveData3: function() {
            var formStatus=app.validateForm3();
            if (formStatus)
            {

         merchant_name = $('#merchant_name').val();
        outlet_name = $('#outlet_name').val();
        loc = $('#loc').val();
        number_of_tills = $('#number_of_tills').val();
        acquirer = $('#acquirer').val();

        t_shaped_holder = $('#t_shaped_holder').val();
        tent_cards = $('#tent_cards').val();
        trifold_leaflet = $('#trifold_leaflet').val();
        a4_sticker = $('#a4_sticker').val();
        a5_sticker = $('#a5_sticker').val();
        till_sticker = $('#till_sticker').val();
        branding_done = $('#branding_done').val();
        training_date=$('#training_date').val();
        branding_date=$('#branding_date').val();
        comment = $('#comment').val();
        rba_name=$('#rba_name').text();
        rba_phone=$('#rba_phone').text();
        rba_region=$('#rba_region').text();

      //  outlet_id = app.flashStore.getItem('OUTLET_ID');;
        //comment = $('#comment').val();




            var Upload_object = {
                parcels: []
            };
            t_time = app.timeNow();
            t_date = app.todayDate();


            Upload_object.parcels.push({
                "merchant_name": merchant_name,
                "number_of_staff": number_of_staff,
                "outlet_name": outlet_name,
                "comment": comment,
                "loc": loc,
                "number_of_tills": number_of_tills,
                "acquirer": acquirer,
                "number_of_staff": number_of_staff,
                "t_shaped_holder": t_shaped_holder,
                "tent_cards": tent_cards,
                "trifold_leaflet": trifold_leaflet,
                "a5_sticker": a5_sticker,
                "a4_sticker": a4_sticker,
                "till_sticker": till_sticker,
                "pdq_state": pdq_state,
                "training_date": training_date,
                "branding_date": branding_date,
                "t_date": t_date,
                "t_time": t_time,
                "user_name": rba_name,
                "user_phone": rba_phone,
                "user_region": rba_region
            });


            app.tryAndUpload2(Upload_object);





    }//vorm validator




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


    checkInternetConnection: function() {
        var networkState = navigator.connection.type;

        if (networkState == Connection.NONE) {
            app.isInternetConnected = 0;
        } else {
            app.isInternetConnected = 0;
        }



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

   noAcceptance:function()
    {
       acceptance= $("#customer_win").val();
       if (acceptance=="Yes")
       {
        $("#item_won").show();
       }
       else
       {
         $("#item_won").hide();
       }
   },
    destinationChanged:function()
    {
       current_val= $("#merchant_type").val();

             var merchant_sub_type=app.curr_merchant_sub_type;
            var locs=merchant_sub_type.length;
             var html_code = "<option disabled selected>Choose Sub Merchant</option>";
            for (var i = 0; i < locs; i++) {
                    sub_name=merchant_sub_type[i].sub_name;
                     sub_id=merchant_sub_type[i].id;
                     sub_merch=merchant_sub_type[i].merchant;
                    // console.log(json_pmtaani_agent_locations[i].location+"-"+current_val);

                     if (sub_merch==current_val)
                     {
                          html_code = html_code + '<option value="' + sub_id+ '">' + sub_name + '</option>';

                     }

                           }




            $("#merchant_sub_type").html(html_code);



    },

    toastIt:function(message,length,classes)
    {
        M.toast({html:message, displayLength:length, classes:classes});

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

loadCalls:function(){
        outlet_name=$(this).data('name');
        outlet_id=$(this).data('id');
        talkto=$(this).data('talkto');
        loc=$(this).data('loc');
        designation=$(this).data('designation');
        phone_number=$(this).data('phone_number');
        //data-talkto="'+talk_to+'" data-loc="'+loc+'" data-phone_number="'+phone_number+'"  data-designation="'+designation+'"
        app.flashStore.setItem('OUTLET_NAME', outlet_name);
        app.flashStore.setItem('OUTLET_ID', outlet_id);
        app.flashStore.setItem('talkto', talkto);
        app.flashStore.setItem('loc', loc);
        app.flashStore.setItem('designation', designation);
        app.flashStore.setItem('phone_number', phone_number);

        location.href="calls.html";
    },

loadPrepro:function(){
        outlet_name=$(this).data('name');
        outlet_id=$(this).data('id');
        talkto=$(this).data('talkto');
        loc=$(this).data('loc');
        designation=$(this).data('designation');
        phone_number=$(this).data('phone_number');
        app.flashStore.setItem('OUTLET_NAME', outlet_name);
        app.flashStore.setItem('OUTLET_ID', outlet_id);
        app.flashStore.setItem('talkto', talkto);
        app.flashStore.setItem('loc', loc);
        app.flashStore.setItem('designation', designation);
        app.flashStore.setItem('phone_number', phone_number);
        location.href="pre-pro.html";
    },


loadTraining:function(){
        outlet_name=$(this).data('name');
        outlet_id=$(this).data('id');
        talkto=$(this).data('talkto');
        loc=$(this).data('loc');
        designation=$(this).data('designation');
        phone_number=$(this).data('phone_number');
        app.flashStore.setItem('OUTLET_NAME', outlet_name);
        app.flashStore.setItem('OUTLET_ID', outlet_id);
        app.flashStore.setItem('talkto', talkto);
        app.flashStore.setItem('loc', loc);
        app.flashStore.setItem('designation', designation);
        app.flashStore.setItem('phone_number', phone_number);
        location.href="training.html";
    },

prepareTraining:function(){

        var c_outlet_name=app.flashStore.getItem('OUTLET_NAME');
        var c_outlet_id=app.flashStore.getItem('OUTLET_ID');
        var talkto=app.flashStore.getItem('talkto');
        var loc=app.flashStore.getItem('loc');
        var designation=app.flashStore.getItem('designation');
        var phone_number=app.flashStore.getItem('phone_number');


        $("#OUTLET_NAME").text(c_outlet_name);
        $("#OUTLET_ID").text(c_outlet_id);
        $("#outlet_id_1").val(c_outlet_id);
        $("#talkto").text(talkto);
        $("#loc_").text(loc);
        $("#designation_").text(designation);
        $("#phone_number").text(phone_number);


       // $("#OUTLET_NAME").text(c_outlet_name);

      //  app.preProDetails(c_outlet_id)

    },
    preparePrePro:function(){

        var c_outlet_name=app.flashStore.getItem('OUTLET_NAME');
        var c_outlet_id=app.flashStore.getItem('OUTLET_ID');
        var talkto=app.flashStore.getItem('talkto');
        var loc=app.flashStore.getItem('loc');
        var designation=app.flashStore.getItem('designation');
        var phone_number=app.flashStore.getItem('phone_number');
 var html_code = '<option disabled value="" selected>Choose Merchant</option>';

        for (var key in app.curr_merchant) {
               // `name`, `phone_number`, `talk_to`, `designation`, `location`
                        name = app.curr_merchant[key].name;
                        id = app.curr_merchant[key].id;
            html_code = html_code + "<option value=" + id + ">" + name + "</option>";
                    }

                    $("#merchant_type").html(html_code);


        $("#OUTLET_NAME").text(c_outlet_name);
        $("#OUTLET_ID").text(c_outlet_id);
        $("#talkto").text(talkto);
        $("#loc_").text(loc);
        $("#designation_").text(designation);
        $("#phone_number").text(phone_number);
       // $("#OUTLET_NAME").text(c_outlet_name);

        app.preProDetails(c_outlet_id)

    },
    callClick:function()
    {
outlet=app.flashStore.getItem('OUTLET_ID');
app.outletDetails(outlet)
    },
    callClick2:function()
    {
outlet=app.flashStore.getItem('OUTLET_ID');
app.preProDetails(outlet)
    },

    preProDetails: function(outlet) {
        var serialized = "outlet=" + outlet+"&team_leader="+app.logged_in_user_id ;

        $.ajax({
            type: "POST",
            url: app.LINK + "fetchPrepro.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                $('#load_pp').html('<i class="fa fa-spinner fa-spin"></i> Fetching...');

            },
            success: function(server_response) {
               // $('#get_loading').text("Loading Sheet");
                $('#load_pp').html('<i class="fa fa-refresh"></i> Load Details');
                response = server_response.response;
                html_code = '';
                if (response == "success") {

      // `team_leader_id`, `outlet_id`, `physical_address`, ``, ``, ``, ``,
                  //  app.temp_sent_to_me=server_response.physical_address;
                  str=server_response.items[0];



     $('#merchant_type').val(str.merchant_type);

     var merchant_sub_type=app.curr_merchant_sub_type;
            var locs=merchant_sub_type.length;
             var html_code = "<option disabled selected>Choose Sub Merchant</option>";
            for (var i = 0; i < locs; i++) {
                    sub_name=merchant_sub_type[i].sub_name;
                     sub_id=merchant_sub_type[i].id;
                     sub_merch=merchant_sub_type[i].merchant;
                    // console.log(json_pmtaani_agent_locations[i].location+"-"+current_val);

                     if (sub_merch==str.merchant_type)
                     {
                          html_code = html_code + '<option value="' + sub_id+ '">' + sub_name + '</option>';

                     }

                           }

            $("#merchant_sub_type").html(html_code);

     $('#merchant_sub_type').val(str.merchant_sub_type);
     $('#loc').val(str.loc);
     $('#bill_holder_sticker').val(str.bill_holder_sticker);
     $('#snapper_frames').val(str.snapper_frames);
     $('#trifold_leaflet').val(str.trifold_leaflet);
     $('#a4_sticker').val(str.a4_sticker);
     $('#till_sticker').val(str.till_sticker);
     $('#face_mask').val(str.face_mask);
     $('#face_shield').val(str.face_shield);
     $('#shopping_bag').val(str.shopping_bag);
     $('#roll_up_banner').val(str.roll_up_banner);
     $('#security_barrier_branding').val(str.security_barrier_branding);
     $('#t_shirts').val(str.t_shirts);
     $('#menu_sticker').val(str.menu_sticker);
     $('#acceptance').val(str.acceptance);

     if(str.acceptance=="No")
     {
         $("#reason_holder").show();
     }
     $('#prompt_pay').val(str.prompt_pay);
     $('#true_money').val(str.true_money);
     $('#union_pay').val(str.union_pay);
     $('#comment').val(str.comment)





                 app.toastIt('Displaying Fetched Data', 2000, 'green accent-3');

                }
                else if(response == "0")
                {
                     $('#load_pp').html('<i class="fa fa-refresh"></i> Load Details');

                    app.toastIt('No Records found ', 2000, 'red accent-2');

                }

                else  {
                     $('#load_pp').html('<i class="fa fa-refresh"></i> Load Details');


                  //   app.toastIt('Unable to get data' + date_selected, 2000, 'red accent-2');

  html_code = html_code + '<div class="load_div card-panel red "><span class="white-text"><h6>There was an issue trying to get the data </h6></span></div>';

                  // html_code = html_code + '<div class="load_div"><h5>There was an issue trying to get the data' + unsanitized_date + '</h5></div>';
                }

                $("#to_be_collected").html(html_code);
            }
            ,
                error: function(jqXHR, textStatus, errorThrown) {

                   // $('#get_loading').text('Loading Sheet');
                    swal("Error", "Could not load data", "error");
                }
        });
    },
     outletDetails: function(outlet) {
        var serialized = "outlet=" + outlet+"&team_leader="+app.logged_in_user_id ;

        $.ajax({
            type: "POST",
            url: app.LINK + "fetchCalls.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                $('#load_parcels').html('<i class="fa fa-spinner fa-spin"></i> Fetching...');

            },
            success: function(server_response) {
               // $('#get_loading').text("Loading Sheet");
                $('#load_parcels').html('<i class="fa fa-refresh"></i> Load Details');
                response = server_response.response;
                html_code = '';
                if (response == "success") {

      // `team_leader_id`, `outlet_id`, `physical_address`, ``, ``, ``, ``,
                  //  app.temp_sent_to_me=server_response.physical_address;
                  str=server_response.items[0];

                      $('#designation').val(str.designation);
         $('#address').val(str.physical_address);
         $('#landmark').val(str.landmarks);
        $('#book_time').val(str.book_time);
         $('#book_date').val(str.book_date);
        $('#comment').val(str.comment);



                 app.toastIt('Displaying Fetched Data', 2000, 'green accent-3');

                }
                else if(response == "0")
                {
                     $('#load_parcels').html('<i class="fa fa-refresh"></i> Load Details');

                    app.toastIt('No Records found ', 2000, 'red accent-2');

                }

                else  {
                     $('#load_parcels').html('<i class="fa fa-refresh"></i> Load Details');


                  //   app.toastIt('Unable to get data' + date_selected, 2000, 'red accent-2');

  html_code = html_code + '<div class="load_div card-panel red "><span class="white-text"><h6>There was an issue trying to get the data </h6></span></div>';

                  // html_code = html_code + '<div class="load_div"><h5>There was an issue trying to get the data' + unsanitized_date + '</h5></div>';
                }

                $("#to_be_collected").html(html_code);
            }
            ,
                error: function(jqXHR, textStatus, errorThrown) {

                   // $('#get_loading').text('Loading Sheet');
                    swal("Error", "Could not load data", "error");
                }
        });
    },


    prepareCalls:function(){

        var c_outlet_name=app.flashStore.getItem('OUTLET_NAME');
        var c_outlet_id=app.flashStore.getItem('OUTLET_ID');
        var talkto=app.flashStore.getItem('talkto');
        var loc=app.flashStore.getItem('loc');
        var designation=app.flashStore.getItem('designation');
        var phone_number=app.flashStore.getItem('phone_number');
 var html_code = '<option disabled value="" selected>Choose Date</option>';

        for (var key in app.dates) {
               // `name`, `phone_number`, `talk_to`, `designation`, `location`
                        date_time = app.dates[key].date_time;
                      html_code = html_code + "<option value=" + date_time + ">" + date_time + "</option>";


                      //  html_code= html_code + '<div class="col s12 m6"><div class="card blue darken-4"><div class="card-content white-text"><span class="card-title">'+name+'</span>'+phone_number+'<br>'+talk_to+'<br>'+designation+'<br>'+loc+'</div>  <div class="card-action"> <div class="row"> <div class="col s6 m6"><a href="#" data-id="'+id+'" data-name="'+name+'" data-talkto="'+talk_to+'" data-loc="'+loc+'" data-phone_number="'+phone_number+'"  data-designation="'+designation+'" class="btn yellow darken-4 waves-effect waves-light calls">Calls</a></div> <div class="col s6 m6"><a href="#" data-id="'+id+'" data-name="'+name+'" data-talkto="'+talk_to+'" data-loc="'+loc+'" data-phone_number="'+phone_number+'"  data-designation="'+designation+'" class="btn btn-block pink waves-effect waves-light pre-pro">Pre Pro</a></div></div></div></div></div>';
                    }

                    $("#book_date").html(html_code);


        $("#OUTLET_NAME").text(c_outlet_name);
        $("#OUTLET_ID").text(c_outlet_id);
        $("#talkto").text(talkto);
        $("#loc").text(loc);
        $("#designation_").text(designation);
        $("#phone_number").text(phone_number);
       // $("#OUTLET_NAME").text(c_outlet_name);

        app.outletDetails(c_outlet_id)

    },



    outletDetails: function(outlet) {
        var serialized = "outlet=" + outlet+"&team_leader="+app.logged_in_user_id ;

        $.ajax({
            type: "POST",
            url: app.LINK + "fetchCalls.php",
            data: serialized,
            dataType: 'json',
            beforeSend: function() {
                $('#load_parcels').html('<i class="fa fa-spinner fa-spin"></i> Fetching...');

            },
            success: function(server_response) {
               // $('#get_loading').text("Loading Sheet");
                $('#load_parcels').html('<i class="fa fa-refresh"></i> Load Details');
                response = server_response.response;
                html_code = '';
                if (response == "success") {

      // `team_leader_id`, `outlet_id`, `physical_address`, ``, ``, ``, ``,
                  //  app.temp_sent_to_me=server_response.physical_address;
                  str=server_response.items[0];

                      $('#designation').val(str.designation);
         $('#address').val(str.physical_address);
         $('#landmark').val(str.landmarks);
        $('#book_time').val(str.book_time);
         $('#book_date').val(str.book_date);
        $('#comment').val(str.comment);



                 app.toastIt('Displaying Fetched Data', 2000, 'green accent-3');

                }
                else if(response == "0")
                {
                     $('#load_parcels').html('<i class="fa fa-refresh"></i> Load Details');

                    app.toastIt('No Records found ', 2000, 'red accent-2');

                }

                else  {
                     $('#load_parcels').html('<i class="fa fa-refresh"></i> Load Details');


                  //   app.toastIt('Unable to get data' + date_selected, 2000, 'red accent-2');

  html_code = html_code + '<div class="load_div card-panel red "><span class="white-text"><h6>There was an issue trying to get the data </h6></span></div>';

                  // html_code = html_code + '<div class="load_div"><h5>There was an issue trying to get the data' + unsanitized_date + '</h5></div>';
                }

                $("#to_be_collected").html(html_code);
            }
            ,
                error: function(jqXHR, textStatus, errorThrown) {

                   // $('#get_loading').text('Loading Sheet');
                    swal("Error", "Could not load data", "error");
                }
        });
    },

    getOutletDetails:function(){
        var c_outlet_name=app.flashStore.getItem('OUTLET_NAME');
        var c_outlet_id=app.flashStore.getItem('OUTLET_ID');
        //$("#c_agent_name").text(c_outlet_name);
        app.riderToCollect(c_outlet_id)




    },
      prefill:function()
    {

         name= app.flashStore.getItem("name");
          phone=app.flashStore.getItem("phone");
          region=app.flashStore.getItem("region");
      if (!name||!phone||!region)
      {
        swal("Please Register","URegister to send Data","error")
        setTimeout(function(){
          location.href="registration.html";
        },2000)
      }
      else
      {

          $("#ba_name").val(name);
          $("#ba_phone").val(phone);
          $("#ba_region").val(region);


          $("#rba_name").text(name);
          $("#rba_phone").text(phone);
          $("#rba_region").text(region);
      }



    },

    searchValues: function() {



            search_term = $("#search_term").val()


            data = "search_term=" + search_term ;
            $.ajax({
                type: "POST",
                url: app.LINK + "searchOutlet.php",
                data: data,
                dataType: 'json',
                timeout:10000,


                beforeSend: function() {
                    $('#search').addClass('loading');
                    $("#search").attr("disabled", "disabled");
                    $('#search').text('Searching...');

                },
                success: function(server_response, textStatus, jqXHR) {
                    console.log(textStatus + ": " + jqXHR.status);

                    $("#search").removeClass("loading");
                    $("#search").removeAttr("disabled");

                    response = server_response.response;
                    console.log(response);
                    if (response == 'success') {
                        $('#search').text('Search');
                        outlets2 = server_response.outlets;

                        var json_outlets=outlets2;
            html_code="";

            for (var key in json_outlets) {
               // `name`, `phone_number`, `talk_to`, `designation`, `location`
                        name = json_outlets[key].name;
                        acquirer = json_outlets[key].acquirer;
                        talk_to = json_outlets[key].talk_to;
                        designation = json_outlets[key].designation;
                        loc = json_outlets[key].loc;
                        id = json_outlets[key].id;
                       // html_code = html_code + '<div data-id="'+key+'"  class="maleo-card p_sent_to_me maleo-event_list margin-bottom_low animated fadeInUp"><div id="p_' + id + '" class="event-date yellow"><span class="month">&nbsp;</span><span class="date">' + parcel_cost + '</span><span class="year">' + receipt_no + '</span></div><div class="event-content"><div class="event-name"><a href="#">' + parcel_description + '</a></div><div class="event-location"> <strong>From:</strong> ' + sender_location + '<br><strong>Sender:</strong> ' + sender_name + '<br> <strong>Recipient:</strong> ' + receiver_name + '</div></div></div>';
                        //count_i++;
                        html_code= html_code + '<div class="col s12 m6"><div class="card blue-grey darken-4"><div class="card-content white-text"><span class="card-title">'+name+'</span>'+loc+'<br>'+acquirer+'</div>  <div class="card-action"> <div class="row"> <div class="col s12 m12"><a href="#" data-id="'+id+'" data-name="'+name+'" data-acquirer="'+talk_to+'" data-loc="'+loc+'" data-phone_number="'+0+'"  data-designation="'+0+'" class="btn btn-block teal waves-effect waves-light training">Branding</a> </div></div></div></div></div>';
                    }


            $("#display_outlet_content").html(html_code);


                    } else if (response == 'fail') {
                        $('#search').text('Search');
                        swal("No Matches found", "", "error");
                    } else if (response == 'deactivated') {
                        $('#login_button').text('Login');
                      //  swal("Account Not Active", "Your Account is not Active, Please cotact Admin", "error");
                    } else {
                        $('#login_button').text('Login');
                      //  swal("Something went wrong ", "We have a small issue on our end. Please try again later " + response, "error");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#search").removeClass("loading");
                        $("#search").removeAttr("disabled");
                        $('#search').text('Search');
                    if (textStatus=="timeout") {
                        swal("Timeout", "Took too long to reach the server", "error");
                    }
                    else
                    {

                        swal("Error", "Could not connect to the server", "error");
                    }

                }

            });



    },
    getLoc:function(){
navigator.geolocation.getCurrentPosition(app.locSuccess, app.locError);
    },
locSuccess:function(position)
{
    $("#latitude").val(position.coords.latitude);
    $("#longitude").val(position.coords.longitude);


},
locError:function()
{
    $("#latitude").val(error.code);
    $("#longitude").val(error.message);

},
    registerBA: function() {
            var formStatus=app.validateForm3();
            if (formStatus)
            {

        name = $('#ba_name').val();
        phone = $('#ba_phone').val();
        region = $('#ba_region').val();


          app.flashStore.setItem("name", name);
          app.flashStore.setItem("phone", phone);
          app.flashStore.setItem("region", region);


swal("Registration Successfull","You have been registered successfully","success")
        setTimeout(function(){
          location.href="index.html";
        },2000)




    }//vorm validator




    },
     validateForm3: function()
    {
        var shouldProceed=true;
        name = $('#ba_name').val();
        phone = $('#ba_phone').val();
        region = $('#ba_region').val();



         if(!name)
        {
             app.appNotifier("Your name is required");
             $('#name').focus();
             shouldProceed=false;
        }
        else if(!phone)
        {
             app.appNotifier("Your Phone Number is required");
             $('#phone').focus();
             shouldProceed=false;
        }

        else if(!region)
        {
             app.appNotifier("Region is required");
             $('#region').focus();
             shouldProceed=false;
        }

    return shouldProceed;
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

$('body').on('click', '#log_out', app.logOut);
$('body').on('click', '#print_btn', app.saveData);
$('body').on('click', '#pre_pro', app.saveData2);
$('body').on('click', '#brading_btn', app.saveData3);

$('body').on('click', '#synch_transactions', app.synchStart);
$('body').on('click', '#total_link', app.openParcels);
$('body').on('click', '#load_parcels', app.callClick);
$('body').on('click', '#load_pp', app.callClick2);
$('body').on('click', '#search', app.searchValues);
$('body').on('change', '#merchant_type', app.destinationChanged);
$('body').on('click', '#register_btn', app.registerBA);
$('body').on('change', '#customer_win', app.noAcceptance);

$('body').on('click', '#go_back_sent_to_me', app.goBack);
$('body').on('click', '.calls', app.loadCalls);
$('body').on('click', '.pre-pro', app.loadPrepro);
$('body').on('click', '.training', app.loadTraining);
$('body').on('click', '#fetchLoc', app.getLoc);


//$('body').on('change', '#p_agent_location', app.agentLocationChanged);
$( "#parcel_form" ).submit(function(event) { app.saveData; event.preventDefault();});
app.initialize();
//app.isLoggedIn();
