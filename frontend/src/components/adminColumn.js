import { Component } from "react";
import AdminRow from "./adminRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default class AdminColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage, submit: false });
  }

  render() {
    let wordRows = [];
    if (this.props.words.length > 0 && this.props.words !== undefined) {
      wordRows = this.props.words
        .slice(this.state.page * 10, this.state.page * 10 + 10)
        .map((word) => (
          <AdminRow
            word={word}
            language={this.props.language}
            editWord={this.props.editWord}
            key={word.id}
          />
        ));
    }
    return (
      <div className="column">
        <TableContainer component={Paper} elevation={1}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 1 / 5,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  {this.props.language === "eng" ? "Tagi" : "Tag"}
                </TableCell>
                <TableCell
                  sx={{
                    width: 1 / 5,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  English
                </TableCell>
                <TableCell
                  sx={{
                    width: 1 / 5,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  Finnish
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                />
                <TableCell
                  sx={{
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                />
              </TableRow>
            </TableHead>
            <TableBody>{wordRows}</TableBody>
            <TableFooter>
              <StyledTableRow>
                <TablePagination
                  rowsPerPage={10}
                  rowsPerPageOptions={[10]}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  count={this.props.words.length}
                  page={this.state.page}
                  onPageChange={this.handleChangePage}
                />
              </StyledTableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
