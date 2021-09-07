import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Autocomplete,
  UseAutocompleteProps
} from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
    },
    textField: {
      margin: 0,
    }
  }),
);

interface Props<T> extends UseAutocompleteProps<T, boolean, boolean, boolean> {
  options: any[];
  getOptionLabel: (object: any) => string;
  className?: any;
  label?: string;
  placeholder?: string;
  [propName: string]: any;
}
export const SelectBox = React.memo((props: Props<any>) => {
  const classes = useStyles();
  const {
    className,
    label,
    placeholder,
    name,
    ...rest
  } = props;

  return (
    <Autocomplete
      {...rest}
      className={`${classes.root} ${className}`}
      id={name}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          margin="dense"
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
      )}
    />
  );
});
