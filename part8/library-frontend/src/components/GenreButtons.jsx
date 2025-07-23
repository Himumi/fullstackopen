import { useQuery } from '@apollo/client';
import { GET_GENRES } from '../queries/books';

const GenreButtons = ({ setGenre }) => {
  const genres = useQuery(GET_GENRES);

  if (genres.loading) {
    return <div>loading</div>;
  }

  const handleFilterByGenre = (genre) => () => setGenre(genre);

  return (
    <div>
      {genres.data.getGenres.map((genre) => (
        <button key={genre} onClick={handleFilterByGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={handleFilterByGenre(null)}>all genres</button>
    </div>
  );
};

export default GenreButtons;
