import React from 'react';

export default class Champion extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    if (this.props.summonerName) {
      return (
        <div class='col champion'>
          <img class="responsive-img " src={this.props.imageURL.large}/>
          <p class="center-align lol-font">{this.props.summonerName}</p>
        </div>
      )
    } else {
      return(
        <div class='col banned-champion'>
          <img class="responsive-img" src={this.props.imageURL.small}/>
        </div>
      )
    }
  }
}
