import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit"
import Button from "../../Common/Button";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ShopItemsTable = (props) => {
  const {items, onEdit, onDelete} = props;
  const classes = useStyles();
  return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items ? items.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.availability}</TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    className={classes.button}
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    className={classes.button}
                    onClick={() => onDelete(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
            :
            <TableRow>
                <TableCell>
                    No Records Found
                </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default ShopItemsTable;
