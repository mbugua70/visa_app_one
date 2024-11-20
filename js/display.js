const selectEls = document.getElementById("sub_1_1");
const selectElsTwo = document.getElementById("sub_1_2");

const ownerOne = document.getElementById("display_yes_1");
const ownerTwo = document.getElementById("display_no");
const ownerThree = document.getElementById("display_2");
const ownerFour = document.getElementById("display_3");
selectEls.addEventListener(
  "input",
  function () {
    valueOne = $("#yes_1").val();


    if ($("#sub_1_1").val() !== "" || undefined) {
      if ($("#sub_1_1").val() === valueOne) {
        ownerOne.style.display = "block";
        ownerTwo.style.display = "none"
      } else {
        ownerOne.style.display = "none";
        ownerTwo.style.display = "block"
      }
    } else {
      ownerOne.style.display = "none";
      ownerTwo.style.display = "none"
    }
  },
  false
);


selectElsTwo.addEventListener(
  "input",
  function () {
    valueOne = $("#yes_1_a").val();


    if ($("#sub_1_2").val() !== "" || undefined) {
      if ($("#sub_1_2").val() === valueOne) {
        ownerThree.style.display = "block";
        ownerFour.style.display = "none"
      } else {
        ownerThree.style.display = "none";
        ownerFour.style.display = "block"
      }
    } else {
      ownerFour.style.display = "none";
      ownerThree.style.display = "none"
    }
  },
  false
);
