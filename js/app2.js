const main = document.querySelector('.main')
const mainDeleteAll = document.querySelector('.main__delete-all')


window.addEventListener('storage', () => {
    if (localStorage.getItem('key')) {

        localStorage.removeItem('key')

        // создание карточки
        makeCard()

        // получаем элемент с данными, что заполнить карточку
        const sendCounterHistory = Number(localStorage.getItem('sendCounter'))

        // получаем id из объекта в localStorage и присваиваем это id в html
        let idForMainForm = Number(JSON.parse(localStorage.getItem(`personData${sendCounterHistory}`)).id)
        const mainForm = document.querySelector('.main__form')
        mainForm.id = `${idForMainForm}`

        // получаем элементы из html и заполняем их
        const namePut = document.querySelector('.name__put')
        const lastnamePut = document.querySelector('.lastname__put')
        const emailPut = document.querySelector('.email__put')
        const phonePut = document.querySelector('.phone__put')

        const personData = JSON.parse(localStorage.getItem(`personData${sendCounterHistory}`))
        
        setValuesInFields(personData, namePut, lastnamePut, emailPut, phonePut)
    }
})


document.addEventListener('DOMContentLoaded', () => {
    const sendCounterHistory = Number(localStorage.getItem('sendCounter'))
    // условие >= 2 означает то, что если в localStorage один элемент sendCounter, то никаких действия выполнять не нужно
    if (localStorage.length >= 2) {
        for (let i = 1; i <= sendCounterHistory;) {
            // если в хранилище нет объекта с номером i, то просто идём дальше
            if (!localStorage.getItem(`personData${i}`)) {
                i += 1
            }else {
                // создание карточки
                makeCard()
                // получаем элемент с данными, чтобы заполнить карточку
                const personData = JSON.parse(localStorage.getItem(`personData${i}`))

                // получаем id из объекта в localStorage и присваиваем это id в html
                const mainForm = document.querySelector('.main__form')
                let idForMainForm = Number(JSON.parse(localStorage.getItem(`personData${i}`)).id)
                mainForm.id = `${idForMainForm}`

                // получаем элементы из html и заполняем их
                const namePut = document.querySelector('.name__put')
                const lastnamePut = document.querySelector('.lastname__put')
                const emailPut = document.querySelector('.email__put')
                const phonePut = document.querySelector('.phone__put')
                // namePut.innerHTML = personData.name
                // lastnamePut.innerHTML = personData.lastname
                // emailPut.innerHTML = personData.email
                // phonePut.innerHTML = personData.phone
                setValuesInFields(personData, namePut, lastnamePut, emailPut, phonePut)
                i += 1
            } 
        }
    }
})

// Кнопка для удаления формы и кнопка для удаления всех форм
document.addEventListener('click', (e) => {

    const deleteButton = document.querySelector('.form__button')

    if (e.target.closest('.form__button')) {
        // получение id из элемента из localStorage, это нужно, чтобы удалить правильную карточку 
        localStorage.removeItem(`personData${deleteButton.parentElement.id}`)
        deleteButton.parentElement.remove()
    }

    if (e.target.closest('.main__delete-all')) {
        localStorage.clear()
        mainDeleteAll.nextElementSibling.remove()
    }
})


// функция для добавления карточки с данными
function makeCard () {
    mainDeleteAll.nextElementSibling.insertAdjacentHTML('afterbegin',
    `<div class="main__form">
        <div class="form__name form__item">
            <h3>Name</h3>
            <p class="name__put put"></p>
        </div>
        <div class="form__last-name form__item">
            <h3>Lastname</h3>
            <p class="lastname__put put"></p>
        </div>
        <div class="form__email form__item">
            <h3>E-mail</h3>
            <p class="email__put put"></p>
        </div>
        <div class="form__phone form__item">
            <h3>Phone number</h3>
            <p class="phone__put put"></p>
        </div>
        <button class="form__button" type="delete-button">Delete</button>
    </div>`)
}


function setValuesInFields (personData, namePut, lastnamePut, emailPut, phonePut) {
    namePut.innerHTML = personData.name
    lastnamePut.innerHTML = personData.lastname
    emailPut.innerHTML = personData.email
    phonePut.innerHTML = personData.phone
}