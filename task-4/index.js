"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Hàm tính toán kết quả cho các truy vấn
const processQueries = (data, queries) => {
    const results = [];
    queries.forEach((query) => {
        const [l, r] = query.range;
        if (query.type === "1") {
            // Loại 1: Tính tổng các phần tử trong khoảng [l, r]
            const sum = data.slice(l, r + 1).reduce((a, b) => a + b, 0);
            results.push(sum);
        }
        else if (query.type === "2") {
            // Loại 2: Tính tổng các phần tử ở vị trí chẵn - tổng các phần tử ở vị trí lẻ
            let alternatingSum = 0;
            for (let i = l; i <= r; i++) {
                if (i % 2 === 0) {
                    alternatingSum += data[i]; // Thêm cho chỉ số chẵn
                }
                else {
                    alternatingSum -= data[i]; // Trừ cho chỉ số lẻ
                }
            }
            results.push(alternatingSum);
        }
    });
    return results;
};
// Hàm chính
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lấy dữ liệu từ API input
        const inputResponse = yield axios_1.default.get("https://test-share.shub.edu.vn/api/intern-test/input");
        const { token, data, query } = inputResponse.data;
        // Tính toán kết quả cho các truy vấn
        const results = processQueries(data, query);
        // Gửi kết quả về API output
        const outputResponse = yield axios_1.default.post("https://test-share.shub.edu.vn/api/intern-test/output", results, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log("Kết quả đã được gửi:", outputResponse.data);
    }
    catch (error) {
        console.error("Đã xảy ra lỗi:", error);
    }
});
// Chạy hàm chính
main();
