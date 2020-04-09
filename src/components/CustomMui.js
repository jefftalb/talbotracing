import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';

const PrimaryCheckbox = withStyles({
  root: {
    color: '#AAAAAA',
    '&$checked': {
      color: '#007bff',
    },
  },
  checked: {},
})((props) => <Checkbox {...props} color="primary"/>);

const BorderedTableCell = withStyles({
  root: {
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '0 10px 0 10px',
    textAlign: 'right'
  },
})((props) => <TableCell {...props} />);

const BorderedHeadTableCell = withStyles({
  root: {
    fontWeight: '600',
    backgroundColor: '#007bff',
    color: "white",
    border: '1px solid #7b7b7b',
    padding: '0 10px 0 10px',
  },
})((props) => <TableCell {...props} />);

const StyledTable = withStyles({
  root: {
    width: "max-content",
    height: "75%",
    padding: '0',
    '&:last-child': {
      padding: '0',
    },
  },
})((props) => <Table {...props} />);

const StyledTableContainer = withStyles({
  root: {
    border: '1px solid rgba(224, 224, 224, 1)',
  },
})((props) => <TableContainer {...props} />);

export { PrimaryCheckbox, BorderedTableCell, BorderedHeadTableCell, StyledTable, StyledTableContainer };
