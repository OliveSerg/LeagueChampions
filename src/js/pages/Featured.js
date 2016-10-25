import React from 'react'
import * as MatchActions from "../actions/MatchActions"
import MatchStore from "../stores/MatchStore"
import FeaturedMatch from "../components/featured/FeaturedMatches"
import Slider from "react-slick"

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
        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        return (
          <div class="container">
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            <Slider {...settings}>
                {MatchComponents}
            </Slider>
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
