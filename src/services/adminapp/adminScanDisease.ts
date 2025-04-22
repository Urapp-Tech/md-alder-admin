import network from '../../utils/network';

const PREFIX = 'scan-disease';

const getList = (qp: any) => {
  return network.get(`${PREFIX}/list`, qp);
};

const create = (data: any) => {
  return network.postMultipart(`${PREFIX}/create`, data);
};

export default {
  getList,
  create,
};
