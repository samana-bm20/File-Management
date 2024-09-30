// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import FileTable from './FileTable'

const Input = styled('input')({
  display: 'none',
});

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = () => {
    fileRef.current.click();
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFiles();
    } catch (error) {
      console.error('Error in uploading file:', error)
    }

  }

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div>
      <div className='text-xl text-center font-bold m-2'>
        <p>File Upload and View</p>
      </div>
      <div className='flex justify-center m-4 p-2'>
        <input
          type='file'
          ref={fileRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
          onClick={handleUpload}
        >
          Upload File
        </Button>
      </div>
      <div>
        <FileTable files={files} fetchFiles={fetchFiles}/>
      </div>
    </div>
  );
}

export default App;
