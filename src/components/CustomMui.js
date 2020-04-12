import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const PrimaryCheckbox = withStyles({
  root: {
    color: '#AAAAAA',
    '&$checked': {
      color: '#007bff',
    },
  },
  checked: {},
})((props) => <Checkbox {...props} color="primary"/>);

const InvertPrimaryCheckbox = withStyles({
  root: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#FFFFFF',
    },
  },
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
    textAlign: 'center',
  },
})((props) => <TableCell {...props} />);

const StyledTable = withStyles({
  root: {
    padding: '0',
    '&:last-child': {
      padding: '0',
    },
  },
})((props) => <Table {...props} />);

const StyledTableContainer = withStyles({
  root: {
    height: "max-content",
    width: "max-content",
    border: '1px solid rgba(224, 224, 224, 1)',
    '&:nth-child': {
      backgroundColor: 'red',
    }
  },
})((props) => <TableContainer {...props} />);

const TimeSlipPaper = withStyles({
  root: {
    height: '75vh',
    overflow: 'scroll',
  },
})((props) => <Paper {...props} />);

const WhiteTableSortLabel = withStyles({
  root: {
    color: 'white !important',
  },
  icon: {
    color: 'white !important',
  }
})((props) => <TableSortLabel {...props} />);

export { PrimaryCheckbox, InvertPrimaryCheckbox, BorderedTableCell, BorderedHeadTableCell, StyledTable, StyledTableContainer, TimeSlipPaper, WhiteTableSortLabel };
