import React from 'react';

export default class Champion extends React.Component {
  constructor(props) {
    super()
  }

  render() {

    if (this.props.summonerName) {
      return (
        <div class='champion'>
          <img class="responsive-img " src={this.props.imageURL.large}/>
          <div class="summoner-name">
             <p class="center-align lol-font">{this.props.summonerName}</p>
          </div>
        </div>
      )
    } else {
      return(
        <div class='banned-champion'>
          <img class="responsive-img" src={this.props.imageURL.small}/>
        </div>
      )
    }
  }
}
