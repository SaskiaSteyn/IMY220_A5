import React from 'react'
import StarWars from '../components/StarWars'

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <StarWars />
            </div>
        );
    }
}

export default Home;