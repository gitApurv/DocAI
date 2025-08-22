import HistoryList from "./_components/HistoryList";
import DoctorAgentsList from "./_components/DoctorAgentsList";
import { AddNewSessionDialog } from "./_components/AddNewSessionDialog";

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
          My Dashboard
        </h2>
        <AddNewSessionDialog />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">
          Recent History
        </h3>
        <HistoryList />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">
          Suggested Doctors
        </h3>
        <DoctorAgentsList />
      </div>
    </div>
  );
};

export default Dashboard;
