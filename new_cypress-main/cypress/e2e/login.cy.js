import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"
describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
           });

    it('Проверку на позитивный кейс авторизации', function () {
    cy.get(main_page.email).type(data.login); // Ввести правильный логин
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); // Нажать войти

    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверка, что получил нужный текст
    
  })

    it('Написать автотест на проверку логики восстановления пароля', function () {
    cy.get(main_page.fogot_pass_btn).click(); // Нажать «Забыли пароль»
    cy.get(recovery_page.email).type('senor.mafini2017@yandex.ru'); //  Ввести любой имейл
    cy.get(recovery_page.send_button).click(); // Нажать на кнопку отправить код

    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверка, что получили нужный текст

  })

    it('Напиши проверку на негативный кейс авторизации', function () {
    cy.get(main_page.email).type(data.login); //Ввести правильный логин
    cy.get(main_page.password).type('qa_one_love7'); // Ввести НЕправильный пароль
    cy.get(main_page.login_button).click(); // Нажать войти

    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить нужный текст 

  })

    it('Напиши проверку на негативный кейс авторизации', function () {
    cy.get(main_page.email).type('german@dolinikov.ru');//Ввести НЕправильный логин
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); //Нажать войти

    cy.get(result_page.title).contains('Такого логина или пароля нет') // Проверить нужный текст 

    
  })

    it('Напиши проверку на негативный кейс валидации', function () {
    cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); //Нажать войти

    cy.get(result_page.title).contains('Нужно исправить проблему валидации') // Проверить, что получаем текст с ошибкой 
 
  })
    
    it('Напиши проверку на приведение к строчным буквам в логине', function () {
    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввести логин GerMan@Dolnikov.ru
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); //Нажать войти

    cy.get(result_page.title).contains('Такого логина и пароля нет') // Проверить, что получаем текст с ошибкой

})

})