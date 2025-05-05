import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import { useNotification } from '../../../components/Contexts/NotificationContext';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Notify from '../../../components/common/Notify';
import { UserLogin } from '../../../interfaces/auth.interface';
import { setShopTenantState } from '../../../redux/features/appStateSlice';
// import { setItemState, setLogo } from '../../../redux/features/appStateSlice';
import {
  login,
  // setShopAdminTenant,
} from '../../../redux/features/authStateSlice';
import { setRolePermissions } from '../../../redux/features/permissionsStateSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks';
import auth from '../../../services/adminapp/admin';
import { setItem } from '../../../utils/storage';
import { useSnackbar } from '../../../components/hooks/useSnackbar';

interface Fields {
  newPassword: string;
  confirmPassword: string;
}

function NewPasswordPage() {
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoader, setIsLoader] = useState(false);

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = (
    ref: React.RefObject<HTMLInputElement>,
    toggleFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const input = ref.current;
    const position = input?.selectionStart;

    toggleFn((prev) => !prev);

    setTimeout(() => {
      if (input && position != null) {
        input.setSelectionRange(position, position);
      }
    }, 0);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Fields>();

  const submitHandler = async (data: Fields) => {
    setIsLoader(true);
    const fieldsData: any = {
      email: state.email,
      otp: state.otp,
      password: data.newPassword,
    };
    try {
      const user = await auth.newPasswordService(fieldsData);
      if (user.data.success) {
        setIsLoader(false);
        navigate('../login', { replace: true });
      } else {
        setIsLoader(false);
        showMessage(user.data.message, 'error');
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
              <span>Enter New Password</span>
            </div>
            <div className="form-group w-full">
              <span className="my-2 block font-an-gurmukhi text-[16px] text-secondary2">
                New Password
              </span>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  inputRef={newPasswordRef}
                  className="input-with-icon h-[50px] after:border-b-secondary"
                  id="newPassword"
                  placeholder="12345678"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword', {
                    required: 'Please enter your password.',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleTogglePassword(
                            newPasswordRef,
                            setShowNewPassword
                          )
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showNewPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
                {errors.newPassword && (
                  <ErrorSpanBox error={errors.newPassword?.message} />
                )}
              </FormControl>
            </div>
            <div className="form-group w-full">
              <span className="my-2 block font-an-gurmukhi text-[16px] text-secondary2">
                Confirm Password
              </span>
              <FormControl className="m-1 w-full" variant="filled">
                <Input
                  inputRef={confirmPasswordRef}
                  className="input-with-icon h-[50px] after:border-b-secondary"
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please enter your password.',
                    validate: (value) =>
                      value === watch('newPassword') ||
                      'Passwords do not match.',
                  })}
                  placeholder="12345678"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleTogglePassword(
                            confirmPasswordRef,
                            setShowConfirmPassword
                          )
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
                {errors.confirmPassword && (
                  <ErrorSpanBox error={errors.confirmPassword?.message} />
                )}
              </FormControl>
            </div>
            <div className="mt-8 w-full px-4">
              <Button
                disabled={!!isLoader}
                className="w-full rounded-2xl bg-background px-16 py-4 text-primary"
                variant="contained"
                color="inherit"
                title="Save"
                type="submit"
              >
                {!isLoader ? (
                  `Save`
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

export default NewPasswordPage;
