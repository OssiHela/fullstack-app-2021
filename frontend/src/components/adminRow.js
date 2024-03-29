import { Component } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**
 * Renders a single TableRow that contains word for translation, translation answer field and a tag depending on props
 * @constructor
 * @param {object} props
 * @param {object} props.word - the word object that contains tag, word in english, word in finnish
 * @param {string} props.language - the language string that is used to swap between finnish and english
 * @param {function} props.editWord - the editWord function which is used to edit and save a existing word, it is called after pressing the "save" button
 * @param {boolean} props.deleteWord - the deleteWord function which is used to delete a existing word, it is called after pressing the "delete" button
 */
class AdminRow extends Component {
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

  /**
   * After editing a word calls the editWordRequest function from app.js with the edited word as its param
   */
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

  /**
   * Renders a individual tableRow with tag, english word, finnish, edit button and delete button
   */
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
                if (
                  this.state.english.length > 0 &&
                  this.state.finnish.length > 0 &&
                  isNaN(this.state.english) &&
                  isNaN(this.state.finnish)
                ) {
                  this.saveWord();
                } else {
                  this.setState({
                    isEditing: false,
                    english: this.props.word.english,
                    finnish: this.props.word.finnish,
                  });
                }
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
          <Button
            color="error"
            onClick={() => {
              this.props.deleteWord(this.props.word.id);
            }}
          >
            {this.props.language === "eng" ? "Poista" : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
export default AdminRow;
