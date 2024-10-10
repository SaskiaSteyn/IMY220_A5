import React, { Component } from 'react'

class Person extends Component {
    render() {
        // Destructure the person object from props
        const { person } = this.props;
        
        // Check if person is null or undefined
        if (!person) {
            return <div>No person data available.</div>;
        }
        
        // Destructure properties from the person object
        const { name, birth_year, eye_color, gender, homeworld } = person;

        // Render person details if the data is valid
        return (
            <div>
                <h1>Person</h1>
                <h2>{name || 'No name available'}</h2>
                <p>Birth Year: {birth_year || 'No birth year available'}</p>
                <p>Eye Color: {eye_color || 'No eye color available'}</p>
                <p>Gender: {gender || 'No gender available'}</p>
                <p>Homeworld: {homeworld || 'No homeworld available'}</p>
            </div>
        );
    }
}

export default Person;
