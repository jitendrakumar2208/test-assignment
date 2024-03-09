import { useCallback, useState ,useRef, useEffect} from 'react';
import './App.css';

function App() {
  const[length,setLength] = useState(8);
  const[numberAllowed,setNumberAllowed] = useState(false);
  const[lowerCaseAllowed,setLowerCaseAllowed] = useState(false);
  const[upperCaseAllowed,setUpperCaseAllowed] = useState(false);
  const[symbolAllowed,setSymbolAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const passwordGenerator = ()=>{
    let pass = "";
    let str = ""

    if(lowerCaseAllowed) str+="abcdefghijklmnopqrstuvwxyz";
    if(upperCaseAllowed)  str +="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed)  str+="0123456789";
    if(symbolAllowed)  str+="!#$&%@^*_~";

    for(let i=1; i<=str.length; i++){
      let RandomChar=  Math.floor(Math.random() * str.length +1 );
      
      pass+= str.charAt(RandomChar);
    }
    setPassword(pass);
  }

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])



  return (
    <div className="App">
     <h1>Password Generator</h1>

     <div>
      <input type="text"  value={password} readOnly placeholder='password'
      ref={passwordRef}/>
      <button onClick={copyPasswordToClipboard}>Copy</button>
     </div>

     <div>
      <h3>Select Password length(**8-50 characters**)</h3>
      <input type="range" value={length} max={50} min={8}  onChange={(e)=>setLength(e.target.value)}/>
      <label>{length}</label>
     </div>

      <div>
        <input type="checkbox" 
        defaultChecked= {numberAllowed} 
        onChange={(e)=>setNumberAllowed((prev)=>!prev)}
         />
        <label >Include Number</label>

        <input type="checkbox" defaultChecked= {upperCaseAllowed} onChange={(e)=>setUpperCaseAllowed((prev)=>!prev)} />
        <label >Include Uppercase</label>

        <input type="checkbox" defaultChecked= {lowerCaseAllowed} 
        onChange={(e)=>setLowerCaseAllowed(prev=>!prev)}
        />
        <label >Include LowerCase</label>

        <input type="checkbox" defaultChecked = {symbolAllowed}
        onChange={(e)=>setSymbolAllowed((prev)=>!prev)}
        />
        <label >Symbol</label>
      </div>
      <button onClick={passwordGenerator}>Generate</button>
    </div>
  );
}

export default App;
