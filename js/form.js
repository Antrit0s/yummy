/// <reference types="../@types/jquery" />

const alertParagraph = document.createElement('p');
alertParagraph.classList.add('alert', 'alert-danger');


const contactBtn = $('#contact');
let contactArea = $('.contactUs');
let contactDiv = document.querySelector('.contact');

contactBtn.on('click', function() {
    $(sideBar).animate({ left: '-257px' }, 500);
    $(toggler).removeClass('fa-x').addClass('fa-bars');
    $(rowData).addClass('d-none');
    $('.access-meal').addClass('d-none');
    $('#ingredient-data').addClass('d-none');
    $('#area-data').addClass('d-none');
    $(ingredientData).addClass('d-none');
    $('#cat-data').addClass('d-none');
    contactDiv.classList.remove('d-none');

    // Add event listener for name input validation
    let nameInput = document.getElementById('formNameInput');
    nameInput.addEventListener('input', nameValidate);

    function nameValidate() {
        let nameRegex = /^[a-zA-Z\-]+$/;
        let validName = nameInput.value.match(nameRegex);
        console.log(validName);
        
        if (validName === null) {
            nameInput.after(alertParagraph);
            alertParagraph.classList.remove('d-none');
            alertParagraph.textContent ='Don\'t forget your name';
        } else {
            alertParagraph.classList.add('d-none');
            isvalid = true;
        }
    }
    const emailInput = document.querySelector('#emailInput');
    emailInput.addEventListener('input',emailValidate)
    // Add event listener for email input validation
    function emailValidate() {
        emailInput.addEventListener('input', function() {
            let email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                console.log("Valid email");
                alertParagraph.classList.add('d-none');
                isvalid = true;
            } else {
                emailInput.after(alertParagraph);
                alertParagraph.textContent = 'Wrong email format';
                alertParagraph.classList.remove('d-none');
            }
        });
    }





    // phone validate
    let phoneRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/
    let phoneInput =document.getElementById('phoneInput')
    phoneInput.addEventListener('input',validatePhone)
        function validatePhone (){
            let number = phoneInput.value
            if (phoneRegex.test(number)) {
        alertParagraph.classList.add('d-none');
        
        isvalid = true;
        
    } else {
        console.log("Invalid phone number");
        phoneInput.after(alertParagraph);
                alertParagraph.textContent = 'Wrong phone';
                alertParagraph.classList.remove('d-none');
    }
        }


//          age valid 
const ageInput = document.getElementById('ageInput');
ageInput.addEventListener('input', validateAge);

function validateAge() {
    let age = parseInt(ageInput.value.trim(), 10); // Parse age input as an integer
    if (age < 5) {
        ageInput.after(alertParagraph);
                alertParagraph.textContent = 'age Restricted';
                alertParagraph.classList.remove('d-none');
    } else {
        alertParagraph.classList.add('d-none');
        
        isvalid = true;
    }
}

//  password validate


const passwordInput = document.getElementById('passwordInput');
passwordInput.addEventListener('input', validatePassword);

function validatePassword() {
    let password = passwordInput.value.trim();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (passwordRegex.test(password)) {
        alertParagraph.classList.add('d-none');
        isvalid = true;
        
    } else {
        passwordInput.after(alertParagraph);
                alertParagraph.textContent = 'Enter valid password *Minimum eight characters, at least one letter and one number:*';
                alertParagraph.classList.remove('d-none');
    }
}

const rePasswordInput = document.getElementById('rePasswordInput');

rePasswordInput.addEventListener('input', validatePasswords);

function validatePasswords() {
    let password = passwordInput.value.trim();
    let rePassword = rePasswordInput.value.trim();

    if (password === rePassword) {
        alertParagraph.classList.add('d-none');
        isvalid = true;
    } else {
        rePasswordInput.after(alertParagraph);
                alertParagraph.textContent = 'Password doesn\'t match ';
                alertParagraph.classList.remove('d-none');
    }
}

let submitBtn = document.getElementById('submitBtn')

let inputs =document.querySelectorAll('.contact input')
inputs.forEach(input => {
    if (isvalid == true){
        submitBtn.removeAttribute("disabled")
    }else {
        submitBtn.setAttribute("disabled", true)
    }
})












});
