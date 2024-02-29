export default interface MessageType {
  id: string;
  body: string;
  userId: string | null;
  fileId: string | null;
  createdAt: string;
}
