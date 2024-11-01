import { RxCross1 } from "react-icons/rx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function TodoItemDeleteConfirm({ id, deleteItemOnCheckList }) {
  return (
    <DialogRoot role="alertdialog" placement={"center"}>
      <DialogTrigger asChild>
        <RxCross1 size={16} cursor={"pointer"} onClick={() => {}} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undo. This will permanently delete your
            checklist item!.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button
              colorPalette="red"
              onClick={() => deleteItemOnCheckList(id)}
            >
              Delete
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
