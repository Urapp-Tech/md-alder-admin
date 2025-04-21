/* eslint-disable prettier/prettier */
// import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Fragment, useEffect, useState } from 'react';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import YouTubeIcon from '@mui/icons-material/YouTube';
import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
// import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined'
// import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
// import TenantIcon from '../icons/TenantIcon';

import {
  setLogo,
  setRemoveItemState,
} from '../../redux/features/appStateSlice';
import { logout } from '../../redux/features/authStateSlice';
import { setRolePermissions } from '../../redux/features/permissionsStateSlice';
import { ALL_PERMISSIONS } from '../../utils/constants';
import { getItem } from '../../utils/storage';

const links = [
  {
    name: 'Home',
    path: 'home',
    permission: '',
    icon: assets.images.home,
  },
  {
    name: 'Scan Disease',
    path: 'scan-disease',
    permission: ALL_PERMISSIONS.scanDisease.view,
    // icon: <SettingsOutlinedIcon fontSize="inherit" />,
    icon: assets.images.scan,
  },
  {
    name: 'Patient',
    path: 'patient',
    permission: ALL_PERMISSIONS.patients.view,
    // icon: <SettingsOutlinedIcon fontSize="inherit" />,
    // icon: <PatientsIcon />,
    icon: assets.images.patient,
  },
  // {
  //   name: 'Settings',
  //   path: 'settings/app',
  //   permission: 'Setting View',
  //   // permission: ALL_PERMISSIONS.storeSetting.viewSettings,
  //   icon: assets.images.shopIcon,
  // },
];

function Sidebar() {
  const dispatch = useDispatch();
  const userData = useAppSelector((state: any) => state?.authState?.user);
  const appItems = useAppSelector(
    (state: any) => state?.persisitReducer?.appState?.UserItems
  );
  const logo = useAppSelector(
    (state: any) => state?.persisitReducer?.appState?.logo
  );

  // console.log('appItems', appItems);

  const [list, setList] = useState<any>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const authState: any = useAppSelector((state: any) => state?.authState);
  const dataRole = useAppSelector((state: any) => state);
  const [emptyVariable] = useState(null);

  const userRole: any = getItem('USER');

  // const dispatch = useAppDispatch();
  // const logOut = () => {
  //   dispatch(logout());
  //   dispatch(setItemState(null));
  //   dispatch(setLogo(null));
  //   dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
  // };
  // console.log("ei",expandedIndex);

  const logOut = () => {
    dispatch(logout());
    dispatch(setRemoveItemState());
    dispatch(setLogo(null));
    dispatch(setRolePermissions({ id: '', name: '', permissions: [] }));
    // dispatch(setSystemConfig(null));
  };

  const handleToggle = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  function NavbarLinks(
    path: any,
    icon: any,
    name: string,
    index: number,
    padding: any,
    paddingLeft: any
  ) {
    return (
      <NavLink
        key={path}
        className={({ isActive }) =>
          isActive
            ? `is-active-img bg-gray-50 bg-opacity-5 ${padding} ${paddingLeft} mx-1`
            : `${padding} ${paddingLeft} w-full pr-4`
        }
        to={path}
      >
        <div className="flex items-center text-gray-50">
          <span className="text-base leading-3">
            <img className="w-[15px]" src={icon} alt={name} />{' '}
          </span>
          <div className="mr-1">&nbsp;</div>
          <span className="font-open-sans text-sm font-semibold">{name}</span>
        </div>
      </NavLink>
    );
  }

  function SideBarMenu(
    path: string,
    name: string,
    icon: any,
    childLinks: any,
    index: number
  ) {
    return childLinks?.length > 0 ? (
      <>
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive ? `w-full bg-opacity-5` : `w-full`
          }
          to={path}
        >
          <div
            onClick={() => handleToggle(index)}
            className="abc flex w-[50px] cursor-pointer items-center justify-between px-[30px]"
          >
            <div className="ap my-3 flex w-[30px] items-center">
              <div className="pr-[7px]">
                <span className="text-base leading-3">{icon}</span>
              </div>
              <div className="mx-[8px] font-open-sans text-sm font-semibold capitalize">
                {name}
              </div>
            </div>
            <div className="arrow-icon">
              {expandedIndex === index ? <ArrowUp /> : <ArrowDown />}
            </div>
          </div>
        </NavLink>
        {expandedIndex === index &&
          childLinks?.map((el: any, childIndex: number) => {
            return (
              <div key={childIndex} className="cactive flex">
                {NavbarLinks(
                  el.path,
                  el.icon,
                  el.name,
                  childIndex,
                  'py-2',
                  'pl-[45px]'
                )}
              </div>
            );
          })}
      </>
    ) : (
      NavbarLinks(path, icon, name, index, 'py-3', 'pl-8')
    );
  }

  useEffect(() => {
    const userPermissions = userRole.role.permissions || [];
    const filteredLinks = links.filter((link) => {
      return userPermissions.some(
        (userPermission: any) =>
          userPermission.action === link.permission &&
          userPermission.showOnMenu === true
      );
    });

    const temp = [
      {
        name: 'Home',
        path: 'home',
        permission: '',
        icon: assets.images.home,
      },
    ];
    setList([...temp, ...filteredLinks]);
  }, []);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: 'left-sidebar box-border w-64 border-r-0',
      }}
    >
      <List disablePadding>
        <Toolbar
          className={
            userData?.tenantConfig?.logo || userData.isSuperAdmin === true
              ? 'mb-10'
              : 'my-3'
          }
        >
          <Stack
            className="h-[100%] w-full pl-4"
            direction="row"
            justifyContent="left"
          >
            {userData?.isSuperAdmin ? (
              <img
                className="mt-9 h-[29px] max-w-[150px]"
                src={assets.images.urApplogoWhite}
                alt=""
              />
            ) : logo ? (
              <img
                className="mt-9 h-[29px] max-w-[150px]"
                src={logo}
                alt="logo"
              />
            ) : (
              <div className="flex w-full items-center justify-start rounded-2xl p-3 text-white brightness-0 invert">
                <img
                  className="mt-2 max-w-[150px]"
                  src={assets.images.mdalderIcon}
                  alt="logo"
                />
              </div>
            )}
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base ">
          {list &&
            list?.map((link: any, index: number) => {
              return (
                <Fragment key={link.path}>
                  {SideBarMenu(
                    link.path,
                    link.name,
                    link.icon,
                    link.childLinks,
                    index
                  )}
                </Fragment>
              );
            })}
        </div>
        <div className="fixed bottom-4 left-6 flex items-center">
          <Button
            className="w-full font-an-gurmukhi text-primary"
            onClick={() => logOut()}
          >
            <div className="flex items-center">
              <img
                className="w-[20px]"
                src={assets.images.logout}
                alt="logout"
              />
              <span className="mx-2 mt-[4px]">Logout</span>
            </div>
          </Button>
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
