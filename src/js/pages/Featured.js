import React from 'react'
import * as MatchActions from "../actions/MatchActions"
import MatchStore from "../stores/MatchStore"
import FeaturedMatch from "../components/featured/FeaturedMatches"

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
      if (gameList) {
        const MatchComponents = gameList.map((match, index) => {
          return <FeaturedMatch key={match.gameId} {...match}/>
        })
        return (
          <div class="container">
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            {MatchComponents}
          </div>
        )
      }else {
        return (
          <div class="container">
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
          </div>
        )
      }
    }
}
