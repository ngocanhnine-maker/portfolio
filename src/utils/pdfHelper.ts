import * as pdfjsLib from 'pdfjs-dist';

// Set up pdf.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

/**
 * Render the first page of a PDF File into a high-quality image data URL
 */
export async function convertPdfToImageDataUrl(file: File): Promise<{ previewUrl: string; pdfUrl: string }> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Create object URL for full PDF preview / download
  const pdfUrl = URL.createObjectURL(file);

  try {
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    // High quality scale for crisp rendering
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      // White background
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      // Cast render to avoid strict type collision across pdf.js versions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (page.render(renderContext as any).promise);
      const previewUrl = canvas.toDataURL('image/png', 0.95);
      return { previewUrl, pdfUrl };
    }
  } catch (err) {
    console.warn('PDF.js rendering fallback:', err);
  }

  // Fallback if worker or canvas fails
  return { previewUrl: '', pdfUrl };
}
