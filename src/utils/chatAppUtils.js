import {
    createNewMessageAction,
  getThreadMessagesAction,
  getThreadsDataAction,
  getThreadsDetailsAction,
} from "../actions/chatAppActions";

export const handleGetThreadsData = async ({ token, setThreads, setSelectedThread }) => {
  const res = await getThreadsDataAction({ token });
  if (res.status) {
    setThreads(res.items);
    setSelectedThread(res.items[0])
  }
};

export const getTimeAgo = (isoDate) => {
  const now = new Date();
  const past = new Date(isoDate);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} sec ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 30) return `${days} d ago`;
  if (months < 12) return `${months} mo ago`;
  return `${years} yr ago`;
};

export const handleGetThreadMessages = async ({
  threadId,
  token,
  setMessages,
  setThreadDetails,
}) => {
  const [res1, res2] = await Promise.all([
    getThreadMessagesAction({ threadId, token }),
    getThreadsDetailsAction({ token, threadId }),
  ]);

  if (res1?.status) {
    setMessages(res1.messageArr);
  }

  if (res2.status) {
    setThreadDetails(res2.threadDetails);
  }
};

export const handleNewMessage = async ({ token, newMessage, threadId, setNewMessage }) => {

  const res = await createNewMessageAction({ token, newMessage, threadId })
  if(res.status){
    setNewMessage("")
  }

}