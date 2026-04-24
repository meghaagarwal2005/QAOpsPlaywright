Feature: ECommerce Validations

    @Regression
    Scenario: Placing an order
        Given a login to Ecommerce application with "meghaagarwal2005@gmail.com" and "Password-1"
        When add "ZARA COAT 3" to cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When enter valid details and place the order
        Then verify order is present in the OrderHistory

    @Validations
    Scenario Outline: Placing an order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message is displayed for invalid product in the cart

        Examples:
            | username | password          |
            | Rahul    | Learning@830$3mK2 |
            | Rahuwl   | Learning@830$3mK  |

