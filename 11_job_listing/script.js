document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const typeCheckboxes = document.querySelectorAll('.filter-type');
    const locationSelect = document.getElementById('location-select');
    const clearBtn = document.getElementById('clear-filters');
    const jobCards = document.querySelectorAll('.job-card');

    function filterJobs() {
        const searchText = searchInput.value.toLowerCase();
        const selectedLocation = locationSelect.value;
        
        // Get active checkboxes
        const activeTypes = Array.from(typeCheckboxes)
                                .filter(cb => cb.checked)
                                .map(cb => cb.value);

        jobCards.forEach(card => {
            const cardTitle = card.getAttribute('data-title');
            const cardLocation = card.getAttribute('data-location');
            const cardType = card.getAttribute('data-type');

            // Check match
            const matchesSearch = cardTitle.includes(searchText);
            const matchesLocation = selectedLocation === 'All' || cardLocation === selectedLocation;
            const matchesType = activeTypes.length === 0 || activeTypes.includes(cardType);

            if (matchesSearch && matchesLocation && matchesType) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Event Listeners
    searchInput.addEventListener('input', filterJobs);
    locationSelect.addEventListener('change', filterJobs);
    typeCheckboxes.forEach(cb => cb.addEventListener('change', filterJobs));

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        locationSelect.value = 'All';
        typeCheckboxes.forEach(cb => cb.checked = false);
        filterJobs();
    });
});
