import { memo } from "react";
import { FaPlus } from "react-icons/fa6";

import Button from "@/components/button/Button";

type Props = {
  onPressInsertEvent: () => void;
};

const EventsTopContent = memo(({ onPressInsertEvent }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          color="primary"
          startContent={<FaPlus />}
          onPress={onPressInsertEvent}
        >
          Přidat událost
        </Button>
      </div>
    </div>
  );
});

EventsTopContent.displayName = "EventsTopContent";

export default EventsTopContent;
