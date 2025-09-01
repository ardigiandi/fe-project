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
import delay from "@/lib/delay";
import type { Invitation } from "@/types/type";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const InvitationBox = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { projectId } = useParams();

  const getInvitation = async () => {
    setLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.get(
        `/invitation/${projectId}/get-sent-invitation`
      );
      setInvitations(data.invitation);
      setLoading(false);
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  const cancelInvitation = async (id: string) => {
    try {
      await delay(500);
      const { data } = await apiClient.delete(
        `/invitation/${id}/cancel-invitation`
      );
      toast.success(data.message, {
        onAutoClose: () => getInvitation(),
      });
    } catch (error) {}
  };

  useEffect(() => {
    open && getInvitation();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Mail size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sent Invitations</DialogTitle>
          <DialogDescription asChild>
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {invitations.length > 0 ? (
                    invitations.map((invitation, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between border-b py-2"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="capitalize">
                              {invitation.receiver.name}
                            </p>
                            <p>{invitation.receiver.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p>
                              {format(
                                new Date(invitation.createdAt),
                                "EEEE, dd MMMM yyyy",
                                { locale: id }
                              )}
                            </p>
                            <div className="space-x-1">
                              <Badge className="capitalize">
                                {invitation.status}
                              </Badge>
                              <Badge
                              className="cursor-pointer"
                                variant={"destructive"}
                                onClick={() => cancelInvitation(invitation._id)}
                              >
                                Cancel
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>No invitation sent</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationBox;
