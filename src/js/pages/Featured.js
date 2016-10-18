import React from 'react'
import FeaturedMatches from "../components/featured/FeaturedMatches"
import * as MatchActions from "../actions/MatchActions"
import MatchStore from "../stores/MatchStore"

export default class Featured extends React.Component {
    constructor() {
        super()
        this.getMatches = this.getMatches.bind(this)
        this.state = {
          matches: "Loading"
        }
        MatchActions.loadMatches()
    }

    componentWillMount() {
      MatchStore.on('change', this.getMatches)
    }

    componentWillUnmount() {
      MatchStore.removeListener('change', this.getMatches)
    }

    getMatches() {
      this.setState({
        matches: MatchStore.getMatches()
      })
    }

    reloadMatches(){
      MatchActions.reloadMatches();
    }

    render() {
      const {gameList} = this.state.matches;
      // const MatchComponent = gameList.map((match) => {
      //   return <FeaturedMatches key={match.gameId} {...match}/>
      // })
      if (gameList) {
        return (
          <div>
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            <FeaturedMatches key={0} {...gameList[0]}/>
          </div>
        )
      }else {
        return (
          <div>
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
          </div>
        )
      }
    }
}
