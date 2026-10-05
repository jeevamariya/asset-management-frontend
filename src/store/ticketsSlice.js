import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../api/api";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (page = 1) => {
    const response = await api.get(
      `/tickets/?page=${page}`
    );

    return {
      results: response.data.results,
      next: response.data.next,
      previous: response.data.previous,
    };
  }
);

export const addTicket = createAsyncThunk(
  "tickets/addTicket",
  async (ticket) => {
    const response = await api.post("/tickets/", ticket);
    return response.data;
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async (ticket) => {
    const response = await api.put(
      `/tickets/${ticket.id}/`,
      ticket
    );

    return response.data;
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id) => {
    await api.delete(`/tickets/${id}/`);
    return id;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",

  initialState: {
    items: [],
    next: null,
    previous: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.items = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })

      .addCase(addTicket.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (ticket) => ticket.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (ticket) => ticket.id !== action.payload
        );
      });
  },
});

export default ticketsSlice.reducer;