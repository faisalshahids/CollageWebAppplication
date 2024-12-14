import { useState } from 'react';
import ImageInput from './components/ImageInput';
import CollageControls from './components/CollageControls';
import Collage from './components/Collage';
import { validateImageUrls, getRandomImages } from './utils/imageHelpers';
import { downloadSingleCollage, downloadAllCollages } from './utils/downloadHelpers';
import './index.css';

function App() {
  const [urls, setUrls] = useState('');
  const [title, setTitle] = useState('');
  const [titlePosition, setTitlePosition] = useState('top');
  const [collageCount, setCollageCount] = useState(1);
  const [collages, setCollages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateCollages = () => {
    setError('');
    if (!urls.trim() || !title.trim()) {
      setError('Please provide both image URLs and a title');
      return;
    }

    setIsGenerating(true);
    try {
      const imageUrls = validateImageUrls(urls);
      const newCollages = Array.from({ length: collageCount }, () => 
        getRandomImages(imageUrls)
      );
      setCollages(newCollages);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCollage = async (element, index) => {
    try {
      await downloadSingleCollage(element, index);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDownloadAll = async () => {
    try {
      const elements = Array.from(document.querySelectorAll('[data-collage]'));
      await downloadAllCollages(elements);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Collage Generator</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8">
          <ImageInput urls={urls} setUrls={setUrls} />
          
          <CollageControls
            title={title}
            setTitle={setTitle}
            titlePosition={titlePosition}
            setTitlePosition={setTitlePosition}
            collageCount={collageCount}
            setCollageCount={setCollageCount}
            onGenerate={generateCollages}
            onDownloadAll={handleDownloadAll}
            isGenerating={isGenerating}
          />

          {collages.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Generated Collages</h2>
              <div className="space-y-8">
                {collages.map((images, index) => (
                  <Collage
                    key={index}
                    images={images}
                    title={title}
                    titlePosition={titlePosition}
                    onDownload={handleDownloadCollage}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;