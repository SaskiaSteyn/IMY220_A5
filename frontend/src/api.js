// Fetch character by ID from SWAPI
export async function getCharacterById(id) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Character not found'); // Specific error message
            } else {
                throw new Error('An error occurred while fetching the character by ID.');
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Re-throw the error to be caught by the calling function
        throw error;
    }
}


export async function getCharacterByName(name) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);

        if (!response.ok) {
            throw new Error(`Unable to search for character with name "${name}".`);
        }

        const data = await response.json();

        if (data.results.length === 0) {
            throw new Error(`Character with the name "${name}" not found.`);
        }

        return data.results[0];
    } catch (error) {
        return { error: error.message || 'An unknown error occurred while searching for the character by name.' };
    }
}
