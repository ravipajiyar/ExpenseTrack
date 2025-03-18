import { useUser } from "@clerk/clerk-react";
import { useMemo } from "react";
import { FinancialRecordForm } from "./FinancialRecordForm";
import { FinancialRecordList } from "./FinancialRecordList";
import { useFinancialRecord } from "../../contexts/FinancialRecordContext";

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecord();

  const totalmonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });
    return totalAmount;
  }, [records]);

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 tracking-tight">
        Welcome {user?.firstName}! Here are your finances:
      </h1>
      <FinancialRecordForm />
      <div className="bg-slate-800/95 rounded-xl p-5 mb-8 flex justify-between items-center shadow-xl shadow-slate-900/20 animate-fade-in-delayed">
        <span className="text-xl font-semibold text-gray-200">Total Monthly:</span>
        <span className="text-3xl font-bold text-blue-500">
          ${totalmonthly.toFixed(2)}
        </span>
      </div>
      <FinancialRecordList />
    </div>
  );
};