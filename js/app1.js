// Счётчик отправки форм
let sendCounter = 0

// получение input'ов из html
const emailInput = document.getElementById('email__input')
const nameInput = document.getElementById('name__input')
const lastNameInput = document.getElementById('last-name__input')
const phoneInput = document.getElementById('phone__input')
 


document.addEventListener('submit', function (event) {
    // Валидация email и проверка заполненности полей name и lastname
    if (emailTest(emailInput) && !emailInput.nextElementSibling) {
        emailInput.parentElement.insertAdjacentHTML(
            'beforeend',
            `<div class="main-form__error">
                Insert right e-mail
            </div> `)
    } else {
            event.preventDefault()
    }  
    if (!lastNameInput.value && !lastNameInput.nextElementSibling) {
        lastNameInput.parentElement.insertAdjacentHTML(
            'beforeend',
            `<div class="form__lastname-empty">
                It can not be empty
            </div>`
        )
    } else {
        event.preventDefault()
    }
    if (!nameInput.value && !nameInput.nextElementSibling) {
        nameInput.parentElement.insertAdjacentHTML(
            'beforeend',
            `<div class="form__name-empty">
                    It can not be empty
                 </div>`
        )
    }else {
        event.preventDefault()
    }

    const objectData = {}
    // Если поля поля пустые, то форма не отправится

    if (nameInput.value === '' || lastNameInput.value === '' || emailInput.value === '') {
        event.preventDefault()
        localStorage.removeItem(`personData${sendCounter+1}`)
    }else {
        // если всё заполнено, то просто отправляем форму и поля делаем пустыми
        setFieldsEmpty(nameInput, lastNameInput, emailInput, phoneInput)
        // увеличиваем счётчик отправок
        sendCounter += 1
        // заполняем объект данными из localStorage 
        setDataInObject(objectData)
        // заносим в localStorage 
        localStorage.setItem('sendCounter', sendCounter)
        localStorage.setItem(`personData${sendCounter}`, JSON.stringify(objectData))
        // используется для "связи" двух js файлов
        localStorage.setItem('key', 'key')
        clearLocalStorage()
    }
    
})

sendCounter = Number(localStorage.getItem('sendCounter'))

// удаление предупреждающего объявления под email и name и lastname
emailInput.addEventListener('focus', function (e) {
    removeWarning(e.target)
})
nameInput.addEventListener('focus', function (e) {
    removeWarning(e.target)
})
lastNameInput.addEventListener('focus', function (e) {
    removeWarning(e.target)
})



// слежка за изменениями в input'ах
document.addEventListener('input', e => {
    if (e.target.closest('#name__input')) {
        localStorage.setItem('name', nameInput.value)
    }
    if (e.target.closest('#last-name__input')) {
        localStorage.setItem('lastname', lastNameInput.value)
    }
    if (e.target.closest('#email__input')) {
        localStorage.setItem('email', emailInput.value)
    }
    if (e.target.closest('#phone__input')) {
        localStorage.setItem('phone', phoneInput.value)
    }
})

// после перезагрузки заполенение полей формы данными из localStorage
document.addEventListener('DOMContentLoaded', () => {
    setValuesInFields(nameInput, lastNameInput, emailInput, phoneInput)
})

// функция проверки email
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// очищаем поля в localStorage
function clearLocalStorage() {     
    localStorage.removeItem('name')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
}


function setValuesInFields(name, lastname, email, phone) {
    name.value = localStorage.getItem('name')
    lastname.value = localStorage.getItem('lastname')
    email.value = localStorage.getItem('email')
    phone.value = localStorage.getItem('phone')
}

function setDataInObject (object) {
    object.name = localStorage.getItem('name')
    object.lastname = localStorage.getItem('lastname')
    object.email = localStorage.getItem('email')
    object.phone = localStorage.getItem('phone')
    object.id = sendCounter
}

function setFieldsEmpty (name, lastname, email, phone) {
    name.value = ''
    lastname.value = ''
    email.value = ''
    phone.value = ''
}

function removeWarning (elem) {
    if (elem.nextElementSibling) {
        elem.nextElementSibling.remove()
    }
}