import Header from "@/components/header";
import LoadingPage from "@/components/loading-page";
import MetaItem from "@/components/meta-item";
import apiClient from "@/config/axios";
import delay from "@/lib/delay";
import type { Invitation } from "@/types/type";
import { Calendar, Text, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ReadMore from "./components/ReadMore";
import { Button } from "@/components/ui/button";
import NoDataPage from "@/components/noDataPage";

const MyInvitationsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const getInvitation = async () => {
    setLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.get("/invitation/my-invitations");
      setInvitations(data.invitations);
      setLoading(false);
      console.log("invitations:", data);
    } catch (error) {
      console.log(error);
      toast.error("Error getting invitations", {
        onAutoClose: () => {
          setLoading(false);
        },
      });
    }
  };

  useEffect(() => {
    getInvitation(); // ✅ ambil data saat komponen mount
  }, []);

  if (loading) return <LoadingPage />;

  if (!invitations || invitations.length === 0) {
    return <NoDataPage text="No Invitations Found" />;
  }

  const trimText = (text?: string, limit: number = 100) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const handleAction = async (id: string, status: string) => {
    setIsSubmitted(true);
    try {
      await delay(500);
      const { data } = await apiClient.post(`/invitation/confirm`, {
        invitationId: id,
        status: status,
      });
      toast.success(data.message, {
        onAutoClose: () => {
          getInvitation();
          setIsSubmitted(false);
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        onAutoClose: () => {
          setIsSubmitted(false);
        },
      });
    }
  };

  return (
    <div>
      <Header title="My Invitations" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {invitations.map((invitation, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 space-y-2 border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition"
          >
            <h4 className="font-semibold text-lg">
              {invitation.project?.title || "No Title"}
            </h4>

            <MetaItem
              label="Sender"
              content={invitation.sender?.name || "Unknown"}
              icon={<User size={16} />}
            />

            <MetaItem
              label="Due Date"
              icon={<Calendar size={16} />}
              content={
                invitation.project?.dueDate
                  ? format(
                      new Date(invitation.project.dueDate),
                      "EEEE, dd MMMM yyyy",
                      { locale: id }
                    )
                  : "No Due Date"
              }
            />

            <MetaItem
              label="Description"
              icon={<Text size={16} />}
              isBlock
              isBold
              content={trimText(invitation.project?.description, 100)}
            />

            <div className="flex justify-end mb-2">
              {invitation.project?.description &&
                invitation.project.description.length > 100 && (
                  <ReadMore description={invitation.project.description} />
                )}
            </div>

            <div className="flex justify-between items-center gap-x-2">
              <Button
                size="sm"
                className="w-3/5"
                onClick={() => handleAction(invitation._id, "accepted")}
                disabled={isSubmitted}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-2/5"
                onClick={() => handleAction(invitation._id, "declined")}
                disabled={isSubmitted}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInvitationsPage;
