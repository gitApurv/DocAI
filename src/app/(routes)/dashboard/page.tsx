import HistoryList from "./_components/HistoryList";
import DoctorAgentsList from "./_components/DoctorAgentsList";
import { AddNewSessionDialog } from "./_components/AddNewSessionDialog";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">My Dashboard</h2>
        <AddNewSessionDialog />
      </div>
      <HistoryList />
      <DoctorAgentsList />
    </div>
  );
};

export default Dashboard;
