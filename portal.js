document.addEventListener("DOMContentLoaded", function () {
  let symptomContainer = document.getElementById("symptomContainer");

  function populateSuggestions(inputElement, suggestionsElement) {
    const inputValue = inputElement.value.toLowerCase();
    const matchedSuggestions = Symptoms.filter(symptom => symptom.toLowerCase().startsWith(inputValue));

    suggestionsElement.innerHTML = ""; // Clear existing suggestions
    for (let suggestion of matchedSuggestions) {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion");
      suggestionItem.textContent = suggestion;
      suggestionItem.addEventListener("click", () => {
        inputElement.value = suggestion;
        suggestionsElement.innerHTML = "";
      });
      suggestionsElement.appendChild(suggestionItem);
    }

    // Position the suggestions dropdown to the right of the input
    const inputRect = inputElement.getBoundingClientRect();
    suggestionsElement.style.top = `${inputRect.top}px`;
    suggestionsElement.style.left = `${inputRect.right}px`;
  }

  let symptomInputs = symptomContainer.getElementsByClassName("symptom-input");
  for (let input of symptomInputs) {
    const suggestionsElement = document.createElement("div");
    suggestionsElement.classList.add("suggestions");
    input.parentNode.appendChild(suggestionsElement); // Append suggestions div after the input
    input.addEventListener("input", () => {
      populateSuggestions(input, suggestionsElement);
    });

    // Hide suggestions when clicking outside the input and suggestions
    document.addEventListener("click", (event) => {
      if (!input.contains(event.target) && !suggestionsElement.contains(event.target)) {
        suggestionsElement.innerHTML = "";
      }
    });
  }

  let button = document.getElementById("btn");
  let newArray = [];

  button.onclick = function (event) {
    event.preventDefault();
    newArray = []; // Clear the array before each search

    let selectedSymptoms = [];
    let symptomInputs = symptomContainer.getElementsByClassName("symptom-input");
    for (let input of symptomInputs) {
      if (input.value.trim() !== "") {
        selectedSymptoms.push(input.value.toLowerCase());
      }
    }

    for (let i = 0; i < disease.length; i++) {
      let matchedSymptoms = 0; // Track the number of matched symptoms for each disease
      for (let j = 0; j < disease[i].symptom.length; j++) {
        if (selectedSymptoms.includes(disease[i].symptom[j].toLowerCase())) {
          matchedSymptoms++;
        }
      }
      if (matchedSymptoms === selectedSymptoms.length) {
        newArray.push(disease[i].name);
      }
    }

    // Store the array of matching diseases in Local Storage
    localStorage.setItem("newArray", JSON.stringify(newArray));

    // Redirect to the output.html page
    window.location.href = "output.html";
  };
});