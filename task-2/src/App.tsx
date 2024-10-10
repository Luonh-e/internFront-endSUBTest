import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  time: yup.date().required("Vui lòng chọn thời gian"),
  quantity: yup
    .number()
    .typeError("Vui lòng nhập số lượng hợp lệ")
    .positive("Số lượng phải lớn hơn 0")
    .required("Vui lòng nhập số lượng"),
  pump: yup.string().required("Vui lòng chọn trụ"),
  revenue: yup
    .number()
    .typeError("Vui lòng nhập doanh thu hợp lệ")
    .positive("Doanh thu phải lớn hơn 0")
    .required("Vui lòng nhập doanh thu"),
  price: yup
    .number()
    .typeError("Vui lòng nhập đơn giá hợp lệ")
    .positive("Đơn giá phải lớn hơn 0")
    .required("Vui lòng nhập đơn giá"),
});

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const onSubmit = (data: any) => {
    console.log(data);
    setSubmitSuccess(true);
    reset();
    setTimeout(() => {
      setSubmitSuccess(null);
    }, 3000);
  };

  const currentTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <button className="text-gray-700 text-left text-xs">← Đóng</button>
          <h2 className="text-2xl font-bold">Nhập giao dịch</h2>
        </div>
        <button
          type="submit"
          form="transaction-form"
          className="bg-blue-500 text-white text-xs py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cập nhật
        </button>
      </div>
      {submitSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
          Giao dịch đã được nhập thành công!
        </div>
      )}

      <form id="transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="datetime-local"
            {...register("time")}
            id="time"
            defaultValue={currentTime}
            className="block pt-4 pb-2 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="time"
            className="absolute text-sm ml-0.5 text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Thời gian
          </label>
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            step="0.01"
            {...register("quantity")}
            id="quantity"
            className={`block pt-4 pb-2 px-2 w-full text-sm text-gray-900 bg-transparent border ${
              errors.quantity ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 peer`}
            placeholder=" "
            min="0"
          />
          <label
            htmlFor="quantity"
            className="absolute text-sm ml-0.5 text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 bg-white peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Số lượng
          </label>
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <select
            {...register("pump")}
            id="pump"
            className={`block pt-4 pb-2 px-2 w-full text-sm text-gray-900 bg-transparent border ${
              errors.pump ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 peer`}
          >
            <option value=""></option>
            <option value="1">Trụ 1</option>
            <option value="2">Trụ 2</option>
            <option value="3">Trụ 3</option>
            <option value="3">Trụ 4</option>
            <option value="3">Trụ 5</option>
          </select>
          <label
            htmlFor="pump"
            className="absolute text-sm ml-2 text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Trụ
          </label>
          {errors.pump && (
            <p className="text-red-500 text-sm">{errors.pump.message}</p>
          )}
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            step="0.01"
            {...register("revenue")}
            id="revenue"
            className={`block pt-4 pb-2 px-2 w-full text-sm text-gray-900 bg-transparent border ${
              errors.revenue ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 peer`}
            placeholder=" "
            min="0"
          />
          <label
            htmlFor="revenue"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 bg-white peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Doanh thu
          </label>
          {errors.revenue && (
            <p className="text-red-500 text-sm">{errors.revenue.message}</p>
          )}
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            step="0.01"
            {...register("price")}
            id="price"
            className={`block pt-4 pb-2 px-2 w-full text-sm text-gray-900 bg-transparent border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 peer`}
            placeholder=" "
            min="0"
          />
          <label
            htmlFor="price"
            className="absolute text-sm ml-0.5 text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 bg-white peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Đơn giá
          </label>
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
