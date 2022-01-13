import Column from "./components/column";
import AdminColumn from "./components/adminColumn";
import { Component } from "react";
import Button from "@mui/material/Button";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      language: localStorage.getItem("language")
        ? localStorage.getItem("language")
        : "eng",
      score: 0,
      loading: false,
      priviledges: localStorage.getItem("user")
        ? localStorage.getItem("user")
        : "user",
    };
    this.getWordsRequest = this.getWordsRequest.bind(this);
    this.editWordRequest = this.editWordRequest.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    this.getWordsRequest();
  }

  changeLanguage() {
    if (this.state.language === "eng") {
      this.setState({ language: "fin" });
      localStorage.setItem("language", "fin");
    } else {
      this.setState({ language: "eng" });
      localStorage.setItem("language", "eng");
    }
  }

  changeUser() {
    if (this.state.priviledges === "user") {
      this.setState({ priviledges: "admin" });
      localStorage.setItem("user", "admin");
    } else {
      this.setState({ priviledges: "user" });
      localStorage.setItem("user", "user");
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

  async editWordRequest(newWord) {
    let words = this.state.words;
    let wordToEdit = {
      key: null,
      word: null,
    };
    for (let key in this.state.words) {
      if (this.state.words[key].id === newWord.id) {
        wordToEdit.key = key;
        wordToEdit.word = this.state.words[key];
      }
    }
    words[wordToEdit.key] = newWord;
    this.setState({ words: words });

    const request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/words/${newWord.id}`,
        request
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
        <Button
          onClick={() => {
            this.changeUser();
          }}
        >
          {this.state.language === "eng"
            ? `Vaihda ${
                this.state.priviledges === "user" ? "admin" : "user"
              } käyttönäkymään`
            : `Change to ${
                this.state.priviledges === "user" ? "admin" : "user"
              } view`}
        </Button>
        {this.state.priviledges === "user" ? (
          <Column
            words={this.state.words}
            score={this.state.score}
            language={this.state.language}
            addScore={this.addScore}
          />
        ) : (
          <AdminColumn
            words={this.state.words}
            language={this.state.language}
            editWord={this.editWordRequest}
          />
        )}
      </div>
    );
  }
}
