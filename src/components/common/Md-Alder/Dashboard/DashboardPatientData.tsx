import { faker } from '@faker-js/faker';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import photo from '../../../../assets/images/Photo.png';
import MoreHoriz from '../../../icons/MoreHoriz';

const DashboardPatientData = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-2">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="p-2 font-an-gurmukhi text-lg font-medium">
            Patient Data
          </h1>
        </div>
        <div className="self-center">
          <Button
            variant="outlined"
            className="border-none p-3 text-background"
            onClick={() => navigate('../patient')}
          >
            View all
          </Button>
        </div>
      </div>
      <div className="alder-patient-table">
        <table className="font-an-gurmukhi">
          <thead>
            <tr>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Patient name
              </th>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Date in
              </th>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Gender
              </th>
              <th className="font-an-gurmukhi text-base text-[#A9A9A9]">
                Phone
              </th>
              <th className="w-[30px] text-[#A9A9A9]">{}</th>
            </tr>
          </thead>
          <tbody className="text-[#A9A9A9]">
            {data?.map((e: any, i: number) => {
              return (
                <tr key={i}>
                  <td>
                    <div className="flex align-middle">
                      <img
                        src={e.avatar ?? photo}
                        alt=""
                        // height={32}
                        // width={32}
                        className="mb-1 h-[30px] w-[32px] rounded-[5px]"
                      />
                      <span className="ml-2 self-center font-an-gurmukhi font-medium text-[#1E1C24]">
                        {e.name}
                      </span>
                    </div>
                  </td>
                  <td className="font-an-gurmukhi text-secondary2">
                    {dayjs(e.createdAt).format('DD-MM-YYYY')}
                  </td>
                  <td className="font-an-gurmukhi capitalize text-secondary2">
                    {e.gender ?? '--'}
                  </td>
                  <td className="font-an-gurmukhi capitalize text-secondary2">
                    {e.phone ?? '--'}
                  </td>
                  {/* <td className="font-an-gurmukhi text-secondary2">Incoming</td> */}
                  {/* <td>
                    <Button>
                      <MoreHoriz className="h-[25px]" />
                    </Button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPatientData;
