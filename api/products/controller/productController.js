const Product = require("../models/productSchema");

const registerProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    console.log(name)

    const product = await Product.findOne({
      name: { $regex: name, $options: "i" },
    });
    console.log(product)
    if (product) {
      res.status(400).json({ message: "Product exist" });
    } else {
      let productData = new Product({
        name,
        description,
        price,
        quantity,
      });
      await productData.save();
      res.status(201).json({ message: "Product create" });
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: "Ups! anything went wrong " });
  }
};

const getAllProducts = async (req, res) => {
  const { limit, pageNumber } = req.query
  try {
    const count = await Product.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / Number(limit)) + 1;

    const getProducts = await Product.find()
      .select("-__v")
      .sort({ _id: 1 })
      .skip(
        Number(pageNumber) > 0 ? (Number(pageNumber) - 1) * Number(limit) : 0
      )
      .limit(Number(limit))
      .exec();

    if (getProducts.length === 0) {
      res.status(200).json({ message: "not have data" });
    } else {
      res.status(200).json({ data: getProducts, page_total: page_total });
    }
  } catch (error) {
    return { message: "ups error server", status: 500 };
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const  _id  = req.params.id
  try {
  //validate exists product
  const getProduct = await Product.findById(_id);
  if (!getProduct) {
      res.status(400).json({ message: "product not exist" });
  }
  const setProduct = await Product.updateOne(
    { _id },
    {
      $set: {
        name,
        description,
        price,
        quantity
      },
    });

    if (setProduct) {
      res.status(200).json({ message: "product update" });
    }
  
} catch (error) {
  console.log(error)
  res.status(404).json({ message: "Ups! anything went wrong " });
}
};

const deleteProduct = async (req, res) => {
    const  _id  = req.params.id
    try {
    //validate exists product
    const getProduct = await Product.findById(_id);
    if (!getProduct) {
        res.status(400).json({ message: "product not exist" });
    }
    const deleteProduct = await Product.deleteOne({ _id });
    const { deletedCount } = deleteProduct;
    if (deletedCount === 1) {
        res.status(200).json({ message: "product delete" });
    }
  } catch (error) {
    res.status(404).json({ message: "Ups! anything went wrong " });
  }
};

const getProduct = async (req, res) => {
  const  _id  = req.params.id
  try {
  //validate exists product
  const getProduct = await Product.findById(_id).select({ _id: 0, __v: 0 }).exec();
  if (!getProduct) {
      res.status(400).json({ message: "product not exist" });
  }else{
    res.status(200).json({ message: "product one", data: getProduct });
  }
  
} catch (error) {
  res.status(404).json({ message: "Ups! anything went wrong " });
}
};

module.exports = {
  registerProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
};
