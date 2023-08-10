# HelpDesk frontend
npm

[![Build status](https://ci.appveyor.com/api/projects/status/wveohbh2rfpc6xkt?svg=true)](https://ci.appveyor.com/project/0anastasia/helpdesk-f)

https://0anastasia.github.io/HelpDesk-f/

<a href="[https://github.com/Sergius92739/ahj-7.1-http_backend](https://0anastasia.github.io/HelpDesk-f/)">Github Pages</a>

#### Описание

Описание API. Для хранения данных мы будем оперировать следующими структурами:

```javascript
Ticket {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    status // boolean - сделано или нет
    description // полное описание
    created // дата создания (timestamp)
}
```

Примеры запросов:
* `GET    ?method=allTickets`           - список тикетов
* `GET    ?method=ticketById&id=<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* `POST   ?method=createTicket`         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)

Соответственно:
* `POST   ?method=createTicket`         - в теле запроса форма с полями для объекта типа `Ticket` (с `id` = `null`)
* `POST   ?method=updateById&id=<id>` - в теле запроса форма с полями для обновления объекта типа `Ticket` по `id`
* `GET    ?method=allTickets `          - массив объектов типа `Ticket` (т.е. без `description`)
* `GET    ?method=ticketById&id=<id>` - объект типа `Ticket`
* `GET    ?method=deleteById&id=<id>` - удалить объект типа `Ticket` по `id`, при успешном запросе статус ответа 204

Код ниже позволит обработать полученный ответ от сервера во Frontend:
```js
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});
```

### HelpDesk: Frontend

#### Легенда

API готово, пора приступить к своим прямым обязанностям - написанию фронтенда, который будет с этим API работать.

#### Описание

Общий вид списка тикетов (должны загружаться с сервера в формате JSON):

![](./pic/helpdesk.png)

Модальное окно добавления нового тикета (вызывается по кнопке "Добавить тикет" в правом верхнем углу):

![](./pic/helpdesk-2.png)

Модальное окно редактирования существующего тикета (вызвается по кнопке с иконкой "✎" - карандашик):

![](./pic/helpdesk-3.png)

Модальное окно подтверждения удаления (вызывается по кнопке с иконкой "x" - крестик):

![](./pic/helpdesk-4.png)

Для просмотра деталей тикета нужно нажать на тело тикета (но не на кнопки - "сделано", "редактировать" или "удалить"):

![](./pic/helpdesk-5.png)

Ваше приложение должно реализовывать следующий функционал:
* Отображение всех тикетов
* Создание нового тикета
* Удаление тикета
* Изменение тикета
* Получение подробного описание тикета
* Отметка о выполнении каждого тикета

Весь этот функционал должен быть связан с сервером через методы. Например, для удаления нужно отправить запрос с соответствующим методом, получить подтверждение и подтянуть обновлённый список тасков.

В качестве бонуса можете отображать какую-нибудь иконку загрузки (см. https://loading.io) на время подгрузки.

Авто-тесты к данной задаче не требуются. Все данные и изменения должны браться/сохраняться на сервере.

<details>
<summary>Заметка</summary>
    
Для получения данных с сервера вы можете использовать [XMLHttpRequest](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) или [fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch). Мы рекомендуем в fetch, но выбор остаётся за вами.
</details>

P.S. Подгрузка подробного описания специально организована в виде отдельного запроса. Мы понимаем, что на малых объёмах информации нет смысла делать её отдельно.
