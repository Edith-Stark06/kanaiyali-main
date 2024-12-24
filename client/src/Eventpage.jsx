import axios from 'axios';
import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa6';

const Eventpage = () => {
  const [pageType, setPageType] = useState('event'); 
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [authorName, setAuthorName] = useState("");        
  const [content, setContent] = useState("");              
  const [addedPhotos, setAddedphotos] = useState([]);
  const [plink, setPlink] = useState("");

  const handleModelChange = (ev) => {
    setPageType(ev.target.value);
  };

  const addpbylink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("https://kanaiyali-main.vercel.app/upload-by-link", { link: plink });
    setAddedphotos(prev => [...prev, filename]);
    setPlink("");
  };

  const uploadPhoto = (ev) => {
    ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photo", files[i]);
    }
    axios.post("https://kanaiyali-main.vercel.app/uploads", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      const { data: filenames } = res;
      setAddedphotos(prev => {
        return [...prev,...filenames]
      });
    });
  };

  const addeventModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/kavithai", data).then(() => {
      alert("Content added to Kavithai. Thank you!");
      resetForm();
    });
  };

  const addOviyamModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/oviyam", data).then(() => {
      alert("Content added to Oviyam. Thank you!");
      resetForm();
    });
  };

  const addsirukadhaiModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/sirukadhai", data).then(() => {
      alert("Content added to Sirukadhai. Thank you!");
      resetForm();
    });
  };

  const addputhagamModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/puthaga-vimarsanam", data).then(() => {
      alert("Content added to Puthaga-Vimarsanam. Thank you!");
      resetForm();
    });
  };

  const addvasanamModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/vasanam", data).then(() => {
      alert("Content added to Vasanam. Thank you!");
      resetForm();
    });
  };

  const addvidukadhaiModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/vidukadhai", data).then(() => {
      alert("Content added to Vidukadhai. Thank you!");
      resetForm();
    });
  };

  const addnaatkurippuModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("https://kanaiyali-main.vercel.app/naatkurippu", data).then(() => {
      alert("Content added to Naatkurippu. Thank you!");
      resetForm();
    });
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDate("");
    setAuthorName("");
    setContent("");
    setPlink("");
    setAddedphotos([]);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='mt-9 w-60 text-center bg-blue-300 py-3 text-2xl rounded-2xl'>Admin</h2>

      <div className='mt-5 w-96'>
        <label className='block mb-2 text-lg'>Select Content Type:</label>
        <select 
          value={pageType} 
          onChange={handleModelChange} 
          className='border-solid border-2 border-gray-500 px-4 py-2 rounded-xl w-full'
        >
          <option value="kavithai">Kavithai Page</option>
          <option value="oviyam">Oviyam Page</option>
          <option value="sirukadhai">Sirukadhai Page</option>
          <option value="puthagam">Puthaga-vimarsanam Page</option>
          <option value="vasanam">Vasanam Page</option>
          <option value="vidukadhai">Vidukadhai Page</option>
          <option value="naatkurippu">Naatkurippu Page</option>
        </select>
      </div>

      {pageType === 'kavithai' ? (
        <form className='mt-10 h-auto border-solid border-2 border-sky-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addeventModel}>
          <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
          <input type='text' placeholder='Enter the SubTitle' value={subtitle} className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setSubtitle(ev.target.value)} />
          <input type='text' placeholder='Enter the Author Name' value={authorName} className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setAuthorName(ev.target.value)} />
          <input type='date' placeholder='Enter the event date' value={date} className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setDate(ev.target.value)} />
          <textarea placeholder='Enter the Content' value={content} className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' rows="10" onChange={(ev) => setContent(ev.target.value)} />
          <input type='submit' className='bg-blue-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
        </form>
        ) : pageType === 'oviyam' ? (
          <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addOviyamModel}>
            <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
            <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={subtitle} onChange={(ev) => setSubtitle(ev.target.value)} />
            <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={authorName} onChange={(ev) => setAuthorName(ev.target.value)} />
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={date} onChange={(ev) => setDate(ev.target.value)} />
            <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" value={content} onChange={(ev) => setContent(ev.target.value)} />
            <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
          </form>
        ) : pageType === 'sirukadhai' ? (
          <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addsirukadhaiModel}>
            <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
            <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={subtitle} onChange={(ev) => setSubtitle(ev.target.value)} />
            <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={authorName} onChange={(ev) => setAuthorName(ev.target.value)} />
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={date} onChange={(ev) => setDate(ev.target.value)} />
            <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" value={content} onChange={(ev) => setContent(ev.target.value)} /> 
            <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
          </form>
        ) : pageType === 'puthagam' ? (
          <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addputhagamModel}>
            <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
            <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={subtitle} onChange={(ev) => setSubtitle(ev.target.value)} />
            <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={authorName} onChange={(ev) => setAuthorName(ev.target.value)} />
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={date} onChange={(ev) => setDate(ev.target.value)} />
            <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" value={content} onChange={(ev) => setContent(ev.target.value)} />
            <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
          </form>
        ) : pageType === 'vasanam' ? (
          <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addvasanamModel}>
            <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
            <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={subtitle} onChange={(ev) => setSubtitle(ev.target.value)} />
            <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={authorName} onChange={(ev) => setAuthorName(ev.target.value)} />
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={date} onChange={(ev) => setDate(ev.target.value)} />
            <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" value={content} onChange={(ev) => setContent(ev.target.value)} /> 
            <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
          </form>
        ) : pageType === 'vidukadhai' ? (
          <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addvidukadhaiModel}>
            <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
            <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={subtitle} onChange={(ev) => setSubtitle(ev.target.value)} />
            <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={authorName} onChange={(ev) => setAuthorName(ev.target.value)} />
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={date} onChange={(ev) => setDate(ev.target.value)} />
            <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" value={content} onChange={(ev) => setContent(ev.target.value)} />
            <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
          </form>
        ) : pageType === 'naatkurippu' ? (
          <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addnaatkurippuModel}>
            <input type='text' placeholder='Enter the Title' value={title} className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
            <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={subtitle} onChange={(ev) => setSubtitle(ev.target.value)} />
            <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={authorName} onChange={(ev) => setAuthorName(ev.target.value)} />
            <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' value={date} onChange={(ev) => setDate(ev.target.value)} />
            <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" value={content} onChange={(ev) => setContent(ev.target.value)} /> 
            <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
          </form>
      ) : null}

      
      <div className='flex gap-5'>
        <div className='flex items-center gap-3'>
          {addedPhotos.length > 0 && addedPhotos.map(link => (
            <div key={link}>
              <img src={'http://localhost:5000/uploads/' + link} alt='' className='rounded-xl' width="150px" height="100px" />
            </div>
          ))}
        </div>
        <label className='p-10 border-solid border-2 border-gray-500 rounded-xl cursor-pointer'>
          <input type='file' className='hidden' multiple onChange={uploadPhoto} />
          <div><FaFile /></div>
        </label>
      </div>
    </div>
  );
}

export default Eventpage;