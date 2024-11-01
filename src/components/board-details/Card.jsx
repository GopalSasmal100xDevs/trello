import CardDialog from "./CardDialog";

export default function CardComponent({
  card,
  deleteCard,
  setReloadListCards,
}) {
  return (
    <CardDialog
      card={card}
      deleteCard={deleteCard}
      setReloadListCards={setReloadListCards}
    />
  );
}
