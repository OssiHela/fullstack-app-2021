import { Component } from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default class Row extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solution: "",
      correct: null,
    };

    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer() {
    const solution =
      this.props.language === "eng"
        ? this.props.word.solution
        : this.props.word.word;
    if (this.state.solution.toLowerCase() === solution.toLowerCase()) {
      this.props.addScore(5);
      console.log("hehe");
      this.setState({ correct: true });
    } else {
      this.setState({ correct: false });
    }
  }

  componentDidUpdate() {
    if (this.props.submit === true && this.state.correct === null) {
      this.checkAnswer();
    }
  }

  render() {
    return (
      <StyledTableRow>
        <TableCell sx={{ fontSize: "1rem" }} align="center">
          {this.props.language === "eng"
            ? this.props.word.word
            : this.props.word.solution}
        </TableCell>
        <TableCell sx={{ margin: 0, padding: 0 }} align="center">
          <TextField
            id="standard-basic"
            placeholder={this.props.language === "eng" ? "Vastaus" : "Answer"}
            variant="standard"
            value={this.state.solution}
            onChange={(e) => {
              e.preventDefault();
              this.setState({ solution: e.target.value });
            }}
            inputProps={{ style: { textAlign: "center", fontSize: "1rem" } }}
          ></TextField>
        </TableCell>
      </StyledTableRow>
    );
  }
}
