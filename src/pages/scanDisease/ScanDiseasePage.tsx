import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  LinearProgressProps,
  Typography,
  linearProgressClasses,
} from '@mui/material';
import TopBar from '../../components/common/Md-Alder/TopBar';
import SmileFace from '../../assets/images/SmileFace.png';
import OpenCamera from '../../assets/images/open-camera.png';
import ScanDiseaseWebCamModal from './ScanDieseaseWebCamModal';
import { imageAllowedTypes } from '../../utils/constants';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import service from '../../services/adminapp/adminScanDisease';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: 10,
            borderRadius: 5,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: 'var(--theme-faded)',
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: 'var(--theme-background)',
            },
          }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ScanDiseasePage = () => {
  const { showMessage } = useSnackbar();
  // const [imagePreview, setImagePreview] = useState<string | undefined | null>(
  //   null
  // );
  const [capturePreview, setCapturePreview] = useState<
    string | undefined | null
  >(null);
  const [webCam, setWebCam] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );
  const [image, setImage] = useState<any>(null);
  const [capImage, setCapImage] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoader, setIsLoader] = useState<any>({
    upload: false,
    capture: false,
  });

  const handleOpenCamera = () => {
    setWebCam(true);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result?.toString());
      };
      reader.readAsDataURL(selectedFile);
      const fileType = selectedFile.type;
      if (imageAllowedTypes.includes(fileType)) {
        setImage(event.target.files[0]);
      } else {
        showMessage('Only .png, .jpg, and .jpeg files are allowed', 'error');
      }
    }
  };

  const handleFileOnClick = (event: any) => {
    setResult(null);
    event.target.value = null;
    setImage(null);
    setIsLoader({ upload: false, capture: false });
  };

  const onSubmitHandler = (type: string) => {
    const file =
      type === 'upload' ? image : type === 'capture' ? capImage : null;
    if (type === 'upload') {
      setIsLoader({ upload: true, capture: false });
    } else if (type === 'capture') {
      setIsLoader({ upload: false, capture: true });
    } else {
      setIsLoader({ upload: false, capture: false });
    }
    const formData = new FormData();
    formData.append('results', type);
    if (file) formData.append('avatar', file);
    service
      .create(formData)
      .then((item) => {
        if (item.data.success) {
          showMessage(item.data.message, 'success');
          setIsLoader({ upload: false, capture: false });
          setResult(item.data.data);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader({ upload: false, capture: false });
        }
      })
      .catch((err) => {
        setIsLoader({ upload: false, capture: false });
        showMessage(err.response.data.message, 'error');
      });
  };

  return (
    <>
      <TopBar title="Scan Disease" />
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-2 gap-10">
          <div className="alder-card-border p-8 ">
            <div
              className={`flex min-h-[400px] items-center justify-center rounded-[15px] ${
                !capturePreview && 'bg-faded'
              }`}
              onClick={handleOpenCamera}
            >
              {capturePreview ? (
                <div className="w-full">
                  <img
                    src={capturePreview}
                    alt="Preview"
                    className="max-h-[400px] w-full rounded-[15px]"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex w-full justify-center">
                    <img
                      src={OpenCamera}
                      alt="Open Camera"
                      className="h-[63px]"
                    />
                  </div>
                  <h2 className="mt-5">Open Camera</h2>
                </div>
              )}
            </div>
            {capturePreview && (
              <div className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-background p-3"
                    onClick={handleOpenCamera}
                    variant="contained"
                  >
                    Retake
                  </Button>

                  {!isLoader?.capture ? (
                    <Button
                      disabled={isLoader?.capture}
                      onClick={() => onSubmitHandler('capture')}
                      className="bg-background p-3"
                      variant="contained"
                    >
                      Analyze
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center bg-background">
                      <CircularProgress size={20} className="text-foreground" />
                    </div>
                  )}
                </div>
                {result?.results?.type === 'capture' && (
                  <div className="mt-5">
                    <p className="text-sm">
                      <span className="text-md text-gray-400">Disease:</span>
                      <span className="text-black">
                        {' '}
                        {result?.results?.name}
                      </span>
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="text-gray-400">Patient</span>
                    </p>
                    <LinearProgressWithLabel value={46} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="alder-card-border p-8">
            <div
              className={`flex min-h-[400px] items-center justify-center rounded-[15px] ${
                !imagePreview && 'bg-faded'
              } `}
              onClick={() => document?.getElementById('imageInput')?.click()}
            >
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-[400px] w-full rounded-3xl"
                />
              )}
              <div className={`${imagePreview ? 'hidden' : ''}`}>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileChange(event);
                  }}
                  onClick={(
                    event: React.InputHTMLAttributes<HTMLInputElement>
                  ) => {
                    handleFileOnClick(event);
                  }}
                  style={{ display: 'none' }}
                />
                <div className="flex w-full justify-center">
                  <img src={SmileFace} alt="Upload" className="h-[63px]" />
                </div>
                <h2 className="mt-5">Upload Image</h2>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="bg-background p-3"
                    onClick={() =>
                      document?.getElementById('imageInput')?.click()
                    }
                    variant="contained"
                  >
                    Choose different file
                  </Button>
                  {!isLoader?.upload ? (
                    <Button
                      disabled={isLoader?.upload}
                      onClick={() => onSubmitHandler('upload')}
                      className="bg-background p-3"
                      variant="contained"
                    >
                      Analyze
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center bg-background">
                      <CircularProgress size={20} className="text-foreground" />
                    </div>
                  )}
                </div>
                {result?.results?.type === 'upload' && (
                  <div className="mt-5">
                    <p className="text-sm">
                      <span className="text-md text-gray-400">Disease:</span>
                      <span className="text-black">
                        {' '}
                        {result?.results?.name}
                      </span>
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="text-gray-400">Patient</span>
                    </p>
                    <LinearProgressWithLabel value={46} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ScanDiseaseWebCamModal
        open={webCam}
        setOpen={setWebCam}
        setImage={setCapturePreview}
        setFile={setCapImage}
      />
    </>
  );
};
export default ScanDiseasePage;
