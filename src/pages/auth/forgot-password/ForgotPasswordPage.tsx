import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
// import { setItemState, setLogo } from '../../../redux/features/appStateSlice';
import { useSnackbar } from '../../../components/hooks/useSnackbar';
import auth from '../../../services/adminapp/admin';

function ForgotPasswordPage() {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const submitHandler = async (data: { email: string }) => {
    setIsLoader(true);
    const userData: { email: string } = {
      email: data.email,
    };
    try {
      const res = await auth.getOtpService(userData);
      if (res.data.success) {
        setIsLoader(false);
        navigate('../otp-verification', {
          state: { email: data.email, otp: res.data.data.otp },
        });
      } else {
        setIsLoader(false);
        showMessage(res.data.message, 'error');
      }
    } catch (err: Error | any) {
      setIsLoader(false);
      showMessage(err?.response?.data?.message, 'error');
    }
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
        <form
          className="z-10 h-[480px] w-[473px] rounded-2xl bg-primary py-10 px-5"
          onSubmit={handleSubmit(submitHandler)}
        >
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
                Enter registered email <br />
                to receive password reset link
              </span>
            </div>
            <div className="form-group mt-5 w-full">
              <span className="my-2 block font-an-gurmukhi text-[16px] font-normal leading-[normal] text-secondary2">
                Email Address
              </span>
              <FormControl className="m-1 h-full w-full" variant="standard">
                <Input
                  className="h-[50px] text-secondary2"
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Please enter your email.',
                  })}
                  placeholder="example@urapptech.com"
                  disableUnderline
                />
                {errors.email && <ErrorSpanBox error={errors.email?.message} />}
              </FormControl>
            </div>
            <div className="mt-8 w-full px-4">
              <Button
                disabled={!!isLoader}
                className="w-full rounded-2xl bg-background px-16 py-4 text-primary"
                variant="contained"
                color="inherit"
                title="Get Code"
                type="submit"
              >
                {!isLoader ? (
                  `Get Code`
                ) : (
                  <CircularProgress color="inherit" size={24} />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
