import React,{useEffect,useState} from 'react'
import Link from 'umi/link'

function Index() {
  const [count,setCount]=useState(1)
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{count}</h2>
      <button onClick={() => {
        setCount(count+1)
      }}> +1</button>
       <button onClick={() => {
        setCount(count-1)
      }}> -1</button>
      <Link to="/home">link to home</Link>
    </div>
  );
}

export default Index;
