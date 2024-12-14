import React from 'react';

function CollageControls({
  title,
  setTitle,
  titlePosition,
  setTitlePosition,
  collageCount,
  setCollageCount,
  onGenerate,
  onDownloadAll,
  isGenerating
}) {
  const handleRandomPosition = () => {
    const positions = ['top', 'middle', 'bottom'];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    setTitlePosition(randomPosition);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Collage Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter collage title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title Position</label>
        <div className="flex space-x-2">
          {['top', 'middle', 'bottom'].map((pos) => (
            <button
              key={pos}
              className={`px-4 py-2 rounded-md ${
                titlePosition === pos
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setTitlePosition(pos)}
            >
              {pos.charAt(0).toUpperCase() + pos.slice(1)}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-md bg-purple-500 text-white"
            onClick={handleRandomPosition}
          >
            Random
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Number of Collages (max 999)
        </label>
        <input
          type="number"
          min="1"
          max="999"
          className="w-full p-2 border rounded-md"
          value={collageCount}
          onChange={(e) => setCollageCount(Math.min(999, Math.max(1, e.target.value)))}
        />
      </div>

      <div className="flex space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Collages'}
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md"
          onClick={onDownloadAll}
        >
          Download All
        </button>
      </div>
    </div>
  );
}

export default CollageControls;