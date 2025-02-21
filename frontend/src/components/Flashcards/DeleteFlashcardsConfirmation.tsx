import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PiTrash } from "react-icons/pi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteFlashcardsModalProps {
  id: string;
  onDelete: () => void;
}

const DeleteFlashcardsConfirmation = ({
  onDelete,
}: DeleteFlashcardsModalProps) => {
  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger>
          <AlertDialogTrigger>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
              <PiTrash size={16} />
            </button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Card</p>
        </TooltipContent>
      </Tooltip>
      <AlertDialogContent className="select-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this card?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the card
            and its contents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFlashcardsConfirmation;
