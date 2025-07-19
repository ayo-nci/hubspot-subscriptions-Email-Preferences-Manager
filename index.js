//Unsubscribe reason variables
const submitButton = document.getElementById("submitbutton");
submitButton.addEventListener("click", addSubmitHandler());
// Get all checkboxes in the form and store their initial checked state in an array
const checkboxInputs = Array.from(document.querySelectorAll('form#email-prefs-form input[type="checkbox"]'));
const initialCheckedBoxArray = checkboxInputs.filter(input => input.checked);

//Get global unsusubcribe checkbox
const globalUnsubCheckbox = document.querySelector('input[name="globalunsub"]');




function getUnsubscribeReasons(obj) {
    return Object.keys(obj)
        .filter(key => key.startsWith("unsubscribe_reason-"))
        .map(key => obj[key])
        .join(";");
}

function create_unsubscribe_reason_checkboxes() {

    var parent = document.getElementById("content");
    //Create multi checkbox
    // Create parent div
    const parentDiv = document.createElement('div');
    parentDiv.setAttribute('id', 'unsubscribed_reason_multicheckbox');
    parentDiv.classList.add('hs-form__row');
    // Create group div
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('hs-form__group');
    parentDiv.appendChild(groupDiv);
    // Create field row div
    const fieldRowDiv = document.createElement('div');
    fieldRowDiv.classList.add('hs-form__field-row');
    groupDiv.appendChild(fieldRowDiv);
    // Create field column div
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('hs-form__field-row__column');
    fieldRowDiv.appendChild(columnDiv);
    // Create unsubscribe reason field div
    const fieldDiv = document.createElement('div');
    fieldDiv.classList.add('hs-form__field', 'hs-form__field-unsubscribe_reason', 'hs-unsubscribe_reason');
    columnDiv.appendChild(fieldDiv);
    // Create label for unsubscribe reason field
    const label = document.createElement('label');
    label.setAttribute('for', 'unsubscribe_reason-input');
    label.setAttribute('data-required', 'false');
    label.classList.add('hs-form__field__label');
    fieldDiv.appendChild(label);
    // Create label text for unsubscribe reason field
    const labelText = document.createElement('span');
    labelText.textContent = 'Unsubscribe Reason';
    label.appendChild(labelText);
    // Create options container div
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('hs-form__field__options__container');
    optionsContainer.setAttribute('role', 'group');
    optionsContainer.setAttribute('aria-invalid', 'false');
    optionsContainer.setAttribute('aria-labelledby', 'unsubscribe_reason-label');
    optionsContainer.setAttribute('aria-describedby', 'unsubscribe_reason-description');
    fieldDiv.appendChild(optionsContainer);
    // Create checkbox labels and inputs
    const checkboxLabels = ['I no longer want to receive these emails', 'I never signed up for this mailing list', 'The content was irrelevant', 'I received these emails too frequently', 'I receive too many emails in general'];
    checkboxLabels.forEach((labelText, index) => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.style.alignSelf = 'flex-start';
        checkboxDiv.style.flex = '0 1 auto';
        optionsContainer.appendChild(checkboxDiv);
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('id', `unsubscribe_reason-label-${index + 1}`);
        checkboxLabel.classList.add('hs-form__field__label', 'hs-form__field__checkbox__label');
        checkboxDiv.appendChild(checkboxLabel);
        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('id', `unsubscribe_reason-input-${index + 1}`);
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.setAttribute('name', `unsubscribe_reason-${labelText.toLowerCase().replace(/ /g, '_')}`);
        checkboxInput.setAttribute('aria-invalid', 'false');
        checkboxInput.setAttribute('aria-labelledby', `unsubscribe_reason-label-${index + 1}`);
        checkboxInput.setAttribute('aria-describedby', 'unsubscribe_reason-description');
        checkboxInput.setAttribute('aria-required', 'false');
        checkboxInput.setAttribute('aria-checked', 'false');
        checkboxInput.setAttribute('value', labelText.toLowerCase().replace(/ /g, '_'));
        checkboxLabel.appendChild(checkboxInput);
        const checkboxLabelText = document.createElement('span');
        checkboxLabelText.classList.add('hs-form__field__checkbox__label-text');
        checkboxLabelText.textContent = labelText;
        checkboxLabel.appendChild(checkboxLabelText);
    });
    parent.lastChild.previousElementSibling.previousElementSibling.before(parentDiv)
}

function handleSubmit(e) {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/<portal-id>/<form-id>`;
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const unsubscribe_reasons = getUnsubscribeReasons(formProps)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "email",
                    "value": formData.get('email')
                },
                {
                    "objectTypeId": "0-1",
                    "name": "unsubscribe_reason",
                    "value": unsubscribe_reasons
                }
            ]
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function addSubmitHandler() {
    const form = document.getElementById("email-prefs-form");
    form.addEventListener("submit", function (event) {
        //event.preventDefault();
        handleSubmit(event);
    });
}

// Function to check if all checkboxes in the initialCheckedBoxArray are currently checked
function areAllChecked() {
    return initialCheckedBoxArray.every(input => input.checked);
}


function doesElementExistInForm() {
    const element = document.getElementById('unsubscribed_reason_multicheckbox');
    return !!element ?? false;
}

// Create function to be called when any checkbox that was initially checked has been unchecked
function createCheckbox() {
    console.log('create function called');

    if (!doesElementExistInForm()) {
        create_unsubscribe_reason_checkboxes();
    } else {
        console.error('Element already exists')
    }
}

// Remove function to be called when all checkboxes are checked
function remove() {
    console.log('remove function called');
    removeElementFromForm('unsubscribed_reason_multicheckbox');
}

function removeElementFromForm(elementId) {
    const unsubscribed_reason_box = document.getElementById(elementId);
    // Check if the element exist
    if (!unsubscribed_reason_box) {
        console.error('Form or element not found');
        return;
    }
    // Remove the element from the form
    unsubscribed_reason_box.remove();
}




/////Inside dom ready

// Event Listeners
domReady(function () {
    if (!document.body) {
        return;
    } else {


        //Call function to hide unchecked subscription types
        hideSubscriptionType();


        if (submitButton) {
            submitButton.addEventListener("click", addSubmitHandler);
        }
        if (initialCheckedBoxArray) {
            initialCheckedBoxArray.forEach(input => {
                input.addEventListener('change', () => {
                    if (input.checked) {
                        if (areAllChecked()) {
                            remove();
                        }
                    } else {
                        createCheckbox();
                    }
                });
            });
        }



    }
});
