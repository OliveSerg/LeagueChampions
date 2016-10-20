import React from 'react';

export default class Champion extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    if (this.props.summonerName) {
      return (
        <div class='col s2'>
          <img class="responsive-img " src={this.props.imageURL.large}/>
          <p class="center-align">{this.props.summonerName}</p>
        </div>
      )
    } else {
      return(
        <div class='col s4'>
          <img class="responsive-img" src={this.props.imageURL.small}/>
        </div>
      )
    }
  }
}
