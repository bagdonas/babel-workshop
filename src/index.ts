import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from '@babel/core';
import t from '@babel/types';

export default declare(function () {
  return {
    visitor: {
      Identifier(path, state) {
        // Lets code!
      },
    }
  };
});
