import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, Theme } from "@material-ui/core/styles";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
import find from "lodash/find";
import omit from "lodash/omit";
import * as React from "react";
import { GetProductParams } from "../../../../types/request";
import { PaymentFrequency } from "../../../../types/response";
import { DatePicker } from "../../../components/DatePicker";
import { SelectBox } from "../../../components/SelectBox";
import { TextBox } from "../../../components/TextBox";

export const genders = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export const plans = [
  {
    label: "Package 1 (benefit 200k)",
    value: "T11A20",
  },
  {
    label: "Package 2 (benefit 500k)",
    value: "T11A50",
  },
  {
    label: "Package 3 (benefit 1M)",
    value: "T11AM1",
  },
];

export const paymentFrequencies = [
  {
    label: "Yearly",
    value: PaymentFrequency.YEARLY,
  },
  {
    label: "Half Yearly",
    value: PaymentFrequency.HALFYEARLY,
  },
  {
    label: "Quarterly",
    value: PaymentFrequency.QUARTERLY,
  },
  {
    label: "Monthly",
    value: PaymentFrequency.MONTHLY,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  inputForm: {
    marginTop: theme.spacing(2),
  },
  calculateButton: {
    marginTop: theme.spacing(3),
    height: 32,
    width: 100,
  },
}));

interface Props {
  onCalculate: (params: GetProductParams) => void;
  defaultParams?: GetProductParams;
}

export const SearchBar = React.memo((props: Props) => {
  const classes = useStyles();

  const { onCalculate, defaultParams } = props;
  const [searchParams, setSearchParams] = React.useState<GetProductParams>(
    defaultParams || ({} as GetProductParams)
  );
  const [calculateMethod, setCalculateMethod] = React.useState(0);

  const onDobChange = React.useCallback((value) => {
    if (isValid(value)) {
      const dob = format(value, "yyyy-MM-dd");
      setSearchParams((prev) => ({
        ...prev,
        dob,
      }));
    } else {
      setSearchParams((prev) => omit(prev, "dob") as GetProductParams);
    }
  }, []);

  const onGenderChange = React.useCallback(
    (event, option?: { label: string; value: string }) => {
      setSearchParams((prev) => ({
        ...prev,
        genderCd: option?.value || "",
      }));
    },
    []
  );

  const onPlanChange = React.useCallback(
    (event, option?: { label: string; value: string }) => {
      setSearchParams((prev) => ({
        ...prev,
        planCode: option?.value || "",
      }));
    },
    []
  );

  const onNameChange = React.useCallback((event) => {
    const value = event.target.value;
    setSearchParams((prev) => ({
      ...prev,
      name: value || "",
    }));
  }, []);

  const onPremiumPerYearChange = React.useCallback((event) => {
    const value = event.target.value;
    setSearchParams((prev) => ({
      ...prev,
      premiumPerYear: value ? parseInt(value) : 0,
    }));
  }, []);

  const onSumAssuredPerYearChange = React.useCallback((event) => {
    const value = event.target.value;
    setSearchParams((prev) => ({
      ...prev,
      saPerYear: value ? parseInt(value) : 0,
    }));
  }, []);

  const onFrequencyChange = React.useCallback(
    (event, option?: { label: string; value: PaymentFrequency }) => {
      setSearchParams((prev) => ({
        ...prev,
        paymentFrequency: option?.value,
      }));
    },
    []
  );

  const onCalculateMethodChange = React.useCallback((event) => {
    setCalculateMethod(event.target.value);
  }, []);

  const onCalcButtonClicked = () => {
    if (searchParams) {
      onCalculate(searchParams);
    }
  };

  return (
    <>
      <Grid container spacing={3} className={classes.inputForm}>
        <Grid item xs={12} sm={6} md={4}>
          <SelectBox
            name="gender"
            label="Gender"
            options={genders}
            getOptionLabel={(opt) => opt.label}
            onChange={onGenderChange}
            defaultValue={find(
              genders,
              (opt) => opt.value === defaultParams?.genderCd
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePicker
            name="dob"
            label="Dob"
            onChangeDate={onDobChange}
            defaultDate={
              defaultParams?.dob ? parseISO(defaultParams.dob) : null
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectBox
            name="planCode"
            label="Plan"
            options={plans}
            getOptionLabel={(opt) => opt.label}
            onChange={onPlanChange}
            defaultValue={find(
              plans,
              (opt) => opt.value === defaultParams?.planCode
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectBox
            name="paymentFrequency"
            label="Frequency"
            options={paymentFrequencies}
            getOptionLabel={(opt) => opt.label}
            onChange={onFrequencyChange}
            defaultValue={find(
              paymentFrequencies,
              (opt) => opt.value === defaultParams?.paymentFrequency
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <Select
              name="calculateMethod"
              value={calculateMethod}
              onChange={onCalculateMethodChange}
              margin="dense"
              fullWidth
              defaultValue={defaultParams?.premiumPerYear ? 0 : 1}
            >
              <MenuItem value={0}>Sum assured by premium</MenuItem>
              <MenuItem value={1}>Premium by sun assured</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {calculateMethod === 0 ? (
            <TextBox
              name="premiumPerYear"
              label="Premium per year"
              onChange={onPremiumPerYearChange}
              type="number"
              defaultValue={
                defaultParams?.premiumPerYear || defaultParams?.saPerYear
              }
            />
          ) : (
            <TextBox
              name="sumAssuredPerYear"
              label="Sum assured per year"
              onChange={onSumAssuredPerYearChange}
              type="number"
            />
          )}
        </Grid>
      </Grid>
      <Button
        name="calculateButton"
        color="primary"
        className={classes.calculateButton}
        onClick={onCalcButtonClicked}
        disabled={!searchParams}
        variant="contained"
      >
        Calculate
      </Button>
    </>
  );
});
