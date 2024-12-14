import React from 'react';

function ImageInput({ urls, setUrls }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Image URLs (one per line)
      </label>
      <textarea
        className="w-full p-2 border rounded-md h-32"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        placeholder="Enter image URLs (one per line)"
      />
    </div>
  );
}

export default ImageInput;