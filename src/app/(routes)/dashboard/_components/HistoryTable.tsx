import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import session from "@/types/session";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";

const HistoryTable = ({ historyList }: { historyList: session[] }) => {
  return (
    <div className="rounded-2xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              AI Medical Specialist
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Description
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.map((history, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium text-gray-900">
                {history.selectedAgent.specialist}
              </TableCell>
              <TableCell className="text-gray-600 max-w-sm truncate">
                {history.details}
              </TableCell>
              <TableCell className="text-gray-500">
                {moment(new Date(history.createdOn)).fromNow()}
              </TableCell>
              <TableCell className="text-right">
                <ViewReportDialog report={history.report} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
