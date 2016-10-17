import React from 'react'
import FeatureMatches from "../components/featured/FeaturedMatches"
import * as MatchActions from "../actions/MatchActions"
import MatchStore from "../stores/MatchStore"

export default class Featured extends React.Component {
    constructor() {
        super()
    }
    componentWillMount() {

    }

    componentWillUnmount() {

    }

    reloadMatches(){
      MatchActions.reloadMatches();
    }

    render() {
      // const {matches} = this.state;

        return (
            <div>
              <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            </div>
        )
    }
}
