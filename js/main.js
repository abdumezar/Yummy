let darkMode = false;
let countryImgMode = 'images/breakfast-light.png', ingredImgMode = 'images/baking-light.png';

$(document).ready(async function () {
  $(".loadingLayer").css("display", "flex");
  let MealsJSONMain = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
  displayAllMeals(MealsJSONMain);
  $(".loadingLayer").css("display", "none");
});

$('#MainSec').click(async function (e) {
  if ($(e.target).attr('meal-id') != undefined) {
    $(".loadingLayer").css("display", "flex");
    let currentMealID = $(e.target).attr('meal-id');
    let currentMeal = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentMealID}`)).json();
    dispalyMealDetailed(currentMeal);
    $(".loadingLayer").css("display", "none");
  }
  if ($(e.target).attr('category') != undefined) {
    $(".loadingLayer").css("display", "flex");
    let currentCategoryName = $(e.target).attr('category');
    let currentCategory = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategoryName}`)).json();
    displayAllMeals(currentCategory);
    $(".loadingLayer").css("display", "none");
  }
  if ($(e.target).attr('country') != undefined) {
    $(".loadingLayer").css("display", "flex");
    let currentCountryName = $(e.target).attr('country');
    let currentCountry = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentCountryName}`)).json();
    displayAllMeals(currentCountry);
    $(".loadingLayer").css("display", "none");
  }
  if ($(e.target).attr('ingred') != undefined) {
    $(".loadingLayer").css("display", "flex");
    let currentIngredName = $(e.target).attr('ingred');
    let currentIngredJSON = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${currentIngredName}`)).json();
    displayAllMeals(currentIngredJSON);
    $(".loadingLayer").css("display", "none");
  }
});

$('.menu_bar img, #home ').click(async function () {
  $(".loadingLayer").css("display", "flex");
  closeNav();
  let MealsJSONMain = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
  displayAllMeals(MealsJSONMain);
  $(".loadingLayer").css("display", "none");
})

$('.fa-bars').click(openNav);

$('.fa-xmark').click(closeNav);

$('#search').click(function () {
  closeNav();
  searchBoxEmpty();
  $('.searchRow').css("display", "flex"); ///////////////////////none other/////////////////////////////////////////

  $("#floatingInputSearchletter").keyup(async function () {
    $(".loadingLayer").css("display", "flex");
    if (this.value.length == 0) {
      $(".loadingLayer").css("display", "none");
    }
    else {
      this.value = this.value[0];
      console.log(this.value)
      let MealsJSONLetter = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.value}`)).json();
      displayAllMeals(MealsJSONLetter);
      $(".loadingLayer").css("display", "none");
    }
  });

  $("#floatingInputSearchName").keyup(async function () {
    $(".loadingLayer").css("display", "flex");
    let MealsJSONName = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`)).json();
    displayAllMeals(MealsJSONName);
    $(".loadingLayer").css("display", "none");
  });
});

$('#categories').click(async function () {
  $('.searchRow').css("display", "none");
  closeNav();
  $(".loadingLayer").css("display", "flex");
  let CategoJSON = await (await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json();
  displayAllCategories(CategoJSON);
  $(".loadingLayer").hide();
});

$('#area').click(async function () {
  $('.searchRow').css("display", "none");
  closeNav();
  $(".loadingLayer").css("display", "flex");
  let CountryJSON = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)).json();
  displayCountries(CountryJSON);
  $(".loadingLayer").hide();
});

$('#ingred').click(async function () {
  $('.searchRow').css("display", "none");
  closeNav();
  $(".loadingLayer").css("display", "flex");
  let IngredientsJSON = await (await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)).json();
  displayIngredients(IngredientsJSON);
  $(".loadingLayer").hide();
});

$('#contact').click(function () {
  $('.searchRow').css("display", "none");
  $(".loadingLayer").css("display", "flex");
  closeNav();
  displayContactForm();
  $(".loadingLayer").hide();
})

function displayAllMeals(MEALs_JSON) {
  let finalCode = "";
  if (MEALs_JSON == undefined || MEALs_JSON.meals == null) {
    finalCode = `
    <div class="d-flex justify-content-center align-items-center mt-5 pt-5">
      <h3 class="fs-1 text-muted d-block">Please search for another letter!</h3>
    </div>
    `
  } else {
    let counter = 0;
    MEALs_JSON.meals.length < 20 ? counter = MEALs_JSON.meals.length : counter = 20;
    let myCode = "";
    for (let i = 0; i < counter; i++) {
      myCode += `
      <div class="col-md-6 col-lg-3">
        <div class="meal" meal-id="${MEALs_JSON.meals[i].idMeal}">
          <img src="${MEALs_JSON.meals[i].strMealThumb}" class="w-100" meal-id="${MEALs_JSON.meals[i].idMeal}"/>
          <div class="mealLayer" meal-id="${MEALs_JSON.meals[i].idMeal}">
            <h5 meal-id="${MEALs_JSON.meals[i].idMeal}">${MEALs_JSON.meals[i].strMeal}</h5>
          </div>
        </div>
      </div>
      `;
    }
    finalCode = `<div class="row g-5">${myCode}</div>`
  }

  $('#MainSec').html(finalCode);
}

function displayAllCategories(Catego_JSON) {
  let myCode = "";
  for (let i = 0; i < Catego_JSON.categories.length; i++) {
    myCode += `
    <div class="col-md-6 col-lg-3">
      <div class="category" category="${Catego_JSON.categories[i].strCategory}">
        <img src="${Catego_JSON.categories[i].strCategoryThumb}" class="w-100" category="${Catego_JSON.categories[i].strCategory}"/>
        <div class="categoryLayer" category="${Catego_JSON.categories[i].strCategory}">
          <h5 category="${Catego_JSON.categories[i].strCategory}">${Catego_JSON.categories[i].strCategory}</h5>
          <p category="${Catego_JSON.categories[i].strCategory}">${Catego_JSON.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>
    </div>
    `;
  }
  finalCode = `<div class="row g-5">${myCode}</div>`
  $('#MainSec').html(finalCode);
}

function searchBoxEmpty() {
  let finalCode = `
  <div class="d-flex justify-content-center align-items-center mt-5 pt-5">
    <h3 class="fs-1 text-muted d-block">Please fill search box!</h3>
  </div>
  `
  $('#MainSec').html(finalCode);
}

function closeNav() {
  $('.navBar').animate({ left: "-250px" }, 500);
  $('.fa-xmark').fadeOut(25, function () {
    $('.fa-bars').fadeIn(25);
  });
  // added to jQuery file manualy
  $('nav ul li').animateTransform("translateY(500%)", 750);
}

function openNav() {
  $('.navBar').animate({ left: "0" }, 500);
  $('.fa-bars').fadeOut(25, function () {
    $('.fa-xmark').fadeIn(25);
  });
  // added to jQuery file manualy
  $('nav ul li').animateTransform("translateY(0)", 750);
}

function dispalyMealDetailed(currentMeal) {
  let ingredMap = new Map(Object.entries(currentMeal.meals[0]));
  const values = [...ingredMap.values()];
  let ingredCode = "", tagsCode = "";
  for (let i = 9; i < 48; i++) {
    if (values[i] != null && values[i] != "" && i < 28) {
      ingredCode += `<span>${values[i + 20]} ${values[i]}</span>`
    }
  }
  if (currentMeal.meals[0].strTags != null) {
    let tags = (currentMeal.meals[0].strTags).split(',');
    for (tag of tags) {
      tagsCode += `<span>${tag}</span>`;
    }
  } else {
    tagsCode = "";
  }

  let finalCode = `
  <div class="row currentMeal g-5">

  <div class="col-md-4 m-0">
    <div class="p-3">
      <div class="mealPhoto mb-3">
        <img src="${currentMeal.meals[0].strMealThumb}" class="w-100">
      </div>
      <h3 class="fs-1 text-center my-3">${currentMeal.meals[0].strMeal}</h3>
      <div class="d-flex justify-content-evenly">
        <a href="${currentMeal.meals[0].strYoutube}" class="btn btn-success">Source</a>
        <a href="${currentMeal.meals[0].strYoutube}"  class="btn btn-danger">YouTube</a>
      </div>
    </div>
  </div>

  <div class="col-md-8 m-0 py-5">
    <div class="py-2">
      <h4 class="fs-3">Instructions:</h4>
      <p class="text-muted my-2">${currentMeal.meals[0].strInstructions}</p>
      <h4 class="fs-3 my-2">Area: <span class="text-muted">${currentMeal.meals[0].strArea}</span></h4>
      <h4 class="fs-3 my-2">Category: <span class="text-muted">${currentMeal.meals[0].strCategory}</span></h4>
      <h4 class="fs-3 mt-2">Recipes:</h4>
      <div class="recipes mb-5">${ingredCode}</div>
      <h4 class="fs-3">Tags:</h4>
      <div class="tags my-3">${tagsCode}</div>
    </div>
  </div>
</div>
  `;

  $('#MainSec').html(finalCode);
}


function displayCountries(CountriesJSON) {
  let myCode = "";
  for (let i = 0; i < 20; i++) {
    myCode += `
    <div class="col-md-3">
      <div class="country" country="${CountriesJSON.meals[i].strArea}">
        <img src="${countryImgMode}" class="w-50 text-white" country="${CountriesJSON.meals[i].strArea}">
        <h3 class="my-4 fs-2" country="${CountriesJSON.meals[i].strArea}">${CountriesJSON.meals[i].strArea}</h3>
      </div>
    </div>
    `;
  }
  let finalCode = `<div class="row g-4 text-center Countries">${myCode}</div>`;
  $('#MainSec').html(finalCode);
}

function displayIngredients(IngredientsJSON) {
  let myCode = "";
  for (let i = 0; i < 20; i++) {
    myCode += `
    <div class="col-md-3">
        <div class="ingredient" ingred="${IngredientsJSON.meals[i].strIngredient}">
          <img src="${ingredImgMode}" class="w-50 text-white" ingred="${IngredientsJSON.meals[i].strIngredient}">
          <h3 class="my-4" ingred="${IngredientsJSON.meals[i].strIngredient}">${IngredientsJSON.meals[i].strIngredient}</h3>
          <p ingred="${IngredientsJSON.meals[i].strIngredient}">${IngredientsJSON.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>
    `;
  }
  let finalCode = `<div class="row g-4 text-center ingredients">${myCode}</div>`;
  $('#MainSec').html(finalCode);
}


function NameValidation() {
  return /^[a-zA-Z ]{2,30}$/.test($('#contactName').val());
}
function EmailValidation() {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#contactEmail').val());
}
function PhoneValidation() {
  return /^(01|201|\+201)[0125][0-9]{8}$/gm.test($('#contactPhone').val());
}
function AgeValidation() {
  return /^(18|19|[2-7][0-9]|80)$/gm.test($('#contactAge').val());
}
function Pass1Validation() {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm.test($('#contactPass1').val());
}
function Pass2Validation() {
  return $('#contactPass2').val() === $('#contactPass1').val();
}


$('#contactName').focusout(function () {
  if (NameValidation()) {
    $('#contactName').removeClass('checkError');
  } else {
    $('#contactName').addClass('checkError');
  }
});

$('#contactEmail').focusout(function () {
  if (EmailValidation()) {
    $('#contactEmail').removeClass('checkError');
  } else {
    $('#contactEmail').addClass('checkError');
  }
});


$('#contactPhone').focusout(function () {
  if (PhoneValidation()) {
    $('#contactPhone').removeClass('checkError');
  } else {
    $('#contactPhone').addClass('checkError');
  }
});


$('#contactAge').focusout(function () {
  if (AgeValidation()) {
    $('#contactAge').removeClass('checkError');
  } else {
    $('#contactAge').addClass('checkError');
  }
});

$('#contactPass1').focusout(function () {
  if ($('#contactPass1').val() == "") {
    console.log("s");
    $('#contactPass1').addClass('checkError');
  }
  if (Pass1Validation()) {
    $('#contactPass1').removeClass('checkError');
  } else {
    $('#contactPass1').addClass('checkError');
  }
});

$('#contactPass1').focusout(function () {
  if (Pass2Validation()) {
    $('#contactPass1').removeClass('checkError');
  } else {
    $('#contactPass1').addClass('checkError');
  }
});


$('#contactName , #contactEmail , #contactPhone , #contactAge , #contactPass1 , #contactPass2').keyup(function () {
  if (NameValidation() && EmailValidation() && PhoneValidation() && AgeValidation() && Pass1Validation() && Pass2Validation()) {
    console.log("ddddd")
    $('button.submit').removeClass('disabled');
  } else {
    $('button.submit').addClass('disabled');
  }
});

function displayContactForm() {
  let contactCode = `
  <h2>Contact Us</h2>
  <div class="row py-2 text-black">
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <input type="text" class="form-control " id="contactName" placeholder="Name">
        <label for="contactName">Name</label>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <input type="email" class="form-control " id="contactEmail" placeholder="Email address">
        <label for="contactEmail">Email address</label>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <input type="text" class="form-control " id="contactPhone" placeholder="Phone Number">
        <label for="contactPhone">Phone Number</label>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <input type="number" class="form-control " id="contactAge" placeholder="Age">
        <label for="contactAge">Age</label>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-floating mb-3">
        <input type="password" class="form-control " id="contactPass1" placeholder="Password">
        <label for="contactPass1">Password</label>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-floating">
        <input type="password" class="form-control " id="contactPass2" placeholder="Re enter password">
        <label for="contactPass2">Re enter password</label>
      </div>
    </div>
    <div class="col-12 text-center py-5">
      <button class="btn submit btn-success w-50 disabled">Submit</button>
    </div>
    <div class="col-12">
      <div class="instructions text-danger">
        <p> - Email: email@provider.com. </p>
        <p> - Phone: 11 digit , start with (+20)010 or (+20)011 or (+20)012 or (+20)015.</p>
        <p> - Age : from 18 to 80 years old.</p>
        <p> - Password: must contain charachters, numbers, special charachter [ 8 or more ].</p>
      </div>
    </div>
  </div>
  `
  $('#MainSec').html(contactCode);
}

$('.form-check-input, .fa-circle-half-stroke').click(toggleDarkMode);

function toggleDarkMode(e) {
  if ($(e.target).hasClass('fa-circle-half-stroke') && !darkMode) {
    $('.form-check-input').removeAttr('checked');
  } else if ($(e.target).hasClass('fa-circle-half-stroke') && !darkMode) {
    $('.form-check-input').Attr('checked', 'checked');
  }
  if (darkMode == true) {
    darkMode = false;
    $('body').css('backgroundColor', 'rgba(0, 0, 0, 0.95)');
    $('body').css('color', 'white');
    $('nav').css('backgroundColor', 'black');
    $('nav li').css('color', 'white');
    $('.menu_bar').css('backgroundColor', 'white');
    $('.menu_bar').css('color', 'black');
    $('.country img').attr('src', 'images/breakfast-light.png');
    $('.ingredient img').attr('src', 'images/baking-light.png');
    $('.dark-mode label').css('color', 'white');
    $('.dark-mode input').attr('checked', 'checked');
    countryImgMode = 'images/breakfast-light.png';
    ingredImgMode = 'images/baking-light.png';
  } else {
    darkMode = true;
    $('body').css('backgroundColor', 'white');
    $('body').css('color', 'black');
    $('nav').css('backgroundColor', 'white');
    $('nav li').css('color', 'black');
    $('.menu_bar').css('backgroundColor', 'black');
    $('.menu_bar').css('color', 'white');
    $('.country img').attr('src', 'images/breakfast-black.png');
    $('.ingredient img').attr('src', 'images/baking-black.png');
    $('.dark-mode label').css('color', 'black');
    countryImgMode = 'images/breakfast-black.png';
    ingredImgMode = 'images/baking-black.png';
  }
}