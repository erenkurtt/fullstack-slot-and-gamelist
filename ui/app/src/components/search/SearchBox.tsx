import React, {useState, useEffect} from 'react';
import styles from '../../styles/search/search.module.scss';
import { setSearchText } from '../../store/gameSlice';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';

const SearchBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>("");
  const [debounceText, setDebounceText] = useState<string>("");

  // Question 5 in frontend side we are optimasing the search feature with debounce method
  // it aims that waiting 350ms until the onChange method is finished 
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchText(debounceText));
    }, 350); // debounce method 

    return () => clearTimeout(handler);
  }, [debounceText, dispatch]);
  
  const search = (text: string) => {
    setText(text);
    setDebounceText(text);
  }

  return (
    <div>
      <div className={styles.inputSection}>
        <input
          value={text}
          className={styles.searchInput}
          placeholder={`Search Game`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;