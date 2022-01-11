import Column from "./components/column";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      loading: false,
    };
    this.getWordsRequest = this.getWordsRequest.bind(this);
  }

  componentDidMount() {
    this.getWordsRequest();
  }

  async getWordsRequest() {
    const response = await fetch("http://localhost:8080/words");
    const data = await response.json();
    this.setState({ words: data }, () => {
      console.log(this.state.words.map((word) => word.word));
    });
  }

  render() {
    return (
      <div className="content">
        <Column words={this.state.words} />
      </div>
    );
  }
}
