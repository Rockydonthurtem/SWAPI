import {React, useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'

export default function Home() {
    const [planets, setPlanets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isError, setisError] = useState(false)
    /* TODO:  
        is !loading && !isError or showtable better? 
        Break error and loading to components, use pointers for loops
        Have X or way to return user
        Make function to handle unknown
     */
    useEffect(() =>{
        handleApi();
    })

    let handleApi = () => {
        axios.get('https://swapi.dev/api/planets')
            .then((response) => {
                setPlanets(Array.from(response.data.results));
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                setisError(true)
            })
    }
    
    planets?.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;   
    });
        
    for (let i = 0; i < planets?.length; i++) {
        if(planets[i]['population'] == 'unknown'){
            planets[i]['population'] = '?'
        }
        if(planets[i]['population'].length > 3){
            planets[i]['population'] = planets[i].population.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
        }
    }
 
    for (let i = 0; i < planets.length; i++) {
        if (planets[i]['surface_water'] == 'unknown'){
            planets[i]['surface_water'] = '?'  
        } 
        let r = (planets[i]['diameter'] / 2)
        let sw = planets[i]['surface_water'] / 100
        console.log(`cal....${r * sw}`)
        if (planets[i]['surface_water'] > 0){
            planets[i]['surface_water'] = (Math.round(r * sw))
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
            {planets.map(planet => (
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
