	 M.AutoInit();

	document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });


setTimeout(function(){
  app.prepareTraining();
},1000)

 
  


 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
   // var instances = M.Autocomplete.init(elems, options);
  });


  // Or with jQuery

//LINK="https://igurukenya.com/BAIMS/scripts/";
LINK= "https://igurukenya.com/VISA/UG/scripts/";

  $(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": null
      },
    });
  });
  

     function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        var canvas_id=$(input).data('id');
        var file=input.files[0];
 
         reader.onload = function (e) {
            //$('#'+x).attr('src', e.target.result);
             drawOnCanvas(file,canvas_id)
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(".fp").change(
  function()
  {
      readURL(this);
  }
);

$(".c1").click(function(e){
     var file_id=$(this).data('id');
     $("#"+file_id).click();
    e.preventDefault();
});

$(".c2").click(function(e){
     var file_id=$(this).data('id');
     $("#"+file_id).click();
    e.preventDefault();
});

$(".c3").click(function(e){
     var file_id=$(this).data('id');
     $("#"+file_id).click();
    e.preventDefault();
});


$(".c4").click(function(e){
     var file_id=$(this).data('id');
     $("#"+file_id).click();
    e.preventDefault();
});







   function drawOnCanvas(file,canvas_id) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataURL = e.target.result,
          c = document.getElementById(canvas_id), // see Example 4
          ctx = c.getContext('2d'),
          img = new Image();
 
      img.onload = function() 
      {
        $("#take_pic").html('<i class="fa fa-check fa-3x"></i><br>Selfie Taken').addClass('selfie_success');
        IMAGE_SET="yes";
        IMAGE_BLANK="NO";
        drawImageProp(ctx,img);
      };
 
      img.src = dataURL;
    };
 
    reader.readAsDataURL(file);
  }

  

 
  function displayAsImage(file) 
  {
    var imgURL = URL.createObjectURL(file),
     img = document.createElement('img');
 
    img.onload = function() 
    {
      URL.revokeObjectURL(imgURL);
    };
 
    img.src = imgURL;
    document.body.appendChild(img);
  }

  function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function clearCanvas()
{
ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



var trainee_count=0;
$("#add_trainee").click(function(e){
trainee_count++;
html_code='<tr id="row_'+trainee_count+'"><td>'+trainee_count+'<a class="remove_trainee " href="#" data-id="'+trainee_count+'" > remove</a></td><td><input name="t_p_name[]"  placeholder="Name" type="text"></td><td><input name="t_p_phone[]"  placeholder="Phone" type="tel"></td></tr>';    
$("#trained_people").append(html_code);
    e.preventDefault();
});

$('#trained_people').on('click', '.remove_trainee', function(){
     rowid=$(this).data('id');
     $("#row_"+rowid).remove();
    });


$('#training_btn').click(function(e) {

 //alert("hh")

 if (validateForm3 ()) 
 {

    var formData = new FormData();
    canvas_inside = document.getElementById("user_photo_1")
    canvas_outside = document.getElementById("user_photo_2")
    c_out=canvas_inside.toDataURL();
    c_in=canvas_outside.toDataURL();
    formData.append("inside", c_in);
    formData.append("outside", c_out);
names_arr=[];
    $('input[name^="t_p_name"]').each(function() {
    names_arr.push($(this).val());
});

    

phones_arr=[];
    $('input[name^="t_p_phone"]').each(function() {
    phones_arr.push($(this).val());
});

    formData.append("t_p_names", names_arr.join('***'));
    formData.append("t_p_phones", phones_arr.join('***'));
  
    outlet_name = $('#outlet_name').val();
    formData.append("outlet_name", outlet_name);
        

        merchant_name = $('#merchant_name').val();
        formData.append("merchant_name", merchant_name); 

        detailed_loc = $('#loc').val();
        formData.append("loc", detailed_loc);        
          
        training_time = $('#training_time').val();
        formData.append("training_time", training_time);
        training_date = $('#training_date').val();
        formData.append("training_date", training_date);

        rba_name=$('#rba_name').text();
         formData.append("rba_name", rba_name);
        rba_phone=$('#rba_phone').text();
         formData.append("rba_phone", rba_phone);
        rba_region=$('#rba_region').text();
         formData.append("rba_region", rba_region);


        number_trained = $('#number_trained').val();
         formData.append("number_trained", number_trained);


        acquirer = $('#acquirer').val();
         formData.append("acquirer", acquirer);
        number_of_staff = $('#number_of_staff').val();
         formData.append("number_of_staff", number_of_staff);

          payment_points = $('#payment_points').val();
         formData.append("payment_points", payment_points);

         contact_name = $('#contact_name').val();
         formData.append("contact_name", contact_name);


         contact_phone = $('#contact_phone').val();
         formData.append("contact_phone", contact_phone);


         contact_email = $('#contact_email').val();
         formData.append("contact_email", contact_email);

            longitude = $('#longitude').val();
         formData.append("longitude", longitude);

         latitude = $('#latitude').val();
         formData.append("latitude", latitude);


          comment = $('#comment').val();
         formData.append("comment", comment);

       //  = $('#tent_cards').val();
        formData.append("t_date", app.todayDate());
        
        formData.append("t_time", app.timeNow());
        formData.append("user_id", app.logged_in_user_id);
        formData.append("comment", $('#comment').val());


    $.ajax({
        type:'POST',
        url: LINK+'NT-TRAINING.php',
        data:formData,
        processData: false,
        contentType: false,
        beforeSend: function() {
      $("#training_btn").html('<i class="fa fa-spinner fa-spin fa-3x"></i> Sending...');
        console.log("Matana");
    },
        cache:false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success:function(data){

          res=data.response;
          if (res=="success") {
             $("#training_btn").html('<i class="fa fa-check-circle fa-3x"></i> Upload Details');
          swal({
      title: "Sent Successfully",
      text: "Thank You",
      icon: "success",
      });

          setTimeout(function(e){
            location.href="training.html";
          }, 2000)
          }
          else{
            console.log(data)
          }
       

        },
        error: function(data){
            console.log(data);
            swal({
            title: "Network Error, Please try again",
            text: "",
            icon: "error",
            });
            $("#training_btn").html('<i class="fa fa-upload fa-3x"></i> Upload');
        }
    });

 }
  
  

    e.preventDefault();

});


function validateForm3 ()
    {
        var shouldProceed=true;
        outlet_name = $('#outlet_name').val();
        training_date = $('#training_date').val();
        training_time = $('#training_time').val();
        merchant_name = $('#merchant_name').val();            
        detailed_loc = $('#loc').val();


        comment = $('#comment').val();

        //tent_cards = $('#tent_cards').val();


         if(!merchant_name)
        {
             app.appNotifier("Detailed Name  is required");
             $('#merchant_name').focus();
             shouldProceed=false;
        }
        if(!outlet_name)
        {
             app.appNotifier("Outlet Name  is required");
             $('#outlet_name').focus();
             shouldProceed=false;
        }
         if(!detailed_loc)
        {
             app.appNotifier("Detailed Loation  is required");
             $('#detailed_loc').focus();
             shouldProceed=false;
        }
        else if(!training_date)
        {
             app.appNotifier("Training Date is required");
             $('#training_date').focus();
             shouldProceed=false;
        }
         else if(!training_time)
        {
             app.appNotifier("Training Time is required");
             $('#training_time').focus();
             shouldProceed=false;
        }
       
       
        

    

    return shouldProceed;
    }
