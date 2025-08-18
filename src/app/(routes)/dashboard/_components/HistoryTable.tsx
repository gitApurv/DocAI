import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>AI Medical Specification</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historyList.map((history, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              {history.selectedAgent.specialist}
            </TableCell>
            <TableCell>{history.details}</TableCell>
            <TableCell>
              {moment(new Date(history.createdOn)).fromNow()}
            </TableCell>
            <TableCell className="text-right">
              <ViewReportDialog report={history.report} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
