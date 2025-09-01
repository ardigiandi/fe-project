import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/config/axios";
import delay from "@/lib/delay";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import ReactSelect from "react-select";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import { Project } from "@/types/type";

// ini untuk react select
interface TagsOption {
  label: string;
  value: string;
}

const formSchema = z
  .object({
    projectId: z.string().optional().nullable(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    priority: z.string().min(1, { message: "Priority is required" }),
    tags: z.array(z.string().min(1, { message: "Tags is required" })),
    dueDate: z.string().min(1, { message: "Due Date is required" }),
  })
  .superRefine((data, ctx) => {
    const today = new Date().toISOString().split("T")[0];
    if (data.dueDate < today) {
      ctx.addIssue({
        code: "custom",
        message: "Due Date must be greater than today",
        path: ["dueDate"],
      });
    }
  });

interface FormProjectProps {
  project?: Project;
  getProject: () => void;
}

const FormProject = ({ getProject, project }: FormProjectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagsOption[]>([]);
  //   const navigate = useNavigate();

  //   ini untuk menu select
  const priorityOptions = [
    {
      label: "low",
      value: "low",
    },
    {
      label: "medium",
      value: "medium",
    },
    {
      label: "high",
      value: "high",
    },
  ];

  //   ini untuk mengambil api tags
  const getTags = async () => {
    try {
      const { data } = await apiClient.get("/tag");
      const result = data.map((tag: { tag_name: string }) => {
        return {
          label: tag.tag_name,
          value: tag.tag_name,
        };
      });
      setTags(result);
    } catch (error) {
      toast.error("Error getting tags");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: project?._id || null,
      title: project?.title || "",
      description: project?.description || "",
      priority: project?.priority || "low",
      tags: project?.tags || [],
      dueDate: project?.dueDate.slice(0, 10) || "",
    },
  });

  const url = project ? `/projects/${project._id}/update` : "/projects";
  const method = project ? "put" : "post";

  const handleForm = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient[method](url, values);
      toast.success(data.message, {
        onAutoClose: () => {
          setOpen(false);
          getProject()
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error creating project");
    }
  };

  useEffect(() => {
    if (open) getTags();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={project ? "text-blue-800 hover:bg-white" : ""}
        >
          {project ? 'Edit' : 'Create Project'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Project</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(handleForm)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityOptions.map(
                                (
                                  option: { label: string; value: string },
                                  index: number
                                ) => (
                                  <SelectItem value={option.value} key={index}>
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <ReactSelect
                            options={tags}
                            isMulti
                            isClearable
                            placeholder="Select tags"
                            onChange={(value) => {
                              field.onChange(
                                value
                                  ? value.map(
                                      (item: { value: string }) => item.value
                                    )
                                  : []
                              );
                            }}
                            className="capitalize"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Button className="w-full" disabled={loading}>
                      {loading && <Loading />}
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormProject;
