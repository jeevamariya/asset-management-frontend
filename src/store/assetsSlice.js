import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../api/api";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async ({
    page = 1,
    search = "",
    status = "",
    type = "",
  }) => {
    const params = new URLSearchParams();

    params.append("page", page);

    if (search) {
      params.append("search", search);
    }

    if (status) {
      params.append("status", status);
    }

    if (type) {
      params.append("type", type);
    }

    const response = await api.get(
      `/assets/?${params.toString()}`
    );

    return {
      results: response.data.results,
      next: response.data.next,
      previous: response.data.previous,
    };
  }
);

export const addAsset = createAsyncThunk(
  "assets/addAsset",
  async (asset) => {
    const response = await api.post("/assets/", asset);

    return response.data;
  }
);

export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async (asset) => {
    const response = await api.put(
      `/assets/${asset.id}/`,
      asset
    );

    return response.data;
  }
);

export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id) => {
    await api.delete(`/assets/${id}/`);

    return id;
  }
);

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
  items: [],
  loading: false,
  error: "",
  next: null,
  previous: null,
},

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })

      .addCase(fetchAssets.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load assets.";
      })

      .addCase(addAsset.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (asset) => asset.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.items = state.items.filter(
        (asset) => asset.id !== action.payload
        );
        })
  },
});

export default assetsSlice.reducer;