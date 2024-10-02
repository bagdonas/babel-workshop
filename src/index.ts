import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from '@babel/core';
import t from '@babel/types';

const isCapitalLetter = (char: string) => {
  return char === char.toUpperCase();
}

const convertJSXIdentifierToReactName = (tagName: t.JSXIdentifier) => {
  if (isCapitalLetter(tagName.name[0])) {
    return t.identifier(tagName.name);
  }

  return t.stringLiteral(tagName.name)
}

const createElementCall = (path: NodePath<t.JSXElement>) => {
  if (!t.isJSXIdentifier(path.node.openingElement.name)) {
    throw path.buildCodeFrameError('Only JSXIdentifier are supported');
  }

  return t.callExpression(
    t.memberExpression(
      t.identifier('React'), 
      t.identifier('createElement'),
    ),
    [
      convertJSXIdentifierToReactName(path.node.openingElement.name),
      t.nullLiteral(),
      // @ts-expect-error
      ...t.react.buildChildren(path.node),
    ],
  );
}

export default declare(function () {
  return {
    visitor: {
      JSXElement: {
        exit(path) {
          path.replaceWith(createElementCall(path));
        }
      },
    }
  };
});
