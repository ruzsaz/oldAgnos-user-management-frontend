import './List.css'
import React from "react";
import Container from './Container'


function List({ src, onSubmit }) {

    const [ready, setReady] = React.useState(false);
    const [list, setList] = React.useState([]);

    React.useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch(src);
                if (response.ok) {
                    const body = await response.json();
                    setList(body)
                } else {
                    console.error(src + ' not found.')
                }
            } catch (error) {
                console.error(error);
            }
            setReady(true);            
        }
        fetchData();
  
    });

    if (!ready) {
        return (
            <p>Loading...</p>
        )
    }
    
    return (
        <div className="list">
            {list.map(user =>            
            <Container
                key={user.name}                
                name={user.name}                    
                value={user.roles.join(', ')}
                content={user}
                onSubmit={onSubmit} >

            </Container>
                
            )}
        </div>
    )
}

export default List;