import { Component } from "react";
import Row from "./row";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };
  }

  render() {
    return (
      <div className="column">
        <TableContainer component={Paper} elevation={1}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 1 / 2,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  {this.props.language === "eng" ? "English" : "Finnish"}
                </TableCell>
                <TableCell
                  sx={{
                    width: 1 / 2,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  {this.props.language === "eng" ? "Finnish" : "English"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.words.map((word, index) => (
                <Row
                  word={word}
                  language={this.props.language}
                  addScore={this.props.addScore}
                  submit={this.state.submit}
                  key={index}
                />
              ))}
              <StyledTableRow>
                <TableCell align="center">
                  {this.props.language === "eng" ? "Pisteet: " : "Score: "}
                  {this.props.score}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ submit: true });
                    }}
                  >
                    {this.props.language === "eng" ? "Tarkista" : "Check"}
                  </Button>
                </TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
