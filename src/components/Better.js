import {React, useEffect, useState} from 'react';
import axios from 'axios'
import '../App.css'

export default function Better() {
    const [planets, setPlanets] = useState([])
    const [newPlanets, setNewPlanets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isError, setisError] = useState(false)

    useEffect( () => {
        const handleApi = async() => {
            setLoading(true)
            try {
                const response = await axios.get('https://swapi.dev/api/planets')
                setPlanets(response.data.results)
                handleSort(response.data.results)
                handlePopulation(response.data.results)
                handleSurfaceWater(response.data.results)
            } catch (error) {
                console.log(`ERROR: ${error.message}`);
                setisError(true)
            }
            setisError(false)
            setLoading(false)
        }
        handleApi();
    }, []);
    
    let handleSort = (planets) => {
        if(planets.length > 0){
            planets.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;   
                });
            }
            // handlePopulation(planets)
        }
        
    let handlePopulation = (planets) => {
        for (let i = 0; i < planets?.length; i++) {
            if(planets[i]['population'] == 'unknown'){
                planets[i]['population'] = '?'
            }
            if(planets[i]['population'].length > 3){
                planets[i]['population'] = planets[i].population.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
            }
            // handleSurfaceWater(planets)
        }
    }

    let handleSurfaceWater = (planets) =>{
        for (let i = 0; i < planets.length; i++) {
            if (planets[i]['surface_water'] === 'unknown'){
                    planets[i]['surface_water'] = '?'  
                } 
                
            if (planets[i]['surface_water'] > 0){
                let r = (planets[i]['diameter'] / 2)
                
                planets[i]['surface_water'] = (Math.round(planets[i]['surface_water']) * 0.01)  
                let sw = planets[i]['surface_water'] 
                planets[i]['surface_water'] = (Math.round(r * sw))
                }
            }
        }

        return (
        <div className='=app-container'>
        <h1>{loading ? <p>loading...</p> : ""}</h1>
        <h1>{isError ? <p>Sorry, there was an error</p> : ""}</h1>
       {!isError && !loading ? 
        <table>
            <thead>
                <tr >
                    <th > 
                        Name
                    </th>
                    <th>
                        Climate
                    </th>
                    <th>
                        # of residents
                    </th>
                    <th>
                        Terrain
                    </th>
                    <th>
                        Population
                    </th>
                    <th>
                        Water surface area
                    </th>
                </tr>
            </thead>
            <tbody>
            {planets?.map(planet => ( 
                <tr key={planet.name}>
                    <td > 
                        <a href={planet.url}  target="_blank">{planet.name}</a>
                    </td>
                    <td>
                        {planet.climate}
                    </td>
                    <td>
                        {planet.residents.length}
                    </td>
                    <td>
                        {planet.terrain}
                    </td>
                    <td>
                        {planet.population}
                    </td>
                    <td>
                        {planet.surface_water}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    : ""}
        </div>
    )
}
