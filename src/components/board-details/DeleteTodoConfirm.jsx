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
import { useDispatch } from "react-redux";
import {
  deleteItemOnCheckList,
  silentFetchCardCheckLists,
} from "../../redux/actions/cardAction";
import { toaster } from "../ui/toaster";

export default function TodoItemDeleteConfirm({ id, checklist }) {
  const dispatch = useDispatch();
  const { idCard } = checklist;

  async function handleDeleteItemOnCheckList() {
    await dispatch(deleteItemOnCheckList({ cardId: idCard, itemId: id }));

    if (deleteItemOnCheckList.fulfilled) {
      toaster.success({
        title: "Your item on checklist has been deleted successfully!",
        description: "Looks great",
      });

      dispatch(silentFetchCardCheckLists({ id: idCard }));
    } else if (deleteItemOnCheckList.rejected) {
      toaster.error({
        title: "Failed to delete item on checklist!",
        description: "Something wrong with the deletion",
      });
    }
  }

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
            <Button colorPalette="red" onClick={handleDeleteItemOnCheckList}>
              Delete
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
