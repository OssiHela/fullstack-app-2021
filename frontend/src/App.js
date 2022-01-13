import Column from "./components/column";
import { Component } from "react";
import Button from "@mui/material/Button";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      language: "eng",
      score: 0,
      loading: false,
    };
    this.getWordsRequest = this.getWordsRequest.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    this.getWordsRequest();
  }

  changeLanguage() {
    if (this.state.language === "eng") {
      this.setState({ language: "fin" });
    } else {
      this.setState({ language: "eng" });
    }
  }

  async addScore(amount, wordId, solution) {
    let wordToEdit = {
      key: null,
      word: null,
    };
    for (let key in this.state.words) {
      if (this.state.words[key].id === wordId) {
        wordToEdit.key = key;
        wordToEdit.word = this.state.words[key];
      }
    }

    let words = this.state.words;

    const newWord = {
      ...wordToEdit.word,
      solved: solution,
    };

    words[wordToEdit.key] = newWord;

    return new Promise((resolve) => {
      this.setState(
        (state) => ({
          score: state.score + amount,
          words: words,
        }),
        resolve
      );
    });
  }

  async getWordsRequest() {
    const response = await fetch("http://localhost:8080/words");
    const data = await response.json();
    this.setState({ words: data });
  }

  render() {
    return (
      <div className="content">
        <Button
          onClick={() => {
            this.changeLanguage();
          }}
        >
          {this.state.language === "eng" ? "Vaihda kieli" : "Change language"}
        </Button>
        <Column
          words={this.state.words}
          score={this.state.score}
          language={this.state.language}
          changeLanguage={this.changeLanguage}
          addScore={this.addScore}
        />
      </div>
    );
  }
}
