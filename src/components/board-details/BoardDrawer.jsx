import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard } from "../../redux/actions/boardDetailsAction";
import { useNavigate } from "react-router-dom";

export default function BoardDrawer() {
  const drawerRef = useRef(null);

  return (
    <DrawerRoot size={"xs"} restoreFocus={drawerRef}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <BsThreeDotsVertical size={20} cursor={"pointer"} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <DeleteBoardConfirm />
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}

function DeleteBoardConfirm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id } = useSelector(
    (state) => state.boardDetails.board.boardInfo.details
  );

  async function handleBoardDelete() {
    setDeleteLoading(true);
    const resultAction = await dispatch(deleteBoard({ id }));
    if (deleteBoard.fulfilled.match(resultAction)) {
      setDeleteLoading(false);
      navigate("/");
    }
  }

  return (
    <DialogRoot role="alertdialog" placement={"center"}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          colorPalette={"red"}
          size="sm"
          loading={deleteLoading}
        >
          Delete card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undo. This will permanently delete your board!
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="red" onClick={handleBoardDelete}>
              Delete
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
