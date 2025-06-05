import _ from 'lodash'

const compareDeep = (obj1, obj2) => {
  const newObj = _.union(_.keys(obj1), _.keys(obj2))

  const sortKeys = _.sortBy(newObj)

  return sortKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        children: compareDeep(obj1[key], obj2[key]),
        type: 'nested',
      }
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        value: obj2[key],
        type: 'added',
      }
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        type: 'deleted',
      }
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        value1: obj1[key],
        value: obj2[key],
        type: 'changed',
      }
    }

    return {
      key,
      value: obj1[key],
      type: 'unchanged',
    }
  })
}

export default compareDeep
