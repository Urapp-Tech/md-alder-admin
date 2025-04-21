import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  TablePagination,
} from '@mui/material';
// import { faker } from '@faker-js/faker';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TopBar from '../../components/common/Md-Alder/TopBar';
import photo from '../../assets/images/Photo.png';
import EyeIcon from '../../components/icons/EyeIcon';
import CustomText from '../../components/common/CustomText';
import service from '../../services/adminapp/adminPatient';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import Loader from '../../components/common/Loader2';
import CustomDateRangePicker from '../../components/common/CustomDateRangePicker';
import usePermission from '../../components/hooks/hasPermission';
import { ALL_PERMISSIONS } from '../../utils/constants';

const PatientsLogPage = () => {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const { hasPermission } = usePermission();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const [range, setRange] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    startDate: dayjs().startOf('month').subtract(6, 'month').startOf('month'),
    endDate: dayjs().startOf('month').add(6, 'month').endOf('month'),
  });

  useEffect(() => {
    setIsLoader(true);
    service
      .getList({
        search,
        page,
        size: rowsPerPage,
        startDate: range.startDate,
        endDate: range.endDate,
      })
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  }, [range]);

  const handleClickSearch = (event: any) => {
    if (event.key === 'Enter') {
      const searchTxt = event.target.value as string;
      const newPage = 0;
      setSearch(searchTxt);
      setPage(newPage);
      service
        .getList({ search: searchTxt, page, size: rowsPerPage })
        .then((item) => {
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
    service
      .getList({ search, page: newPage, size: rowsPerPage })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    service
      .getList({ search, page: newPage, size: newRowperPage })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  return (
    <>
      <TopBar title="Patient Log" />
      <div className="mt-10 py-5 pr-5">
        <div className="alder-content">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="alder-content-title font-an-gurmukhi">
                Patient Data
              </h4>
            </div>
            <div className="flex items-center">
              <div className="h-[40px] rounded-xl border-[1px] border-foreground">
                <CustomDateRangePicker
                  // label="Select a Date Range"
                  startDate={range.startDate}
                  endDate={range.endDate}
                  onChange={setRange}
                />
              </div>
              <FormControl
                className="search-grey-outline placeholder-grey mx-3 w-60"
                variant="filled"
              >
                <Input
                  className="input-with-icon after:border-b-secondary"
                  id="search"
                  type="text"
                  placeholder="Search"
                  onKeyDown={(
                    event: React.KeyboardEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => {
                    handleClickSearch(event);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton aria-label="toggle password visibility">
                        <SearchIcon className="text-[#6A6A6A]" />
                      </IconButton>
                    </InputAdornment>
                  }
                  disableUnderline
                />
              </FormControl>
              {hasPermission(`patient/${ALL_PERMISSIONS.patients.add}`) && (
                <button
                  onClick={() => navigate('../create')}
                  className="flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-primary bg-background px-2 text-center text-primary shadow-md"
                >
                  <AddOutlinedIcon fontSize="small" className="mr-0" />
                  <span className="mt-[5px] font-an-gurmukhi">Add</span>
                </button>
              )}
            </div>
          </div>

          {isLoader ? (
            <Loader />
          ) : (
            <>
              <div className="table-responsive mt-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-an-gurmukhi text-secondary2">
                        Patient Name
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">Age</th>
                      <th className="font-an-gurmukhi text-secondary2">
                        Phone
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">
                        Gender
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">
                        Created Date
                      </th>

                      <th className="w-[30px]">{}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((e: any, i: number) => (
                      <tr key={i}>
                        <td>
                          <div className="flex align-middle">
                            <img
                              src={e.avatar ? e.avatar : photo}
                              alt=""
                              // height={52}
                              // width={42}
                              className="mb-1 h-[30px] w-[32px] rounded-[5px]"
                            />
                            <span className="ml-2 self-center font-an-gurmukhi font-medium text-secondary2">
                              {e.name}
                            </span>
                          </div>
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.age || '--'}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.phone}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.gender}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {dayjs(e.createdAt).format('YYYY-MM-DD, hh:mm A')}
                        </td>
                        <td className="flex font-an-gurmukhi text-secondary2">
                          <Button
                            onClick={() =>
                              navigate(`../profile/${e.id}`, {
                                state: list[i],
                              })
                            }
                          >
                            <EyeIcon className="h-[25px]" />
                          </Button>
                          {hasPermission(
                            `patient/${ALL_PERMISSIONS.patients.edit}`
                          ) && (
                            <Button
                              onClick={() =>
                                navigate(`../edit/${e.id}`, {
                                  state: list[i],
                                })
                              }
                            >
                              <EditIcon className="h-[25px] text-secondary2" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
              <div className="mt-3 flex w-[100%] justify-center py-3">
                <TablePagination
                  component="div"
                  count={total}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </>
          )}
        </div>
        {/* <div className="mt-10">
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <Pagination count={10} page={1} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PatientsLogPage;
