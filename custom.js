/* Unfortunately didn't manage to make it work. Would appreciate shared working example in order
to undersand what is missing. Thanks! */

const render = (app, root) => {
  root.appendChild(createElement(app));
};

const React = {
  createElement,
  render,
};

function createElement(app) {
  if (typeof app === 'string') {
    return document.createTextNode(app);
  }
  const newDom = document.createElement(app.type);
  app.tag
    .map(createElement)
    .forEach(newDom.appendChild.bind(newDom));
  return newDom;
}

const app =
  React.createElement('div', { style: { backgroundColor: 'red' } }, [
    React.createElement('span', undefined, 'Hello world'),
    React.createElement('br'),
    'This is just a text node',
    React.createElement('div', { textContent: 'Text content' }),
  ]);

React.render(
  app,
  document.getElementById('root'),
);
