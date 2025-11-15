let myWebLang = localStorage.getItem("lang") ?? "en";
const html = document.documentElement;
window.addEventListener("DOMContentLoaded", () => {
  html.dir = localStorage.getItem("lang") == "ar" ? "rtl" : "ltr";
  html.lang = localStorage.getItem("lang") ?? "en";
});

let dataModuleEn = await import("./data_en.js");
let dataModuleAr = await import("./data_ar.js");
import { language } from "./lang.js";

// Start Data
let topAttrication, ancientPlaces, warmDestinations, packagesData;
function HandleData() {
  let dataModule;
  if (myWebLang == "en") {
    dataModule = dataModuleEn;
  } else {
    dataModule = dataModuleAr;
  }

  ({ topAttrication, ancientPlaces, warmDestinations, packagesData } =
    dataModule);
}
HandleData();

// End Data

// Start Handle multi-languages
const all = document.querySelectorAll("[data-i18n]");
function multiLanguages() {
  all.forEach((element) => {
    element.textContent =
      language[myWebLang][element.getAttribute("data-i18n")];
  });
}
multiLanguages();
// End Handle multi-languages

// Start Language transform
const global = document.querySelector(".lang-box .global");
const langMenu = document.querySelector(".lang-box .languages");
const languages = document.querySelectorAll(".lang-box .languages li");

languages.forEach((lang) => {
  lang.addEventListener("click", () => {
    let langVlaue = lang.getAttribute("data-value");
    localStorage.setItem("lang", langVlaue);
    myWebLang = langVlaue;
    html.dir = langVlaue == "ar" ? "rtl" : "ltr";
    html.lang = langVlaue == "ar" ? "ar" : "en";

    langMenu.classList.remove("show");
    global.classList.remove("active");
  });
});

global.addEventListener("click", () => {
  global.classList.toggle("active");
  langMenu.classList.toggle("show");
});
// End Language transform

// Change Landing Background
const landingSliderContainer = document.querySelector(".landing .images");
const landingSlides = Array.from(landingSliderContainer.children);
const arrowPrev = document.querySelector(".landing .prevArrow");
const arrowNext = document.querySelector(".landing .nextArrow");
let currentIndex = 0;
function updateCarousel() {
  landingSliderContainer.style.transform = `translateX(${
    myWebLang == "ar" ? "" : "-"
  }${currentIndex * 100}%)`;
}
arrowPrev.addEventListener("click", () => {
  currentIndex =
    currentIndex == 0 ? landingSlides.length - 1 : currentIndex - 1;
  updateCarousel();
});
arrowNext.addEventListener("click", () => {
  currentIndex =
    currentIndex == landingSlides.length - 1 ? 0 : currentIndex + 1;
  updateCarousel();
});
// End Change Landing Background

// Start Top Attraction
const attractionsCards = document.querySelector(".attractions .cards");
function createAttraction() {
  attractionsCards.textContent = "";
  for (let i = 0; i < topAttrication.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    attractionsCards.appendChild(card);

    let cardImg = document.createElement("img");
    cardImg.src = `images/${topAttrication[i].imgPath}`;
    card.appendChild(cardImg);

    let cardInfo = document.createElement("div");
    cardInfo.classList.add("info");
    card.appendChild(cardInfo);
    let cardTitle = document.createElement("a");
    cardTitle.textContent = topAttrication[i].title;
    cardInfo.appendChild(cardTitle);
    let cardbody = document.createElement("p");
    cardbody.textContent = topAttrication[i].body;
    cardInfo.appendChild(cardbody);
  }
}
createAttraction();
// End Top Attraction
// Start Ancient Places
const ancientListOne = document.querySelector(".ancient .cards.one");
const ancientListTwo = document.querySelector(".ancient .cards.two");
const ancientListThree = document.querySelector(".ancient .cards.three");

function ancientPlacesCards(nameOfList, numberOfList) {
  const places = ancientPlaces[nameOfList];
  for (let i = 0; i < places.length; i++) {
    let card = document.createElement("a");
    card.href = places[i].hrefPath;
    card.classList.add("card");
    numberOfList.appendChild(card);

    let img = document.createElement("img");
    img.src = `images/${places[i].imgPath}`;
    card.appendChild(img);

    let title = document.createElement("h4");
    title.textContent = places[i].title;
    card.appendChild(title);

    if (places[i].preTitle) {
      let preTitle = document.createElement("span");
      preTitle.textContent = places[i].preTitle;
      title.prepend(preTitle);
    }
  }
}
function CreateAncientPlaces() {
  ancientListOne.textContent = "";
  ancientListTwo.textContent = "";
  ancientListThree.textContent = "";
  ancientPlacesCards("listOne", ancientListOne);
  ancientPlacesCards("listTwo", ancientListTwo);
  ancientPlacesCards("listThree", ancientListThree);
}
CreateAncientPlaces();

// End Ancient Places
// Start Warm Destinations
const warmSliderContainer = document.querySelector(".warm-destinations .cards");
const warmPrevBtn = document.querySelector(".warm-destinations .prev-btn");
const warmNextBtn = document.querySelector(".warm-destinations .next-btn");
let numberOfImg;

// display warm Destinations
function createWarmDestinations() {
  warmSliderContainer.textContent = "";
  for (let i = 0; i < warmDestinations.length; i++) {
    let warmCard = document.createElement("div");
    warmCard.classList.add("card");
    warmSliderContainer.appendChild(warmCard);

    let warmImg = document.createElement("img");
    warmImg.src = `images/${warmDestinations[i].imgPath}`;
    warmCard.appendChild(warmImg);

    let warmTitle = document.createElement("a");
    warmTitle.textContent = warmDestinations[i].title;
    warmCard.appendChild(warmTitle);

    let warmBody = document.createElement("p");
    warmBody.textContent = warmDestinations[i].body;
    warmCard.appendChild(warmBody);
  }
}
createWarmDestinations();
// Handle Slider
// Many of cards are played on screen
let warmTranslate;
let sliderCount;
function handleNumberOfCardsShow() {
  warmTranslate =
    Math.ceil(
      document.querySelector(".warm-destinations .cards .card").clientWidth
    ) + 15;
  if (window.innerWidth >= 1150) {
    numberOfImg = 6;
  } else if (window.innerWidth >= 1100) {
    numberOfImg = 5;
  } else if (window.innerWidth >= 750) {
    numberOfImg = 4;
  } else if (window.innerWidth >= 550) {
    numberOfImg = 3;
  } else {
    numberOfImg = 2;
  }
  sliderCount = warmDestinations.length - numberOfImg;
}
handleNumberOfCardsShow();
window.addEventListener("resize", handleNumberOfCardsShow);

let warmCurrentIndex = 0;
function updateWarmCarousel() {
  warmSliderContainer.style.transform = `translateX(${
    myWebLang == "ar" ? "" : "-"
  }${warmCurrentIndex * warmTranslate}px)`;
}
function hideBtn(btn) {
  btn.classList.add("hide");
}
function showBtn(btn) {
  btn.classList.remove("hide");
}

warmPrevBtn.addEventListener("click", () => {
  if (warmCurrentIndex != 0) {
    warmCurrentIndex -= 1;
    updateWarmCarousel();
    showBtn(warmNextBtn);
    warmCurrentIndex == 0 ? hideBtn(warmPrevBtn) : showBtn(warmPrevBtn);
  }
});
warmNextBtn.addEventListener("click", () => {
  if (warmCurrentIndex <= sliderCount) {
    warmCurrentIndex += 1;
    updateWarmCarousel();
    showBtn(warmPrevBtn);
    warmCurrentIndex == sliderCount
      ? hideBtn(warmNextBtn)
      : showBtn(warmNextBtn);
  }
});
// End Warm Destinations

// Start Handle Slider Button Direction
const prevArrow = document.querySelectorAll(".prevArrow");
const nextArrow = document.querySelectorAll(".nextArrow");

const sliderArrows = () => {
  if (html.lang == "ar") {
    prevArrow.forEach((ele) => {
      ele.classList.remove("fa-arrow-left");
      ele.classList.add("fa-arrow-right");
    });
    nextArrow.forEach((ele) => {
      ele.classList.remove("fa-arrow-right");
      ele.classList.add("fa-arrow-left");
    });
  } else {
    prevArrow.forEach((ele) => {
      ele.classList.remove("fa-arrow-right");
      ele.classList.add("fa-arrow-left");
    });
    nextArrow.forEach((ele) => {
      ele.classList.remove("fa-arrow-left");
      ele.classList.add("fa-arrow-right");
    });
  }
};
sliderArrows();
// End Handle Slider Button Direction

// Start Exclusive Packages
const packages = document.querySelector(".packages .items");
function CreateExclusivePackages() {
  packages.textContent = "";
  for (let i = 0; i < packagesData.length; i++) {
    let item = document.createElement("div");
    item.classList.add("item");
    packages.appendChild(item);

    // package Labels
    let labelsBox = document.createElement("div");
    labelsBox.classList.add("item-labels");
    item.appendChild(labelsBox);
    let featureLabel = document.createElement("span");
    featureLabel.classList.add("features");
    featureLabel.setAttribute("data-i18n", "feature");
    featureLabel.textContent = myWebLang == "en" ? "Featured" : "مميزة";
    labelsBox.appendChild(featureLabel);

    let wishLabel = document.createElement("i");
    wishLabel.classList.add("fa-regular", "fa-heart", "wish-list");
    labelsBox.appendChild(wishLabel);

    let img = document.createElement("img");
    img.src = `images/${packagesData[i].imgPath}`;
    item.appendChild(img);

    // package Content
    let packageContent = document.createElement("div");
    packageContent.classList.add("content");
    item.appendChild(packageContent);

    // package Content Icons
    let packageContentIcons = document.createElement("div");
    packageContentIcons.classList.add("icons");
    packageContent.appendChild(packageContentIcons);

    let cameraIcon = document.createElement("i");
    cameraIcon.classList.add("fa-regular", "fa-camera");
    packageContentIcons.appendChild(cameraIcon);
    let videoIcon = document.createElement("i");
    videoIcon.classList.add("fa-regular", "fa-circle-play");
    packageContentIcons.appendChild(videoIcon);

    // package title
    let title = document.createElement("p");
    title.textContent = packagesData[i].title;
    packageContent.appendChild(title);

    // package Cost
    let packageContentCost = document.createElement("div");
    packageContentCost.classList.add("cost");
    packageContent.appendChild(packageContentCost);

    let price = document.createElement("span");
    price.setAttribute("data-i18n", "price");
    price.textContent = myWebLang == "en" ? "Price" : "السعر";
    packageContentCost.appendChild(price);
    let pound = document.createElement("span");
    pound.textContent =
      myWebLang == "en"
        ? `$${packagesData[i].price}`
        : `${packagesData[i].price} جنية`;
      packagesData[i].price;
    console.log(pound.textContent);
    packageContentCost.appendChild(pound);

    // Package Footer
    let packageExplore = document.createElement("div");
    packageExplore.classList.add("explore");
    packageContent.appendChild(packageExplore);
    let packageExploreA = document.createElement("a");
    packageExploreA.href = "#";
    packageExploreA.setAttribute("data-i18n", "discover");
    packageExploreA.textContent = myWebLang == "en" ? "Explore" : "أستكشف";
    packageExplore.appendChild(packageExploreA);
    let packageExploreI = document.createElement("i");
    myWebLang == "en"
      ? packageExploreI.classList.add("fa-solid", "fa-arrow-right")
      : packageExploreI.classList.add("fa-solid", "fa-arrow-left");
    packageExplore.appendChild(packageExploreI);
  }
}
CreateExclusivePackages();

// End Exclusive Packages

// Footer

const arrow = document.querySelectorAll("footer .arrow");

function CreateFooterArrow() {
  arrow.forEach((item) => {
    if (myWebLang == "en") {
      item.classList.remove("fa-angles-left");
      item.classList.add("fa-angles-right");
    } else {
      item.classList.remove("fa-angles-right");
      item.classList.add("fa-angles-left");
    }
  });
}
CreateFooterArrow();
// End Footer

// Listen to changes
const observer = new MutationObserver(() => {
  HandleData();
  multiLanguages();
  createAttraction();
  CreateAncientPlaces();
  createWarmDestinations();
  updateCarousel();
  updateWarmCarousel();
  sliderArrows();
  CreateExclusivePackages();
  CreateFooterArrow();
});

observer.observe(html, {
  attributes: true,
  attributeFilter: ["dir", "lang"],
});
