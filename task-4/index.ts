import axios from "axios";

interface Query {
  type: "1" | "2";
  range: [number, number];
}

interface InputData {
  token: string;
  data: number[];
  query: Query[];
}

const processQueries = (data: number[], queries: Query[]) => {
  const results: number[] = [];

  queries.forEach((query) => {
    const [l, r] = query.range;

    if (query.type === "1") {
      const sum = data.slice(l, r + 1).reduce((a, b) => a + b, 0);
      results.push(sum);
    } else if (query.type === "2") {
      let alternatingSum = 0;

      for (let i = l; i <= r; i++) {
        if (i % 2 === 0) {
          alternatingSum += data[i];
        } else {
          alternatingSum -= data[i];
        }
      }

      results.push(alternatingSum);
    }
  });

  return results;
};

const main = async () => {
  try {
    const inputResponse = await axios.get<InputData>(
      "https://test-share.shub.edu.vn/api/intern-test/input"
    );
    const { token, data, query } = inputResponse.data;

    const results = processQueries(data, query);

    const outputResponse = await axios.post(
      "https://test-share.shub.edu.vn/api/intern-test/output",
      results,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Kết quả đã được gửi:", outputResponse.data);
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
};

main();
