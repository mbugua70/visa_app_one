$(function () {
    const $btnLocation = $("#btn_location");
    const btnLoca = document.querySelector("#btn_location");
    $btnLocation.on("click", function (e) {
      e.preventDefault();

      if (navigator.geolocation) {
        var shouldProceed = true;
        navigator.geolocation.getCurrentPosition(showPosition, locationError);
      } else {
        appLocationNotifier("Sorry we can't locate your locacation");
        shouldProceed = false;
      }
    });

    const showPosition = (position) => {
      $("#preloader_one").css("display", "inline-block");
      setTimeout(() => {
        $("#latitude").val(position.coords.latitude);
        $("#longitude").val(position.coords.longitude);
        btnLoca.textContent = "";
        $btnLocation.append('<i class="material-icons location_icon">check</i>');
      }, 2000);

      // checkLocation();
    };

    const locationError = () => {
      swal({
        title: "Unable to retrieve your location!",
        text: "",
        icon: "error",
      });
    };

    locationStore = window.localStorage;
    // const checkLocation = () => {
    //   longitude = flashStore.getItem("longitude");
    //   latitude = flashStore.getItem("latitude");
    //   if (!longitude && !latitude) {
    //     btnLoca.textContent = "LOADED";
    //     $btnLocation.append('<i class="material-icons location_icon">check</i>');
    //   }
    // };
  });
