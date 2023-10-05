import moment from 'moment';

export default {
  Query: {
    service: (_, {}, {getCacheKey}) => getCacheKey({__typename: 'Service'}),
  },
  Mutation: {
    updateService: (_, {service}, {cache}) => {
      cache.writeData({
        data: {
          service: {
            service,
            __typename: 'Service',
          },
        },
      });
      return null;
    },
  },
};
