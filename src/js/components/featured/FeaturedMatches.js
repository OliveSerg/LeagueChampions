import React from 'react';
import _ from "lodash"
import Champion from "./Champions"

export default class FeaturedMatches extends React.Component {
    constructor(props) {
      super()
      console.log(this);
      console.log(_.filter(props.bannedChampions, {teamId: 100}));
      console.log(_.filter(props.participants, {teamId: 100}));
    }


    render() {
      // const blueTeam = {
      //   bannedChampions: _.filter(this.props.bannedChampions, {teamId: 100}),
      //   participants:
      // }
      return(
          <div>
          </div>
      )
    }
}
