import React from 'react';

function SelectableList({src, current}) {

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
        if (!ready) {
            fetchData();
        }

    });

    if (!ready) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className="list">
            {list.map(group =>
                <div key={group.name}>
                    <input
                        className="selectableList"
                        type="checkbox"
                        name={group.name} 
                        value={group.name}
                        defaultChecked={current.some(e => e === group.name)} />
                    <label>{group.name}</label>
                </div>
            )}
        </div>
    )
}

export default SelectableList;