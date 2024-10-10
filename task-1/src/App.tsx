import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      setMessageType("error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event?.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 7 });
        localStorage.setItem("excelData", JSON.stringify(jsonData));
        setMessage("File uploaded successfully");
        setMessageType("success");
      } catch (error) {
        setMessage("Error processing file. Please try again.");
        setMessageType("error");
      }
    };
    reader.onerror = () => {
      setMessage("Failed to read the file");
      setMessageType("error");
    };
    reader.readAsArrayBuffer(file);
  };

  const handleQuery = () => {
    const excelData = JSON.parse(localStorage.getItem("excelData") || "[]");
    if (!excelData || excelData.length === 0) {
      setMessage("Please upload a file first.");
      setMessageType("error");
      return;
    }

    console.log(excelData[99]);

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (start === null || end === null) {
      setMessage("Invalid time format. Please enter a valid time.");
      setMessageType("error");
      return;
    }

    const total = excelData.reduce((sum: number, row: any) => {
      const time = parseTime(row["Giờ"]);
      const amount = row["Thành tiền (VNĐ)"];

      if (time !== null && time >= start && time <= end && !isNaN(amount)) {
        return sum + amount;
      }
      return sum;
    }, 0);

    setTotalAmount(total);
    setMessage("");
    setMessageType("");
  };

  function parseTime(timeStr: string) {
    if (!timeStr) return null;
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    return hours * 3600 + minutes * 60 + (seconds || 0);
  }

  function formatAmount(amount: number) {
    return new Intl.NumberFormat("vi-VN").format(amount);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-6 text-blue-600">
        Upload and Query Excel Report
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="block mb-4 w-full text-sm text-gray-900 cursor-pointer focus:outline-none"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
        {message && (
          <p
            className={`mt-4 text-sm ${
              messageType === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time:
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time:
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          onClick={handleQuery}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Query
        </button>
      </div>

      {totalAmount !== null && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
          <button
            onClick={() => setTotalAmount(null)}
            className="absolute top-0 right-0 flex items-center justify-center text-red-500 text-lg font-bold w-8 h-8"
          >
            ×
          </button>
          <p className="text-lg font-medium">
            Total Amount:{" "}
            <span className="font-bold text-red-500">
              {formatAmount(totalAmount)} VNĐ
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
