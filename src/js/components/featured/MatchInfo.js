import React from "react";
import moment from "moment"
import matchMakingQueues from '../../data/matchmaking_queues'
require('moment-duration-format')

export default class MatchInfo extends React.Component {
  constructor(props){
    super()
  }

  render(){
    const {gameQueueConfigId, time} = this.props
    const legibleTime = moment.duration(time, 'seconds').format("h:mm:ss");
   return (
      <div class="row col s4 valign-wrapper">
        <p class="center-align col s4 lol-font">{matchMakingQueues[gameQueueConfigId]}</p>
        <img class="responsive-img col s4" src="../../../images/VS-NOBG.png"/>
        <p class="center-align col s4 lol-font">{legibleTime}</p>
      </div>
    )
  }
}
