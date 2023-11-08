class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //It find all keyword(i.e. if we find "sam" then it applicable for finding "samsung")
            $options: "i", //this line for the case insensitive
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);

    //Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for Price and Rating
    // console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    // console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr)); //this.query = Product.find()
    // console.log(queryCopy);
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // total product 50 but 1 page contain 10 product, then for skip page
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;

// 1:37:52
