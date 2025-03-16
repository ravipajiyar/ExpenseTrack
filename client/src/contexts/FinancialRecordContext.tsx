import { createContext, useState, useContext } from "react";

// Define TypeScript interface for financial records
interface FinancialRecord {
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

// Define Context Type
interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
}

// Create Context
export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  // Function to add financial record
  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch("http://localhost:3001/financial-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
    } catch (err) {
      console.error("❌ Error adding record:", err);
    }
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

// Custom Hook for accessing the context
export const useFinancialRecord = () => {
  const context = useContext(FinancialRecordContext);
  if (!context) {
    throw new Error(
      "❌ useFinancialRecord must be used within a FinancialRecordProvider"
    );
  }
  return context;
};
