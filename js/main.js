async function ApplyAPICountry(country) {
  if (country == "" || country == undefined) { country = "Egyptian"; }
  return await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)).json();
}

// $(document).ready(async function () {
//   $(".loadingLayer").css("display", "flex");
//   let MealsJSONMain = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
//   displayAllMeals(MealsJSONMain);
//   $(".loadingLayer").css("display", "none");
// });

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
  let MealsJSONMain = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
  displayAllMeals(MealsJSONMain);
  $(".loadingLayer").css("display", "none");
})

$('.fa-bars').click(function () {
  openNav();
});

$('.fa-xmark').click(function () {
  closeNav();
});

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
  $('.fa-xmark').fadeToggle(25, function () {
    $('.fa-bars').fadeToggle(25);
  });
  // added to jQuery file manualy
  $('nav ul li').animateTransform("translateY(500%)", 750);
}

function openNav() {
  $('.navBar').animate({ left: "0" }, 500);
  $('.fa-bars').fadeToggle(25, function () {
    $('.fa-xmark').fadeToggle(25);
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
        <img src="images/breakfast.png" class="w-25 text-white" country="${CountriesJSON.meals[i].strArea}">
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
          <img src="images/baking.png" class="w-25 text-white" ingred="${IngredientsJSON.meals[i].strIngredient}">
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

$('#contactName , #contactEmail , #contactPhone , #contactAge , #contactPass1 , #contactPass2').keyup(function () {
  if (NameValidation() && EmailValidation() && PhoneValidation() && AgeValidation() && Pass1Validation() && Pass2Validation()) {
    $('button.submit').removeClass('disabled');
  } else {
    $('button.submit').addClass('disabled');
  }
});
