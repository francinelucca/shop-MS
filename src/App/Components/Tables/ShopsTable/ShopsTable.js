import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit"
import Button from "../../Common/Button";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ShopsTable = ({shops, onEdit, onView, onDelete}) => {
  const classes = useStyles();
  return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Shop Name</TableCell>
              <TableCell align="right">Owner</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">RNC</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops ? shops.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.owner}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.rnc}</TableCell>
                <TableCell>
                <Button 
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    className={classes.button}
                    onClick={() => onView(row)}>
                </Button>
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

export default ShopsTable;
