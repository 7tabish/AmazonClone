import './Brands.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import ProductDataTable from './ProductDataTable';

const Brand =()=>{
    const [loadedBrands, setloadedBrands] = useState(null);
    const [brand, setbrand] = useState('');
    const [logs, setLogs] = useState('');
    const [rows, setRows] = useState([]);


    useEffect(()=>{
        console.log('laod brands');
        laodbrands();
    },[])

    useEffect(()=>{
        console.log('use eff')
        if (loadedBrands !==null){
            loadedBrands.map(brand=>{
                setRows(rows=>[...rows, {id: brand._id, name:brand.name}])
            })
        }
        
    }, [loadedBrands])


    const submitbrandHandler = event=>{
        event.preventDefault();
        setLogs('');
        axios({
            method: 'post',
            url: 'http://localhost:8080/brand',
            data:{
              brandName: brand
            }
          })
          .then(response=>{
              
              if (response.data.error){
                  setLogs(response.data.error);
              }

              if (response.data.status===true){
                    setLogs(`New brand ${response.data.message.name} addedd successfully`);
                    //load updated brands again from db
                    laodbrands();
                    setRows([]);
              }
              
          })
          .catch(error=>console.log(error));
        };
    
        const laodbrands =()=>{
            axios.get('http://localhost:8080/brand')
            .then(brand=>{
                setloadedBrands(brand.data);
                
            })
            .catch(error=>console.log(error))
        }
      
        const columns = [
            { field: 'id', headerName: 'ID', width: 70, hide:true},
            {field: 'name',headerName: 'Brand Name',sortable: true,width: 200},
          ];


    return(
        <div className='Brand'>
            <h2 className='catHeading'>Your Brands</h2>
            
            <div className='brand__input__block'>
            <form   className='brand__input__section' onSubmit={(e)=>submitbrandHandler(e)}>
                <input
                required
                 type='text' id='inputBrand'
                 onChange={(e)=>setbrand(e.target.value)}
                 value={brand}
                 placeholder='add a new brand'/>

                <input id='brandSubmitBtn' type='submit' value='Add Brand'/>
            </form>
            <bold>{logs!=='' ? `${logs}`:null}</bold>
            </div>
            
        <ProductDataTable columns ={columns} rows ={rows}/>
        
        </div>
    );
}

export default Brand;