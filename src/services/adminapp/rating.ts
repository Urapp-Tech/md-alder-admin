import { RATING } from '../../utils/constants';
import network from '../../utils/network';

const getListService = (
  tenant: string,
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${RATING}/list/${tenant}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getCatListService = (
  catId: string | any,
  search: string,
  page: number,
  size: number
) => {
  return network.get(`${RATING}/reviews/${catId}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getCatStarRating = (homeCatId: string | any) => {
  return network.get(`${RATING}/distinct/star/list/${homeCatId}`);
};

const getCatStarDetail = (homeCatId: string | any) => {
  return network.get(`${RATING}/item/detail/${homeCatId}`);
};

export default {
  getListService,
  getCatListService,
  getCatStarRating,
  getCatStarDetail,
};
