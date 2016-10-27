import React from 'react';
import MatchStore from '../stores/MatchStore'
import * as MatchActions from '../actions/MatchActions'

export default class Summoner extends React.Component {
    constructor(props) {
        super()
        this.state = {
          summonerName: props.params.id,
          region: props.location.query.region,
          summoner: null,
          loading: true
        }
        MatchActions.getSummoner(props.params.id, props.location.query.region)
    }

    componentWillMount(){
      MatchStore.on('change', this.getSummoner)
    }

    componentWillUnmount(){
      MatchStore.removeListener('change', this.getSummoner)
    }

    getSummoner(){
      this.setState({
        summoner: MatchStore.getSummoner(),
        loading: false
      })
    }

    render() {
      const {summoner, loading} = this.state

        if (loading) {
          return (
            <div>
              Loading
            </div>
          )
        } else {
          console.log(summoner);
          return(
            <div>
              Summoner
            </div>
          )
        }
    }
}
