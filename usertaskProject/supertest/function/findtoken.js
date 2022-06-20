exports.findtoken = (cookie) => {
  // console.log(cookie);
  let token = cookie[0].split("=");
  token = token[1].split(";");
  return (token = token[0]);
};
