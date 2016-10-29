 
import React from "react"
import {IndexLink, Link} from "react-router";

export default class Nav extends React.Component {
    constructor() {
        super()
            this.state = {collapsed: true}
    }

    directTo(ev) {
        if(ev.keyCode === 13){
            this.props.history.replaceState(null, `/summoner/${ev.target.value}`,{region: this.refs.region.value} )
        }
    }

    render() {
        return(
                <nav class="row">
                <p class="col s4">League Summoner Source</p>
                <input class="col s3 offset-s3" onKeyDown={this.directTo.bind(this)} type='text' placeholder="Summoner Id"/>
                <select class="col s2" ref="region">
                <option value='na'>North America</option>
                <option value='euw'>Europe West</option>
                <option value='eune'>Europe Nordic East</option>
                <option value='br'>Brazil</option>
                <option value='kr'>Korea</option>
                <option value='tr'>Turkey</option>
                <option value='ru'>Russia</option>
                <option value='lan'>Latin America North</option>
                <option value='las'>Latin America South</option>
                <option value='oce'>Oceania</option>
                </select>
                </nav>
              )
    }
}
