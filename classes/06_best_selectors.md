Находим лучшие селекторы 👇

* Научимся находить лучшие селекторы для UI элементов
* Изучим **лучшие практики** и **анти-паттерны** при составлении селекторов

# 🙋‍♂️ Перед началом

* У Вас выключен VPN
* У Вас выключен все возможные блокираторы рекламы или контента
* У Вас закрыты все `лишние вкладки` в браузере
* У Вас открываются сайты:
  * https://nodejs.org/
  * https://www.npmjs.com/
  * https://github.com/
  * https://raw.githubusercontent.com/
* Вы установили `NodeJS` и `Visual Code`
* Вы инициалировали чистый проект в папке `%/projects/cypress/best_selectors`
* Вы установили `Cypress` в проект
* `Cypress` запускается через терминал

Выполните 1-4 шаг из мастер-класса [Первый полет на `Cypress`](04_cypress_test_flight.md)

Если не получилось 🙀 пишите в канал поддержки https://chat.epic1h.com/

# 🔢 Шаги

## 1. Подготовка локального [Веб-сервера](https://ru.wikipedia.org/wiki/Веб-сервер)

Установим через терминал пакет `npm install tiny-server`

В `package.json` добавляем команду `start` в раздел `scripts` для запуска сервера:

```json
...
  "scripts": {
    "start": "tiny-server",
    "cypress": "cypress",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
...
```

<details>
  <summary>Ничего не понятно 🤔</summary>
  <p></p>

  Это можно и не делать, но запускать `tiny-server` через `./node_modules/.bin/tiny-server` длинно.
  
</details>

`start` — это зашитая команда в `npm`

Можно запускать команду не только `npm run start`, а короче `npm start`

## 2. Скачаем тестовое приложение

Что бы скачать файлы тестового приложения установим утилиту [Wget](https://ru.wikipedia.org/wiki/Wget) через терминал `npm install node-wget`

И снова, для удобства в `package.json` добавляем команду `wget` в раздел `scripts`:

```json
...
  "scripts": {
    "start": "tiny-server",
    "cypress": "cypress",
    "wget": "wget",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
...
```
Создаем папку `apps` в корне проекта.

В терминале выполняем команду:
```bash
npm run wget -- -d apps/ https://raw.githubusercontent.com/breslavsky/hello-cypress/main/apps/tesla.html
```

Проверяем, что появился файл `~/apps/tesla.html`

`~` — так обозначается путь до корневой папки проекта.

<details>
  <summary>Как поиграться с wget 🤟</summary>
  <p></p>

  Скачаем `Google` в терминале `npm run wget -- -d google.html https://google.com/`

  В корне проекта должен появится файл `google.html`, что там?

</details>

## 3. Запускаем WEB-приложение

В терминале выполняем команду `npm start`

Открываем в `Chrome` URL http://localhost:3000

Видим список файлов, открываем файл `apps/tesla.html`

## 4. Запускаем тест приложения

Создаем файл `cypress/integration/best-selectors.spec.js`

```javascript
describe('Регистрация', () => {

it('зарегистрироваться', () => { 
cy.visit('http://localhost:3000/apps/tesla.html'); 
});

});
```

🔥 Не забывайте форматировать код и сохранять файл!

Открываем `Терминал` → `Новый терминал`

Запускаем `Cypress` через терминал `npm run cypress open`

В окне `Cypress` выбираем наш тест `best-selectors.spec.js`

## 5. Ищем селекторы

Активируем `Selector Playground` 

<img width="200" src="../img/selector_playground.png">

Наводим на поле `Фамилия` и копируем код селектора.

Обновляем код теста:
```javascript
describe('Регистрация', () => {

    it('зарегистрироваться', () => {
        cy.visit('http://localhost:3000/apps/tesla.html');
        cy.get('#b1h7e4i8d3')
            .type('Иванов');
    });

});
```

Смотрим в `Cypress` что тест не проходит! И не пройдет никогда 🤷‍♂️

Селектор поля меняется 🥴 динамически при каждом запуске приложения.

**❗ Следует писать устойчивые к изменениям селекторы!**

> ⭕ **Анти-паттерн**
>
> Использование очень **хрупких** селекторов, которые могут быть изменены.

Пример — [`хеш`](https://ru.wikipedia.org/wiki/Хеш-функция) элемента который может поменяться после новой сборки:

```html
<button id="zIyPEZ0bf">Продолжить</button>
```

> 👍 **Лучшая практика**
>
> Использование атрибутов [`data-`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), чтобы предоставить **контекст** вашим селекторам и изолировать их от изменений `CSS` или `JS`

```html
<button data-cy="register">Продолжить</button>
```

```javascript
cy.get('[data-cy=register]').click();
```

**❗ Тестируйте только то, что Вы можете контролировать!**

> ⭕ **Анти-паттерн**
>
> Пытаться тестировать сайт или приложение, которые Вы не контролируете.

> 👍 **Лучшая практика**
>
> Работать совместно с разработчиками сайта или приложения которое тестируется. 
> Попросите разработчиков добавить специальные `data-` атрибуты в HTML разметку.

Если Вы не контролируете приложение Вы можете столкнуться с проблемами:
* Появится [капча](https://ru.wikipedia.org/wiki/Капча) как защита от ботов.
* Структура элементов может меняться в зависимости от неизвестных факторов.
* Ваш IP просто заблокируют как бота.
* Приложение может определить, что его открыли через тестовую оболочку и не запуститься.

## Поиск лучшего селектора

Попробуйте через `Selector Playground` найти селекторы для:
* Элемента с текстом `Все права защищены` &rarr; `body > :nth-child(1) > :nth-child(4)`
* Кнопки `Сбросить` на форме регистрации &rarr; `#k9b1c2e4b1 > [data-cy="reset"]`

Это плохие селекторы, встроенный `Selector Playground` в `Cypress` не справляется, в топку!

Теперь всегда ищем селекторы через [Инструменты разработчика в Chrome](https://www.youtube.com/watch?v=LDJMfzTlkSI)

В окне нашего приложения:
* Нажимаем правой кнопкой мышки на нужном элементе.
* Выбираем из меню `Просмотр кода элемента`

❓ Что Вы видите?

> С помощью тэгов `HTML` и стилей `CSS` рисуется пользовательский интерфейс.

### Лучший селектор:
1. Не изменяемый — **устойчивый** к обновляениям приложения.
2. Понятный — можно прочитать на **естественном** языке: Поле `Фамилия` на `Форме регистации пользователя` 
3. Короткий — задействует как можно **меньше элементов** и их атрибутов в иерархии.

## 6. Тест формы регистрации

Задача: написать **тест кейс** `зарегистрироваться` в **тест сьютe** `Регистрация` с шагами:
1. Заполнить поле `Имя`
2. Заполнить поле `Фамилию`
3. Заполнить поле `Email`
4. Заполнить поле `Пароль`
5. Нажать кнопку `Продолжить`

Нажмите правой кнопкой мышки на поле `Имя`

❓ Какой селектор использовать?

**Нужно найти уникальный или семантический атрибут или класс для привязки к элементу.**
> Для тэгов `input` внутри одной формы атрибуты `name` являются уникальными.
>
> Для тэгов `button` атрибуты `type=reset` и `type=submit` определяют семантику действия.

В нашем случае для поля `Имя` это `[name=first_name]`

Для проверки селектора переключитесь на `Консоль`

В строку запроса введите `$$('[name=first_name]')` и нажмите `ENTER ↵`

❓ Найден 1 элемент? **Селектор уникален.**

Добавьте в код теста:

```javascript
cy.get('[name=first_name]').type('Иван');
```

Проверьте в `Cypress`, что тест проходит.

Найдите аналогично селектор и заполните:
* поле `Фамилия`
* поле `Email` 

❓ Сколько найдено элементов для поля `Email`

`$$('[name=email]')` — cелектор для поля `Email` не уникален!

На странице 2 формы `Регистрация` и `Вход` и на каждой из них есть поле `Email`

❓ Что делать? Добавить `Контекст`

### `Контекст` в селекторе

 `Контекст` для элемента: форма, группа, раздел — некоторая уникальная область интерфейса.

 ### Как найти `Контекст`
 * Ищем в иерархии элемента [`семантические`](https://msiter.ru/tutorials/html5/semantic_elements) тэги `form`, `fieldset`, `header`, `footer`, `nav`, `aside`, `article`, `details`, `section`
* Не смогли? Ищем `НЕ семантические` теги: `div`, `span`, `p` с семантическими `атрибутами` или классами.

Примеры хороших 👍 контекстов:
* `aside[data-type=left]` — ищем боковую панель слева.
* `form.registration` — маловероятно, что на одной странице 2 формы регистрации.
* `#registration` — уникальный ID элемента.
* `.registration` — семантически класс `registration` уникален.
* `[data-type=registration]` — специальный `data` атрибут добавленный разработчиками.
* `.app-header .app-userbar` — префикс `.app-` в имени класса делает элементы уникальными.

Примеры плохих ⭕ контекстов:
* `aside` — в приложении может быть 2 панели: справа и слева.
* `form` — на одной странице может быть несколько форм.
* `.header` — класс не укален.
* `fieldset[name=credentials]` — на форме могут быть 2 формы с одинаковой группой полей.

**🔥 Необходимо добавлять контекст к селекторам элементов!**

Примеры хороших 👍 селекторов:
* `form.registration input[name=first_name]` — конкретное поле на конкретной форме.
* `form[name=registration] button[type=submit]` — кнопка с конкретным поведением на форме.
* `form[name=registration] button.register` — уникальная кнопка на форме.
* `aside[data-type=left] .menu a:nth-child(1)` — в левой панели в меню первый пункт.

Примеры плохих ⭕ контекстов:
* `form.registration input[type=text]` — полей с типом текст может быть много.
* `form[name=registration] button` — что делает кнопка?

Будет дополнено...

Найдите `Контекст` для всех полей формы обновите код теста.

Сверьте свой исходный код с [примером](integration/../cypress/integration/best-selectors.spec.js)

## 7. Тест формы входа

Напишите **тест кейс** `вход по email` в **тест сьютe** `Вход` с шагами:

Сверьте свой исходный код с [примером](integration/../cypress/integration/best-selectors.spec.js)

## 8. Селектор по `contains`

Элементы в `Cypress` можно находить еше по текстовому содержимому тегов.

Замените селектор `cy.get('form.login [type=submit]')` на `cy.contains('Войти')`

В чем **опасность** такого подхода?

Переключите язык приложения добавлением параметра `lang` в URL:
```javascript
cy.visit('http://localhost:3000/apps/tesla.html?lang=en');
```

Тест больше не проходит, почему?

# Что дальше?

Улучши селекторы в своих проектах 😉

# Частые вопросы

**🔥 Что делать если нельзя найти хороший селектор?**

Использовать селектор который есть и поставить **задачу разработчикам** на добавления атрибута `data-cy`

Текущая разметка:

```html
<body>
  <div>
    <footer>
      <p>Все права защищены</p>
    </footer>
  </div>
<body>
```

Пишем в тесте:

```javascript
// TODO: улучшить селектор
// временно используем contains
cy.contains('Все права защищены').should('be.visible');
// или строгую иерархию
cy.get('body > div > footer p').should('have.text', 'Все права защищены');
```

Обновленная разработчиками разметка:

```html
<body>
  <div>
    <footer>
      <p data-cy="copyrights">Все права защищены</p>
    </footer>
  </div>
<body>
```

Обновленный тест:

```javascript
cy.get('[data-cy=copyrights]').should('have.text', 'Все права защищены');
```

# Артефакты

* [Лучшие практики `Cypress` на официальном сайте](https://docs.cypress.io/guides/references/best-practices)
* [Все типы `CSS` селекторов](https://www.w3schools.com/cssref/css_selectors.asp)