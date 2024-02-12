import {useState} from "react";

//static items
// static items
// const initialItems = [
//   {id: 1, description: "Passports", quantity: 2, packed: false },
//   {id: 2, description: "Socks", quantity: 12, packed: true},
//   {id: 3, description: "Power Bank", quantity: 1, packed: true },
// ];

//parent component
export default function App() {
  //destructing array for states
  const [items, setItems] = useState([]);

  //handle add items to the state
  const handleAddItems = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  }

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  //render child components inside parent
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onRemoveItem={handleRemoveItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> Jalan Ges ✈️🏢🏢</h1>
}

//child component Form
function Form({onAddItems}) {
  //destructing array for state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //handle submission of form, by preventing its default behavior
  function handleSubmit(e) {
    e.preventDefault();

    //if empty description
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem); //testing new item data
    
    //store new item in array from parent state
    //called this function whenever form submitted
    onAddItems(newItem);

    //return this state
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Apa aja yang dibawa? 🤔</h3>
      <h3>Yuk Checklist Barang 😊</h3>
      <select
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
      type="text"
      placeholder="Barang yang mau dibawa"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      />
      <button>Bawa</button>
    </form>
  );
}

//child component PackingList
function PackingList({items, onRemoveItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem}/>
        ))}
      </ul>
    </div>
  );
}

function Item({item, onRemoveItem}) {
  const handleRemoveClick = () => {
    onRemoveItem(item.id);
  };
  return (
    <li>
      {/* ternary operator to check simple condition */}
      {/* if item.packed === true then apply this style textDecoration: "line-through" else don't do anything*/}
      <span style={item.packed ? {textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleRemoveClick}>🤪</button>
    </li>
  )
}

//child component Stats
function Stats() {
  return (
    <footer className="stats">
      <em>
        Kamu punya 0 barang di daftar, dan sudah packing 0 barang (0%){" "}
      </em>
    </footer>
  );
}