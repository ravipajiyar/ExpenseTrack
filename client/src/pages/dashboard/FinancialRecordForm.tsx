import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecord } from "../../contexts/FinancialRecordContext";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { addRecord } = useFinancialRecord();

  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };
    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="bg-slate-800/95 rounded-2xl p-6 mb-8 shadow-xl shadow-slate-900/20 transform transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="animate-fade-in-staggered-1">
          <label className="block mb-2 font-semibold text-gray-200 tracking-wide">
            Description:
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-700/70 text-white transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none placeholder-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div className="animate-fade-in-staggered-2">
          <label className="block mb-2 font-semibold text-gray-200 tracking-wide">
            Amount:
          </label>
          <input
            type="number"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-700/70 text-white transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none placeholder-gray-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="animate-fade-in-staggered-3">
          <label className="block mb-2 font-semibold text-gray-200 tracking-wide">
            Category:
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-700/70 text-white transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none appearance-none bg-no-repeat bg-[right_1rem_center]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="income">Income</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Others</option>
          </select>
        </div>
        <div className="animate-fade-in-staggered-4">
          <label className="block mb-2 font-semibold text-gray-200 tracking-wide">
            Payment Method:
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-700/70 text-white transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none appearance-none bg-no-repeat bg-[right_1rem_center]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            }}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
        >
          Add Record
        </button>
      </form>
    </div>
  );
};