import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoaderMoreBtn";
import Loader from "./components/Loader/Loader";
import './index.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_KEY = "mxybG2LLL9L4L_yfIJ5LbJfWXfJYsDGq11HuVcpWOpo";

  // Fetch images from Unsplash API
  const fetchImages = async (searchQuery, pageNum = 1, perPage = 16) => {
    setLoading(true);
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
        toast.error("No photos found for this query.");
        return;
      }

      setImages((prevImages) => (pageNum === 1 ? response.data.results : [...prevImages, ...response.data.results]));
    } catch (error) {
      toast.error("Error fetching images! Try again.");
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query input and update the state
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Search query cannot be empty!");
      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setImages([]); // Очищаем старые изображения перед новым поиском
    fetchImages(searchQuery, 1);
  };

  // Load more images when user clicks the button
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onLoadMore={handleLoadMore} />}
    </>
  );
}

export default App;
