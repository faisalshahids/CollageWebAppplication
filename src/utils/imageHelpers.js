export const validateImageUrls = (urls) => {
  const imageUrls = urls.split('\n').filter(url => url.trim());
  if (imageUrls.length < 4) {
    throw new Error('Please provide at least 4 image URLs');
  }
  return imageUrls;
};

export const getRandomImages = (imageUrls, count = 4) => {
  const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};