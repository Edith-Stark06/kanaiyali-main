import React, { useState } from 'react';
import axios from 'axios';

const EventPage = () => {
  const [pageType, setPageType] = useState('kavithai');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    authorName: '',
    content: '',
    addedPhotos: [],
  });
  const [photoLink, setPhotoLink] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("https://kanaiyali-main.onrender.com/upload-by-link", { link: photoLink });
      setFormData(prev => ({ ...prev, addedPhotos: [...prev.addedPhotos, filename] }));
      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading photo by link", error);
    }
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    Array.from(files).forEach(file => data.append('photo', file));

    try {
      const { data: filenames } = await axios.post("https://kanaiyali-main.onrender.com/uploads", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, addedPhotos: [...prev.addedPhotos, ...filenames] }));
    } catch (error) {
      console.error("Error uploading photo", error);
    }
  };

  const submitContent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://kanaiyali-main.onrender.com/${pageType}`, formData);
      alert(`Content added to ${pageType}. Thank you!`);
      setFormData({ title: '', subtitle: '', date: '', authorName: '', content: '', addedPhotos: [] });
    } catch (error) {
      console.error("Error adding content", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-6 text-2xl bg-blue-300 py-3 rounded-xl">Admin Panel</h2>
      
      <div className="mt-4">
        <label>Select Content Type:</label>
        <select 
          value={pageType} 
          onChange={(e) => setPageType(e.target.value)} 
          className="border px-4 py-2 rounded"
        >
          {["kavithai", "oviyam", "sirukadhai", "puthagam", "vasanam", "vidukadhai", "naatkurippu"].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <form className="mt-8 flex flex-col gap-4" onSubmit={submitContent}>
        <input type="text" name="title" placeholder="Enter the Title" value={formData.title} onChange={handleInputChange} />
        <input type="text" name="subtitle" placeholder="Enter the Subtitle" value={formData.subtitle} onChange={handleInputChange} />
        <input type="text" name="authorName" placeholder="Enter the Author Name" value={formData.authorName} onChange={handleInputChange} />
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
        <textarea name="content" placeholder="Enter the Content" value={formData.content} onChange={handleInputChange} rows="5" />
        <input type="text" placeholder="Add photo URL" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
        <button type="button" onClick={addPhotoByLink}>Add Photo by Link</button>
        <input type="file" multiple onChange={uploadPhoto} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventPage;
