const planModel = require("../models/planModel");

module.exports.getAllPlans = async function (req, res) {
    try {
        let allPlans = await planModel.find();
        if (allPlans){
            return res.json({
                msg: "All Available Plans",
                allPlans,
            });
        } else {
            return res.json({
                msg: "No plan currently available",
            });
        }
    } catch (err) {
        res.json({
            msg: err.message,
        });
    }
};

module.exports.getPlan = async function (req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        // console.log(plan);

        res.json({ msg: "plan retrieved", plan });
    } catch (err) {
        // console.log(err);
        res.json({
            msg: err.message,
        });
    }
};

module.exports.createPlan=async function (req, res) {
    try {
        let data = req.body; //nep
        let plan = await planModel.create(data);
        console.log(plan);
        res.json({
            msg: "Plan created",
            plan,
          });
    } catch (err) {
        console.log(err);
        res.json({
            err: err.message,
        });
    }
  }

module.exports.deletePlan = async function (req, res) {
    try {
      let id = req.params.id;
      // let doc = await userModel.deleteOne({ email: "abcd@gmail.com" });
      // let doc = await userModel.findOneAndRemove({ email: "abcde@gmail.com" });
      let plan = await planModel.findByIdAndDelete(id);
      res.json({
        msg: "Plan has been deleted",
        plan,
      });
    } catch (err) {
      res.json({
        msg: err.message,
      });
    }
};


module.exports.updatePlan = async function (req, res) {
    // console.log(req.body);
    let id = req.params.id;
    let plan = await planModel.findById(id);
    let planToBeUpdated = req.body;
    try {
      if (plan) {
        const keys = []; //['name','email]
        for (let key in planToBeUpdated) {
          keys.push(key);
        }
  
        for (let i = 0; i < keys.length; i++) {
          plan[keys[i]] = planToBeUpdated[keys[i]];
        }
  
        const updatedData = await plan.save();
        res.json({
          message: "data updated succesfully",
          updatedData,
        });
      } else {
        res.json({
          message: "plan not found",
        });
      }
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  };

module.exports.top3plan = async function (req, res) {
    try {
        const plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);
        return res.json({
            msg: "top3 plans",
            data:plans
        })
    }
    catch (err) {
        res.json({
            msg:err.message
        })
    }
};