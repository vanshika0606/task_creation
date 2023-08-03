const List = require("../modals/listModals");

const validation = (title, description, status, res) => {
  if (!title || !description || !status) {
    return res.status(403).json({
      success: false,
      message: "Enter fields properly",
    });
  }

  if (title.length > 15) {
    return res.status(400).json({
      success: false,
      message: "Length of title should smaller than 15",
    });
  }

  if (title.match(/\d/g)) {
    return res.status(400).json({
      success: false,
      message: "title should not contain digits",
    });
  }
};

exports.Add = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;

  const validationResponse = validation(title, description, status, res);
  if (validationResponse) {
    return validationResponse;
  }

  const list = await List.create(req.body);

  return res.status(201).json({
    success: true,
    message: "task created successfully",
    list,
  });
};

exports.Getlist = async (req, res, next) => {
  const list = await List.find();

  res.status(200).json({
    success: true,
    list,
  });
};

exports.deletetask = async (req, res, next) => {
  const list = await List.findById(req.params.id);

  await list.remove();

  res.status(200).json({
    success: true,
  });
};

exports.Updatetask = async (req, res, next) => {
  let list = await List.findById(req.params.id);
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;

  const validationResponse = validation(title, description, status, res);
  if (validationResponse) {
    return validationResponse;
  }

  list = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    list,
  });
};

exports.GetBYid = async (req, res, next) => {
  const list = await List.findById(req.params.id);

  res.status(200).json({
    success: true,
    list,
  });
};
