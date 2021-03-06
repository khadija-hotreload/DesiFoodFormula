//DATABASE INSTANCE

const firebaseConfig = {
  apiKey: "AIzaSyCJqiGG0RkCOgLjW_CVzd4D4ADxNOf-hrQ",
  authDomain: "desifoodformula.firebaseapp.com",
  databaseURL: "https://desifoodformula.firebaseio.com",
  projectId: "desifoodformula",
  storageBucket: "desifoodformula.appspot.com",
  messagingSenderId: "491407610363",
  appId: "1:491407610363:web:35ac62200d4cdfa252fb5e",
  measurementId: "G-2LL6X1QNLB"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


//Logged In NAV BAR
var db = firebase.firestore();

var vOneLS = localStorage.getItem("uid");

db.collection("users").doc(vOneLS)
  .onSnapshot(function (doc) {

    $('#btnGroupDrop1').html(doc.data().username);

  });

var uid = localStorage.getItem("uid");
db.collection("userFav").where('uid', '==', uid)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc1) {


      db.collection("menu").doc(doc1.data().recipeId)
        .get()
        .then(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var htmlString = ' <div class="card recipeCard col-lg-3 col-md-4 col-sm-6" id="recipeCardsIndex" ><img id= "mainImage" class="img-fluid img-thumbnail"   src= "' + doc.data().image + '"  ><div class="card-body"><h5 class="card-title"> ' + capitalizeFirstLetter(doc.data().name) + '   </h5><p class="card-text"> ' + capitalizeFirstLetter(doc.data().description) + '</p><a  class="btn btn-outline-info checkButton"  id= "' + doc.id + '" >See More</a> <a  class="btn btn-outline-danger checkButton2"  id= "' + doc1.id + '" >Delete</a> </div></div> '
            $("#recipeCards").append(htmlString);


         
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);  
        });



    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });






//First letter capital
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//To remove from favorite
$(document).on("click", ".checkButton2", function () {
  var foodId = $(this).attr("id");

  db.collection("userFav").doc(foodId).delete().then(function () {
    console.log("Document successfully deleted!");
    alert("Removed From Favorite");
    window.location.href = 'favorite.html';


  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });

  $('#' + foodId).remove();

});



$(document).on("click", ".checkButton", function () {
  var foodId = $(this).attr("id");

  localStorage.setItem("foodId", foodId);

  if (localStorage.getItem("foodId") != null) {
    window.location.href = 'recipe.html';

  }

});


(".nav-logo").click(function () {

  var checkLogin = localStorage.getItem("uid");



  if (checkLogin != "null") {

    window.location.href = 'homeAfterLogin.html';

  }

  else {
    window.location.href = 'index.html';

  }

});