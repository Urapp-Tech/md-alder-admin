import React from 'react';
import WebCamModal from '../../components/common/Md-Alder/WebCamModal';

const videoConstraints = {
  width: 482,
  height: 400,
  facingMode: 'user',
};

interface ScanDiseaseWebCamModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  setFile: React.Dispatch<React.SetStateAction<string | undefined | null>>;
}

const ScanDiseaseWebCamModal: React.FC<ScanDiseaseWebCamModalProps> = ({
  open,
  setOpen,
  setImage,
  setFile,
}) => {
  return (
    <WebCamModal
      open={open}
      setOpen={setOpen}
      setImage={setImage}
      setCaptureFile={setFile}
    />
  );
};

export default ScanDiseaseWebCamModal;
