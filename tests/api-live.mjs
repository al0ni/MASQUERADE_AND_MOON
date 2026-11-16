const params = new URLSearchParams({
  q: 'mask',
  limit: '50',
  fields: 'id,title,image_id,is_public_domain,artist_display,date_display'
});
const url = 'https://api.artic.edu/api/v1/artworks/search?' + params.toString();

try {
  const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  const json = await response.json();
  const artworks = (Array.isArray(json.data) ? json.data : []).filter(
    (item) => item.is_public_domain === true && item.image_id
  );
  if (!artworks.length) throw new Error('No public-domain artworks with images');
  console.log('Live museum API returned', artworks.length, 'eligible artworks.');
  console.log('Example:', artworks[0].title);
} catch (error) {
  console.log('Live museum API is currently unavailable:', error.message);
  console.log('The site provides an error message and retry control for this case.');
}
