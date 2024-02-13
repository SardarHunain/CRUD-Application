
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

function CreateUser() {
  
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        mobile:"",
    })

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value; 
        setInputs({...inputs,[name]:value})
        
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await axios.post("http://localhost/api/index.php", JSON.stringify(inputs), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Data sent successfully");
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }
    
  
    return (
    <div>
      <h2>CreateUser</h2>
      <form onSubmit={handleSubmit}>
        <table cellSpacing="10">
            <tbody>
                <tr>
                    <th>
                    <label>Name:</label>
                    </th>
                    <td>
                    <input type="text" name="name" onChange={handleChange} />
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Email:</label>
                    </th>
                    <td>
                    <input type="text" name="email" onChange={handleChange} />
                    </td>
                </tr>
                <tr>
                    <th>
                    <label>Mobile:</label>
                    </th>
                    <td>
                    <input type="text" name="mobile" onChange={handleChange} />
                    </td>
                </tr>
                <tr>
                    
                    <td colSpan="2" align="right">
                    <Button type="submit">Save</Button>
                    </td>
                </tr>
            </tbody>
        </table>
       
       
       
      </form>
    </div>
  );
}

export default CreateUser;
