import React from "react";
import sampleQuotes from "../quotes";
import QuoteBox from "./QuoteBox";

class App extends React.Component {
  state = {
    quotes: sampleQuotes, //object containing all quotes
    displayedQuote: sampleQuotes.quote1, //quote we're currently displaying
  };

  pickQuote = () => {
    //getting array of quotes
    const quoteKeys = Object.keys(this.state.quotes);
    //randomly picking a key
    const randomId = Math.floor(Math.random() * quoteKeys.length);
    //extracting quote from random key
    const displayedQuote = this.state.quotes[quoteKeys[randomId]];
    //setting displayQuote to this quote
    this.setState({ displayedQuote });
  };

  render() {
    // const quoteKeys = Object.keys(this.state.quotes);
    // const quoteArray = quoteKeys.map((key) => <li>{this.state.quotes[key].quote}</li>);

    return (
      <header>
        <QuoteBox
          displayedQuote={this.state.displayedQuote}
          pickQuote={this.pickQuote}
        />
      </header>
    );
  }
}
export default App;
