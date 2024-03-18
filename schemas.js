





// const validateRequest = (schema) => {
//     return (req, res, next) => {
//       const result = joi.validate(req.body, schema);
//       if (result.error) {
//         return res.status(400).json({
//           error: result.error.details[0].message,
//         });
//       }
//       if (!req.value) {
//         req.value = {};
//       }
//       req.value['body'] = result.value;
//       next();
//     };
//   };

const validate = (schema, body) => {
  const done = schema.validate(body, {abortEarly: false});

  return done;
};

module.exports = {
  validate,
};
