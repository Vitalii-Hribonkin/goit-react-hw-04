import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoaderMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"; 
import './index.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // <-- `error` використовується далі в коді

  const API_KEY = "mxybG2LLL9L4L_yfIJ5LbJfWXfJYsDGq11HuVcpWOpo";

  const fetchImages = async (searchQuery, pageNum = 1, perPage = 16) => {
    setLoading(true);
    setError(null); // Скидаємо помилки перед новим запитом

    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          client_id: API_KEY,
          query: searchQuery,
          page: pageNum,
          per_page: perPage,
        },
      });

      if (response.data.results.length === 0) {
        setError("No photos found for this query.");
        return;
      }

      setImages((prevImages) => (pageNum === 1 ? response.data.results : [...prevImages, ...response.data.results]));
    } catch (error) { 
      setError("Error fetching images! Try again.");
      toast.error("Error fetching images!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Search query cannot be empty!");
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    fetchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />} 
      <ImageGallery images={images} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onLoadMore={handleLoadMore} />}
    </>
  );
}

export default App;
