import React, { Component } from 'react'
import { getCharacterById, getCharacterByName } from '../api'
import Person from './Person'
import Search from './Search'

class StarWars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            currentId: 1,
            error: null,
            loading: false,
            searching: false,
        };
    }

    componentDidMount() {
        this.fetchCharacterById(this.state.currentId);
    }

    validateId = (id) => {
        return id > 0 ? null : `Invalid ID: ${id}. Please provide a valid character ID.`;
    };

    fetchCharacterById = async (id) => {
        if (this.state.searching) return;

        this.setState({ loading: true });

        const validationError = this.validateId(id);
        if (validationError) {
            this.setState({ character: null, error: validationError, loading: false });
            return;
        }

        try {
            console.log(`Fetching character with ID: ${id}`);
            const character = await getCharacterById(id);

            if (character && character.name) {
                console.log('Character data fetched successfully:', character);
                this.setState({ character, error: null, currentId: id, loading: false });
            } else {
                console.log('Character data is null or empty');
                this.setState({ character: null, error: `Character with ID ${id} cannot be found.`, loading: false });
                this.fetchCharacterById(id + 1);
            }
        } catch (error) {
            console.error('Error fetching character:', error.message);
            if (error.message.includes('Not Found')) {
                this.fetchCharacterById(id + 1);
            } else {
                this.setState({ character: null, error: 'There was a problem fetching the data from this character', loading: false });
            }
        }
    };

    fetchCharacterByName = async (name) => {
        this.setState({ loading: true, searching: true });
        try {
            console.log(`Searching for character with name: ${name}`);
            const result = await getCharacterByName(name);

            if (result && result.name) {
                console.log('Character data fetched successfully:', result);
                this.setState({ character: result, error: null, loading: false, searching: false });
            } else {
                this.setState({ character: null, error: `Character with the name "${name}" cannot be found.`, loading: false, searching: false });
            }
        } catch (error) {
            console.error('Error searching for character:', error.message);
            this.setState({ character: null, error: error.message, loading: false, searching: false });
        }
    };

    handleNext = () => {
        this.setState((prevState) => {
            const nextId = prevState.currentId + 1;
            return { currentId: nextId };
        }, () => {
            this.fetchCharacterById(this.state.currentId);
        });
    };

    handlePrevious = () => {
        this.setState((prevState) => {
            if (prevState.currentId > 1) {
                const prevId = prevState.currentId - 1;
                return { currentId: prevId };
            } else {
                this.setState({ error: 'No characters with IDs less than 1.' });
                return prevState;
            }
        }, () => {
            this.fetchCharacterById(this.state.currentId);
        });
    };

    handleSearch = (name) => {
        if (name) {
            this.fetchCharacterByName(name);
        }
    };

    render() {
        const { character, error, loading } = this.state;

        return (
            <div>
                <Search onSearch={this.handleSearch} />

                <div>
                    <button onClick={this.handlePrevious} disabled={this.state.currentId <= 1 || loading}>
                        Previous
                    </button>
                    <button onClick={this.handleNext} disabled={loading}>
                        Next
                    </button>
                </div>

                {loading && <div>Loading...</div>}

                {error && !loading && (
                    <div>{error}</div>
                )}
                
                {!error && character && !loading && (
                    <Person person={character} />
                )}
            </div>
        );
    }
}

export default StarWars;
