function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
  
    // Format time as HH:MM:SS
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    const timeString = `${hours}:${minutes}:${seconds}`;
  
    // Display the time
    document.getElementById('time').textContent = timeString;
  }
  
  // Update the time every second
  setInterval(updateTime, 1000);
  
  // Initialize the clock
  updateTime();
  
  function displayLocation(latitude, longitude) {
    const geocodeAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  
    fetch(geocodeAPI)
      .then(response => response.json())
      .then(data => {
        const location = `${data.city} ${data.postcode}, ${data.principalSubdivision}, ${data.countryName}`;
        document.getElementById('location').textContent = location;
      })
      .catch(error => {
        console.error('Error fetching location:', error);
      });
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          displayLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          document.getElementById('location').textContent = 'Location unavailable';
        }
      );
    } else {
      document.getElementById('location').textContent = 'Geolocation not supported';
    }
  }
  
  // Get location on page load
  getLocation();
  