import { Rings } from 'react-loader-spinner'
import css from './Loader.module.css'

export default function Loader() {
    
    return (
    <div className={css.loader}>
<Rings
  visible={true}
  height="80"
  width="80"
  color="#407BFF"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  );
}
 