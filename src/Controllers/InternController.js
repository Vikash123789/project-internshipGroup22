const InternModel = require("../models/internModel");
const CollegeModel = require("../models/CollegeModel");

const isValid = function (value) {
  if (typeof value == undefined || value == null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const InternCreate = async function (req, res) {
  try {
    let data = req.body;

    if (Object.keys(data).length > 0) {
      if (!isValid(data.name)) {
        return res
          .status(400)
          .send({ status: false, msg: "Name is Mandatory" });
      }
      if (!isValid(data.collegeId)) {
        return res
          .status(400)
          .send({ status: false, msg: "College Id is Mandatory" });
      }

      if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter a Valid Email" });
      }
      if (!/^([+]\d{2})?\d{10}$/.test(data.mobile)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please Enter  a Valid Mobile Number" });
      }

      let AlreadyExistData = await InternModel.findOne({ email: data.email });

      if (AlreadyExistData) {
        return res
          .status(400)
          .send({ status: false, msg: "Email already exists" });
      }

      const collegeByName = await CollegeModel.findOne({
        name: data.collegeName,
      });

      if (!collegeByName) {
        return res
          .status(400)
          .send({ status: false, message: "No college found by this Name" });
      }
      const collegeId = collegeByName._id;
      Body.collegeId = collegeId;
      delete Body.collegeName;
      const savedData = await InternModel.create(Body);
      return res.status(201).send({
        status: true,
        data: savedData,
        msg: "Intern data Saved Successfully",
      });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Enter Mandatory Field" });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports.InternCreate = InternCreate;
