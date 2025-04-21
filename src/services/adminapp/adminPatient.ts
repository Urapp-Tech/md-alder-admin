import network from '../../utils/network';

const PATIENT_PREFIX = 'patient';

const getList = (qp: any) => {
  return network.get(`${PATIENT_PREFIX}/list`, qp);
};

const create = (data: any) => {
  return network.postMultipart(`${PATIENT_PREFIX}/create`, data);
};

const update = (id: any, data: any) => {
  return network.postMultipart(`${PATIENT_PREFIX}/update/${id}`, data);
};

const getListVisit = (qp: any) => {
  return network.get(`${PATIENT_PREFIX}/visit/list`, qp);
};

const createVisit = (data: any) => {
  return network.postMultipart(`${PATIENT_PREFIX}/visit/create`, data);
};

export default {
  getList,
  create,
  update,
  getListVisit,
  createVisit,
};
