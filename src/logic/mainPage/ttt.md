Feedback
Include an "Add to Cart" button on each product card
Points for criteria: 10/10
Integrate the Catalog Product page with the chosen API (commercetools or any other simple API) to enable users to add products to their shopping cart directly from the product list
Comment:
3 раза запрашивается корзина - избыточно

https://disk.yandex.ru/i/ItJpUilXZnKjjg

Points for criteria: 35/35
Implement lazy loading, pagination, or infinite scroll to efficiently load and display a large number of products without significant delays or performance issues, leveraging the commercetools API for product data retrieval
Comment:
Не стала снимать баллы, т.к выполнен лейзи лоад на картинках, но реализация, на мой взгляд, не самая удачная, т.к. вы запрашиваете всё равно все товары. У вас, конечно, их всего 20, и JSON много не весит (само собой), но если бы это были тысячи товаров, то скорее всего загрузка сразу всех на страницу - не самое оптимальное решение. Особенно учитывая, что бэк предоставляет возможность подгружать товары частями.

Points for criteria: 25/25
If the product is not already in the user's shopping cart, provide an "Add to Cart" button that adds the product with the selected options to their cart using the commercetools API
Points for criteria: 15/15
If the product is already in the user's shopping cart, provide a "Remove from Cart" button that allows users to remove the product from their cart using the commercetools API
Comment:
Не выполнен последний пункт из ✅🎯 Acceptance Criteria, т.к. нет никакого уведомления юзеру о том, что удаление не удалось

- [x] The application correctly identifies whether a product is already in the user's shopping cart when viewing the product page.

- [x] If the product is already in the shopping cart, a "Remove from Cart" button is visible and active on the product page.

- [x] Clicking the "Remove from Cart" button triggers an API call to remove the corresponding product from the user's shopping cart.

- [x] After successful removal, the user receives a confirmation message or visual cue.

- [ ] The application handles API errors gracefully, showing appropriate error messages if the removal operation fails.

https://disk.yandex.ru/i/y_UfMtlFaXcrfw

Points for criteria: 12/15
Use the commercetools API to fetch and display the list of items added to the basket along with essential details such as the name, image, and price
Points for criteria: 25/25
Allow users to modify the quantity of each product in the cart, updating the corresponding data using the commercetools API and recalculating the total cost accordingly
Points for criteria: 15/15
Provide a "Remove from Cart" button for each product, enabling users to delete items from the cart and updating the cart data using the commercetools API
Points for criteria: 15/15
Automatically recalculate the total cost of the items in the shopping cart when users modify product quantities or remove items from the cart, using the updated data from the commercetools API
Points for criteria: 15/15
When the shopping cart is empty, display a clear message indicating the cart is empty
Points for criteria: 5/5
Provide a link to the catalog of products within the empty cart message, guiding users to easily continue shopping and explore other parts of the website
Points for criteria: 5/5
Implement a feature that allows users to apply a promo code to their order, offering discounts on eligible items, and updating the total cost of the cart accordingly using the commercetools API
Comment:
при первом применении FOOD10 приходит уведомление, что промокод не применён

https://disk.yandex.ru/i/7pg-CMukbuUitA

https://disk.yandex.ru/i/bKyUQHh7xbygAQ

потом написано что код FOOD10 применен, в корзине вижу 2 кода в поле discountCodes. И до применения TOY15 скидка на еде была видна. Но после применения TOY15 на еде скидки больше нет. Добавляю еще раз FOOD10 - ответ положительный - а скидки не видно

https://disk.yandex.ru/i/ee7-6qT4NhyuIQ

за это баллы не снимала, но имхо совсем не юзер френдли делать промокод нарисованным текстом без возможности хоть как-то его скопировать

Соответственно, не выполнены 2 последних пункта ✅🎯 Acceptance Criteria

- [x] The main page displays active promo codes 🎫.

- [x] The cart includes an input field for promo codes and an 'Apply' button ✔️.

- [ ] When a valid promo code is entered and the 'Apply' button is clicked, the total cost of the cart is updated to reflect the discount associated with the promo code 💰.

- [ ] The total cost of the cart, including any discounts from promo codes, is calculated and displayed correctly 💲.

Points for criteria: 7.5/15
Display both the original price and the discounted price after applying the promo code, ensuring that the two prices are visually distinct
Comment:
По сценарию, описанному выше, при применении промокода не всегда показывается старая/новая цена, соответсвенно, не выполнен первый пункт ✅🎯 Acceptance Criteria

- [ ] Both the original price 💵 and the discounted price 💰 are displayed when a promo code is applied 💸.

- [x]The two prices are visually distinct 👀.

Points for criteria: 2.5/5
Provide a "Clear Shopping Cart" button that removes all items from the user's shopping cart and updates the cart data using the commercetools API
Points for criteria: 10/10
Create a comprehensive introduction to the development team, highlighting each member's contributions to the project, their effective collaboration methods, as well as personal details such as names, roles, short bios, relevant photos, and GitHub profile links
Points for criteria: 25/25
Feature and link the RS School logo on the "About Us" page, making it visible and recognizable, and allowing users to learn more about the educational program by linking it to the school's website
Points for criteria: 10/10
Implement routing for seamless navigation to the Basket page from all other pages, ensuring that the Basket page is accessible whether the user is logged in or not and supporting browser navigation buttons
Points for criteria: 10/10
Implement routing for seamless navigation to the About Us page from all other pages, ensuring that the About Us page is accessible whether the user is logged in or not and supports browser navigation buttons
Points for criteria: 10/10
Implement a basket icon in the header navigation, providing a link to the Basket page and displaying the quantity of items in the cart
Points for criteria: 15/15
Incorporate an icon or link in the header navigation leading to the About Us page
Points for criteria: 5/5
Penalty
Absence of Responsive Application Design: If the application does not provide a responsive layout suitable for various devices and screen sizes, a penalty of 20 points will be applied. 📱🖥️🛑 -20