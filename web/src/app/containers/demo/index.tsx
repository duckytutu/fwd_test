import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import get from "lodash/get";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { ProductService } from "../../../services";
import { GetProductParams } from "../../../types/request";
import { Product } from "../../../types/response";
import { SearchBar } from "./components/search-bar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    minHeight: 300,
    width: "80%",
    backgroundColor: "white",
    padding: 16,
  },
  resultTable: {
    marginTop: theme.spacing(3),
  },
  row: {},
}));

interface Props {
  defaultParams?: GetProductParams;
}

export default function Demo(props: Props) {
  const { defaultParams } = props;
  const classes = useStyles();
  const [quotationProducts, setQuotationProducts] = React.useState<Product[]>(
    []
  );

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

  const onGetProducts = React.useCallback((params: GetProductParams) => {
    mutate(params);
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <SearchBar onCalculate={onGetProducts} defaultParams={defaultParams} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type code</TableCell>
                <TableCell>Family code</TableCell>
                <TableCell align="right">Base sum assured</TableCell>
                <TableCell align="right">Base annual premium</TableCell>
                <TableCell align="right">Product term</TableCell>
                <TableCell align="right">Premium paying term</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotationProducts.length > 0 ? (
                <>
                  {quotationProducts.map((row) => (
                    <TableRow key={row.productId} className={classes.row}>
                      <TableCell component="th" scope="row">
                        {row.productId}
                      </TableCell>
                      <TableCell>{row.productTypeCd}</TableCell>
                      <TableCell>{row.productFamilyCd}</TableCell>
                      <TableCell align="right">{row.baseSumAssured}</TableCell>
                      <TableCell align="right">
                        {row.baseAnnualPremium}
                      </TableCell>
                      <TableCell align="right">{row.productTerm}</TableCell>
                      <TableCell align="right">
                        {row.premiumPayingTerm}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    {isLoading ? "Loading..." : "No record found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
