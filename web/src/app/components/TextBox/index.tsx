import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 0,
  },
}));

export const TextBox = React.memo((props: TextFieldProps) => {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      margin="dense"
      className={classes.root}
      variant="outlined"
      fullWidth
    />
  );
});
