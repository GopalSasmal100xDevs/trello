import { useState } from "react";
import { Editable, Flex, Text } from "@chakra-ui/react";
import { IoMdCheckboxOutline } from "react-icons/io";

import { Button } from "../ui/button";
import TodoProgressBar from "./TodoProgressBar";
import Todo from "./Todo";
import { toaster } from "../ui/toaster";
import { putData } from "../../utils";
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
import { useDispatch } from "react-redux";
import {
  deleteChecklist,
  silentFetchCardCheckLists,
} from "../../redux/actions/cardAction";

export default function TodoList({
  checklist,
  setReloadChecklist,
  deleteItemOnCheckList,
}) {
  const { id, name, checkItems } = checklist;
  const [checklistName, setChecklistName] = useState(name);

  function keyEventHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      updateChecklistName();
    }
  }

  function updateChecklistName() {
    if (checklistName.length === 0) return;
    if (checklistName.trim() === name) return;

    const url = `${import.meta.env.VITE_CHECKLISTS_BASE_URL}/${id}?key=${
      import.meta.env.VITE_TRELLO_API_KEY
    }&token=${import.meta.env.VITE_TRELLO_TOKEN}&name=${checklistName.trim()}`;

    const promise = putData(url).then(() => {
      setChecklistName("");
      setReloadChecklist((prev) => !prev);
    });

    toaster.promise(promise, {
      success: {
        title: "Your card name has been updated successfully!",
        description: "Looks great",
      },
      error: {
        title: "Failed to update card name!",
        description: "Something wrong with the updatation",
      },
      loading: { title: "Updating card name...", description: "Please wait" },
    });
  }

  return (
    <Flex flexDirection={"column"} gap={2} pt={10}>
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <Text
          fontSize={"md"}
          fontWeight={"bold"}
          display={"flex"}
          gap={2}
          alignItems={"center"}
          w={"80%"}
        >
          <IoMdCheckboxOutline size={20} />
          <Editable.Root
            defaultValue={name}
            onChange={(e) => setChecklistName(e.target.value)}
            onKeyDown={keyEventHandler}
            width={"100%"}
            fontSize={"14px"}
          >
            <Editable.Preview />
            <Editable.Input />
          </Editable.Root>
        </Text>
        <ChecklistDeleteConfirm checklist={checklist} />
      </Flex>

      {checkItems?.length > 0 ? (
        <TodoProgressBar checkItems={checkItems} />
      ) : null}

      <Todo
        id={id}
        checkItems={checkItems}
        setReloadChecklist={setReloadChecklist}
        deleteItemOnCheckList={deleteItemOnCheckList}
        checklist={checklist}
      />
    </Flex>
  );
}

function ChecklistDeleteConfirm({ checklist }) {
  const { id, idCard } = checklist;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleDeleteChecklist() {
    setLoading(true);
    await dispatch(deleteChecklist({ id }));
    if (deleteChecklist.fulfilled) {
      toaster.success({
        title: "Your checklist has been deleted successfully!",
        description: "Looks great",
      });
      setLoading(false);
      dispatch(silentFetchCardCheckLists({ id: idCard }));
    } else {
      toaster.error({
        title: "Failed to delete checklist!",
        description: "Something wrong with the deletion",
      });
    }
  }

  return (
    <DialogRoot role="alertdialog" placement={"center"}>
      <DialogTrigger asChild>
        <Button colorPalette={"gray"} variant="surface" loading={loading}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undo. This will permanently delete your
            checklist!
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette="red" onClick={handleDeleteChecklist}>
              Delete
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
