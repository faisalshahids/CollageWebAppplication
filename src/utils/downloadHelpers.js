import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const downloadSingleCollage = async (element, index) => {
  if (!element) {
    throw new Error('Collage element not found');
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 0.95,
      cacheBust: true,
    });
    saveAs(dataUrl, `collage-${index + 1}.png`);
  } catch (error) {
    throw new Error('Failed to download collage: ' + error.message);
  }
};

export const downloadAllCollages = async (elements) => {
  if (!elements.length) {
    throw new Error('No collages to download');
  }

  const zip = new JSZip();
  
  try {
    const promises = elements.map(async (element, index) => {
      const dataUrl = await toPng(element, {
        quality: 0.95,
        cacheBust: true,
      });
      const base64Data = dataUrl.split(',')[1];
      zip.file(`collage-${index + 1}.png`, base64Data, { base64: true });
    });

    await Promise.all(promises);
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'collages.zip');
  } catch (error) {
    throw new Error('Failed to create zip file: ' + error.message);
  }
};