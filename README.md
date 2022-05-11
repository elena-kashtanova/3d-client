# 3D-client

1. Clone the repository. 
2. Provide information about backend url in `.env`.
3. Use `npm start` to launch the client.

## How to use

- You can access all models by clicking on the "Library" tab
- Clicking on the model name will take you to the editor with the model loaded

### Edit View
- Zoom in or out by using the mouse scroll wheel
- You can rotate the model by left-clicking and holding. Right-clicking and holding allows you to drag the model.
- You can change the color or the dimensions of the model and save it to the backend
- You can delete the model. After the operation is complete, you'll be taken to the Library page

## Three.js
I'm using react-three-fiber and react-three-drei to make it easier to render objects and to interact with them.

## Rendering error on transform
When the mesh is transformed and the changes are applied to the matrix, there's a rendering bug which causes the mesh points to jump to a different position.

It might be an issue due to information about scale not being used in the model data. Fixing it would require changing the database model.

UPDATE: Fixed by resetting the scale of the mesh back to one after transformation is applied

## Color update bug
If the color is changed and then the mesh is transformed, the color reverts back to the original

## Opportunities for improvement
- Fix the bug on color update
- If a model is based on a primitive, use an appropriate class to load and edit it
- Tests to make sure the UI is working correctly
- Use aliases for imports