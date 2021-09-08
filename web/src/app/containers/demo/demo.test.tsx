import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import first from "lodash/first";
import get from "lodash/get";
import { QueryClient, QueryClientProvider } from "react-query";
import { GetProductParams } from "../../../types/request";
import Demo from "./index";

const defaultParams: GetProductParams = {
  genderCd: "FEMALE",
  dob: "1983-02-21",
  planCode: "T11A20",
  premiumPerYear: 30000,
  paymentFrequency: "YEARLY",
};

describe("Demo", () => {
  test("renders empty list", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Demo />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("No record found.")).toBeInTheDocument();
    });
  });

  test("loading product", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Demo />
      </QueryClientProvider>
    );

    const calculateButton = await screen.findByText("Calculate");

    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  test("test load product success", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Demo defaultParams={defaultParams} />
      </QueryClientProvider>
    );

    const calculateButton = await screen.findByText("Calculate");

    fireEvent.click(calculateButton);

    await waitFor(() => {
      const mutationCaches = queryClient
        .getMutationCache()
        .findAll({ mutationKey: "getProduct" });
      expect(mutationCaches?.length).toBeTruthy();
      expect(
        get(first(mutationCaches)?.state.data, "quotationProductList")
      ).toBeDefined();
    });
  });
});
