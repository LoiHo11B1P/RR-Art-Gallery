import './App.css';
import { increment, decrement, customId, resetId, fetchData } from './features/dataSlice';
import { useSelector, useDispatch, connect } from 'react-redux'
import { useEffect } from "react"


const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})

function App(props) {
  // your logic goes here!
  const dispatch = useDispatch();
  
  //const objectId = useSelector((state) => state.data.objectId)
  const apiData = useSelector((state) => state.data.apiData)

  const searchById = (id) => {
    
    dispatch(customId(id))
  }

  useEffect(() => {

    dispatch(fetchData(props.objectId))

  }, [props.objectId, dispatch])

  const renderImage = () => {
    console.log(apiData)

    if(typeof apiData !== "undefined") {
      return (
        <div>
          <img  style={{'width': '100vw'}} src={apiData.primaryImage} alt={apiData.title} />
        </div>
        
      )
    } else {
      return (
        <p>No Image Available</p>
      )
    }
    
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => { dispatch(fetchData( )) }}>Trigger Thunk</button>
        <button onClick={() => { dispatch(resetId()) } }>Clear</button>
        <button onClick={() => { dispatch(increment()) } }>Next</button>
        <button onClick={() => { dispatch(decrement()) } }>Back</button>
      </div>
      <input onChange={(e) => {searchById(e.target.value)} } />
      <div>
        <label>Art Id: {props.objectId}</label>
        <br></br>
        {renderImage()}
      </div>
    </div>
  );

}
export default connect(mapStateToProps)(App);

