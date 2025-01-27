import css from "./SearchBox.module.css";
import { useDispatch, useSelector  } from "react-redux";
import { selectNameFilter } from '../../redux/filters/selectors'
import { changeFilter } from '../../redux/filters/slice'

export default function SearchBox() {
  
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);
  
  const onFilter = (e) => dispatch(changeFilter(e.target.value));

  return (
    <div className={css.wrap}>
      <label className={css.label}>
        <input
          className={css.input}
          type="text"
          name="search"
          inputMode='search'
				value={value}
          onChange={onFilter}
        />
        Find contacts by name
      </label>
    </div>
  );
}