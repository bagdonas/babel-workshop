import { it, expect } from 'vitest'
import babel from '@babel/core';

import plugin from './index';

const plugins = [
  '@babel/plugin-syntax-jsx',
  plugin,
];

it('does not crash', () => {
  const source = 'let foo = "bar";'
  const result = babel.transformSync(source, {plugins});  
  expect(result?.code).toMatchInlineSnapshot(`"let foo = "bar";"`);
});
