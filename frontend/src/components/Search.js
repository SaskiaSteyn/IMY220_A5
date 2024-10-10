import React, { Component } from 'react'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
    }

    handleInputChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    handleSearch = () => {
        const { searchQuery } = this.state;
        if (searchQuery.trim()) {
            this.props.onSearch(searchQuery.trim());
            this.setState({ searchQuery: '' }); // Clear the search bar after search
        }
    };

    render() {
        const { searchQuery } = this.state;

        return (
            <div>
                <h2>Search</h2>
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={this.handleInputChange}
                />
                <br/>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;
