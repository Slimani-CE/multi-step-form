// **************** CONSTANT AND GLOBAL VARIABLES **************** //
const PLANS = {
  default: "monthly",
  monthly: {
    arcade: {
      priceStr: "$9/mo",
      price: 9,
      isOffreAvailable: false,
      offre: "",
    },
    advanced: {
      priceStr: "$12/mo",
      price: 12,
      isOffreAvailable: false,
      offre: "",
    },
    pro: {
      priceStr: "$15/mo",
      price: 15,
      isOffreAvailable: false,
      offre: "",
    },
    addOns: {
      onlineService: {
        name: "Online service",
        priceStr: "+$1/mo",
        price: 1,
      },
      largerStorage: {
        name: "Larger storage",
        priceStr: "+$2/mo",
        price: 2,
      },
      customizableProfile: {
        name: "Customizable profile",
        priceStr: "+$2/mo",
        price: 2,
      },
    },
  },
  yearly: {
    arcade: {
      priceStr: "$90/yr",
      price: 90,
      isOffreAvailable: true,
      offre: "2 months free",
    },
    advanced: {
      priceStr: "$120/yr",
      price: 120,
      isOffreAvailable: true,
      offre: "2 months free",
    },
    pro: {
      priceStr: "$150/yr",
      price: 150,
      isOffreAvailable: true,
      offre: "2 months free",
    },
    addOns: {
      onlineService: {
        name: "Online service",
        priceStr: "+$10/yr",
        price: 10,
      },
      largerStorage: {
        name: "Larger storage",
        priceStr: "+$20/yr",
        price: 20,
      },
      customizableProfile: {
        name: "Customizable profile",
        priceStr: "+$20/yr",
        price: 20,
      },
    },
  },
};

const USER_FORM = {};

// **************** VIEW FUNCTIONS **************** //
// VIEW FUNCTIONS Are responsible for the displayed view and they handle user interaction
// They can call some logic functions.
function showForm(id) {
  // Hide all forms
  let forms = document.querySelectorAll(".container .forms-container .form");
  forms.forEach((form) => {
    form.classList.add("hidden");
  });
  // Show current form using the id
  let currentForm = document.getElementById(id);
  currentForm.classList.remove("hidden");
  // Hide all checked steps
  let steps = document.querySelectorAll(
    ".container .steps-container .steps .step"
  );
  steps.forEach((step) => {
    step.classList.remove("checked");
  });
  // Show current step
  let currentStep = document.getElementById(id.split("-form")[0] + "-step");
  currentStep.classList.add("checked");
}

function togglePlanPeriod(el) {
  el.classList.toggle("on");
  // Change span focus
  let spans = document.querySelectorAll(
    "#plan-form > div.plans-container > div.plan-period > span"
  );
  spans.forEach((span) => {
    span.classList.toggle("checked");
  });
  // Set plans
  setPlan(el.classList.contains("on") ? "yearly" : "monthly");
}

function checkPlan(el) {
  if (el.classList.contains("checked")) return;

  // Remove checked from all cards
  let planCards = document.querySelectorAll(
    ".container .forms-container .plan-form .plans-container .plan-card"
  );
  planCards.forEach((card) => {
    card.classList.remove("checked");
  });

  // Check current card
  el.classList.add("checked");
}

function setPlan(type) {
  document.getElementById("arcade-plan-price").innerHTML =
    PLANS[type].arcade.priceStr;
  document.getElementById("advanced-plan-price").innerHTML =
    PLANS[type].advanced.priceStr;
  document.getElementById("pro-plan-price").innerHTML =
    PLANS[type].pro.priceStr;

  document.getElementById("arcade-plan-offre").innerHTML =
    PLANS[type].arcade.offre;
  document.getElementById("advanced-plan-offre").innerHTML =
    PLANS[type].advanced.offre;
  document.getElementById("pro-plan-offre").innerHTML = PLANS[type].pro.offre;
  document.getElementById("online-service").innerHTML =
    PLANS[type].addOns.onlineService.priceStr;
  document.getElementById("larger-storage").innerHTML =
    PLANS[type].addOns.largerStorage.priceStr;
  document.getElementById("custom-profile").innerHTML =
    PLANS[type].addOns.customizableProfile.priceStr;
}

function checkAddOn(el) {
  el.classList.toggle("checked");
}

function checkPersonalInfo() {
  // Get personal info inputs
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let phoneInput = document.getElementById("phone");
  let isValid = true;
  if (nameInput.value === "") {
    nameInput.parentNode.classList.add("error");
    isValid = false;
  } else {
    nameInput.parentNode.classList.remove("error");
  }
  if (emailInput.value === "") {
    emailInput.parentNode.classList.add("error");
    isValid = false;
  } else {
    emailInput.parentNode.classList.remove("error");
  }
  if (phoneInput.value === "") {
    phoneInput.parentNode.classList.add("error");
    isValid = false;
  } else {
    phoneInput.parentNode.classList.remove("error");
  }
  if (isValid) showForm("plan-form");
}

function collectUserData() {
  // Personal Info
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let phoneInput = document.getElementById("phone");

  // Plan Info
  let planPeriod = document.getElementById("plan-type").classList.contains("on")
    ? "yearly"
    : "monthly";
  let planType = Array.from(
    document.querySelectorAll("#plan-form > div.plans-container > .plan-card")
  ).filter((card) => card.classList.contains("checked"))[0].dataset.planType;

  // Add-ons Info
  let addOns = Array.from(
    document.querySelectorAll("#add-ons-form > div.add-ons-container .add-on")
  )
    .filter((card) => card.classList.contains("checked"))
    .map((card) => card.dataset.addOn);

  // Construct the USER_FORM Variable
  USER_FORM.name = nameInput.value;
  USER_FORM.email = emailInput.value;
  USER_FORM.phone = phoneInput.value;
  USER_FORM.planType = planType;
  USER_FORM.planPeriod = planPeriod;
  USER_FORM.planPrice = PLANS[planPeriod][planType].price;
  USER_FORM.planPriceStr = PLANS[planPeriod][planType].priceStr;
  USER_FORM.addOns = addOns.map((addOn) => {
    return {
      title: PLANS[planPeriod].addOns[addOn].name,
      price: PLANS[planPeriod].addOns[addOn].price,
      priceStr: PLANS[planPeriod].addOns[addOn].priceStr,
    };
  });
  // Update the View
  document.getElementById(
    "summary-plan-title"
  ).innerHTML = `${USER_FORM.planType} (${USER_FORM.planPeriod})`;
  document.getElementById("summary-plan-price").innerHTML =
    USER_FORM.planPriceStr;
  document.querySelector(
    "#summary-form > div.summary-container > div.details > div.add-ons"
  ).innerHTML = USER_FORM.addOns
    .map(
      (addOn) => `
  <div class="add-on">
    <span class="title">${addOn.title}</span>
    <span class="price">${addOn.priceStr}</span>
  </div>`
    )
    .join("");
  document.getElementById("summary-plan-total-title").innerHTML = `Total (per ${
    USER_FORM.planPeriod.split("ly")[0]
  })`;
  let total = USER_FORM.planPrice;
  USER_FORM.addOns.forEach((addOn) => {
    total += addOn.price;
  });
  document.getElementById("summary-plan-total-price").innerHTML = `+$${total}/${
    USER_FORM.planPeriod === "monthly" ? "mo" : "yr"
  }`;

  // Show summary
  showForm("summary-form");
}
// **************** LOGIC FUNCTIONS **************** //
window.onload = function () {
  setPlan(PLANS.default);
};
