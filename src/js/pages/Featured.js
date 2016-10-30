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
    }

    componentDidMount() {
      MatchStore.on('change', this.getMatches)
      MatchActions.loadMatches()
    }

    componentWillUnmount() {
        MatchStore.removeListener('change', this.getMatches);
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
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        return (
          <div class="container">
            <button onClick={this.reloadMatches.bind(this)}>Reload!</button>
            <Slider {...settings}>
                <div>
                    {MatchComponents[0]}
                </div>
                <div>
                    {MatchComponents[1]}
                </div>
                <div>
                    {MatchComponents[2]}
                </div>
                <div>
                    {MatchComponents[3]}
                </div>
                <div>
                    {MatchComponents[4]}
                </div>
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
