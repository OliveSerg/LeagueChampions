import React from 'react'
import * as MatchActions from "../actions/MatchActions"
import MatchStore from "../stores/MatchStore"
import Carousel from "../components/featured/Carousel"

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
        return (
          <div>
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            <Carousel {...this.state.matches}/>
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
