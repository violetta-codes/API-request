
async function fetchArtworks() {
    const artworkIds = [129883, 129884, 129885];
    const baseUrl = 'https://api.artic.edu/api/v1/artworks/';
    
    try {
       
        const responses = await Promise.all(
            artworkIds.map(id => fetch(`${baseUrl}${id}`))
        );
        
        const data = await Promise.all(
            responses.map(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
        );

        displayArtworks(data.map(item => item.data));
    } catch (error) {
        console.error('Failed to fetch artworks:', error);
        document.getElementById('artwork-container').innerHTML = `
            <p style="color:red;">An error occurred while fetching artworks. Please try again later.</p>
        `;
    }
}

function displayArtworks(artworks) {
    const container = document.getElementById('artwork-container');
    container.innerHTML = '';

    artworks.forEach(artwork => {
        const card = document.createElement('div');
        card.className = 'artwork-card';

        card.innerHTML = `
            <h2>${artwork.title}</h2>
            <img src="${artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${artwork.title}">
            <p><strong>Artist:</strong> ${artwork.artist_title || 'Unknown'}</p>
            <p><strong>Year:</strong> ${artwork.date_display || 'N/A'}</p>
            <p><strong>Medium:</strong> ${artwork.medium_display || 'N/A'}</p>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchArtworks);
