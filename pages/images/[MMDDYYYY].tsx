import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from '../../firebaseConfig';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { Box } from '@mui/material';

const Headlines: NextPage = () => {
  const router = useRouter();
  const [CNN, setCNN] = useState('');
  const [FOX, setFOX] = useState('');
  const [width, setWidth] = useState<number | null>(null);

  // Window is undefined initially
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Sometimes the query is empty so wait until the router is ready
    if (router.isReady) {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      const storage = getStorage(app);

      const { MMDDYYYY } = router.query;

      // Create a storage reference from our storage service
      // A reference is a pointer to the file path in the bucket
      const CNNRef = ref(storage, `/images/${MMDDYYYY}/CNN_screenshot.jpg`);
      const FOXRef = ref(storage, `/images/${MMDDYYYY}/FOX_screenshot.jpg`);

      getDownloadURL(CNNRef)
        .then((url) => {
          setCNN(url);
        })
        .catch((error) => {
          console.log(error);
        });

      getDownloadURL(FOXRef)
        .then((url) => {
          setFOX(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.isReady]);

  if (!CNN || !FOX) {
    return <div>Don't have headlines for this day. Sorry</div>;
  }

  return (
    <Box display="flex" justifyContent="space-around">
      {width! <= 815 ? (
        <Box>
          <NextImage src={CNN} width={width!} height={500} alt="CNN Headline" />
          <Box mt="50px">
            <NextImage
              src={FOX}
              width={width!}
              height={500}
              alt="FOX Headline"
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <NextImage src={CNN} width={700} height={500} alt="CNN Headline" />
          <NextImage src={FOX} width={700} height={500} alt="FOX Headline" />
        </Box>
      )}
    </Box>
  );
};

export default Headlines;
