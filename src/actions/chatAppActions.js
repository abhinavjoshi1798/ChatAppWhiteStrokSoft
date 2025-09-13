import { CREATE_NEW_MESSAGE, THREAD_MESSAGES, THREADS_URL } from "../constants/threadsUrlConstants";
import axios from "axios";
import { THREAD_DETAILS } from "../constants/threadsUrlConstants";

export const getThreadsDataAction = async ({ token }) => {
  try {
    const res = await axios.get(THREADS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 1,
        perPage: 20,
        orderBy: "DESC",
        search: "",
      },
    })
    if (res.status == 200) {
      return { status: true, items: res.data.data.items };
    } else {
      return { status: false };
    }
  } catch (err) {
    console.error("Failed to get Threads Data: ", err);
    return { status: false };
  }
};

export const getThreadsDetailsAction = async ({ token, threadId }) => {
  try {
    const res = await axios.post(
      `${THREAD_DETAILS}/${threadId}/details`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200) {
      return { status: true, threadDetails: res?.data?.data };
    } else {
      return { status: false };
    }
  } catch (err) {
    console.error("Error in getThreadsDetailsAction: ", err);
    return { status: false };
  }
};

export const getThreadMessagesAction = async ({ token, threadId }) => {
  try {
    const res = await axios.get(THREAD_MESSAGES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { threadId, page: 1, perPage: 50, orderBy: "DESC" },
    })
    if (res.status === 200) {
      return { status: true, messageArr: res.data.data.items };
    }
    return { status: false };
  } catch (err) {
    console.error("Error in getThreadMessagesAction: ", err);
    return { status: false };
  }
};

export const createNewMessageAction = async ({ token, newMessage, threadId }) => {
    try{
        const res = await axios.post(`${CREATE_NEW_MESSAGE}/${threadId}`,{
            message:newMessage
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.status === 201){
            return { status :true }
        }else{
             return { status: false }
        }

    }catch(err){
        console.error("Error in createNewMessageAction: ", err);
    return { status: false };
    }
}