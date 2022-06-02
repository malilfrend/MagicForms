// получанием input'ов из html
const emailInput = document.getElementById('email__input')
const nameInput = document.querySelector('#name__input')
const lastNameInput = document.querySelector('#last-name__input')
const phoneInput = document.querySelector('#phone__input')
// Счётчик отправки форм
let sendCounter = 0

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
    // Если поля поля пустые, то форма не отправится
    const objectData = {}
    if (nameInput.value === '' || lastNameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
        event.preventDefault()
        localStorage.removeItem(`personData${sendCounter+1}`)
    }else {
        // если всё заполнено, то просто отправляем форму и поля делаем пустыми
        nameInput.value = ''
        lastNameInput.value = ''
        emailInput.value = ''
        phoneInput.value = ''
        // увеличиваем счётчик отправок
        sendCounter += 1
        // заполняем объект данными из localStorage 
        objectData.name = localStorage.getItem('name')
        objectData.lastname = localStorage.getItem('lastname')
        objectData.email = localStorage.getItem('email')
        objectData.phone = localStorage.getItem('phone')
        objectData.id = sendCounter
        // заносим в localStorage 
        localStorage.setItem('sendCounter', sendCounter)
        localStorage.setItem(`personData${sendCounter}`, JSON.stringify(objectData))
        // используется для "связи" двух js файлов
        localStorage.setItem('key', 'key')
    }
    
    // очищаем поля в localStorage    
    localStorage.removeItem('name')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')

})

sendCounter = Number(localStorage.getItem('sendCounter'))
// удаление предупреждающего объявления под email и name и lastname
emailInput.addEventListener('focus', function (e) {
    if (emailInput.nextElementSibling) {
        emailInput.nextElementSibling.remove()
    }
})
nameInput.addEventListener('focus', function (e) {
    if (nameInput.nextElementSibling) {
        nameInput.nextElementSibling.remove()
    }
})
lastNameInput.addEventListener('focus', function (e) {
    if (lastNameInput.nextElementSibling) {
        lastNameInput.nextElementSibling.remove()
    }
})

// функция проверки email
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


// При потере фокуса запись в хранилище
nameInput.addEventListener('blur', () => {
    localStorage.setItem('name', nameInput.value)
})
lastNameInput.addEventListener('blur', () => {
    localStorage.setItem('lastname', lastNameInput.value)
})
emailInput.addEventListener('blur', () => {
    localStorage.setItem('email', emailInput.value)
})
phoneInput.addEventListener('blur', () => {
    localStorage.setItem('phone', phoneInput.value)
})



// после перезгрузки заполенение полей формы данными из localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (!nameInput.value) {
        nameInput.value = localStorage.getItem('name')
    }
    if (!lastNameInput.value) {
        lastNameInput.value = localStorage.getItem('lastname')
    }
    if (!emailInput.value) {
        emailInput.value = localStorage.getItem('email')
    }
    if (!phoneInput.value) {
        phoneInput.value = localStorage.getItem('phone')
    }
})

