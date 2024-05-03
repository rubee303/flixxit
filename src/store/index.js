import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};
export const getGenres = createAsyncThunk("flixxit/genres", async () => {
  const {
    data: { genres }
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  //console.log(array);
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};


const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);

  }
  // console.log({moviesArray});
  return moviesArray;
};


export const fetchMovies = createAsyncThunk(
  "flixxit/trending",
  async ({ type }, thunkApi) => {
    const {
      flixxit: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${TMDB_BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
      genres,
      true
    );

  }
);

export const fetchDataByGenre = createAsyncThunk(
  "flixxit/moviesByGenres",
  async ({ genre, type }, thunkApi) => {
    console.log("in fetch data", genre, type);
    const {
      flixxit: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres

    );

    // return data;
  }
);
export const getUsersLikedMovies = createAsyncThunk(
  "flixxit/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.post(`https://project1-dbkf.onrender.com/api/user/liked`, { email });
    return movies;

  }
);
export const removeMovieFromLiked = createAsyncThunk(
  "flixxit/deleteLiked",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios.put("https://project1-dbkf.onrender.com/api/user/delete", {
      email,
      movieId,
    });
    return movies;
  }
);


const FlixxitSlice = createSlice({
  name: "Flixxit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});
export const store = configureStore({
  reducer: {
    flixxit: FlixxitSlice.reducer,
  },
});
