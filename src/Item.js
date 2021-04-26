import styles from './Item.module.scss'

function Item({ name, value, showModal }) {

    return (
        <tr onClick={showModal} className={styles.item}>
            <td className={styles.firstCell}>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

export default Item;