import { defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

export const authDirectiveTransformer = (schema, directiveName) => {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const authDirective = getDirective(schema, fieldConfig, directiveName);

      if (authDirective && authDirective.length && authDirective[0]) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async (...args) => {
          let [_, {}, { isAuth }] = args;
          if (isAuth) {
            const result = await resolve.apply(this, args);
            return result;
          } else {
            throw new Error(
              'You must be authenticated user to get this information.'
            );
          }
        };
      }
    },
  });
};
