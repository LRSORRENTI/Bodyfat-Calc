let lastSelectedGender = null;


function clearFormFields() {
    document.getElementById('weight').value = '';
    document.getElementById('waist').value = '';
    document.getElementById('height').value = '';
    document.getElementById('neck').value = '';
    document.getElementById('hip').value = ''; // This will clear the field even if it's not visible
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', function(event) {
        clearFormFields(); // Clear the form fields when the gender is switched

        const femaleMeasurements = document.getElementById('femaleMeasurements');
        femaleMeasurements.style.display = event.target.value === 'female' ? 'block' : 'none';
    });
});



document.getElementById('bodyFatForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const height = parseFloat(document.getElementById('height').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const hip = gender === 'female' ? parseFloat(document.getElementById('hip').value) : null;

    let bodyFatPercentage = calculateBodyFat(gender, weight, height, neck, waist, hip);



    // Display the result in the modal
    const resultTextElement = document.getElementById('resultText');
    resultTextElement.innerText = 'Your body fat percentage is: ';
    resultTextElement.innerText += `${bodyFatPercentage}%`;
    showModal();
});

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', function(event) {
        const currentSelectedGender = event.target.value;
        
        // Clear the form fields only if the gender is actually switched
        if (lastSelectedGender && lastSelectedGender !== currentSelectedGender) {
            clearFormFields();
        }
        
        lastSelectedGender = currentSelectedGender; // Update the last selected gender

        const femaleMeasurements = document.getElementById('femaleMeasurements');
        femaleMeasurements.style.display = currentSelectedGender === 'female' ? 'block' : 'none';
    });
});


function calculateBodyFat(gender, weight, height, neck, waist, hip = null) {
    let bodyFatPercentage = 0;
    if (gender === 'male') {
        bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
    return bodyFatPercentage.toFixed(2);
}


function showModal() {
    var modal = document.getElementById('resultModal');
    var span = document.getElementsByClassName('close')[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
