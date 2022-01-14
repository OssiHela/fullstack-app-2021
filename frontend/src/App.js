import Column from "./components/column";
import AdminColumn from "./components/adminColumn";
import React, { Component } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
      anchorEl: null,
    };
    this.getWordsRequest = this.getWordsRequest.bind(this);
    this.editWordRequest = this.editWordRequest.bind(this);
    this.addWordRequest = this.addWordRequest.bind(this);
    this.deleteWordRequest = this.deleteWordRequest.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  // When the app loads it will fetch the data from the backend
  componentDidMount() {
    this.getWordsRequest();
  }

  // Handles changing the language between finnish and english and stores it in the browser's localstorage
  changeLanguage() {
    if (this.state.language === "eng") {
      this.setState({ language: "fin" });
      localStorage.setItem("language", "fin");
    } else {
      this.setState({ language: "eng" });
      localStorage.setItem("language", "eng");
    }
  }

  // Handles changing the view between user and admin view and stores it in the browser's localstorage
  changeUser() {
    if (this.state.priviledges === "user") {
      this.setState({ priviledges: "admin" });
      localStorage.setItem("user", "admin");
    } else {
      this.setState({ priviledges: "user" });
      localStorage.setItem("user", "user");
    }
  }

  // Adds score based on the amount and marks the word as solved
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

  // Fetches the words from the backend
  async getWordsRequest() {
    const response = await fetch("http://localhost:8080/words");
    const data = await response.json();
    this.setState({ words: data });
  }

  // Saves the edited word to the backend
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

  // Saves a new word to the backend
  async addWordRequest(tag, english, finnish) {
    if (english && finnish && isNaN(english) && isNaN(finnish)) {
      const newWord = {
        tag: tag,
        english: english,
        finnish: finnish,
      };

      try {
        const request = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWord),
        };
        const response = await fetch(`http://localhost:8080/words/`, request);
        await this.getWordsRequest();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Deletes a existing word from the backend
  async deleteWordRequest(id) {
    let words = this.state.words.filter((word) => word.id !== id);
    this.setState({ words: words });

    const request = {
      method: "DELETE",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/words/${id}`,
        request
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  // Renders the options dropdown menu and admin or user view based on the state
  render() {
    return (
      <div className="content">
        <div className="options">
          <Button
            id="basic-button"
            aria-controls={
              Boolean(this.state.anchorEl) ? "basic-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={Boolean(this.state.anchorEl) ? "true" : undefined}
            onClick={(e) => {
              this.setState({ anchorEl: e.currentTarget });
            }}
            variant="outlined"
          >
            Options
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={(e) => {
              e.preventDefault();
              this.setState({ anchorEl: null });
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                this.changeLanguage();
              }}
            >
              {this.state.language === "eng"
                ? "Vaihda kieli"
                : "Change language"}
            </MenuItem>
            <MenuItem
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
            </MenuItem>
          </Menu>
        </div>
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
            deleteWord={this.deleteWordRequest}
            addWord={this.addWordRequest}
          />
        )}
      </div>
    );
  }
}
