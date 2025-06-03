const axios = require('axios');

const ExternalApiService = {
  getRandomProductImage: async () => {
    try {
      // Using Lorem Picsum to get a random image
      const response = await axios.get('https://picsum.photos/200', {
        responseType: 'arraybuffer'
      });
      // The URL for the image can be the picsum.photos URL with a random seed
      // Since picsum.photos redirects to an image, we can use the URL directly
      // Alternatively, use a fixed URL pattern
      return 'https://picsum.photos/200';
    } catch (error) {
      console.error('Error fetching image from external API:', error.message);
      // Return a default placeholder image URL in case of error
      return 'https://via.placeholder.com/200';
    }
  }
};

module.exports = ExternalApiService;
