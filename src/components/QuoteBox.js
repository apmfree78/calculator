import React from "react";

class QuoteBox extends React.Component {
  render() {
    const { quote, author } = this.props.displayedQuote;
    const pickQuote = this.props.pickQuote;
    const tweet =
      'https://twitter.com/intent/tweet?hashtags=quotes&text="' +
      quote +
      '"' +
      author;

    return (
      <div className='container square-box d-flex justify-content-center align-items-center'>
        <div id='quote-box'>
          <quoteblock className='fa fa-quote-left' id='text'>
            {" " + quote}
            <address id='author'>{author}</address>
            <div id='buttons'>
              <a
                href={tweet}
                className='fa fa-twitter'
                id='tweet-quote'
                target='_blank'></a>
              <button
                class='btn btn-success'
                type='submit'
                id='new-quote'
                onClick={pickQuote}>
                New Quote
              </button>
            </div>
          </quoteblock>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
