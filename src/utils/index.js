import _ from 'lodash';

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
}

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map(element => [element, 1]));
}

const getUnselectData = (select = []) => {
  return Object.fromEntries(select.map(element => [element, 0]));
}

const removeUndefinedObject = obj => {
  Object.keys(obj).forEach(k => {
    if (obj[k] == null) {
      delete obj[k];
    }
  })

  return obj;
}

const updateNestedObject = obj => {
  const final = {};
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      const response = updateNestedObject(obj[k]);
      Object.keys(response).forEach(a => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  })

  return final;
}

export {
  getInfoData,
  getSelectData,
  getUnselectData,
  removeUndefinedObject,
  updateNestedObject
}
