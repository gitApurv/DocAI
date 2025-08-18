import Agent from "./agent";
import Report from "./report";

interface session {
  id: number;
  sessionId: string;
  details: string;
  selectedAgent: Agent;
  conversation: JSON;
  report: Report;
  createdOn: string;
  createdBy: string;
}

export default session;
