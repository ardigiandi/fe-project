import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ReadMoreProps {
    description: string
}

const ReadMore = ({description}: ReadMoreProps) => {
  return (
    <Dialog>
      <DialogTrigger className="text-sm text-blue-800">Read More</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Description</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReadMore;
