export default eventHandler(async (event: any) => {
  setCookie(event, "auth_token", "");
});
