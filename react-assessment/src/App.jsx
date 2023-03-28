import useSWR from 'swr'
import axios from 'axios';
 
const fetcher = url => axios.get(url).then(res => res.data);
 
function App () {
  const { data, error, isLoading } = useSWR("https://pokeapi.co/api/v2/pokemon", fetcher);
  return(
    <div>
      {data &&
        data.results.map((element) => (
          <div>
            <div>{element.name}</div>
            <a href={element.url}> {element.url}</a>
          </div>
        ))}
    </div>
  )
}

export default App
