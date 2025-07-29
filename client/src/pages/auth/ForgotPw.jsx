import React, {useState} from 'react'
import axios from 'axios'

const BACKEND_URL = "http://localhost:3000"

function ForgotPw() {
    const [email, setEmail] = useState("")

    function handleSend(e){
        e.preventDefault()
        axios.post(`${BACKEND_URL}/forgotpw`, {email})
            .then((res)=>{
                console.log(res.data.otp)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={handleSend}>
                <input type="email" name="" id="" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' />
                <input type="button" value="send otp" />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default ForgotPw
