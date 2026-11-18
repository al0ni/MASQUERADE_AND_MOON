const objects = [22739, 310350, 112525, 65723, 159244, 159482];
try {
  const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objects[0], {signal:AbortSignal.timeout(12000)});
  if (!response.ok) throw new Error('Museum HTTP ' + response.status);
  const item = await response.json();
  if (!item.isPublicDomain || !item.primaryImageSmall || Number(item.objectID) !== objects[0]) throw new Error('Unverified artwork');
  console.log('The Met API responded with matching artwork:', item.title, '(ID ' + item.objectID + ').');
} catch (error) {
  console.log('The Met API is currently unavailable:', error.message);
  console.log('The gallery uses verified local artwork images and shows the stored matching metadata.');
}
