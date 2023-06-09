import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import { addForm, addSchema } from "../../models/product";
import { addProduct } from "../../api/product";
import { ICategory } from "../../interfaces/category";
import { getCategory } from "../../api/category";

const AddProduct = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const fetchCategory = async () => {
    try {
      const { data } = await getCategory();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addForm>({
    resolver: yupResolver(addSchema),
  });
  const onSubmit = async (product: addForm) => {
    try {
      const response = await addProduct(product);
      console.log(response);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <div className="w-full p-7">
        <h1 className="leading-[30px] mb-4 text-xl text-[#5F5E61] font-semibold">
          Thêm mới Sản phẩm
        </h1>
        <form className="flex gap-x-[35px]" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className=" w-[500px] mb-5">
              <label
                htmlFor=""
                className="text-[13px] leading-5 text-[#5A6169] block mb-2"
              >
                Ảnh
              </label>
              <input
                {...register("images")}
                id="dropzone-file"
                type="text"
                className="w-full p-5 mb-2 text-sm border-none rounded-md shadow-md"
                placeholder="Thêm ảnh"
              />
              <p className="text-xs text-red-500">
                {errors.images && errors.images.message}
              </p>
            </div>
            <textarea
              {...register("description_short")}
              className="w-full h-24 shadow-md rounded-md outline-none border-none p-4 text-[13px] text-[#5A6169] resize-none"
              placeholder="Mô tả ngắn..."
            ></textarea>
            <p className="text-xs text-red-500">
              {errors.description_short && errors.description_short.message}
            </p>
          </div>
          <div className="w-full">
            <h1 className="text-[#3D5170] font-medium mb-4 px-4 shadow-md leading-6 pb-4">
              Thông tin sản phẩm
            </h1>
            <div className="mb-4">
              <label
                htmlFor=""
                className="text-[13px] leading-5 text-[#5A6169] block mb-2"
              >
                Tên sản phẩm
              </label>
              <input
                {...register("name")}
                type="text"
                className="px-3 py-2 w-full text-sm text-[#444444] leading-5 border border-gray-200 rounded-md outline-none"
              />
              <p className="text-xs text-red-500">
                {errors.name && errors.name.message}
              </p>
            </div>
            <div className="flex gap-x-2">
              <div className="w-2/4 mb-4">
                <label
                  htmlFor=""
                  className="text-[13px] leading-5 text-[#5A6169] block mb-2"
                >
                  Giá gốc
                </label>
                <input
                  {...register("original_price")}
                  type="text"
                  className="px-3 py-2 w-full text-sm text-[#444444] leading-5 border border-gray-200 rounded-md outline-none"
                />
                <p className="text-xs text-red-500">
                  {errors.original_price && errors.original_price.message}
                </p>
              </div>
              <div className="w-2/4 mb-4">
                <label
                  htmlFor=""
                  className="text-[13px] leading-5 text-[#5A6169] block mb-2"
                >
                  Giá khuyến mãi
                </label>
                <input
                  {...register("price")}
                  type="text"
                  className="px-3 py-2 w-full text-sm text-[#444444] leading-5 border border-gray-200 rounded-md outline-none"
                />
                <p className="text-xs text-red-500">
                  {errors.price && errors.price.message}
                </p>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div className="w-2/4 mb-4">
                <label
                  htmlFor=""
                  className="text-[13px] leading-5 text-[#5A6169] block mb-2"
                >
                  Danh mục
                </label>
                <select
                  {...register("categoryId")}
                  className="p-2 w-full text-sm text-[#444444] leading-5 border border-gray-200 rounded-md outline-none"
                >
                  {category.map((value) => (
                    <option key={value._id} value={value._id}>
                      {value.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-red-500">
                  {errors.categoryId && errors.categoryId.message}
                </p>
              </div>
              <div className="w-2/4 mb-4">
                <label
                  htmlFor=""
                  className="text-[13px] leading-5 text-[#5A6169] block mb-2"
                >
                  Thương hiệu
                </label>
                <input
                  {...register("brand")}
                  type="text"
                  className="px-3 py-2 w-full text-sm text-[#444444] leading-5 border border-gray-200 rounded-md outline-none"
                />
                <p className="text-xs text-red-500">
                  {errors.brand && errors.brand.message}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="text-[13px] leading-5 text-[#5A6169] block mb-2"
              >
                Đặc điểm nổi bật
              </label>
              <textarea
                {...register("description_special")}
                className="p-3 w-full text-sm text-[#444444] resize-none h-32 leading-5 border border-gray-200 rounded-md outline-none"
              />
              <p className="text-xs text-red-500">
                {errors.description_special &&
                  errors.description_special.message}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="text-[13px] leading-5 text-[#5A6169] block mb-2"
              >
                Mô tả dài
              </label>
              <textarea
                {...register("description_long")}
                className="p-3 w-full text-sm text-[#444444] resize-none h-32 leading-5 border border-gray-200 rounded-md outline-none"
              />
              <p className="text-xs text-red-500">
                {errors.description_long && errors.description_long.message}
              </p>
            </div>
            <button className="bg-[#00B0D7] hover:bg-[#007BFF] transition-all text-white text-xs leading-[14px] px-[13px] py-[10px] rounded-md">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
