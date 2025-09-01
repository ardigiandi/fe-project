import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/type";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DetailProjectsProps {
  project: Project | null;
}

const DetailProjects = ({ project }: DetailProjectsProps) => {
  return (
    <div className="space-y-3 border rounded-md p-5">
      <p className="font-semibold text-lg">Job Title: {project?.title}</p>
      <p>{project?.description}</p>
      <p>
        Due Date:{" "}
        {project &&
          format(new Date(project?.dueDate), "EEEE, dd MMMM yyyy", {
            locale: id,
          })}
      </p>
      <div className="flex gap-x-1 items-center">
          {project?.tags.map((tag, index) =>(
             <Badge key={index} variant={'secondary'} className="capitalize">{tag}</Badge>
          ))}
      </div>
    </div>
  );
};

export default DetailProjects;
