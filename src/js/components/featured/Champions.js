import React from 'react';

export default class Champion extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    if (this.props.summonerName) {
      return (
        <div>
          <img src={this.props.imageURL.large}/>
        </div>
      )
    } else {
      return(
        <div>
          <img src={this.props.imageURL.small}/>
        </div>
      )
    }
  }
}
