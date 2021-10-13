const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { PlantModel } = require("../models");
const Plants = require("../models/plant");

router.post("/create", async (req, res) => {
  const { plantType, plantName } = req.body.plant;
  const { id } = req.user;

  // Add Plant

  try {
    await PlantModel.create({
      userId: id,
      plantType: plantType,
      plantName: plantName,
    }).then((plant) => res.status(201).json({ message: "New Plant", plant }));
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong at /plant", err: `${err}` });
  }
});

router.put("/update/:plantId", validateJWT, async (req, res) => {
  const userId = req.user.id;
  const plantId = req.params.plantId;
  const { plantType, plantName } = req.body;
  const query = {
    where: {
      id: plantId,
      userId: userId,
    },
  };

  const updatePlant = {
    plantType: plantType,
    plantName: plantName,
  };

  try {
    const update = await PlantModel.update(updatePlant, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete Plant

router.delete("/delete/:id", validateJWT, async (req, res) => {
  //res.send("log delete by id called " + req.params.id)
  // const userId = req.user.id;
  const plant = req.params.id;
  try {
    const query = {
      where: {
        // user_Id: userId,
        id: plant,
      },
    };
    await PlantModel.destroy(query);
    res.status(200).json({ message: "Plant Deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get All Plants
router.get("/all", validateJWT, (req, res) => {
  PlantModel.findAll()
    .then((plant) => res.status(200).json(plant))
    .catch((err) => res.status(500).json({ error: err }));
});

// Get My Plants

router.get("/mine", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const myPlant = await PlantModel.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json(myPlant);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
