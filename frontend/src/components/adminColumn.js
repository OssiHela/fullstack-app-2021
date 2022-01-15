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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * Renders a Table component with pagination which is filled with AdminRow components.
 * Renders a word adding form above the Table.
 * @constructor
 * @param {object} props
 * @param {Array} props.words - the words array which contains all word objects
 * @param {string} props.language - the language string that is used to swap between finnish and english
 * @param {function} props.editWord - the editWord function which is passed on to AdminRow component
 * @param {function} props.deleteWord - the deleteWord function which is passed on to AdminRow component
 * @param {function} props.addWord - the addWord function which is called after submitting the pressing the "add word" button
 */
class AdminColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      tag: "",
      english: "",
      finnish: "",
    };

    this.handleChangePage = this.handleChangePage.bind(this);
  }

  /**
   * Handles the page changing
   * @param {event} event - the event
   * @param {number} newPage - the page number to be rendered
   */
  handleChangePage(event, newPage) {
    this.setState({ page: newPage, submit: false });
  }

  /**
   * Renders the admin column and word adding form
   */
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
            deleteWord={this.props.deleteWord}
            key={word.id ? word.id : word}
          />
        ));
    }
    return (
      <>
        <div className="addWord">
          <TextField
            autoComplete="off"
            id="standard-basic"
            placeholder="tag"
            variant="standard"
            value={this.state.tag}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ tag: e.target.value });
            }}
            inputProps={{ style: { textAlign: "center", fontSize: "1.2rem" } }}
          />
          <TextField
            autoComplete="off"
            id="standard-basic"
            placeholder={"english"}
            variant="standard"
            value={this.state.english}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ english: e.target.value });
            }}
            inputProps={{ style: { textAlign: "center", fontSize: "1.2rem" } }}
          />
          <TextField
            autoComplete="off"
            id="standard-basic"
            placeholder="finnish"
            variant="standard"
            value={this.state.finnish}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ finnish: e.target.value });
            }}
            inputProps={{ style: { textAlign: "center", fontSize: "1.2rem" } }}
          />
        </div>
        <div className="addWordButton">
          <Button
            onClick={() => {
              this.props.addWord(
                this.state.tag,
                this.state.english,
                this.state.finnish
              );
              this.setState({ tag: "", english: "", finnish: "" });
            }}
          >
            {this.props.language === "eng" ? "Lisää sana" : "Add word"}
          </Button>
        </div>
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
                    Tag
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
                    count={
                      this.props.words.length > 0 ? this.props.words.length : 0
                    }
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                  />
                </StyledTableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}
export default AdminColumn;
