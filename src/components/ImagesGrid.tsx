import React, { useState, useEffect } from "react";
import Card from "./ImageCard";
import Modal from "./Modal";
import { useDrop } from "react-dnd";
import update from "react-addons-update";

import { ImageCardData, Data } from "../types";
import Loader from "./Loader";
import { addData, getAllData, updateData } from "../mocks/apiCalls";
import { getLastUpdateTime } from "../utils/lastUpdate";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const initialData = [
  { type: "bank-draft", title: "Bank Draft", position: 0 },
  { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
  { type: "invoice", title: "Invoice", position: 2 },
  { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
  { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 },
];

const ImagesGrid: React.FC = () => {
  const [cards, setCards] = useState<ImageCardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<ImageCardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdateData, setLastUpdateData] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const fetchedData = await getAllData();
        if (!fetchedData || fetchedData?.length === 0) {
          const { lastUpdate } = await addData(initialData);
          setCards(initialData);
          setLastUpdateData(lastUpdate);
        } else {
          setCards((fetchedData as Data[])?.sort((a, b) => a.position - b.position));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const updateDataHandler = async () => {
      try {
        setSaving(true);
        const { lastUpdate } = await updateData(cards);
        setLastUpdateData(lastUpdate)
      } catch (error) {
        console.error(error);
      } finally { 
        setSaving(false);
        setLoading(false);
      }
    };
    const intervalId: NodeJS.Timeout = setInterval(updateDataHandler, 5000);
    return () => clearInterval(intervalId);
  }, []);


  const moveCard = async (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    const updatedCards = update(cards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    setCards(updatedCards);
  };

  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = cards.findIndex((c) => c.type === item.id);

      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const handleClick = (item: ImageCardData) => {
    setSelectedCard(item);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="update-info">
            <span>Last updated: {getLastUpdateTime(lastUpdateData)}</span>
            {saving && <span className="saving">Saving...</span>}
          </div>
          <div ref={drop} className="card-grid">
            {cards?.map((card, index) => (
              <Card
                key={card.type}
                item={card}
                index={index}
                onClick={handleClick}
                moveCard={moveCard}
              />
            ))}
            {selectedCard && <Modal card={selectedCard} onClose={handleClose} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagesGrid;
