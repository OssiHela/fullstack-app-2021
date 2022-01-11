import { Component } from "react";
import Row from "./row";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default class Column extends Component {
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
                  English
                </TableCell>
                <TableCell
                  sx={{
                    width: 1 / 2,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  Finnish
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.words.map((word, index) => (
                <Row word={word.word} key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
