import React from "react"

export default class MatchInfo extends React.Component {
  constructor(props){
    super()
  }

  render(){
    const {gameQueueConfigId, gameStartTime} = this.props
    return (
      <div>
        <p>{gameQueueConfigId}</p>
        <img src=""/>
        <p>{gameStartTime}</p>
      </div>
    )
  }
}
