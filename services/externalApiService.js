const axios = require('axios');

class ExternalApiService {
  static async getRandomProductImage() {
    try {
      // Usando Lorem Picsum para imágenes aleatorias
      const response = await axios.get('https://picsum.photos/500/300');
      return response.request.res.responseUrl; // Retorna la URL de la imagen
    } catch (error) {
      console.error('Error fetching random image:', error);
      return 'https://picsum.photos/500/300'; // URL por defecto en caso de error
    }
  }
}

module.exports = ExternalApiService;