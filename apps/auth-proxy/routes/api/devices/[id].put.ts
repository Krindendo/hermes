export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log("id", id);
});
