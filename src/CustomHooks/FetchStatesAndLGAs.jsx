import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setstates, setLGAs } from '../redux/generalInformation';
import axios from 'axios';

const useFetchStatesAndLGAs = (value = 'Oyo') => {
  const states = useSelector((state) => state.generalInformation.states);
  const LGAs = useSelector((state) => state.generalInformation.LGAs);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        if (states.length === 0) {
          let statesData = await axios.get('https://nga-states-lga.onrender.com/fetch');
          dispatch(setstates(statesData.data));
        }
        const LGAsData = await axios.get(`https://nga-states-lga.onrender.com/?state=${value}`);
        dispatch(setLGAs(LGAsData.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [value, dispatch, states]);

  return [states, LGAs];
};

export default useFetchStatesAndLGAs;
