import CardDialog from "./CardDialog";

export default function CardComponent({ card, deleteCard }) {
  return <CardDialog card={card} deleteCard={deleteCard} />;
}
