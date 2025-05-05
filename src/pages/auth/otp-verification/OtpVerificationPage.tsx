import Button from '@mui/material/Button';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react18-otp-input';
import assets from '../../../assets';
import { useSnackbar } from '../../../components/hooks/useSnackbar';

function OTPVerificationPage() {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [OTP, setOTP] = useState('');

  const submitHandler = () => {
    if (OTP.length !== 4) {
      return showMessage('OTP is required', 'error');
    }
    if (state.otp !== OTP) return showMessage('OTP is incorrect', 'error');
    return navigate('../new-password', {
      replace: true,
      state: { email: state.email, otp: OTP },
    });
  };

  return (
    <div className="relative h-full w-full bg-background">
      <div className="absolute top-[20px] left-[56px]">
        <img
          src={assets.images.loginVectorOne}
          alt="vector-one"
          className="h-[520px] object-contain 2xl:h-[800px]"
        />
      </div>
      <div className="absolute top-[0px] right-[0px]">
        <img
          src={assets.images.loginVectorTwo}
          alt="vector-one"
          className="h-[260px] object-contain"
        />
      </div>
      <div className="absolute bottom-[200px] right-[230px] 2xl:bottom-[450px]">
        <img
          src={assets.images.loginVectorFour}
          alt="vector-one"
          className="h-[70px] object-contain"
        />
      </div>
      <div className="absolute bottom-[55px] right-[100px]">
        <img
          src={assets.images.loginVectorFive}
          alt="vector-one"
          className="h-[100px] object-contain"
        />
      </div>
      <div className="absolute bottom-[0px] left-[0px]">
        <img
          src={assets.images.loginVectorThree}
          alt="vector-one"
          className="h-[100px] object-contain"
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <form className="z-10 h-[480px] w-[473px] rounded-2xl bg-primary py-10 px-5">
          <div className="">
            <div className="flex items-center justify-center">
              <img
                src={assets.images.mdalderIcon}
                alt="mdalder-icon"
                className="object-contain"
              />
            </div>
            <div className="form-group mt-5 flex w-full items-center justify-center text-center">
              <span>
                An 4 digit code has been <br /> sent to {state?.email}
              </span>
            </div>
            <div className="mt-[42px] flex w-full items-center justify-center text-center">
              <OtpInput
                placeholder="1234"
                className="mx-2"
                containerStyle="otp-container"
                inputStyle={{
                  width: '3rem',
                  aspectRatio: '1/1',
                  borderRadius: '0.625rem',
                  outlineStyle: 'solid',
                  outlineWidth: '2px',
                  outlineColor: '#3800F1',
                  fontFamily: 'Open Sans',
                  fontSize: '1.75rem',
                  lineHeight: '1.5rem',
                  fontWeight: 700,
                  color: '#3800F1',
                }}
                focusStyle={{ outlineColor: '#3800F1' }}
                numInputs={4}
                onChange={(value: string) => setOTP(value)}
                separator={<span> </span>}
                isInputNum
                shouldAutoFocus
                value={OTP}
              />
            </div>
            <div className="mt-8 w-full px-4">
              <Button
                disabled={OTP.length !== 4}
                className="w-full rounded-2xl bg-background px-16 py-4 text-primary"
                variant="contained"
                color="inherit"
                title="Get Code"
                onClick={() => submitHandler()}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPVerificationPage;
