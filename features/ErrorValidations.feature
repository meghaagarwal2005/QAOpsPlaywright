Feature: ECommerce Validations

    @Validations
    Scenario Outline: Placing an order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then verify error message is displayed for invalid product in the cart
        
        Examples:
            | username | password            |
            | Rahul  | Learning@830$3mK2 |
            | Rahuwl | Learning@830$3mK  |

