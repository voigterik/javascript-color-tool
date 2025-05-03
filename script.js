const colorForm = document.getElementById("colorForm");
const colorInput = document.getElementById("colorInput");
const validationText = document.getElementById("validationText");
const colorType = document.getElementById("colorType");
const rangeSlider = document.getElementById("rangeSlider");
const rangeLabel = document.getElementById("rangeLabel");
const slider = document.getElementById("slider");

const colorIn = document.getElementById("color-value-in");
const colorOut = document.getElementById("color-value-out");
const colorInVisual = document.getElementById("color-input-visual");
const colorOutVisual = document.getElementById("color-output-visual");

rangeLabel.innerHTML = `${rangeSlider.value}%`;

colorForm.addEventListener("submit", processColor);
colorInput.addEventListener("keydown", resetValidation);
slider.addEventListener("click", toggleSlider);
colorType.addEventListener("click", toggleCheckbox);
rangeSlider.addEventListener("input", getRangeValue);
rangeSlider.addEventListener("change", updateRangeValue);

function processColor(event) {
    event.preventDefault();
    validateString(colorInput.value);
    if (validateString(colorInput.value)) {
        unblockItems();
        colorIn.innerHTML = colorInput.value;
        colorInVisual.style.backgroundColor = colorInput.value;
        calcNewValue(colorInput.value);
    }
}

function validateString(value) {
    const hasHashSign = value.includes("#");
    const colorValue = hasHashSign ? value.substring(1) : value;
    const isCorrectLength = colorValue.length === 3 || colorValue.length === 6;

    validationText.innerHTML = "";
    validationText.classList.remove("error");
    colorInput.classList.remove("inputError");

    value = value.trim();
    
    if (value.length === 0 || value === "") {
        return showError("Value can not be empty");
    }

    if (!hasHashSign) {
        return showError("Value has no #");
    }
    if (!isCorrectLength) {
        return showError("Incorrect value length");
    }

    if (!/^[0-9A-Fa-f]+$/.test(colorValue)) {
        return showError("Invalid characters");
    }

    return true;
}

function showError(message) {
    validationText.innerHTML = message;
    validationText.classList.add("error");
    colorInput.classList.add("inputError");
    return false;
}

function resetValidation() {
    if (!colorInput.classList.contains("inputError")) return;
    colorInput.classList.remove("inputError");
    validationText.classList.remove("error");
    validationText.innerHTML = "";
}

function unblockItems() {
    const items = document.querySelectorAll(".blocked");
    items.forEach(item => {
        if (item.classList.contains("blocked")) {
            item.classList.remove("blocked");
        }
    });
}

function toggleCheckbox() {
    setTimeout(() => {
        if (colorType.checked) {
            colorType.setAttribute("checked", "");
            slider.classList.add("darken");
        } else {
            colorType.removeAttribute("checked");
            slider.classList.remove("darken");
        }
    }, 0);
}

function toggleSlider() {
    slider.classList.toggle("darken");

    const isDarken = slider.classList.contains("darken");
    colorType.checked = isDarken;
    
    if (isDarken) {
        colorType.setAttribute("checked", "");
        slider.classList.add("m-is-dark");
    } else {
        colorType.removeAttribute("checked");
        slider.classList.remove("m-is-dark");
    }
}

function getRangeValue () {
    rangeLabel.innerHTML = `${rangeSlider.value}%`;
}

function updateRangeValue () {
    calcNewValue(colorInput.value);
}

// color calculations
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}

function calcNewValue(hexValue) {
    const rgb = hexToRgb(hexValue);
    if (!rgb) return;
    
    // positive factor for lightening, negative for darkening
    const factor = colorType.checked ? 
        -(rangeSlider.value / 100) :
        (rangeSlider.value / 100);
    
    const newValues = {
        r: Math.min(255, Math.max(0, Math.floor(rgb.r + factor * rgb.r))),
        g: Math.min(255, Math.max(0, Math.floor(rgb.g + factor * rgb.g))),
        b: Math.min(255, Math.max(0, Math.floor(rgb.b + factor * rgb.b)))
    };
    
    // convert back to hex and display
    const newHex = rgbToHex(newValues.r, newValues.g, newValues.b);
    colorOut.innerHTML = newHex;
    
    // update the visual representation
    colorOutVisual.style.backgroundColor = newHex;
    
    return newValues;
}

