import { Component } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

export default class Row extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solution: "",
      correct: null,
    };

    this.checkAnswer = this.checkAnswer.bind(this);
  }

  // Checks if the user's given answer corresponds with the correct answer and adds points based on that, aswell as marking the row as correct or not
  async checkAnswer() {
    const solution =
      this.props.language === "eng"
        ? this.props.word.finnish
        : this.props.word.english;
    if (this.state.solution || this.props.word.solved) {
      if (this.state.solution.toLowerCase() === solution.toLowerCase()) {
        if (!this.props.word.solved) {
          await this.props.addScore(1, this.props.word.id, this.state.solution);
        }
        this.setState({ correct: true });
      } else {
        if (this.props.word.solved) {
          if (this.props.word.solved.toLowerCase() === solution.toLowerCase()) {
            this.setState({ correct: true });
          } else {
            this.setState({ correct: false });
          }
        } else {
          await this.props.addScore(0, this.props.word.id, this.state.solution);
          this.setState({ correct: false });
        }
      }
    }
  }

  // Checks if the word was solved if the page got changed
  componentDidMount() {
    if (this.props.word.solved) {
      this.setState({ solution: this.props.word.solved });
      this.checkAnswer();
    }
  }

  // If columns submit button is pressed then triggers checkAnswer function
  componentDidUpdate() {
    if (this.props.submit === true && this.state.correct === null) {
      this.checkAnswer();
    }
  }

  // Renders the word for translation aswell as the answer textfield, if showTags is checked in column will also render the words tag
  render() {
    return (
      <TableRow>
        {this.props.showTags ? (
          <TableCell
            sx={{
              fontSize: "1rem",
              backgroundColor:
                this.state.correct !== null
                  ? this.state.correct
                    ? "green"
                    : "red"
                  : "transparent",
            }}
            align="center"
          >
            {this.props.word.tag}
          </TableCell>
        ) : null}
        <TableCell
          sx={{
            fontSize: "1rem",
            backgroundColor:
              this.state.correct !== null
                ? this.state.correct
                  ? "green"
                  : "red"
                : "transparent",
          }}
          align="center"
        >
          {this.props.language === "eng"
            ? this.props.word.english
            : this.props.word.finnish}
        </TableCell>
        <TableCell
          sx={{
            margin: 0,
            padding: 0,
            backgroundColor:
              this.state.correct !== null
                ? this.state.correct
                  ? "green"
                  : "red"
                : "transparent",
          }}
          align="center"
        >
          <TextField
            key={this.props.word.id}
            autoComplete="off"
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
      </TableRow>
    );
  }
}
