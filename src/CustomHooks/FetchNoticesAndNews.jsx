import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setnoticesAndNews, } from '../redux/generalInformation';
import axios from 'axios';
import { backendurl } from '../../constants/backendurl';



const FetchNoticesAndNews = () => {
  const noticesAndNews = useSelector((state) => state.generalInformation.noticesAndNews);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
          if(noticesAndNews.length==0) {
            const endpoint = `${backendurl}admin/get_notices_and_news`;
            const res = await axios.get(endpoint);
            
            if (res.status === 200) {
                dispatch(setnoticesAndNews(res.data));
            }
          }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [noticesAndNews]);

  return [noticesAndNews];
};

export default FetchNoticesAndNews;

