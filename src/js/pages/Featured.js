import React from 'react'
import FeatureMatches from "../components/featured/FeaturedMatches"
import * as MatchActions from "../actions/MatchActions"
import MatchStore from "../stores/MatchStore"

export default class Featured extends React.Component {
    constructor() {
        super()
        this.state = {
          matches: MatchStore.matches
        }
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}
