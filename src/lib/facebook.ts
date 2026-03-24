export async function postImageToFB(message: string, imageBlob: Blob) {
  const formData = new FormData();
  formData.append('access_token', process.env.FB_ACCESS_TOKEN!);
  formData.append('source', imageBlob, 'automation.png');
  formData.append('message', message);

  const response = await fetch(
    `https://graph.facebook.com/${process.env.FB_PAGE_ID}/photos`,
    { method: 'POST', body: formData }
  );
  return await response.json();
}