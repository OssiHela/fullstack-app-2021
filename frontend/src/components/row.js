import { Component } from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default class Row extends Component {
  render() {
    console.log(this.props.word);
    return (
      <StyledTableRow>
        <TableCell sx={{ fontSize: "1rem" }} align="center">
          {this.props.word}
        </TableCell>
        <TableCell sx={{ margin: 0, padding: 0 }} align="center">
          <TextField
            id="standard-basic"
            placeholder="Vastaus"
            variant="standard"
            inputProps={{ style: { textAlign: "center", fontSize: "1rem" } }}
          ></TextField>
        </TableCell>
      </StyledTableRow>
    );
  }
}
