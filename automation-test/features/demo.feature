Feature: Performing insurance calculation

Background:
    Given The user in on demo page

Scenario: Calculate sum assured by premium
    When calculate sum assured by premium
        | genderCd | dob         | planCode  | paymentFrequency  | premiumPerYear    |
        | FEMALE   | 1983/02/21  | T11A20    | YEARLY            | 30000             |
    And click on Calculate button
    Then Show list quotation product base on annual premium
