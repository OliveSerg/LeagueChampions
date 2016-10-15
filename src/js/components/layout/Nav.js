import React from "react"
import {IndexLink, Link} from "react-router";

export default class Nav extends React.Component {
    constructor() {
        super()
        this.state = {collapsed: true}    
    }

    render() {
        return(
            <nav>

                <form id="get-summoner" method='get'>
                    <input type='text' placeholder="Summoner Id"/>
                    <select>
                        <option value='NA'>North America</option>
                        <option value='EUW'>Europe West</option>
                        <option value='EUNE'>Europe Nordic East</option>
                        <option value='BR'>Brazil</option>
                        <option value='KR'>Korea</option>
                        <option value='TR'>Turkey</option>
                        <option value='RU'>Russia</option>
                        <option value='LAN'>Latin America North</option>
                        <option value='LAS'>Latin America South</option>
                        <option value='OCE'>Oceania</option>
                    </select>
                </form>
            </nav>        
        )    
    }
}
