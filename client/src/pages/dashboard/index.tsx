import {useUser} from "@clerk/clerk-react"
import { FinacialRecordForm } from "./FinancialRecordForm";
import { FinacialRecordList } from "./FinancialRecordList";
export const Dashboard = () => {
    const {user} = useUser();
    return (
        <div className="dashboard-container">
            <h1>Welcome {user?.firstName}! Here are your finances:</h1>
            <FinacialRecordForm/>
            <FinacialRecordList/>
        </div>
    )
}