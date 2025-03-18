import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

// Define TypeScript interface for financial records
export interface FinancialRecord {
  _id?: string;
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
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
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
  const {user} = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(`https://expensetrack-backend.onrender.com/financial-records/getAllByUserID/${user?.id}`);
    if (response.ok) {
        const records = await response.json();
        console.log(records)
        setRecords(records);
    }
  }
  useEffect(()=> {
    fetchRecords();
  }, [user])
  // Function to add financial record
  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch("https://expensetrack-backend.onrender.com/financial-records", {
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
  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const response = await fetch(
      `https://expensetrack-backend.onrender.com/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {}
  };
  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `https://expensetrack-backend.onrender.com/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {}
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
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
