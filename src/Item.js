import './Item.css'

function Item({ name, value, reference, showModal }) {

    return (
        <div className="tableRow" ref={reference} onClick={showModal}>
            <div className="tableItem">
                {name}                
            </div>
            <div className="tableItem">
                {value}                                
            </div>            
        </div>

    )

}

export default Item;