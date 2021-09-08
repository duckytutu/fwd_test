# Insurance premium calculation

## Web app

### React query

Reference from dev.to and medium.com, I used react-query instead of redux

- [React Query official](https://react-query.tanstack.com/)
- [Why I stopped using redux](https://dev.to/g_abud/why-i-quit-redux-1knl)
- [Moving to react-query](https://medium.com/inside-personio/moving-to-react-query-462f8e5811b6)

```js
const queryClient = useQueryClient();
const { mutate, isLoading } = useMutation(
  "getProduct",
  ProductService.getProduct,
  {
    onSuccess: (data) => {
      const quotationProductList = get(data, "quotationProductList");
      if (quotationProductList) {
        setQuotationProducts(quotationProductList);
      }
    },
    onError: () => {
      // alert("There was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("getProduct");
    },
  }
);
```

If using redux, we need to configure store, actions, sagas, use selector to get data. With react-query, we only need to use useQuery, or useMutation ... hooks.

## UI Automation test

### Cucumber

<pre>
Feature: Performing insurance calculation

Background:
    Given The user in on demo page

Scenario: Calculate sum assured by premium
    When calculate sum assured by premium
        | genderCd | dob         | planCode  | paymentFrequency  | premiumPerYear    |
        | FEMALE   | 1983/02/21  | T11A20    | YEARLY            | 30000             |
    And click on Calculate button
    Then Show list quotation product base on annual premium
</pre>

## Bff server

### Express
