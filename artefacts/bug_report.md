# 🐞 Отчет об ошибке в приложении iBank

* **Номер**: 1
* **Наименование**: Орфографическая ошибка в слове
* **Дата обнаружения:** 1 января 2022, вторник в 10:00
* **Проект:** Веб-приложение iBank https://qa.epic1h.com/
* **Номер версии:** 1.0
* **Компонент:** Форма входа в приложение
* **Тип:** Ошибка в тексте
* **Серьезность:** 🟢 незначительная
* **Приоритет:** 🟢 низкий

<details>
   <summary>Справка ❓</summary>

* **Номер** — уникальный порядковый номер ошибки
* **Наименование** — что за ошибка? где ошибка?
* **Дата обнаружения** — точное дата и время когда первый раз ошибка найдена
* **Проект** — полное название проекта
* **Номер версии** — на какой версии проблема найдена
* **Компонент** — страница, форма, раздел, область интерфейса или функция
* **Серьезность:**
  * 🔴 Блокирующая — работа всех функций приложения не возможна
  * 🟠 Критическая — в приложении не работает **ключевая** функция
  * 🟡 Значительная — в приложении не работает одна из функций
  * 🟢 Незначительная — функция работает с недостатками
* **Приоритет:**
  * 🔴 Высокий — ошибка должна быть срочно исправлена
  * 🟡 Средний — ошибку обязательно нужно исправить
  * 🟢 Низкий — срочное решение не требуется
* **Тип:**
  * Ошибка в тексте
  * Визуальная ошибка
  * Ошибка удобства использования
  * Ошибка в работе функции
  * Ошибка безопасности
  * Ошибка совместимости

</details>

# 1. Окружение

Ошибка найдена и воспроизводится в окружении:

* **Устройство:** MacBook M1 Pro (14-inch, 2021) / 32 GB RAM
* **ОС:** macOS Monterey 12.0.1
* **Экран:** Built-in XDR Display 3024x1964
* **Браузер:** Google Chrome 100.0.4896.88 (arm64)
* **Параметры сети:** 90.187.49.33, 100MB, Vodafone Germany

<details>
   <summary>Справка ❓</summary>

* **Устройство** — посмотрите этикетки на вашем системном блоке или ноутбуке
* **ОС** — посмотрите видео https://www.youtube.com/watch?v=VyvSqajg9C4
* **Экран** — посмотрите короткое видео https://www.youtube.com/watch?v=ak53URhvGzI
* **Браузер** — посмотрите короткое видео https://www.youtube.com/watch?v=2l5Ij77DvQk
* **Параметры сети** — зайдите на сайт https://whatismyipaddress.com/
</details>

# 2. Предварительные условия

Перед выполнением шагов для воспроизведения:
1. Открыть Веб-приложение iBank https://qa.epic1h.com
2. Сбросить Cookie и кэш в браузере для сайта.

<details>
   <summary>Справка ❓</summary>

Как нужно подготовить устройство в описанном окружении, что бы воспроизвести ошибку?

</details>

# 3. Шаги для воспроизведения

▶️ [Скриншот экрана](https://tinyurl.com/yxkduuxy)

1. Открыть главную страницу iBank `/`
2. Прокрутить страницу до нижней границы.

<details>
   <summary>Справка ❓</summary>

Какую последовательность шагов нужно выполнить для обнаружения ошибки?

</details>

# 4. Фактический результат

Пользователь видит грамматическую ошибку в слове **засчищены**.

<details>
   <summary>Справка ❓</summary>

Что фактически пользователь видит на экране? Что происходит с устройством? Что происходит с пользователем?

</details>

# 5. Ожидаемый результат

Пользователь видит правильно написанное слово **защищены**.

<details>
   <summary>Справка ❓</summary>

Что хотел бы пользователь увидеть на экране?

</details>

# 6. Мотивация

**Лучшая практика:** интерфейс пользователя не должен содержать ошибки в текстовых сообщениях.

<details>
   <summary>Справка ❓</summary>

Почему пользователь должен получить ожидаемый результат.

* Интерфейс пользователя не должен создавать визуального дискомфорта.
* Интерфейс не должен компрометировать пользователя.

</details>