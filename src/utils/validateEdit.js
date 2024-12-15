let validateEdit = function (req) {
  let valid = ["firstName", "lastName", "gender", "age"];
  Object.keys(req.body).forEach((key) => {
    if (!valid.includes(key)) {
      throw new Error(`Invalid key: ${key}`);
    }
  });
};

module.exports = { validateEdit };
