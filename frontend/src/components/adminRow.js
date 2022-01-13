import { Component } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default class AdminRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      tag: this.props.word.tag,
      english: this.props.word.english,
      finnish: this.props.word.finnish,
    };

    this.saveWord = this.saveWord.bind(this);
  }

  saveWord() {
    const newWord = {
      id: this.props.word.id,
      tag: this.state.tag,
      english: this.state.english,
      finnish: this.state.finnish,
    };
    this.props.editWord(newWord);
    this.setState({ isEditing: false });
  }

  render() {
    return (
      <TableRow>
        <TableCell
          sx={{
            fontSize: "1rem",
          }}
          align="center"
        >
          {this.state.isEditing ? (
            <TextField
              key={this.props.word.id}
              id="standard-basic"
              placeholder={this.props.language === "eng" ? "Vastaus" : "Answer"}
              variant="standard"
              value={this.state.tag}
              onChange={(e) => {
                e.preventDefault();
                this.setState({ tag: e.target.value });
              }}
              inputProps={{ style: { textAlign: "center", fontSize: "1rem" } }}
            />
          ) : (
            this.props.word.tag
          )}
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1rem",
          }}
          align="center"
        >
          {this.state.isEditing ? (
            <TextField
              key={this.props.word.id}
              id="standard-basic"
              placeholder={this.props.language === "eng" ? "Vastaus" : "Answer"}
              variant="standard"
              value={this.state.english}
              onChange={(e) => {
                e.preventDefault();
                this.setState({ english: e.target.value });
              }}
              inputProps={{ style: { textAlign: "center", fontSize: "1rem" } }}
            />
          ) : (
            this.props.word.english
          )}
        </TableCell>
        <TableCell
          sx={{
            fontSize: "1rem",
          }}
          align="center"
        >
          {this.state.isEditing ? (
            <TextField
              key={this.props.word.id}
              id="standard-basic"
              placeholder={this.props.language === "eng" ? "Vastaus" : "Answer"}
              variant="standard"
              value={this.state.finnish}
              onChange={(e) => {
                e.preventDefault();
                this.setState({ finnish: e.target.value });
              }}
              inputProps={{ style: { textAlign: "center", fontSize: "1rem" } }}
            />
          ) : (
            this.props.word.finnish
          )}
        </TableCell>
        <TableCell
          sx={{
            margin: 0,
            padding: 0,
            fontSize: "1rem",
          }}
          align="center"
        >
          {this.state.isEditing ? (
            <Button
              color="success"
              onClick={() => {
                this.saveWord();
              }}
            >
              {this.props.language === "eng" ? "Tallenna" : "Save"}
            </Button>
          ) : (
            <Button
              color="success"
              onClick={() => {
                this.setState({ isEditing: true });
              }}
            >
              {this.props.language === "eng" ? "Muokkaa" : "Edit"}
            </Button>
          )}
        </TableCell>
        <TableCell
          sx={{
            margin: 0,
            padding: 0,
            fontSize: "1rem",
          }}
          align="center"
        >
          <Button color="error">
            {this.props.language === "eng" ? "Poista" : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
