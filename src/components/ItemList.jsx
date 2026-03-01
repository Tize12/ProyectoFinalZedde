import Item from "./Item"

const ItemList = ({ items }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "24px",
      marginTop: "24px"
    }}>
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemList
