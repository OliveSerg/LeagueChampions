import {EventEmitter} from 'events'
import dispatcher from "../dispatcher"

class MatchStore extends EventEmitter {
    constructor() {
        super()
        this.matches
    }

    reloadMatches() {
        this.emit("change")
    }

    handleActions(action){
    
    }
}

const matchStore = new MatchStore
dispatcher.register(matchStore.handleAtions.bind(matchStore))
export default matchStore
