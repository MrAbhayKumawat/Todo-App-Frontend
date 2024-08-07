import axios from "axios";
import { BaseUrl } from "./Api";
import Cookies from "js-cookie";

export const createtodo = async (todosdata) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(`${BaseUrl}/createtodo`, todosdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {
    console.error(
      "Error during todo creation:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const updateTodoStatus = async (userId, todoId, completed) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(
      `${BaseUrl}/updateTodoStatus/${userId}`,
      { completed, todoId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {
    console.error(
      "Error during todo status update:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const getAllTodos = async (userId) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.get(`${BaseUrl}/gettodos/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data) {
      return response.data.todos.usertodos;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {
    console.error(
      "Error during fetching todos:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : new Error(error.message);
  }
};
export const getCompletedTodos = async (userId) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.get(`${BaseUrl}/getCompletedTodos/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data) {
      return response.data.todos;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {
    console.error(
      "Error during fetching todos:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const deletetodo = async (userId, todoId) => {
  try {
    const token = Cookies.get("token");

    const response = await axios.post(
      `${BaseUrl}/deletetodo`,
      { userId, todoId }, // Pass both userId and todoId in the body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response && response.data) {
      localStorage.setItem("usertodos", JSON.stringify(response.data.todos));
      return response.data.todos;
    } else {
      throw new Error("No response data received");
    }
  } catch (error) {
    console.error(
      "Error during delete todo:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : new Error(error.message);
  }
};
