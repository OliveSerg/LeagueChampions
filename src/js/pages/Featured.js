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

      if (gameList) {
        console.log('hit');
        const MatchComponent = gameList.map((match) => {
          return <FeaturedMatches class="match" key={match.gameId} {...match}/>
        })
        return (
          <div>
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            {MatchComponent}
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
