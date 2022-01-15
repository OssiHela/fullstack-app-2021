import { Component } from "react";
import Row from "./row";
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
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * Renders a Table component with pagination which is filled with Row components. Table also has a check button to trigger the checkAnswers function in Row component.
 * @constructor
 * @param {object} props
 * @param {Array} props.words - the words array which contains all word objects
 * @param {string} props.language - the language string that is used to swap between finnish and english
 * @param {function} props.addScore - the addScore function which is passed on to Row component
 * @param {number} props.score - the score number that will be rendered in the TableFooter
 */
class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      page: 0,
      search: "",
      showTags: false,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.search = this.search.bind(this);
  }

  /**
   * Searches the words for words with the specified tag that is stored in state
   */
  search() {
    if (!this.state.search) {
      return this.props.words;
    } else {
      return this.props.words.filter(
        (word) => word.tag.toLowerCase() === this.state.search
      );
    }
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
   * Renders the user column and search form, with option to show tags
   */
  render() {
    let wordRows = [];
    if (this.props.words.length > 0 && this.props.words !== undefined) {
      wordRows = this.search()
        .slice(this.state.page * 5, this.state.page * 5 + 5)
        .map((word) => (
          <Row
            word={word}
            language={this.props.language}
            addScore={this.props.addScore}
            submit={this.state.submit}
            showTags={this.state.showTags}
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
                {this.state.showTags ? (
                  <TableCell
                    sx={{
                      width: 1 / 3,
                      fontSize: "1.4rem",
                      backgroundColor: "rgb(0,0,0,0.20)",
                    }}
                    align="center"
                  >
                    Tag
                  </TableCell>
                ) : null}
                <TableCell
                  sx={{
                    width: this.state.showTags ? 1 / 3 : 1 / 2,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  {this.props.language === "eng" ? "English" : "Finnish"}
                </TableCell>
                <TableCell
                  sx={{
                    width: this.state.showTags ? 1 / 3 : 1 / 2,
                    fontSize: "1.4rem",
                    backgroundColor: "rgb(0,0,0,0.20)",
                  }}
                  align="center"
                >
                  {this.props.language === "eng" ? "Finnish" : "English"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{wordRows}</TableBody>
            <TableFooter>
              <StyledTableRow>
                {this.state.showTags ? (
                  <TableCell
                    sx={{
                      margin: 0,
                      padding: "0.6rem",
                    }}
                    align="center"
                  />
                ) : null}
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1rem",
                    margin: 0,
                    padding: "0.6rem",
                  }}
                >
                  {this.props.language === "eng" ? "Pisteet: " : "Score: "}
                  {this.props.score}
                </TableCell>
                <TableCell
                  sx={{
                    margin: 0,
                    padding: "0.6rem",
                  }}
                  align="center"
                >
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ submit: true }, () => {
                        this.setState({ submit: false });
                      });
                    }}
                  >
                    {this.props.language === "eng" ? "Tarkista" : "Check"}
                  </Button>
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell align="center">
                  <TextField
                    id="standard-basic"
                    autoComplete="off"
                    placeholder={
                      this.props.language === "eng"
                        ? "Hae tagia"
                        : "Search for a tag"
                    }
                    variant="standard"
                    value={this.state.search}
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ search: e.target.value });
                    }}
                    inputProps={{
                      style: { textAlign: "center", fontSize: "1rem" },
                    }}
                  ></TextField>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.showTags}
                        onChange={(e) => {
                          console.log(e.target.checked);
                          this.setState({ showTags: e.target.checked });
                        }}
                      />
                    }
                    label={
                      this.props.language === "eng"
                        ? "näytä tagit"
                        : "show tags"
                    }
                    labelPlacement="start"
                  />
                </TableCell>
                <TablePagination
                  rowsPerPage={5}
                  rowsPerPageOptions={[5]}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  count={wordRows.length > 0 ? wordRows.length : 0}
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
export default Column;
