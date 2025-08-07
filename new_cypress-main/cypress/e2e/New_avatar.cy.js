import * as data from "../helpers/def_data.json"

describe('Проверка покупки нового аватара', function () { 
    it('Верный логин и верный пароль', function () { 
         cy.visit('https://pokemonbattle.ru/'); // Переходим на сайт  
         cy.get('#k_email').type(data.login); // Вводим правильный логин
         cy.get('#k_password').type(data.password); // Вводим правильный пароль
         cy.get('.MuiButton-root').click(); // Нажать  кнопку войти
         cy.wait(2000); 
         cy.get('.header_card_trainer').click();  // Клик в шапке на аву тренера
         cy.wait(2000);
         cy.get('[data-qa="shop"]').click(); // Нажимаем кнопку смена аватара
         cy.get('.available > button').first().click(); 
         cy.wait(2000);
         cy.get('.payment_receipt_open_button_icon').click(); //  Нажимаем в первом окне на стрелочку, проверить, что раскрывается информация
         cy.get(':nth-child(2) > a').should('have.css', 'color', 'rgb(85, 137, 241)'); // Проверить цвет сайта pokemonbattle.ru
         cy.get(':nth-child(2) > a').click(); // Нажимаем на ссылку и проверяем, что переходим в магазин
         cy.wait(2000);
         cy.go('back'); // Проверить, что делает шаг назад
         cy.get('.card_number').type('4111111111111111'); // Ввести в поле "Номер", номер карты
         cy.get(':nth-child(1) > .style_1_base_input').type('1025'); // В поле "Срок" ввести месяц и год
         cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125'); // В поле "Код", ввести  код
         cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('Name'); // Ввести в поле "Имя", данные пользователя
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажимаем на кнопку оплатить
         cy.get('.style_1_base_input').type('56456'); // Ввести в поле "Код из пуша или от СМС"
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Подтвердить оплату нажав на кнопку оплатить
         cy.get('.payment_status_back_img').click(); // Проверяем наличие и видимость сообщения об успешной покупке, нажимаем "Вернуться в магазин"
     })
 });