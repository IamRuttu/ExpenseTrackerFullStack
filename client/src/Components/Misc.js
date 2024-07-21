import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../config';
function Misc({user}) {
    const [fileImport,setFileImport] = useState(null);
    const handleImport = () =>{
        let importInp=document.createElement('input');
        importInp.id = 'importFromCsv';
        importInp.type='file';
        importInp.accept='.csv';
    
        importInp.onchange = (e) => {
            e.preventDefault();

            if(e.target.files[0]){
                setFileImport(e.target.files[0]);

            }
            else{
                setFileImport(null);

            }

        }
            
        importInp.click();
    }

    useEffect(()=>{
        if(fileImport){
            const formData = new FormData();
            formData.append('csvFile', fileImport);
            formData.append('email',user.email);
            axios.post(config.backendUrl+'/expense/uploadcsv',formData)
            .then(response => {
                if(response.data.status==="success"){
                    message.success(response.data.message);
                    window.location.reload();

                }
                else{
                    message.error(response.data.message);
                }
            })

        }

    },[fileImport])

  return (
    <div id='misc'>
        <div id='importexportdiv'>
        <Button type='primary' onClick={handleImport}>Import CSV</Button>
        </div>
    </div>
  )
}

export default Misc