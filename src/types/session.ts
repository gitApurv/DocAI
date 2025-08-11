import Agent from "./agent";

interface session {
  id: number;
  sessionId: string;
  details: string;
  selectedAgent: Agent;
  conversation: JSON;
  report: JSON;
  createdOn: string;
  createdBy: string;
}

export default session;
