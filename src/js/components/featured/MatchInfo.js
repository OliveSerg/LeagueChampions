import React from "react";
import moment from "moment"
import matchMakingQueues from '../../data/matchmaking_queues'
require('moment-duration-format')

export default class MatchInfo extends React.Component {
  constructor(props){
    super()
  }

  render(){
    const {gameQueueConfigId, gameLength} = this.props
    const legibleTime = moment.duration(gameLength, 'seconds').format({trim: "left"});

    return (
      <div class="row col s4 valign-wrapper">
        <p class="center-align">{matchMakingQueues[gameQueueConfigId]}</p>
        <img src=""/>
        <p class="center-align">{legibleTime}</p>
      </div>
    )
  }
}
