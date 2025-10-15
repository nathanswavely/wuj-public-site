// EPK JavaScript - Load and display show history

document.addEventListener('DOMContentLoaded', function() {
    loadShowHistory();
});

// Load and display show history from JSON
async function loadShowHistory() {
    const timelineContainer = document.getElementById('showsTimeline');
    const toggleButton = document.getElementById('toggleShows');
    const showCountElement = document.getElementById('showCount');

    try {
        const response = await fetch('../Resources/shows.json');
        if (!response.ok) {
            throw new Error('Failed to load shows data');
        }

        const shows = await response.json();

        // Update show count
        if (showCountElement) {
            showCountElement.textContent = `${shows.length} Performances`;
        }

        // Clear loading message
        timelineContainer.innerHTML = '';

        // Determine how many shows to initially display
        const initialShowCount = 12;
        const showAll = shows.length <= initialShowCount;

        // Create show cards
        shows.forEach((show, index) => {
            const showCard = createShowCard(show, index >= initialShowCount && !showAll);
            timelineContainer.appendChild(showCard);
        });

        // Set up toggle button if there are more shows than initial display
        if (!showAll) {
            toggleButton.style.display = 'block';
            let isExpanded = false;

            toggleButton.addEventListener('click', function() {
                isExpanded = !isExpanded;
                const allCards = timelineContainer.querySelectorAll('.show-card');

                if (isExpanded) {
                    // Show all cards
                    allCards.forEach(card => card.classList.remove('hidden'));
                    toggleButton.textContent = 'Show Fewer Venues';
                } else {
                    // Hide cards after initialShowCount
                    allCards.forEach((card, index) => {
                        if (index >= initialShowCount) {
                            card.classList.add('hidden');
                        }
                    });
                    toggleButton.textContent = 'Show More Venues';
                    // Scroll to timeline
                    timelineContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

    } catch (error) {
        console.error('Error loading show history:', error);
        timelineContainer.innerHTML = '<div class="loading">Unable to load show history at this time.</div>';
    }
}

// Create a show card element
function createShowCard(show, isHidden) {
    const card = document.createElement('div');
    card.className = `show-card${isHidden ? ' hidden' : ''}`;

    const venue = document.createElement('div');
    venue.className = 'show-card-venue';
    venue.textContent = show.venue;

    const date = document.createElement('div');
    date.className = 'show-card-date';
    date.textContent = show.displayDate;

    card.appendChild(venue);
    card.appendChild(date);

    return card;
}

// Smooth scrolling for internal links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
