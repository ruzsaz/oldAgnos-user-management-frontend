import './Panel.css';
import List from './List';

function Panel({ title, src, onSubmit }) {


    return (
        <div className="Panel">
            <h1>{title}</h1>
            <List src={src} onSubmit={onSubmit}>

            </List>
            <button>
                New
            </button>

        </div>
    )

}

export default Panel