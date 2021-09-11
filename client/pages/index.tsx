import type { NextPage } from 'next';
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container } from '../components/Container';
import Image from 'next/image';
import axios from 'axios';
import { Graph } from '../components/Graph';

type acceptedFile = {
  file: File;
  preview: string;
};

const Home: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState<acceptedFile | null>(null);
  const [prediction, setPrediction] = useState<Array<{}> | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:5000/eval-img'
      : 'https://image-prediction-image-ai-bpll3.ondigitalocean.app/eval-img';

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const acceptedFile = { file, preview: URL.createObjectURL(file) };
    setSelectedImage(acceptedFile);
  }, []);

  useEffect(() => {
    uploadImage(selectedImage!);
  }, [selectedImage]);

  const uploadImage = async (img: acceptedFile): Promise<void> => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append('file', img.file);
      const { data } = await axios.post(url, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  return (
    <Container>
      <div className='pt-40'>
        <div className='text-center'>
          <h1 className='text-4xl'>image.AI</h1>
        </div>
      </div>

      <div className='max-w-m my-5 p-5 bg-gray-500 bg-opacity-25 rounded-lg'>
        <div {...getRootProps()} className='text-center'>
          <div>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag n drop some files here, or click to select files</p>
            )}
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className='mt-6'>
          {selectedImage && (
            <Image
              src={selectedImage.preview}
              alt='img'
              width={300}
              height={300}
              className='rounded-lg'
            />
          )}
        </div>

        <div className=' ml-5 flex-1'>
          {!loading && selectedImage && (
            <Graph loading={loading} prediction={prediction!} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Home;
