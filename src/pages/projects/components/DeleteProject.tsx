import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import apiClient from "@/config/axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteProjectProps {
  projectId: string;
  getProject: () => void;
}

const DeleteProject = ({ projectId, getProject }: DeleteProjectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.delete(`/projects/${projectId}/delete`);
      toast.success(data.message, {
        onAutoClose: () => {
          setOpen(false);
          getProject();
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting project");
    } finally {
        setLoading(false)
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="text-destructive hover:bg-white hover:text-destructive transition-all"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-5">
              <p>
                This action cannot be undone. This will permanently delete yours
                project
              </p>
              <Button
                variant={"destructive"}
                onClick={handleDelete}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loading />}
                <Trash />
                Delete
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProject;