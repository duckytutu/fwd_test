import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useCallback, useState } from "react";

const useStyles = makeStyles(() => ({
  datePicker: {
    marginTop: 0,
    marginBottom: 0,
  },
  inputDatePicker: {},
}));

interface Props {
  defaultDate?: Date | number | null;
  label?: string;
  onChangeDate: (value?: Date | null) => void;
  name?: string;
}

export const DatePicker = React.memo((props: Props) => {
  const { defaultDate, label, onChangeDate, name } = props;
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const handleDateChange = useCallback(
    (newDate) => {
      // setSelectedDate(newDate);
      onChangeDate(newDate);
    },
    [onChangeDate]
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        inputVariant="outlined"
        className={classes.datePicker}
        disableToolbar
        variant="inline"
        format="yyyy/MM/dd"
        margin="dense"
        label={label}
        placeholder="____/__/__"
        value={null}
        onChange={handleDateChange}
        KeyboardButtonProps={{ size: "small" }}
        InputProps={{ className: classes.inputDatePicker }}
        fullWidth
        name={name}
      />
    </MuiPickersUtilsProvider>
  );
});
