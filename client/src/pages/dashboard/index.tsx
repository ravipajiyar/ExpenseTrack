import {useUser} from "@clerk/clerk-react"
import { useMemo } from "react";
import { FinacialRecordForm } from "./FinancialRecordForm";
import "./financialrecord.css";

import { FinancialRecordList } from "./FinancialRecordList";
import { useFinancialRecord } from "../../contexts/FinancialRecordContext";
export const Dashboard = () => {
    const {user} = useUser();
    const {records} = useFinancialRecord();
    const totalmonthly = useMemo(()=>{
        let totalAmount = 0;
        records.forEach((record)=> {
            totalAmount += record.amount;
        });
        return totalAmount;
    },[records])
    return (
        <div className="dashboard-container">
            <h1>Welcome {user?.firstName}! Here are your finances:</h1>
            <FinacialRecordForm/>
            <div>Total Monthly: {totalmonthly}</div>
            <FinancialRecordList/>
        </div>
    )
}