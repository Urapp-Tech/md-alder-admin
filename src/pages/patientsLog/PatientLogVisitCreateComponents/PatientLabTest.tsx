import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  TextareaAutosize,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PatientVisitLabs } from '../../../interfaces/patient.interface';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  mimiType,
  PATTERN,
} from '../../../utils/constants';
import { useSnackbar } from '../../../components/hooks/useSnackbar';

const PatientLabTest = () => {
  const {
    register,
    // handleSubmit,
    // setValue,
    control,
    watch,
    setValue,
    // reset,
    // setError,
    // clearErrors,
    formState: { errors },
  } = useFormContext<PatientVisitLabs>();

  // const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { showMessage } = useSnackbar();

  const uploadedFiles = watch('labMedia') || [];

  const handleFileChange = (onChange: any, event: any) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file: any) => {
      const type = file.type;
      return (
        type === mimiType.pdf ||
        type === mimiType.word ||
        type === mimiType.wordsheet ||
        type === 'image/jpeg' ||
        type === 'image/png' ||
        type === 'image/jpg'
      );
    });

    if (validFiles.length) {
      const newFiles: any = [...uploadedFiles, ...validFiles];
      setValue('labMedia', newFiles);
      // setUploadedFiles(newFiles);
      onChange(newFiles);
    } else {
      // show error notification if needed
      showMessage(
        'Only .pdf, .doc, .docx, .jpg, .png, .jpeg files are allowed',
        'error'
      );
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
  };

  const handleRemoveFile = (fileName: string, onChange: any) => {
    const filtered = uploadedFiles.filter(
      (file: any) => file.name !== fileName
    );
    // setUploadedFiles(filtered);
    setValue('labMedia', filtered);
    onChange(filtered);
  };

  return (
    <div className="container">
      <div className="mt-3 grid grid-cols-12 gap-5">
        <Controller
          name="cbc"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="CBC"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="uce"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="UCE"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="lft"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="LFT"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="urineDr"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="URINE DR"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="biopsy"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="Biopsy"
              />
            </FormGroup>
          )}
        />
        <Controller
          name="radiology"
          control={control}
          // rules={{ required: 'Please select a complaint type.' }}
          render={({ field }: any) => (
            <FormGroup className="col-span-12 md:col-span-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={() => field.onChange(!field.value)}
                  />
                }
                label="Radiology"
              />
            </FormGroup>
          )}
        />
        <div className="col-span-12">
          <FormGroup>
            <FormLabel className="mb-5 text-xl font-medium text-[#A9A9A9]">
              Others
            </FormLabel>
            <FormControl className="FormControl" variant="standard">
              <TextareaAutosize
                {...register('otherLabsDesc', {
                  pattern: PATTERN.CHAR_NUM_DASH,
                  validate: (value) => value.length <= 100,
                })}
                minRows={4}
                className="FormInput alder-form-control rounded-2xl"
                id="otherLabsDesc"
                name="otherLabsDesc"
                placeholder="Type here..."
              />
              {errors.otherLabsDesc?.type === 'pattern' && (
                <ErrorSpanBox error={INVALID_CHAR} />
              )}
              {errors.otherLabsDesc?.type === 'validate' && (
                <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
              )}
            </FormControl>
          </FormGroup>
        </div>
        <div className="col-span-12">
          <div className="mx-3 rounded-xl px-1">
            <Controller
              name="labMedia"
              control={control}
              rules={{ required: 'Required' }}
              render={({ field: { onChange } }) => (
                <div className="grid grid-cols-12">
                  <div className="col-span-12 flex">
                    <label className="mt-1">
                      Upload Lab Test Docs / Image
                      <span className="SubLabel mx-2 text-[12px]">
                        ( It should be in PDF, DOC, JPG, JPEG, or PNG format )
                      </span>
                    </label>
                    <input
                      multiple
                      accept=".pdf,.doc,.docx,image/jpeg,image/png,image/jpg"
                      style={{ display: 'none' }}
                      id="raised-button-image"
                      type="file"
                      onChange={(event) => handleFileChange(onChange, event)}
                      onClick={handleFileOnClick}
                    />
                    <label
                      htmlFor="raised-button-image"
                      className="mx-2 rounded-xl border-2 border-background"
                    >
                      <Button
                        component="span"
                        className="border-[2px] border-background"
                      >
                        <FileUploadOutlinedIcon
                          sx={{ marginRight: '0.5rem' }}
                        />
                        Upload
                      </Button>
                    </label>
                  </div>
                  <div className="col-span-6 mt-2 space-y-1">
                    {uploadedFiles?.map((file: any) => (
                      <div
                        key={file.name}
                        className="ShowImageBox flex items-center justify-between rounded bg-foreground px-2 py-1"
                      >
                        <label className="ShowImageLabel truncate text-sm">
                          {file.name}
                        </label>
                        <IconButton
                          className="btn-dot"
                          onClick={() => handleRemoveFile(file.name, onChange)}
                        >
                          <CloseOutlinedIcon
                            sx={{
                              color: '#1D1D1D',
                              fontSize: '1rem',
                              lineHeight: '1.5rem',
                            }}
                          />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
            {errors?.labMedia && (
              <ErrorSpanBox error={errors?.labMedia?.message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLabTest;
